/* ===== quick-session.js — Session rapide 5 min ===== */
/* 10 mots · SRS + curriculum · Draft A dark UX       */

const QuickSession = (() => {

  const SESSION_SIZE = 10;

  /* ── Build queue ────────────────────────────────────────────────────── */
  function _getMode() {
    try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; }
  }

  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }

  function buildQueue() {
    const mode       = _getMode();
    const curriculum = window.CURRICULUM_B1 || [];
    const unitProg   = XP.getUnitProgress();
    const queue      = [];

    // 1. SRS due cards from curriculum words
    const now = Date.now();
    for (const unit of curriculum) {
      const up = unitProg[unit.id] || { seen: [] };
      for (const word of unit.words) {
        const key  = `qs:${mode}:${unit.id}:${word.en}`;
        const card = _loadCard(key);
        if (card && card.nextReview && card.nextReview <= now) {
          queue.push({ word, unit, key, isNew: false, card });
        }
      }
    }

    // Sort by most overdue first
    queue.sort((a, b) => (a.card.nextReview || 0) - (b.card.nextReview || 0));

    // 2. Fill with new words from current and next units
    if (queue.length < SESSION_SIZE) {
      for (const unit of curriculum) {
        if (queue.length >= SESSION_SIZE) break;
        const up = unitProg[unit.id] || { seen: [] };
        for (const word of unit.words) {
          if (queue.length >= SESSION_SIZE) break;
          const key  = `qs:${mode}:${unit.id}:${word.en}`;
          const card = _loadCard(key);
          if (!card && !up.seen.includes(word.en)) {
            queue.push({ word, unit, key, isNew: true, card: null });
          }
        }
      }
    }

    // Trim to SESSION_SIZE and shuffle slightly (keep SRS order mostly)
    return queue.slice(0, SESSION_SIZE);
  }

  /* ── Render ─────────────────────────────────────────────────────────── */
  function render(container) {
    const queue = buildQueue();
    if (!queue.length) {
      _renderEmpty(container);
      return;
    }
    _runSession(container, queue);
  }

  function _renderEmpty(container) {
    const mode = _getMode();
    container.innerHTML = `
      <div class="qs-done">
        <div class="qs-done-icon">✨</div>
        <div class="qs-done-title">${_ui('Tout est à jour !', '¡Todo al día!', mode)}</div>
        <div class="qs-done-sub">${_ui('Reviens demain pour continuer.<br>Continue sur le Parcours pour débloquer plus.', 'Volvé mañana para continuar.<br>Continuá en el Recorrido para desbloquear más.', mode)}</div>
        <button class="qs-done-btn" onclick="App.showParcours()">🗺️ ${_ui('Voir le Parcours', 'Ver el Recorrido', mode)}</button>
      </div>`;
  }

  function _runSession(container, queue) {
    let idx     = 0;
    let correct = 0;
    let xpEarned = 0;
    let revealed = false;
    let tapTime  = 0;
    const mode   = (() => { try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; } })();
    const isEsMode = mode === 'es-fr';

    function showCard() {
      revealed = false;
      const { word, unit, isNew } = queue[idx];
      const nativeVal  = isEsMode ? (word.esTarget || word.es) : word.fr;
      const targetVal  = isEsMode ? word.fr : (word.esTarget || word.es);
      const nativeFlag = isEsMode ? '🇦🇷' : '🇫🇷';
      const targetFlag = isEsMode ? '🇫🇷' : '🇦🇷';
      const pct = Math.round((idx / queue.length) * 100);
      tapTime = Date.now();

      container.innerHTML = `
        <div class="qs-session">
          <div class="qs-topbar">
            <button class="qs-exit" id="qs-exit-btn">✕</button>
            <div class="qs-progwrap">
              <div class="qs-progbar"><div class="qs-progfill" style="width:${pct}%"></div></div>
            </div>
            <div class="qs-counter">${idx + 1}/${queue.length}</div>
          </div>

          ${isNew ? `<div class="qs-new-badge">✦ ${_ui('Nouveau mot', 'Palabra nueva', mode)}</div>` : ''}

          <div class="qs-card-area">
            <div class="qs-lang">${nativeFlag} ${_ui('Tu connais la traduction ?', '¿Conocés la traducción?', mode)}</div>
            <div class="qs-word">${nativeVal}</div>
            <div class="qs-unit-tag">${unit.icon} ${unit.name}</div>
          </div>

          <div class="qs-answer-area" id="qs-ans" style="display:none;">
            <div class="qs-divider"></div>
            <div class="qs-translations">
              <div class="qs-trans qs-trans--target"><span class="qs-flag">${targetFlag}</span><span class="qs-tword">${targetVal}</span></div>
            </div>
          </div>

          <div class="qs-actions" id="qs-actions">
            <button class="qs-reveal-btn" id="qs-reveal">${_ui('Révéler →', 'Revelar →', mode)}</button>
          </div>

          <div class="qs-vote" id="qs-vote" style="display:none;">
            <button class="qs-btn-wrong" id="qs-no">✗ ${_ui('Raté', 'Error', mode)}</button>
            <button class="qs-btn-right" id="qs-yes">✓ ${_ui('Su !', '¡Correcto!', mode)}</button>
          </div>
        </div>`;

      container.querySelector('#qs-exit-btn').addEventListener('click', () => {
        _renderEndScreen(container, idx, correct, xpEarned, queue, mode);
      });
      container.querySelector('#qs-reveal').addEventListener('click', () => revealCard());
      // tap anywhere on card area also reveals
      container.querySelector('.qs-card-area').addEventListener('click', () => revealCard());
    }

    function revealCard() {
      if (revealed) return;
      revealed = true;
      document.getElementById('qs-ans').style.display = 'flex';
      document.getElementById('qs-actions').style.display = 'none';
      document.getElementById('qs-vote').style.display = 'flex';

      document.getElementById('qs-no').addEventListener('click',  () => answer(false));
      document.getElementById('qs-yes').addEventListener('click', () => answer(true));
    }

    function answer(isCorrect) {
      const { word, unit, key, isNew } = queue[idx];
      const elapsed = (Date.now() - tapTime) / 1000;

      // XP calculation
      let earned = 0;
      if (isCorrect) {
        earned += XP.REWARDS.correct;
        if (elapsed < 4) earned += XP.REWARDS.speedBonus;
        if (isNew)       earned += XP.REWARDS.newWord;
        correct++;
      }
      xpEarned += earned;

      // Update XP
      if (earned > 0) XP.addXP(earned);

      // Update SRS card
      _updateCard(key, isCorrect);

      // Update unit progress
      if (isCorrect) XP.markWordMastered(unit.id, word.en);
      else           XP.markWordSeen(unit.id, word.en);

      // Show brief flash feedback then next
      const btn = isCorrect
        ? document.getElementById('qs-yes')
        : document.getElementById('qs-no');
      if (btn) {
        btn.style.opacity = '0.5';
        btn.style.transform = 'scale(.96)';
      }
      if (earned > 0) _showXPPopup(container, earned);

      setTimeout(() => {
        idx++;
        if (idx >= queue.length) {
          _renderEndScreen(container, idx, correct, xpEarned, queue, mode);
        } else {
          showCard();
        }
      }, 380);
    }

    showCard();
  }

  function _showXPPopup(container, xp) {
    const el = document.createElement('div');
    el.className = 'qs-xp-pop';
    el.textContent = `+${xp} XP`;
    container.appendChild(el);
    requestAnimationFrame(() => { el.classList.add('qs-xp-pop--go'); });
    setTimeout(() => el.remove(), 900);
  }

  /* ── End Screen ─────────────────────────────────────────────────────── */
  function _renderEndScreen(container, done, correct, xpEarned, queue, mode) {
    mode = mode || _getMode();
    const isPerfect = correct === queue.length && done === queue.length;
    const bonusXP   = isPerfect ? XP.REWARDS.perfectSession : XP.REWARDS.sessionComplete;
    XP.addXP(bonusXP);
    xpEarned += bonusXP;

    const streak = XP.recordActivity();
    if (streak > 1) XP.addXP(XP.REWARDS.dailyStreak);

    const level   = XP.getLevel();
    const nextLv  = XP.getNextLevel();
    const toNext  = XP.xpToNext();
    const progPct = Math.round(XP.getLevelProgress() * 100);

    const perfMsg = isPerfect
      ? `<div class="qs-end-perf">⚡ ${_ui('Session parfaite !', '¡Sesión perfecta!', mode)}</div>`
      : '';

    container.innerHTML = `
      <div class="qs-end">
        <div class="qs-end-trophy">${isPerfect ? '🏆' : '✨'}</div>
        <div class="qs-end-title">${_ui('Session terminée !', '¡Sesión terminada!', mode)}</div>
        ${perfMsg}

        <div class="qs-end-stats">
          <div class="qs-end-stat">
            <div class="qs-end-n" style="color:#4ade80">${correct}</div>
            <div class="qs-end-l">${_ui('Sus', 'Correctas', mode)}</div>
          </div>
          <div class="qs-end-stat">
            <div class="qs-end-n" style="color:#f87171">${done - correct}</div>
            <div class="qs-end-l">${_ui('Ratés', 'Errores', mode)}</div>
          </div>
          <div class="qs-end-stat">
            <div class="qs-end-n" style="color:#7b9fff">+${xpEarned}</div>
            <div class="qs-end-l">${_ui('XP gagnés', 'XP ganados', mode)}</div>
          </div>
        </div>

        <div class="qs-end-level">
          <div class="qs-end-lv-info">
            <span class="qs-end-lv-name" style="color:${level.color}">${level.name}</span>
            ${nextLv
              ? `<span class="qs-end-lv-next">→ ${nextLv.name} ${_ui(`dans ${toNext} XP`, `faltan ${toNext} XP`, mode)}</span>`
              : `<span class="qs-end-lv-next">🎉 ${_ui('Objectif atteint !', '¡Objetivo alcanzado!', mode)}</span>`}
          </div>
          <div class="qs-end-lvbar"><div class="qs-end-lvfill" style="width:${progPct}%;background:${level.color}"></div></div>
        </div>

        <div class="qs-end-btns">
          <button class="qs-end-again" id="qs-again">▶ ${_ui('Encore une session', 'Otra sesión', mode)}</button>
          <button class="qs-end-home"  id="qs-home">${_ui('Accueil', 'Inicio', mode)}</button>
        </div>
      </div>`;

    container.querySelector('#qs-again').addEventListener('click', () => render(container));
    container.querySelector('#qs-home').addEventListener('click', () => App.showHome());
  }

  /* ── SRS card helpers ───────────────────────────────────────────────── */
  function _loadCard(key) {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  }

  function _updateCard(key, correct) {
    const card = _loadCard(key) || { interval: 1, easeFactor: 2.5, reps: 0 };
    const now  = Date.now();

    if (correct) {
      card.reps++;
      if (card.reps === 1)      card.interval = 1;
      else if (card.reps === 2) card.interval = 4;
      else card.interval = Math.round(card.interval * card.easeFactor);
      card.easeFactor = Math.max(1.3, card.easeFactor + 0.1);
    } else {
      card.reps = 0;
      card.interval = 1;
      card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
    }

    card.nextReview = now + card.interval * 86400000;
    localStorage.setItem(key, JSON.stringify(card));
  }

  function renderForUnit(container, unit) {
    const mode  = _getMode();
    const queue = [];
    for (const word of unit.words) {
      const key  = `qs:${mode}:${unit.id}:${word.en}`;
      const card = _loadCard(key);
      queue.push({ word, unit, key, isNew: !card, card });
    }
    if (!queue.length) { _renderEmpty(container); return; }
    _runSession(container, queue.slice(0, SESSION_SIZE));
  }

  return { render, buildQueue, renderForUnit };
})();

window.QuickSession = QuickSession;
