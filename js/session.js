/* ===== session.js — Flashcards + Fill-in-the-blank SRS ===== */
const Session = (() => {

  let state = null;
  // { queue, mode, idx, requeued, rated, stats, onDone }

  // style: 'auto' | 'flashcard' | 'exercise'
  function start(queue, mode, container, onDone, style = 'auto') {
    if (!queue.length) { onDone && onDone(); return; }
    state = {
      queue:    [...queue],
      mode,     style,
      idx:      0,
      requeued: new Set(),
      rated:    new Set(),
      stats:    { newSeen: 0, reviewed: 0, correct: 0 },
      onDone
    };
    renderCard(container);
  }

  // ── Progress header ───────────────────────────────────────────────
  function updateHeader() {
    if (!state) return;
    const hdr = document.getElementById('session-header');
    if (!hdr) return;
    const { idx, queue } = state;
    const displayed = Math.min(idx, queue.length);
    const pct = Math.round((displayed / queue.length) * 100);
    hdr.innerHTML = `
      <div class="sess-bar">
        <div class="sess-prog"><div class="sess-prog-fill" style="width:${pct}%"></div></div>
        <span class="sess-cnt">${displayed}/${queue.length}</span>
        <button class="sess-quit" id="sess-quit" title="Quitter">✕</button>
      </div>`;
    document.getElementById('sess-quit').addEventListener('click', () => {
      if (state) { state.onDone && state.onDone(); state = null; }
      else if (window.App) App.showHome();
    });
  }

  // ── Route selon style ─────────────────────────────────────────────
  function renderCard(container) {
    if (!state) return;
    if (state.idx >= state.queue.length) { renderEnd(container); return; }
    updateHeader();

    const card    = state.queue[state.idx];
    const srsCard = Storage.getSRSCard(state.mode, card.id);

    // Grammar drills always use fill-in (production required — DeKeyser 2007)
    if (card.kind === 'grammar') {
      renderFillIn(container, card);
    } else if (state.style === 'flashcard') {
      renderFlashcard(container, card, srsCard);
    } else if (state.style === 'exercise') {
      renderFillIn(container, card);
    } else {
      // auto: new → flashcard, reviewed → fill-in
      const isNew = !srsCard || srsCard.reps === 0;
      if (isNew) renderFlashcard(container, card, srsCard);
      else       renderFillIn(container, card);
    }
  }

  // ── Flashcard ─────────────────────────────────────────────────────
  function renderFlashcard(container, card, srsCard) {
    const srcCode  = state.mode === 'fr-es' ? 'fr' : 'es';
    const srcFlag  = srcCode === 'fr' ? '🇫🇷' : '🇦🇷';
    const isNew    = !srsCard;
    const badge    = isNew ? I18N.t('sess.new') : I18N.t('sess.review');
    const badgeCls = isNew ? 'badge-new' : 'badge-rev';

    container.innerHTML = `
      <div class="fc popIn" id="fc-front">
        <span class="fc-badge ${badgeCls}">${badge}</span>
        <div class="fc-src">
          <span class="fc-flag">${srcFlag}</span>
          <p class="fc-phrase">${esc(card.l1)}</p>
        </div>
        <button class="btn btn-outline btn-reveal" id="fc-reveal">
          👁 ${I18N.t('sess.reveal')}
        </button>
      </div>`;

    if (window.TTS) setTimeout(() => TTS.speak(card.l1, srcCode), 300);

    // Reveal on button OR anywhere on card body
    const fc = container.querySelector('#fc-front');
    container.querySelector('#fc-reveal').addEventListener('click', e => {
      e.stopPropagation();
      revealFlashcard(container, card);
    });
    fc.addEventListener('click', () => revealFlashcard(container, card));
  }

  function revealFlashcard(container, card) {
    if (!state) return;
    if (container.querySelector('.fc-tgt')) return; // guard double-reveal

    const tgtCode = state.mode === 'fr-es' ? 'es' : 'fr';
    const tgtFlag = tgtCode === 'es' ? '🇦🇷' : '🇫🇷';
    const fc = container.querySelector('#fc-front');
    if (!fc) return;

    const revealBtn = container.querySelector('#fc-reveal');
    if (revealBtn) revealBtn.style.display = 'none';

    const back = document.createElement('div');
    back.className = 'fc-back popIn';
    back.innerHTML = `
      <div class="fc-tgt">
        <span class="fc-flag">${tgtFlag}</span>
        <p class="fc-phrase tgt">${esc(card.l2)}</p>
        <button class="fc-audio" data-text="${esc(card.l2)}" data-lang="${tgtCode}">🔊</button>
      </div>
      <div class="fc-rating">
        <button class="btn-rate again" id="fc-again">${I18N.t('sess.again')}</button>
        <button class="btn-rate hard"  id="fc-hard">${I18N.t('sess.hard')}</button>
        <button class="btn-rate easy"  id="fc-easy">${I18N.t('sess.easy')}</button>
      </div>`;
    fc.appendChild(back);

    if (window.TTS) TTS.speak(card.l2, tgtCode);

    back.querySelector('.fc-audio').addEventListener('click', e => {
      e.stopPropagation();
      if (window.TTS) TTS.speak(card.l2, tgtCode);
    });
    back.querySelector('#fc-again').addEventListener('click', e => { e.stopPropagation(); rate(container, card, 1); });
    back.querySelector('#fc-hard').addEventListener('click',  e => { e.stopPropagation(); rate(container, card, 3); });
    back.querySelector('#fc-easy').addEventListener('click',  e => { e.stopPropagation(); rate(container, card, 5); });
  }

  // ── Fill-in-the-blank ─────────────────────────────────────────────
  function renderFillIn(container, card) {
    const srcCode = state.mode === 'fr-es' ? 'fr' : 'es';
    const tgtCode = state.mode === 'fr-es' ? 'es' : 'fr';
    const srcFlag = srcCode === 'fr' ? '🇫🇷' : '🇦🇷';
    const tgtFlag = tgtCode === 'es' ? '🇦🇷' : '🇫🇷';

    const isGrammar = card.kind === 'grammar';
    const fillBadge    = isGrammar ? I18N.t('sess.grammar') : I18N.t('sess.review');
    const fillBadgeCls = isGrammar ? 'badge-grammar' : 'badge-rev';

    // Richer render for verb conjugation exercises (have tenseLabel from verbs.js)
    const isConjEx = isGrammar && card.tenseLabel;
    let topHtml;
    if (isConjEx) {
      const tgtLangName = tgtCode === 'es' ? 'Espagnol argentin' : 'Français';
      const xref        = tgtCode === 'es' ? esc(card.verbFr || '') : esc(card.verbEs || '');
      topHtml = `
        <div class="conj-sess-top">
          <span class="conj-sess-pill">${tgtFlag} ${esc(tgtLangName)} · ${esc(card.tenseLabel)}</span>
        </div>
        <div class="conj-sess-verb">
          <strong>${esc(card.verb)}</strong>${xref ? ` <span class="conj-sess-eq">= ${xref}</span>` : ''}
        </div>
        <div class="conj-sess-prompt">
          <span class="conj-subj">${esc(card.subject || '')}</span> <span class="conj-blank">___</span>
        </div>`;
    } else {
      topHtml = `
        <div class="fc-src">
          <span class="fc-flag">${srcFlag}</span>
          <p class="fc-phrase">${esc(card.l1)}</p>
        </div>`;
    }

    container.innerHTML = `
      <div class="fc popIn" id="fc-fill">
        <span class="fc-badge ${fillBadgeCls}">${fillBadge}</span>
        ${topHtml}
        <div class="fc-fill-area">
          <span class="fc-fill-flag">${tgtFlag}</span>
          <div class="fc-input-row">
            <input
              type="text"
              id="fc-input"
              class="fc-input"
              inputmode="text"
              placeholder="${I18N.t('sess.fillPlaceholder')}"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
            <button class="btn btn-primary fc-check-btn" id="fc-check">→</button>
          </div>
        </div>
        ${isConjEx && card.hint ? `<p class="conj-sess-hint">${esc(card.hint)}</p>` : ''}
        <button class="btn btn-ghost btn-sm fc-skip" id="fc-skip">${I18N.t('sess.seeAnswer')}</button>
      </div>`;

    const input    = container.querySelector('#fc-input');
    const checkBtn = container.querySelector('#fc-check');
    const skipBtn  = container.querySelector('#fc-skip');

    if (!isGrammar && window.TTS) setTimeout(() => TTS.speak(card.l1, srcCode), 300);

    // Focus + scroll into view (handles iOS keyboard push)
    setTimeout(() => {
      try {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch(_) {}
    }, 80);
    input.addEventListener('focus', () => {
      setTimeout(() => input.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
    });

    const submit = () => {
      const val = input.value.trim();
      if (!val) return;
      revealFillIn(container, card, val, tgtFlag, tgtCode);
    };

    checkBtn.addEventListener('click', submit);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    skipBtn.addEventListener('click', () => revealFillIn(container, card, '', tgtFlag, tgtCode));
  }

  function revealFillIn(container, card, userAnswer, tgtFlag, tgtCode) {
    if (!state) return;
    const correct = !!userAnswer && isClose(userAnswer, card.l2);
    const near    = !correct && !!userAnswer && isClose(userAnswer, card.l2, 4);
    const fc      = container.querySelector('#fc-fill');
    if (!fc) return;

    // Remove input widgets
    const fillArea = fc.querySelector('.fc-fill-area');
    const skipBtn  = fc.querySelector('.fc-skip');
    if (fillArea) fillArea.remove();
    if (skipBtn)  skipBtn.remove();

    if (window.TTS) TTS.speak(card.l2, tgtCode);

    const result = document.createElement('div');
    result.className = `fc-fill-result popIn ${correct ? 'correct' : near ? 'near' : 'wrong'}`;
    result.innerHTML = `
      <div class="fc-result-row">
        <span class="fc-result-icon">${correct ? '✅' : near ? '〜' : '❌'}</span>
        <div class="fc-result-texts">
          ${userAnswer && !correct ? `<p class="fc-result-yours">${esc(userAnswer)}</p>` : ''}
          <p class="fc-result-answer">${esc(card.l2)}
            <button class="fc-audio" data-text="${esc(card.l2)}" data-lang="${tgtCode}">🔊</button>
          </p>
        </div>
      </div>
      <div class="fc-rating">
        <button class="btn-rate again" id="fc-again">${I18N.t('sess.again')}</button>
        <button class="btn-rate hard"  id="fc-hard">${I18N.t('sess.hard')}</button>
        <button class="btn-rate easy${correct ? ' auto-good' : ''}"  id="fc-easy">${I18N.t('sess.easy')}</button>
      </div>`;
    fc.appendChild(result);

    result.querySelector('.fc-audio').addEventListener('click', e => {
      e.stopPropagation();
      if (window.TTS) TTS.speak(card.l2, tgtCode);
    });

    // Auto-advance after 1.4s on correct answer — timer is cancellable by manual click
    const autoTimer = correct
      ? setTimeout(() => { if (state) rate(container, card, 5); }, 1400)
      : null;

    result.querySelector('#fc-again').addEventListener('click', e => {
      clearTimeout(autoTimer);
      e.stopPropagation();
      rate(container, card, 1);
    });
    result.querySelector('#fc-hard').addEventListener('click', e => {
      clearTimeout(autoTimer);
      e.stopPropagation();
      rate(container, card, 3);
    });
    result.querySelector('#fc-easy').addEventListener('click', e => {
      clearTimeout(autoTimer);
      e.stopPropagation();
      rate(container, card, 5);
    });
  }

  // ── Rate & advance ────────────────────────────────────────────────
  // quality: 1=again, 3=hard, 5=easy  (SM-2 scale)
  function rate(container, card, quality) {
    if (!state) return;
    const correct = quality >= 3;

    const existing = Storage.getSRSCard(state.mode, card.id);
    const wasNew   = !existing || existing.reps === 0;
    const updated  = SRS.sm2(existing || SRS.newCard(card.id), quality);
    Storage.saveSRSCard(state.mode, card.id, updated);

    // Count each card once even if re-queued
    if (!state.rated.has(card.id)) {
      state.rated.add(card.id);
      if (wasNew) state.stats.newSeen++;
      else        state.stats.reviewed++;
      if (correct) state.stats.correct++;
    }

    if (!correct && !state.requeued.has(card.id)) {
      state.requeued.add(card.id);
      const at = Math.min(state.idx + 1 + 3, state.queue.length);
      state.queue.splice(at, 0, card);
    }

    state.idx++;
    container.innerHTML = '';
    setTimeout(() => renderCard(container), 120);
  }

  // ── End screen ───────────────────────────────────────────────────
  function renderEnd(container) {
    const { stats, onDone, mode } = state;
    state = null;

    const hdr = document.getElementById('session-header');
    if (hdr) hdr.innerHTML = '';

    const lang  = mode === 'fr-es' ? 'fr' : 'es';
    const total = stats.newSeen + stats.reviewed;
    const pct   = total > 0 ? Math.round((stats.correct / total) * 100) : 100;

    const MSG = {
      fr: {
        high: { title: 'Excellent travail.',  sub: 'Tes acquis d\'aujourd\'hui s\'ancrent pendant ton sommeil. Continue demain pour consolider.' },
        mid:  { title: 'Bien joué !',          sub: 'Les cartes manquées reviendront dans quelques jours — c\'est exactement le principe de la répétition espacée. Pas de pression.' },
        low:  { title: 'Bonne session.',       sub: 'Les erreurs sont normales, elles indiquent ce que ton cerveau n\'a pas encore ancré. Ces cartes reviendront plus souvent, et ça rentrera.' },
      },
      es: {
        high: { title: 'Excelente trabajo.',  sub: 'Lo que aprendiste hoy se consolida mientras dormís. Volvé mañana para seguir.' },
        mid:  { title: '¡Muy bien!',           sub: 'Las tarjetas que fallaste volverán en unos días — así funciona la repetición espaciada. Sin presión.' },
        low:  { title: 'Buena sesión.',        sub: 'Los errores son normales, muestran lo que el cerebro todavía no afianzó. Esas tarjetas volverán seguido y va a quedar.' },
      },
    };

    const tier = pct >= 75 ? 'high' : pct >= 50 ? 'mid' : 'low';
    const { title, sub } = MSG[lang][tier];
    const pctCls = pct >= 75 ? 'good' : pct >= 50 ? 'mid' : 'low';

    const L = {
      nouvelles:  lang === 'fr' ? 'nouvelles' : 'nuevas',
      revisees:   lang === 'fr' ? 'révisées'  : 'repasadas',
      correct:    lang === 'fr' ? 'correct'   : 'correcto',
      retour:     lang === 'fr' ? 'Retour'    : 'Volver',
    };

    container.innerHTML = `
      <div class="se-wrap popIn">
        <div class="se-check">✓</div>
        <h2 class="se-title">${title}</h2>
        <div class="se-stats">
          ${stats.newSeen  > 0 ? `<div class="se-stat"><span class="se-n">${stats.newSeen}</span><span class="se-l">${L.nouvelles}</span></div>` : ''}
          ${stats.reviewed > 0 ? `<div class="se-stat"><span class="se-n">${stats.reviewed}</span><span class="se-l">${L.revisees}</span></div>` : ''}
          <div class="se-stat"><span class="se-n se-pct--${pctCls}">${pct}%</span><span class="se-l">${L.correct}</span></div>
        </div>
        <p class="se-message">${sub}</p>
        <button class="btn btn-primary se-btn" id="sess-home">${L.retour}</button>
      </div>`;

    document.getElementById('sess-home').addEventListener('click', () => { if (onDone) onDone(); });
  }

  // ── Fuzzy matching ────────────────────────────────────────────────
  function normalize(s) {
    return s.toLowerCase().trim()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[.,!?¿¡;:'"«»]/g, '')
      .replace(/\s+/g, ' ');
  }

  function editDistance(a, b) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 5) return 99;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
      Array.from({ length: n + 1 }, (_, j) => i || j)
    );
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  function isClose(input, answer, tolerance = 2) {
    const a = normalize(input), b = normalize(answer);
    if (a === b) return true;
    if (b.length > 20 && b.startsWith(a) && a.length >= b.length * 0.7) return true;
    return editDistance(a, b) <= tolerance;
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { start };
})();
window.Session = Session;
