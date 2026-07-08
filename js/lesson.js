/* ===== lesson.js — Orchestration des leçons ===== */
/*
  Flow d'une nouvelle leçon :
    1. Dialogue (4 lignes + note culturelle)
    2. Exercices sur 5 mots (meaning-mc / gap-fill / translate-mc)
    3. Grammaire MC
    4. Self-assess sur les 10 mots (SRS)
    5. Écran de fin + XP

  startSmart()    : SRS due ≥ 3 → révision ; sinon → prochaine unité.
  startForUnit()  : leçon ciblée sur une unité précise (depuis Parcours).
  exit            : retour à l'écran d'où on vient (home ou parcours).
*/

const Lesson = (() => {

  const LESSON_WORDS     = 5;
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
      if (idx >= queue.length) { _end(container, idx, ok, xp, true); return; }
      const { word, unit, key } = queue[idx];
      _bar(container, idx, queue.length, `🔁 Révision — ${unit.icon} ${unit.name}`);
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
    const mode  = _getMode();
    const words = unit.words.slice(0, LESSON_WORDS);
    let ok = 0, xpEarned = 0;

    const steps = [{ type: 'dialogue' }];
    words.forEach((w, i) => {
      const t = ['meaning-mc', 'gap-fill', 'translate-mc'][i % 3];
      steps.push({ type: t, word: w });
    });
    steps.push({ type: 'grammar' });
    unit.words.forEach(w => steps.push({ type: 'self-assess', word: w }));

    let si = 0;
    function run() {
      if (si >= steps.length) { _end(container, steps.length, ok, xpEarned, false); return; }
      const step = steps[si];
      _bar(container, si, steps.length, `${unit.icon} ${unit.name}`);
      const body = _body(container);

      function done(isOk) {
        if (typeof isOk === 'boolean') {
          let e = 0;
          if (isOk) { e = XP.REWARDS.correct; ok++; }
          xpEarned += e; if (e) XP.addXP(e);
          if (step.type === 'self-assess' && step.word) {
            const k = _key(unit.id, step.word.en, mode);
            _save(k, isOk);
            if (isOk) XP.markWordMastered(unit.id, step.word.en);
            else       XP.markWordSeen(unit.id, step.word.en);
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
  function _bar(container, idx, total, label) {
    const pct = Math.round(((idx + 1) / total) * 100);
    container.innerHTML = `
      <div class="le-wrap">
        <div class="le-topbar">
          <button class="le-exit-btn" id="le-exit" title="Quitter">✕</button>
          <div class="le-progwrap">
            <div class="le-progbar"><div class="le-progfill" style="width:${pct}%"></div></div>
          </div>
          <div class="le-topbar-right">
            <div class="le-counter">${idx + 1}/${total}</div>
            <button class="le-home-btn" id="le-home-btn" title="Accueil">🏠</button>
          </div>
        </div>
        <div class="le-unit-label">${label}</div>
        <div id="le-body" class="le-body"></div>
      </div>`;
    container.querySelector('#le-exit').addEventListener('click', () => {
      if (!confirm('Quitter la leçon ? Ta progression sera perdue.')) return;
      (_onExit || (() => App.showHome()))();
    });
    container.querySelector('#le-home-btn').addEventListener('click', () => {
      if (!confirm('Retourner à l\'accueil ? Ta progression sera perdue.')) return;
      App.showHome();
    });
  }

  function _body(container) { return container.querySelector('#le-body'); }

  /* ── End screen ───────────────────────────────────────────────── */
  function _end(container, done, ok, xpEarned, isReview) {
    const bonus  = (ok === done && done > 0) ? XP.REWARDS.perfectSession : XP.REWARDS.sessionComplete;
    XP.addXP(bonus); xpEarned += bonus;
    const streak = XP.recordActivity();
    if (streak > 1) { XP.addXP(XP.REWARDS.dailyStreak); xpEarned += XP.REWARDS.dailyStreak; }
    const lv     = XP.getLevel();
    const nextLv = XP.getNextLevel();
    const pct    = Math.round(XP.getLevelProgress() * 100);
    const toNext = XP.xpToNext();                         // ← correct API
    const perfect = ok === done && done > 0;

    // Capture callbacks before rendering (they may be reset by "Encore")
    const onExit  = _onExit  || (() => App.showHome());
    const onAgain = _onAgain || (() => startSmart(container));

    container.innerHTML = `
      <div class="le-end">
        <div class="le-end-topbar">
          <button class="le-end-close" id="le-end-close" title="Retour">✕</button>
        </div>
        <div class="le-end-trophy">${perfect ? '🏆' : isReview ? '🔁' : '✨'}</div>
        <div class="le-end-title">${perfect ? 'Parfait !' : isReview ? 'Révision terminée !' : 'Leçon terminée !'}</div>
        ${perfect ? '<div class="le-end-perf">⚡ Session parfaite !</div>' : ''}

        <div class="le-end-stats">
          <div class="le-end-stat"><div class="le-end-n" style="color:#4ade80">${ok}</div><div class="le-end-l">Sus</div></div>
          <div class="le-end-stat"><div class="le-end-n" style="color:#f87171">${done - ok}</div><div class="le-end-l">Ratés</div></div>
          <div class="le-end-stat"><div class="le-end-n" style="color:#7b9fff">+${xpEarned}</div><div class="le-end-l">XP</div></div>
        </div>

        <div class="le-end-level">
          <div class="le-end-lv-info">
            <span style="color:${lv.color}">${lv.name}</span>
            ${nextLv
              ? `<span class="le-end-lv-next">→ ${nextLv.name} dans ${toNext} XP</span>`
              : '<span class="le-end-lv-next">🎉 Niveau B1 atteint !</span>'}
          </div>
          <div class="le-end-lvbar"><div class="le-end-lvfill" style="width:${pct}%;background:${lv.color}"></div></div>
        </div>

        <div class="le-end-btns">
          <button class="le-end-next"  id="le-next">▶ Prochaine leçon</button>
          <button class="le-end-again" id="le-again">↩ Encore</button>
          <button class="le-end-home"  id="le-home">← Retour</button>
        </div>
      </div>`;

    container.querySelector('#le-end-close').addEventListener('click', () => onExit());
    container.querySelector('#le-next').addEventListener('click',      () => startSmart(container));
    container.querySelector('#le-again').addEventListener('click',     () => onAgain());
    container.querySelector('#le-home').addEventListener('click',      () => onExit());
  }

  /* ── All caught up ────────────────────────────────────────────── */
  function _allDone(container) {
    const onExit = _onExit || (() => App.showHome());
    container.innerHTML = `
      <div class="le-end">
        <div class="le-end-topbar">
          <button class="le-end-close" id="le-end-close" title="Retour">✕</button>
        </div>
        <div class="le-end-trophy">✨</div>
        <div class="le-end-title">Tout est à jour !</div>
        <p style="color:var(--muted);text-align:center;margin:.5rem 0 1.5rem">Reviens demain pour continuer.<br>Explore le Parcours pour débloquer plus.</p>
        <div class="le-end-btns">
          <button class="le-end-home"  id="le-home">← Retour</button>
          <button class="le-end-again" id="le-parcours">🗺️ Parcours</button>
        </div>
      </div>`;
    container.querySelector('#le-end-close').addEventListener('click', () => onExit());
    container.querySelector('#le-home').addEventListener('click',      () => onExit());
    container.querySelector('#le-parcours').addEventListener('click',  () => App.showParcours());
  }

  return { startSmart, startForUnit };
})();

window.Lesson = Lesson;
