/* ===== vocab-practice.js — Drill SRS boucle infinie ===== */
/*
  Statuts par mot (clés voc:mode:uid:en) :
    new      → jamais vu
    learning → a commis des erreurs (ou vu une seule fois correctement)
    known    → 2 réponses correctes consécutives

  Session = boucle infinie.
    - Correct → known (dès 2 bons d'affilée), mot avance dans la queue
    - Faux    → learning + réinsertion ~5 positions plus loin
    - Queue épuisée → refill automatique (learning > new > known)
    - Bouton Stop → écran de fin avec totaux de session
    - Filtre par thème via le sélecteur de thèmes
*/
const VocabPractice = (() => {

  let _coursesOpen = false;
  let _levelFilter = 'all';        // 'all' | 'a1' | 'a2' | 'b1' — picker-side filter
  let _sessionLevelFilter = 'all'; // snapshot used by the active/last session

  const LEVELS = ['a1', 'a2', 'b1'];
  function _wordLevel(word, ownerLvl) { return word.lvl || ownerLvl || 'a2'; }
  function _ownerLevel(owner) { return owner.level || owner.lvl || 'a2'; }
  function _wordsAtLevel(owner, levelFilter) {
    if (levelFilter === 'all') return owner.words;
    const ownerLvl = _ownerLevel(owner);
    return owner.words.filter(w => _wordLevel(w, ownerLvl) === levelFilter);
  }

  /* ── Storage ──────────────────────────────────────────────────────── */
  function _k(mode, uid, en) { return `voc:${mode}:${uid}:${en}`; }
  function _load(k)           { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }
  function _save(k, v)        { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

  function _getStatus(mode, uid, en) {
    const d = _load(_k(mode, uid, en));
    return d ? (d.status || 'new') : 'new';
  }

  function _markResult(mode, word, isCorrect) {
    const k = _k(mode, word._uid, word.en);
    const d = _load(k) || { status: 'new', streak: 0, wrongCount: 0 };
    if (isCorrect) {
      d.streak = (d.streak || 0) + 1;
      if      (d.status === 'new')                           d.status = 'learning';
      else if (d.status === 'learning' && d.streak >= 2)    d.status = 'known';
    } else {
      d.status     = 'learning';
      d.streak     = 0;
      d.wrongCount = (d.wrongCount || 0) + 1;
    }
    d.lastSeen = Date.now();
    _save(k, d);
    if (window.XP) {
      XP.markWordSeen(word._uid, word.en);
      if (d.status === 'known') XP.markWordMastered(word._uid, word.en);
      if (isCorrect) XP.addXP(5);
    }
  }

  /* ── Queue builder — learning > new > known ───────────────────────── */
  function _buildQueue(unitOrNull, mode) {
    const allUnits = window.CURRICULUM_B1 || [];
    const allRefs  = window.VOCAB_REFS || [];
    const lf = _sessionLevelFilter;
    let source;
    if (!unitOrNull) {
      source = [
        ...allUnits.flatMap(u => _wordsAtLevel(u, lf).map(w => ({ ...w, _uid: u.id }))),
        ...allRefs.flatMap(r => _wordsAtLevel(r, lf).map(w => ({ ...w, _uid: r.id }))),
      ];
    } else if (unitOrNull.isGroup) {
      source = unitOrNull.refs.flatMap(r => _wordsAtLevel(r, lf).map(w => ({ ...w, _uid: r.id })));
    } else {
      source = _wordsAtLevel(unitOrNull, lf).map(w => ({ ...w, _uid: unitOrNull.id }));
    }

    const learning = [], newWords = [], known = [];
    for (const w of source) {
      const s = _getStatus(mode, w._uid, w.en);
      if (s === 'learning')    learning.push(w);
      else if (s === 'new')    newWords.push(w);
      else                     known.push(w);
    }
    return [..._shuffle(learning), ..._shuffle(newWords), ..._shuffle(known)];
  }

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }
  function _goVocab() {
    // If we pushed a history entry for this session, step back through it
    // (instead of stacking a fresh 'vocab' entry on top) so the back
    // button still only needs one press to leave the picker afterwards.
    if (history.state && history.state.screen === 'vocab-session') history.back();
    else if (window.App) App.showVocab();
  }

  function _sessionLabel(unitOrNull, mode) {
    const lvlTag = _sessionLevelFilter !== 'all' ? ` · ${_sessionLevelFilter.toUpperCase()}` : '';
    if (unitOrNull && unitOrNull.isGroup) return unitOrNull.label + lvlTag;
    if (unitOrNull) return `${unitOrNull.icon} ${unitOrNull.name}${lvlTag}`;
    return _ui('Tous les thèmes', 'Todos los temas', mode) + lvlTag;
  }

  /* ── Theme picker ─────────────────────────────────────────────────── */
  function _renderPicker(container, mode) {
    const isFrEs = mode === 'fr-es';
    const lf     = _levelFilter;
    const units  = (window.CURRICULUM_B1 || []).filter(u => _wordsAtLevel(u, lf).length > 0);
    const refs   = (window.VOCAB_REFS || [])
      .map(r => ({ ...r, name: isFrEs ? r.name : r.nameEs }))
      .filter(r => _wordsAtLevel(r, lf).length > 0);
    const otherRefs  = refs.filter(r => !r.course);
    const courseRefs = refs.filter(r => r.course);

    function badges(u) {
      const words    = _wordsAtLevel(u, lf);
      const total    = words.length;
      const learning = words.filter(w => _getStatus(mode, u.id, w.en) === 'learning').length;
      const newW     = words.filter(w => _getStatus(mode, u.id, w.en) === 'new').length;
      const known    = total - learning - newW;
      return [
        learning > 0 ? `<span class="vpp-badge vpp-fail">${learning}</span>` : '',
        newW > 0     ? `<span class="vpp-badge vpp-new">${newW}</span>`     : '',
        known  > 0   ? `<span class="vpp-badge vpp-ok">${known}</span>`     : '',
      ].join('');
    }

    const courseWords = courseRefs.reduce((s, r) => s + _wordsAtLevel(r, lf).length, 0);
    const totalWords = units.reduce((s, u) => s + _wordsAtLevel(u, lf).length, 0)
                      + otherRefs.reduce((s, r) => s + _wordsAtLevel(r, lf).length, 0)
                      + courseWords;

    const lvlLabel = { a1: 'A1', a2: 'A2', b1: 'B1' };
    const lvlBar = `
      <div class="vpp-lvlbar">
        ${['all', ...LEVELS].map(l => `
          <button class="vpp-lvl${lf === l ? ' vpp-lvl--on' : ''}" data-lvl="${l}">
            ${l === 'all' ? _ui('Tous niveaux', 'Todos los niveles', mode) : lvlLabel[l]}
          </button>`).join('')}
      </div>`;

    container.innerHTML = `
      <div class="vpp-wrap">
        <div class="vpp-header">
          <button class="vp-close" id="vp-close">✕</button>
          <h2 class="vpp-title">${_ui('Choisir un thème', 'Elegir un tema', mode)}</h2>
        </div>
        ${lvlBar}
        <div class="vpp-list">
          <button class="vpp-all" data-unit="">
            <span class="vpp-icon">🌍</span>
            <span class="vpp-name">${_ui('Tous les thèmes', 'Todos los temas', mode)}</span>
            <span class="vpp-badges"><span class="vpp-badge vpp-total">${totalWords}</span></span>
          </button>
          ${units.length === 0 && otherRefs.length === 0 && courseRefs.length === 0 ? `
            <div class="vpp-empty">${_ui('Aucun mot à ce niveau pour le moment.', 'Ninguna palabra en este nivel por ahora.', mode)}</div>
          ` : ''}
          ${units.map(u => `
            <button class="vpp-unit" data-unit="${u.id}">
              <span class="vpp-icon">${u.icon}</span>
              <span class="vpp-name">${u.name}</span>
              <span class="vpp-badges">${badges(u)}</span>
            </button>`).join('')}
          ${otherRefs.length ? `<div class="vpp-sep">${_ui('📚 Références', '📚 Referencias', mode)}</div>` : ''}
          ${otherRefs.map(r => `
            <button class="vpp-unit" data-unit="${r.id}">
              <span class="vpp-icon">${r.icon}</span>
              <span class="vpp-name">${r.name}</span>
              <span class="vpp-badges">${badges(r)}</span>
            </button>`).join('')}
          ${courseRefs.length ? `
            <div class="vpp-sep">${_ui('🎓 Mes cours', '🎓 Mis clases', mode)}</div>
            <button class="vpp-unit vpp-course-toggle" data-course-toggle="1">
              <span class="vpp-icon">🎓</span>
              <span class="vpp-name">${_ui('Vocabulaire de mes cours', 'Vocabulario de mis clases', mode)}</span>
              <span class="vpp-badges"><span class="vpp-badge vpp-total">${courseWords}</span></span>
              <span class="vpp-arrow">${_coursesOpen ? '▲' : '▼'}</span>
            </button>
            ${_coursesOpen ? `
              <button class="vpp-all vpp-sub" data-course-all="1">
                <span class="vpp-icon">🌎</span>
                <span class="vpp-name">${_ui('Tous mes cours', 'Todas mis clases', mode)}</span>
                <span class="vpp-badges"><span class="vpp-badge vpp-total">${courseWords}</span></span>
              </button>
              ${courseRefs.map(r => `
                <button class="vpp-unit vpp-sub" data-unit="${r.id}">
                  <span class="vpp-icon">${r.icon}</span>
                  <span class="vpp-name">${r.name}</span>
                  <span class="vpp-badges">${badges(r)}</span>
                </button>`).join('')}
            ` : ''}
          ` : ''}
        </div>
      </div>`;

    container.querySelector('#vp-close').addEventListener('click', () => {
      if (window.App) App.showHome();
    });

    container.querySelectorAll('[data-lvl]').forEach(btn => {
      btn.addEventListener('click', () => {
        _levelFilter = btn.dataset.lvl;
        _renderPicker(container, mode);
      });
    });

    const toggleBtn = container.querySelector('[data-course-toggle]');
    if (toggleBtn) toggleBtn.addEventListener('click', () => {
      _coursesOpen = !_coursesOpen;
      _renderPicker(container, mode);
    });

    const allCoursesBtn = container.querySelector('[data-course-all]');
    if (allCoursesBtn) allCoursesBtn.addEventListener('click', () => {
      _sessionLevelFilter = _levelFilter;
      _runInfinite(container, {
        isGroup: true,
        refs: courseRefs,
        label: _ui('🎓 Tous mes cours', '🎓 Todas mis clases', mode),
      }, mode);
    });

    container.querySelectorAll('.vpp-all[data-unit], .vpp-unit[data-unit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid  = btn.dataset.unit;
        const item = uid ? (units.find(u => u.id === uid) || refs.find(r => r.id === uid) || null) : null;
        _sessionLevelFilter = _levelFilter;
        _runInfinite(container, item, mode);
      });
    });
  }

  /* ── Infinite runner ──────────────────────────────────────────────── */
  function _runInfinite(container, unitOrNull, mode) {
    // Give the session its own history entry so the phone/browser back
    // button steps back to the theme picker instead of exiting the app.
    // Guarded so restarting the same session (e.g. "Continuer") doesn't
    // pile up extra entries.
    if (!history.state || history.state.screen !== 'vocab-session') {
      history.pushState({ screen: 'vocab-session' }, '');
    }

    let queue = _buildQueue(unitOrNull, mode);
    if (!queue.length) { _renderEmpty(container, unitOrNull, mode); return; }

    let correct = 0, wrong = 0, stopped = false, qi = 0;

    // Render shell once
    container.innerHTML = `
      <div class="vp-wrap">
        <div class="vp-topbar">
          <button class="vp-close" id="vp-stop">${_ui('⏹ Stop', '⏹ Parar', mode)}</button>
          <div class="vp-unit-lbl">${_sessionLabel(unitOrNull, mode)}</div>
          <div class="vp-score">
            <span class="vp-score-ok">✓ 0</span>
            <span class="vp-score-fail">✗ 0</span>
          </div>
        </div>
        <div id="vp-body" class="vp-body"></div>
      </div>`;

    container.querySelector('#vp-stop').addEventListener('click', () => {
      stopped = true;
      _renderEnd(container, unitOrNull, mode, correct, wrong);
    });

    function updateScore() {
      const el = container.querySelector('.vp-score');
      if (el) el.innerHTML =
        `<span class="vp-score-ok">✓ ${correct}</span><span class="vp-score-fail">✗ ${wrong}</span>`;
    }

    function next() {
      if (stopped) return;

      if (qi >= queue.length) {
        queue = _buildQueue(unitOrNull, mode);
        qi    = 0;
        if (!queue.length) { _renderEnd(container, unitOrNull, mode, correct, wrong); return; }
      }

      const word = queue[qi];
      const body = container.querySelector('#vp-body');
      if (!body) return;

      LessonEngine.renderSelfAssess(body, word, (isCorrect) => {
        if (stopped) return;
        _markResult(mode, word, isCorrect);
        if (isCorrect) {
          correct++;
        } else {
          wrong++;
          // Réinsère le mot ~5 positions plus loin pour revoir bientôt
          const insertAt = Math.min(qi + 5, queue.length);
          queue.splice(insertAt, 0, { ...word });
        }
        qi++;
        updateScore();
        next();
      }, mode);
    }

    next();
  }

  /* ── Empty state ──────────────────────────────────────────────────── */
  function _renderEmpty(container, unitOrNull, mode) {
    container.innerHTML = `
      <div class="vp-wrap">
        <div class="vp-topbar">
          <button class="vp-close" id="vp-close">✕</button>
          <div class="vp-unit-lbl">${_sessionLabel(unitOrNull, mode)}</div>
        </div>
        <div class="vp-empty">
          <div class="vp-empty-ico">📭</div>
          <p>${_ui('Aucun mot à pratiquer.', 'Sin palabras para practicar.', mode)}</p>
        </div>
      </div>`;
    container.querySelector('#vp-close').addEventListener('click', () => _goVocab());
  }

  /* ── End screen ───────────────────────────────────────────────────── */
  function _renderEnd(container, unitOrNull, mode, correct, wrong) {
    const total    = correct + wrong;
    const accuracy = total > 0 ? Math.round(correct / total * 100) : 0;
    const xpGain   = correct * 5; // already credited per answer in _markResult; kept here just for display

    const emoji = accuracy === 100 ? '🏆' : accuracy >= 70 ? '✨' : '💪';

    container.innerHTML = `
      <div class="vp-end">
        <div class="vp-end-nav">
          <button class="vp-close" id="vp-close">✕</button>
        </div>
        <div class="vp-end-trophy">${emoji}</div>
        <div class="vp-end-title">${_ui('Session terminée !', '¡Sesión terminada!', mode)}</div>
        <div class="vp-end-lbl">${_sessionLabel(unitOrNull, mode)}</div>

        <div class="vp-end-stats">
          <div class="vp-end-stat">
            <div class="vp-end-n" style="color:#4ade80">${correct}</div>
            <div class="vp-end-l">${_ui('Sus', 'Correctas', mode)}</div>
          </div>
          <div class="vp-end-stat">
            <div class="vp-end-n" style="color:#f87171">${wrong}</div>
            <div class="vp-end-l">${_ui('Ratés', 'Errores', mode)}</div>
          </div>
          <div class="vp-end-stat">
            <div class="vp-end-n" style="color:#fbbf24">${accuracy}%</div>
            <div class="vp-end-l">Score</div>
          </div>
        </div>

        ${xpGain > 0 ? `<div class="vp-end-xp">+${xpGain} XP</div>` : ''}

        <div class="vp-end-btns">
          <button class="vp-btn-again" id="vp-again">↩ ${_ui('Continuer', 'Continuar', mode)}</button>
          <button class="vp-btn-back"  id="vp-back">‹ ${_ui('Retour au Lexique', 'Volver al Léxico', mode)}</button>
        </div>
      </div>`;

    container.querySelector('#vp-close').addEventListener('click', () => _goVocab());
    container.querySelector('#vp-back').addEventListener('click',  () => _goVocab());
    container.querySelector('#vp-again').addEventListener('click', () => _runInfinite(container, unitOrNull, mode));
  }

  /* ── API publique ─────────────────────────────────────────────────── */
  // start(container, unit, mode) : lancé depuis vocab.js sur les boutons par unité
  // startWithPicker(container, mode) : affiche le sélecteur de thème d'abord
  function start(container, unitOrNull, mode) {
    if (!window.LessonEngine) { console.warn('VocabPractice: LessonEngine non chargé'); return; }
    _runInfinite(container, unitOrNull, mode);
  }

  function startWithPicker(container, mode) {
    if (!window.LessonEngine) { console.warn('VocabPractice: LessonEngine non chargé'); return; }
    _renderPicker(container, mode);
  }

  function getWordStatus(mode, uid, en) { return _getStatus(mode, uid, en); }

  return { start, startWithPicker, getWordStatus };
})();

window.VocabPractice = VocabPractice;
