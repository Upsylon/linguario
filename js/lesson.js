/* ===== lesson.js — Orchestration des leçons ===== */
/*
  Flow d'une nouvelle leçon :
    1. Dialogue (4 lignes + note culturelle)
    2. Grammaire MC
    3. Exercices sur les 10 mots (meaning-mc / gap-fill / translate-mc en rotation)
    4. Self-assess sur les 10 mots (SRS)  — mots ratés ré-exposés automatiquement
    5. Écran de fin + XP

  startSmart()    : SRS due ≥ 3 → révision ; sinon → prochaine unité.
  startForUnit()  : leçon ciblée sur une unité précise (depuis Parcours).
  exit            : retour à l'écran d'où on vient (home ou parcours).
*/

const Lesson = (() => {

  const REVIEW_THRESHOLD = 3;

  // Callbacks — set per session, reset each time
  let _onExit  = null;   // called by ✕ button mid-lesson
  let _onAgain = null;   // called by "Encore" on end screen

  /* ── SRS helpers ──────────────────────────────────────────────── */
  function _key(unitId, wordEn, mode) { return `qs:${mode || 'fr-es'}:${unitId}:${wordEn}`; }

  function _load(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  }

  function _save(key, correct) {
    const c = _load(key) || { interval: 1, easeFactor: 2.5, reps: 0 };
    if (correct) {
      c.reps++;
      c.interval = c.reps === 1 ? 1 : c.reps === 2 ? 4 : Math.round(c.interval * c.easeFactor);
      c.easeFactor = Math.max(1.3, c.easeFactor + 0.1);
    } else {
      c.reps = 0; c.interval = 1;
      c.easeFactor = Math.max(1.3, c.easeFactor - 0.2);
    }
    c.nextReview = Date.now() + c.interval * 86400000;
    localStorage.setItem(key, JSON.stringify(c));
  }

  /* ── Mode ────────────────────────────────────────────────────── */
  function _getMode() {
    try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; }
  }

  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }

  /* ── Due queue ────────────────────────────────────────────────── */
  function _due() {
    const mode = _getMode();
    const now  = Date.now();
    const out  = [];
    for (const unit of (window.CURRICULUM_B1 || [])) {
      for (const word of unit.words) {
        const k = _key(unit.id, word.en, mode);
        const c = _load(k);
        if (c && c.nextReview <= now) out.push({ word, unit, key: k, card: c });
      }
    }
    return out.sort((a, b) => (a.card.nextReview || 0) - (b.card.nextReview || 0));
  }

  /* ── Next unit with unseen words ──────────────────────────────── */
  function _nextUnit() {
    const mode       = _getMode();
    const curriculum = window.CURRICULUM_B1 || [];
    const a1Seen = curriculum.filter(u => u.level === 'a1').some(u => u.words.some(w => _load(_key(u.id, w.en, mode))));
    const a2Seen = curriculum.filter(u => u.level === 'a2').some(u => u.words.some(w => _load(_key(u.id, w.en, mode))));
    const available = curriculum.filter(u =>
      u.level === 'a1' ||
      (u.level === 'a2' && a1Seen) ||
      (u.level === 'b1' && a2Seen)
    );
    return available.find(u => u.words.some(w => !_load(_key(u.id, w.en, mode)))) || curriculum[0] || null;
  }

  /* ══════════════════════════════════════════════════════════════
     Public entry points
  ══════════════════════════════════════════════════════════════ */

  /** Called from JOUER button — decides review vs new lesson automatically. */
  function startSmart(container) {
    _onExit  = () => App.showHome();
    _onAgain = () => startSmart(container);
    const due = _due();
    if (due.length >= REVIEW_THRESHOLD) _review(container, due.slice(0, 10));
    else {
      const unit = _nextUnit();
      if (unit) _lesson(container, unit);
      else _allDone(container);
    }
  }

  /** Called from Parcours unit detail — lesson for a specific unit, exits back to Parcours. */
  function startForUnit(container, unit) {
    _onExit  = () => App.showParcours();
    _onAgain = () => startForUnit(container, unit);
    _lesson(container, unit);
  }

  /* ══════════════════════════════════════════════════════════════
     Review session — SRS self-assess cards
  ══════════════════════════════════════════════════════════════ */
  function _review(container, queue) {
    const mode = _getMode();
    let idx = 0, ok = 0, xp = 0;
    function next() {
      if (idx >= queue.length) { _end(container, idx, ok, xp, true, mode); return; }
      const { word, unit, key } = queue[idx];
      _bar(container, idx, queue.length, `${_ui('🔁 Révision', '🔁 Repaso', mode)} — ${unit.icon} ${unit.name}`, mode);
      LessonEngine.renderSelfAssess(_body(container), word, (isOk) => {
        let e = 0;
        if (isOk) { e = XP.REWARDS.correct; ok++; }
        xp += e; if (e) XP.addXP(e);
        _save(key, isOk);
        if (isOk) XP.markWordMastered(unit.id, word.en);
        else       XP.markWordSeen(unit.id, word.en);
        idx++; next();
      }, mode);
    }
    next();
  }

  /* ══════════════════════════════════════════════════════════════
     New lesson — dialogue → exercises → grammar → self-assess
  ══════════════════════════════════════════════════════════════ */
  function _lesson(container, unit) {
    const mode   = _getMode();
    let ok = 0, xpEarned = 0, scored = 0;
    const missed = new Set();

    // Optimal sequence (Schmidt noticing hypothesis): dialogue → grammar → exercises (ALL 10) → self-assess
    const steps = [{ type: 'dialogue' }, { type: 'grammar' }];
    const typeOffset = Math.floor(Math.random() * 3);
    unit.words.forEach((w, i) => {
      steps.push({ type: ['meaning-mc', 'gap-fill', 'translate-mc'][(i + typeOffset) % 3], word: w });
    });
    unit.words.forEach(w => steps.push({ type: 'self-assess', word: w }));

    let si = 0;
    function run() {
      // Re-queue missed self-assess words for a second pass before ending
      if (si === steps.length) {
        const repass = [...missed].map(en => ({ type: 'self-assess', word: unit.words.find(x => x.en === en), repass: true }));
        if (repass.length) { steps.push(...repass); missed.clear(); }
      }
      if (si >= steps.length) { _end(container, scored, ok, xpEarned, false, mode); return; }
      const step = steps[si];
      _bar(container, si, steps.length, `${unit.icon} ${unit.name}`, mode);
      const body = _body(container);

      function done(isOk) {
        if (typeof isOk === 'boolean') {
          scored++;
          let e = 0;
          if (isOk) { e = XP.REWARDS.correct; ok++; }
          xpEarned += e; if (e) XP.addXP(e);
          if (step.type === 'self-assess' && step.word) {
            const k = _key(unit.id, step.word.en, mode);
            _save(k, isOk);
            if (isOk) XP.markWordMastered(unit.id, step.word.en);
            else {
              XP.markWordSeen(unit.id, step.word.en);
              if (!step.repass) missed.add(step.word.en);
            }
          }
        }
        si++; run();
      }

      if (step.type === 'dialogue')          LessonEngine.renderDialogue(body, unit, () => done(null), mode);
      else if (step.type === 'meaning-mc')   LessonEngine.renderMeaningMC(body, unit, step.word, done, mode);
      else if (step.type === 'gap-fill')     LessonEngine.renderGapFill(body, unit, step.word, done, mode);
      else if (step.type === 'translate-mc') LessonEngine.renderTranslateMC(body, unit, step.word, done, mode);
      else if (step.type === 'grammar')      LessonEngine.renderGrammarMC(body, unit, done, mode);
      else if (step.type === 'self-assess')  LessonEngine.renderSelfAssess(body, step.word, done, mode);
    }
    run();
  }

  /* ── Progress bar shell ───────────────────────────────────────── */
  function _bar(container, idx, total, label, mode) {
    const pct = Math.round(((idx + 1) / total) * 100);
    container.innerHTML = `
      <div class="le-wrap">
        <div class="le-topbar">
          <button class="le-exit-btn" id="le-exit">✕</button>
          <div class="le-progwrap">
            <div class="le-progbar"><div class="le-progfill" style="width:${pct}%"></div></div>
          </div>
          <div class="le-topbar-right">
            <div class="le-counter">${idx + 1}/${total}</div>
          </div>
        </div>
        <div class="le-exit-banner" id="le-exit-banner">
          <span class="le-exit-q">${_ui('Quitter la leçon ?', '¿Salir de la lección?', mode)}</span>
          <button class="le-exit-yes" id="le-exit-yes">${_ui('Oui', 'Sí', mode)}</button>
          <button class="le-exit-no"  id="le-exit-no">${_ui('Non', 'No', mode)}</button>
        </div>
        <div class="le-unit-label">${label}</div>
        <div id="le-body" class="le-body"></div>
      </div>`;
    container.querySelector('#le-exit').addEventListener('click', () => {
      container.querySelector('#le-exit-banner').classList.toggle('le-exit-banner--open');
    });
    container.querySelector('#le-exit-yes').addEventListener('click', () => {
      (_onExit || (() => App.showHome()))();
    });
    container.querySelector('#le-exit-no').addEventListener('click', () => {
      container.querySelector('#le-exit-banner').classList.remove('le-exit-banner--open');
    });
  }

  function _body(container) { return container.querySelector('#le-body'); }

  /* ── End screen ───────────────────────────────────────────────── */
  function _end(container, done, ok, xpEarned, isReview, mode) {
    mode = mode || _getMode();
    const bonus  = (ok === done && done > 0) ? XP.REWARDS.perfectSession : XP.REWARDS.sessionComplete;
    XP.addXP(bonus); xpEarned += bonus;
    const streak = XP.recordActivity();
    if (streak > 1) { XP.addXP(XP.REWARDS.dailyStreak); xpEarned += XP.REWARDS.dailyStreak; }
    const lv     = XP.getLevel();
    const nextLv = XP.getNextLevel();
    const pct    = Math.round(XP.getLevelProgress() * 100);
    const toNext = XP.xpToNext();
    const perfect = ok === done && done > 0;

    const onExit  = _onExit  || (() => App.showHome());
    const onAgain = _onAgain || (() => startSmart(container));

    container.innerHTML = `
      <div class="le-end">
        <div class="le-end-topbar">
          <button class="le-end-close" id="le-end-close">✕</button>
        </div>
        <div class="le-end-trophy">${perfect ? '🏆' : isReview ? '🔁' : '✨'}</div>
        <div class="le-end-title">${perfect ? _ui('Parfait !', '¡Perfecto!', mode) : isReview ? _ui('Révision terminée !', '¡Repaso terminado!', mode) : _ui('Leçon terminée !', '¡Lección terminada!', mode)}</div>
        ${perfect ? `<div class="le-end-perf">⚡ ${_ui('Session parfaite !', '¡Sesión perfecta!', mode)}</div>` : ''}

        <div class="le-end-stats">
          <div class="le-end-stat"><div class="le-end-n" style="color:#4ade80">${ok}</div><div class="le-end-l">${_ui('Sus', 'Correctas', mode)}</div></div>
          <div class="le-end-stat"><div class="le-end-n" style="color:#f87171">${done - ok}</div><div class="le-end-l">${_ui('Ratés', 'Errores', mode)}</div></div>
          <div class="le-end-stat"><div class="le-end-n" style="color:#7b9fff">+${xpEarned}</div><div class="le-end-l">XP</div></div>
        </div>

        <div class="le-end-level">
          <div class="le-end-lv-info">
            <span style="color:${lv.color}">${lv.name}</span>
            ${nextLv
              ? `<span class="le-end-lv-next">→ ${nextLv.name} ${_ui(`dans ${toNext} XP`, `faltan ${toNext} XP`, mode)}</span>`
              : `<span class="le-end-lv-next">🎉 ${_ui('Niveau B1 atteint !', '¡Nivel B1 alcanzado!', mode)}</span>`}
          </div>
          <div class="le-end-lvbar"><div class="le-end-lvfill" style="width:${pct}%;background:${lv.color}"></div></div>
        </div>

        <div class="le-end-btns">
          <button class="le-end-next"  id="le-next">▶ ${_ui('Prochaine leçon', 'Próxima lección', mode)}</button>
          <button class="le-end-again" id="le-again">↩ ${_ui('Encore', 'Repetir', mode)}</button>
          <button class="le-end-home"  id="le-home">← ${_ui('Retour', 'Volver', mode)}</button>
        </div>
      </div>`;

    container.querySelector('#le-end-close').addEventListener('click', () => onExit());
    container.querySelector('#le-next').addEventListener('click',      () => startSmart(container));
    container.querySelector('#le-again').addEventListener('click',     () => onAgain());
    container.querySelector('#le-home').addEventListener('click',      () => onExit());

    if (window.Sync) Sync.push();
  }

  /* ── All caught up ────────────────────────────────────────────── */
  function _allDone(container) {
    const mode   = _getMode();
    const onExit = _onExit || (() => App.showHome());
    container.innerHTML = `
      <div class="le-end">
        <div class="le-end-topbar">
          <button class="le-end-close" id="le-end-close">✕</button>
        </div>
        <div class="le-end-trophy">✨</div>
        <div class="le-end-title">${_ui('Tout est à jour !', '¡Todo al día!', mode)}</div>
        <p style="color:var(--muted);text-align:center;margin:.5rem 0 1.5rem">${_ui('Reviens demain pour continuer.<br>Explore le Parcours pour débloquer plus.', 'Volvé mañana para continuar.<br>Explorá el Recorrido para desbloquear más.', mode)}</p>
        <div class="le-end-btns">
          <button class="le-end-home"  id="le-home">← ${_ui('Retour', 'Volver', mode)}</button>
          <button class="le-end-again" id="le-parcours">🗺️ ${_ui('Parcours', 'Recorrido', mode)}</button>
        </div>
      </div>`;
    container.querySelector('#le-end-close').addEventListener('click', () => onExit());
    container.querySelector('#le-home').addEventListener('click',      () => onExit());
    container.querySelector('#le-parcours').addEventListener('click',  () => App.showParcours());
  }

  return { startSmart, startForUnit };
})();

window.Lesson = Lesson;
