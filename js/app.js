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
      _rawShow('welcome');
      hideNav();
      bindWelcome();
    } else {
      showHome();
    }

    initTabs();

    // Header logo always navigates home — confirm only if mid-lesson
    const hdr = document.querySelector('.app-header');
    if (hdr) {
      hdr.addEventListener('click', e => {
        if (e.target.closest('#sync-btn') || e.target.closest('#audio-toggle')) return;
        if (_currentScreen === 'quick-session') return; // ✕ in lesson handles exit
        showHome();
      });
    }

    history.replaceState({ screen: _currentScreen || 'home' }, '');

    window.addEventListener('popstate', e => {
      const screen = e.state && e.state.screen;
      if (!screen || screen === 'quick-session') { showHome(); return; }
      if      (screen === 'home')     showHome();
      else if (screen === 'duel')     showDuelTab();
      else if (screen === 'parcours') showHome();
      else if (screen === 'vocab')    showVocab();
      else                            showHome();
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
        if      (t === 'home')  showHome();
        else if (t === 'duel')  showDuelTab();
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

    const isDeep = id === 'quick-session';
    if (isDeep || id === 'welcome') hideNav();
    else showNav();

    if (isDeep) {
      if (_currentScreen !== id) { history.pushState({ screen: id }, ''); _currentScreen = id; }
    } else if (id !== 'welcome') {
      history.replaceState({ screen: id }, ''); _currentScreen = id;
    } else {
      _currentScreen = id;
    }
  }

  function _rawShow(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + id);
    if (el) el.classList.add('active');
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
        showHome();
        toast(I18N.t('toast.welcome', name));
      });
    }
  }

  // ── Nav i18n ──────────────────────────────────────────────────────────
  function _updateNavLabels(mode) {
    const isEs = mode === 'es-fr';
    [['home','Apprendre','Aprender'],['duel','Duel','Duelo'],['vocab','Lexique','Léxico']]
      .forEach(([screen, fr, es]) => {
        const el = document.querySelector(`.snav-tab[data-screen="${screen}"] .snav-label`);
        if (el) el.textContent = isEs ? es : fr;
      });
  }

  // ── Home (combined dashboard + parcours roadmap) ──────────────────────
  function showHome() {
    show('home');
    setActiveTab('home');
    const el = document.getElementById('screen-home');
    if (!el) return;
    const p = Storage.getProfile();
    document.documentElement.lang = (p.mode === 'es-fr') ? 'es' : 'fr';
    _renderHome(el, p);
  }

  function _getDueCount(mode) {
    const now = Date.now();
    let count = 0;
    for (const unit of (window.CURRICULUM_B1 || [])) {
      for (const word of unit.words) {
        try {
          const c = JSON.parse(localStorage.getItem('qs:' + mode + ':' + unit.id + ':' + word.en));
          if (c && c.nextReview <= now) count++;
        } catch {}
      }
    }
    return count;
  }

  function _renderHome(el, p) {
    const mode     = p.mode || 'fr-es';
    _updateNavLabels(mode);
    const xp       = XP.getXP();
    const level    = XP.getLevel();
    const nextLv   = XP.getNextLevel();
    const progPct  = Math.round(XP.getLevelProgress() * 100);
    const streak   = XP.getStreak();
    const unit     = XP.getCurrentUnit();
    const xpToGo   = nextLv ? nextLv.min - xp : 0;
    const dueCount = _getDueCount(mode);
    const unitHint = unit ? unit.icon + ' ' + esc(unit.name) : _ui('🎉 Tout complété !', '🎉 ¡Todo completado!', mode);

    const reviewCard = dueCount > 0 ? `
      <button class="hm-action-card hm-action-review" id="hm-review">
        <span class="hm-action-icon">🔄</span>
        <div class="hm-action-body">
          <div class="hm-action-title">${_ui('Réviser maintenant', 'Repasar ahora', mode)}</div>
          <div class="hm-action-sub">${dueCount} ${_ui(dueCount > 1 ? 'mots en attente' : 'mot en attente', dueCount > 1 ? 'palabras pendientes' : 'palabra pendiente', mode)}</div>
        </div>
      </button>` : '';

    el.innerHTML = `
      <div class="hm-wrap">
        <div class="hm-dash">
          <div class="hm-lang-switch">
            <span class="hm-lang-label">${_ui("J'apprends :", 'Aprendo:', mode)}</span>
            <div class="hm-lang-pills">
              <button class="hm-lang-pill${mode === 'fr-es' ? ' hm-lang-pill--active' : ''}" data-mode="fr-es">🇦🇷 Espagnol</button>
              <button class="hm-lang-pill${mode === 'es-fr' ? ' hm-lang-pill--active' : ''}" data-mode="es-fr">🇫🇷 Français</button>
            </div>
          </div>

          ${streak
            ? '<div class="hm-streak-pill">🔥 ' + streak + ' ' + _ui(streak > 1 ? 'jours' : 'jour', streak > 1 ? 'días' : 'día', mode) + '</div>'
            : '<div class="hm-streak-pill hm-streak-zero">' + _ui("Commence ta série aujourd'hui !", '¡Empezá tu racha hoy!', mode) + '</div>'}

          <div class="hm-xp-block">
            <div class="hm-xp-labels">
              <span class="hm-xp-lv" style="color:${level.color}">${level.name}</span>
              <span class="hm-xp-num">${xp} XP</span>
              <span class="hm-xp-next">${nextLv ? nextLv.name : '✓'}</span>
            </div>
            <div class="hm-xpbar">
              <div class="hm-xpbar-fill" style="width:${progPct}%;background:${level.color}"></div>
            </div>
            ${nextLv ? '<div class="hm-xp-hint">' + _ui('encore ' + xpToGo + ' XP pour ' + nextLv.name, 'faltan ' + xpToGo + ' XP para ' + nextLv.name, mode) + '</div>' : ''}
          </div>

          <div class="hm-actions">
            ${reviewCard}
            <button class="hm-action-card hm-action-play" id="hm-play">
              <span class="hm-action-icon">▶</span>
              <div class="hm-action-body">
                <div class="hm-action-title">${_ui('Continuer', 'Continuar', mode)}</div>
                <div class="hm-action-sub">${unitHint}</div>
              </div>
            </button>
          </div>
        </div>

        <div class="hm-parcours-wrap">
          <div class="hm-parcours-title">🗺️ ${_ui('Mon Parcours', 'Mi Recorrido', mode)}</div>
          <div id="hm-parcours-body"></div>
        </div>
      </div>`;

    el.querySelectorAll('.hm-lang-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.mode;
        if (next === mode) return;
        p.mode = next;
        Storage.saveProfile(p);
        showHome();
      });
    });

    const playBtn = el.querySelector('#hm-play');
    if (playBtn) playBtn.addEventListener('click', showLesson);
    const reviewBtn = el.querySelector('#hm-review');
    if (reviewBtn) reviewBtn.addEventListener('click', showLesson);

    const parcoursBody = el.querySelector('#hm-parcours-body');
    if (parcoursBody && window.Parcours) Parcours.render(parcoursBody);
  }

  // ── Duel ─────────────────────────────────────────────────────────────
  function showDuelTab() {
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
    if (c && window.DUEL) DUEL.render(c);
  }

  // ── Lexique ───────────────────────────────────────────────────────────
  function showVocab() {
    show('vocab');
    setActiveTab('vocab');
    const el = document.getElementById('screen-vocab');
    if (el && window.Vocab) Vocab.render(el);
  }

  // ── Parcours (merged into home) ───────────────────────────────────────
  function showParcours() { showHome(); }

  // ── Leçon ─────────────────────────────────────────────────────────────
  function showLesson() {
    show('quick-session');
    setActiveTab('home');
    const el = document.getElementById('screen-quick-session');
    if (el && window.Lesson) Lesson.startSmart(el);
    else if (el && window.QuickSession) QuickSession.render(el);
  }

  function showLessonForUnit(unit) {
    show('quick-session');
    setActiveTab('home');
    const el = document.getElementById('screen-quick-session');
    if (el && window.Lesson) Lesson.startForUnit(el, unit);
    else if (el && window.QuickSession) QuickSession.renderForUnit(el, unit);
  }

  // Legacy aliases kept for external callers
  function showQuickSession()             { showLesson(); }
  function showQuickSessionForUnit(unit)  { showLessonForUnit(unit); }

  // ── Utils ─────────────────────────────────────────────────────────────
  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  let _toastTO = null;
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(_toastTO);
    _toastTO = setTimeout(() => el.classList.remove('show'), 2800);
  }

  return { init, showHome, showParcours, showVocab, showLesson, showLessonForUnit, showQuickSession, showQuickSessionForUnit, toast };
})();

window.App = App;
window.addEventListener('DOMContentLoaded', () => App.init());
