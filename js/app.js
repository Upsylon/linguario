/* ===== app.js — LinguaRío v9 ===== */
const App = (() => {

  const DATA_VERSION = '4';
  let _currentScreen = null;

  // ── Init ─────────────────────────────────────────────────────────────
  function init() {
    if (localStorage.getItem('langapp:dv') !== DATA_VERSION) {
      Storage.clearAll();
      localStorage.setItem('langapp:dv', DATA_VERSION);
    }

    initDark();
    initAudioToggle();

    const profile = Storage.getProfile();
    if (!profile.onboarded || !profile.name) {
      show('welcome');
      bindWelcome();
    } else {
      showVocab();
    }

    initTabs();

    // Header logo always navigates to the Lexique (the app's home screen)
    const hdr = document.querySelector('.app-header');
    if (hdr) {
      hdr.addEventListener('click', e => {
        if (e.target.closest('#sync-btn') || e.target.closest('#audio-toggle')) return;
        showVocab();
      });
    }

    history.replaceState({ screen: _currentScreen || 'vocab' }, '');

    window.addEventListener('popstate', e => {
      const screen = e.state && e.state.screen;
      if (screen === 'duel') showDuelTab(true); // back out of a duel sub-screen -> theme list
      else                   showVocab();
    });
  }

  // ── Dark mode ─────────────────────────────────────────────────────────
  function initDark() {
    const saved = localStorage.getItem('langapp:theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(saved ? saved === 'dark' : prefersDark);
    const btn = document.getElementById('dark-toggle');
    if (btn) btn.addEventListener('click', () => setDark(document.documentElement.dataset.theme !== 'dark'));
  }
  function setDark(on) {
    document.documentElement.dataset.theme = on ? 'dark' : '';
    localStorage.setItem('langapp:theme', on ? 'dark' : 'light');
    const btn = document.getElementById('dark-toggle');
    if (btn) btn.textContent = on ? '☀️' : '🌙';
  }

  // ── Audio toggle ──────────────────────────────────────────────────────
  function initAudioToggle() {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;
    if (!window.TTS || !TTS.supported()) { btn.style.display = 'none'; return; }
    btn.classList.toggle('off', !TTS.isOn());
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const on = TTS.toggle();
      btn.classList.toggle('off', !on);
      toast(on ? I18N.t('toast.ttsOn') : I18N.t('toast.ttsOff'));
    });
  }

  // ── Navigation ────────────────────────────────────────────────────────
  function initTabs() {
    document.querySelectorAll('.snav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const t = tab.dataset.screen;
        if      (t === 'duel')  showDuelTab();
        else if (t === 'vocab') showVocab();
      });
    });
  }

  function setActiveTab(id) {
    document.querySelectorAll('.snav-tab').forEach(t => t.classList.toggle('active', t.dataset.screen === id));
  }

  function showNav() { const n = document.getElementById('sidenav'); if (n) n.style.display = ''; }
  function hideNav() { const n = document.getElementById('sidenav'); if (n) n.style.display = 'none'; }

  // ── Screen routing ────────────────────────────────────────────────────
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + id);
    if (el) el.classList.add('active');

    if (id === 'welcome') { hideNav(); _currentScreen = id; return; }
    showNav();
    history.replaceState({ screen: id }, '');
    _currentScreen = id;
  }

  // ── Welcome ───────────────────────────────────────────────────────────
  function bindWelcome() {
    let selectedMode = 'fr-es';

    function _adaptWelcome(mode) {
      const isEs = mode === 'es-fr';
      const nameInput = document.getElementById('welcome-name');
      const startBtn  = document.getElementById('welcome-start');
      if (nameInput) nameInput.placeholder = isEs ? 'Tu nombre (opcional)' : 'Ton prénom (optionnel)';
      if (startBtn)  startBtn.textContent  = isEs ? 'Empezar ▶' : 'Commencer ▶';
    }

    document.querySelectorAll('.wc-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.wc-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedMode = card.dataset.mode;
        _adaptWelcome(selectedMode);
      });
    });
    const startBtn = document.getElementById('welcome-start');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const nameEl = document.getElementById('welcome-name');
        const defaultName = selectedMode === 'es-fr' ? 'Aprendiz' : 'Apprenant';
        const name = (nameEl ? nameEl.value.trim() : '') || defaultName;
        Storage.saveProfile({ name, mode: selectedMode, onboarded: true, createdAt: SRS.today() });
        showVocab();
        toast(I18N.t('toast.welcome', name));
      });
    }
  }

  // ── Nav i18n ──────────────────────────────────────────────────────────
  function _updateNavLabels(mode) {
    const isEs = mode === 'es-fr';
    [['duel','Duel','Duelo'],['vocab','Lexique','Léxico']]
      .forEach(([screen, fr, es]) => {
        const el = document.querySelector(`.snav-tab[data-screen="${screen}"] .snav-label`);
        if (el) el.textContent = isEs ? es : fr;
      });
  }

  // ── Duel ─────────────────────────────────────────────────────────────
  function showDuelTab(resetState) {
    show('duel');
    setActiveTab('duel');
    const el = document.getElementById('screen-duel');
    if (!el) return;
    const _dMode = (() => { try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; } })();
    el.innerHTML = `
      <div class="du-tab-wrap">
        <div class="du-tab-bar">
          <span class="du-tab-title">⚔️ ${_dMode === 'es-fr' ? 'Modo Duelo' : 'Mode Duel'}</span>
          <button class="du-reset-btn" id="du-reset">🔄 ${_dMode === 'es-fr' ? 'Reiniciar' : 'Réinitialiser'}</button>
        </div>
        <div id="du-content" class="du-content"></div>
      </div>`;
    el.querySelector('#du-reset').addEventListener('click', () => {
      const c = el.querySelector('#du-content');
      if (c && window.DUEL) DUEL.reset(c);
    });
    const c = el.querySelector('#du-content');
    if (c && window.DUEL) { resetState ? DUEL.reset(c) : DUEL.render(c); }
  }

  // ── Lexique (app's home screen) ─────────────────────────────────────
  function showVocab() {
    show('vocab');
    setActiveTab('vocab');
    const el = document.getElementById('screen-vocab');
    if (!el) return;
    const p = Storage.getProfile();
    const mode = p.mode || 'fr-es';
    document.documentElement.lang = (mode === 'es-fr') ? 'es' : 'fr';
    _updateNavLabels(mode);
    if (window.VocabPractice) VocabPractice.startWithPicker(el, mode);
  }

  // Switches the FR<->ES learning direction, then re-renders the Lexique.
  function setMode(mode) {
    const p = Storage.getProfile();
    if (p.mode === mode) return;
    p.mode = mode;
    Storage.saveProfile(p);
    showVocab();
  }

  // ── Utils ─────────────────────────────────────────────────────────────
  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }

  let _toastTO = null;
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(_toastTO);
    _toastTO = setTimeout(() => el.classList.remove('show'), 2800);
  }

  return { init, showVocab, showDuelTab, setMode, toast };
})();

window.App = App;
window.addEventListener('DOMContentLoaded', () => App.init());
