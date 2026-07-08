/* ===== vocab.js v3 — Production mode + Audio + Raccourcis ===== */
const Vocab = (() => {

  let currentCard = null;
  let currentMode = 'fr-es';
  let revealed    = false;
  let prodAnswered = false;
  let onRate      = null;

  function getWords(mode)  { return mode === 'fr-es' ? window.WORDS_FR_ES  : window.WORDS_ES_FR; }
  function getChunks(mode) { return mode === 'fr-es' ? window.CHUNKS_FR_ES : window.CHUNKS_ES_FR; }
  function srcLang(mode)   { return mode === 'fr-es' ? 'fr' : 'es'; }
  function tgtLang(mode)   { return mode === 'fr-es' ? 'es' : 'fr'; }

  function previewIntervals(srsState) {
    const c = srsState || { interval: 0, easeFactor: 2.5, reps: 0 };
    const good = c.reps === 0 ? 1 : c.reps === 1 ? 6 : Math.round(c.interval * c.easeFactor);
    return {
      again: 1,
      hard:  Math.max(1, Math.round((c.interval || 1) * 0.8)),
      good,
      easy:  c.reps < 2 ? 6 : Math.round(good * 1.3),
    };
  }

  function fmt(days) {
    if (days <= 1) return '1j';
    if (days < 30) return `${days}j`;
    if (days < 365) return `${Math.round(days / 30)}m`;
    return `${Math.round(days / 365)}an`;
  }

  /* ── Rendu principal : reconnaissance vs production ── */
  function render(word, mode) {
    currentCard  = word;
    currentMode  = mode;
    revealed     = false;
    prodAnswered = false;

    const srsState = Storage.getSRSCard(mode, word.id);
    const isChunk  = word.kind === 'chunk';
    // Production mode (typing) for single words with 3+ reps — chunks always stay recognition
    const isProd = !isChunk && srsState && srsState.reps >= 3;

    if (isProd) return renderProduction(word, mode, srsState);
    return renderRecognition(word, mode, srsState);
  }

  /* ── Mode reconnaissance (flip card 3D) ── */
  function renderRecognition(word, mode, srsState) {
    const ivs      = previewIntervals(srsState);
    const isChunk  = word.kind === 'chunk';
    const catLabel = isChunk ? (word.category ? catName(word.category) : 'Expression') : posLabel(word.pos);
    const lvl      = word.level || 'A1';

    setTimeout(() => { if (window.TTS && TTS.isOn()) TTS.speak(word.l1, srcLang(mode)); }, 150);

    return `
<div class="card-scene popIn" id="card-scene">
  <div class="card-3d" id="card-3d">

    <!-- Face avant (question) -->
    <div class="card-face card-face--front">
      <div class="card-badge">
        <span class="badge badge-level-${lvl}">${lvl}</span>
        ${isChunk
          ? `<span class="badge badge-chunk">chunk</span>`
          : `<span class="badge badge-pos">${catLabel}</span>`}
      </div>
      <button class="audio-btn" id="card-audio" title="Écouter (A)">🔊</button>

      ${isChunk
        ? `<p class="card-word-chunk">${esc(word.l1)}</p>
           <p class="text-sm" style="color:var(--text-3);margin-top:0.3rem;">${esc(catLabel)}</p>`
        : `<p class="card-word">${esc(word.l1)}</p>
           <p class="card-pos-label">${catLabel}</p>`
      }
      <div class="card-hint-click"><span>↩</span> ${I18N.t('card.flipHint')} <kbd>Espace</kbd></div>
    </div>

    <!-- Face arrière (réponse) -->
    <div class="card-face card-face--back">
      ${isChunk
        ? `<p class="card-translation-chunk">${esc(word.l2)}</p>`
        : `<p class="card-translation">${esc(word.l2)}</p>`
      }
      ${word.note
        ? `<div class="card-note"><span class="card-ar-flag">🇦🇷</span>${esc(word.note)}</div>`
        : ''}
      ${isChunk ? `<p style="font-size:.75rem;opacity:.65;margin-top:.8rem;color:rgba(255,255,255,.8);">${esc(catLabel)}</p>` : ''}
    </div>

  </div>
</div>

<div class="rating-wrap" id="rating-wrap">
  <p class="rating-label">${I18N.t('card.ratingQuestion')} <span class="kbd-hint">${I18N.t('card.ratingHint')}</span></p>
  <div class="rating-grid">
    <button class="r-btn r-again" data-q="1">${I18N.t('card.again')}<span class="r-int">${fmt(ivs.again)}</span></button>
    <button class="r-btn r-hard"  data-q="3">${I18N.t('card.hard')}<span class="r-int">${fmt(ivs.hard)}</span></button>
    <button class="r-btn r-good"  data-q="4">${I18N.t('card.good')}<span class="r-int">${fmt(ivs.good)}</span></button>
    <button class="r-btn r-easy"  data-q="5">${I18N.t('card.easy')}<span class="r-int">${fmt(ivs.easy)}</span></button>
  </div>
</div>`;
  }

  /* ── Mode production (saisie) ── */
  function renderProduction(word, mode, srsState) {
    const ivs      = previewIntervals(srsState);
    const catLabel = posLabel(word.pos);
    const lvl      = word.level || 'A1';

    setTimeout(() => { if (window.TTS && TTS.isOn()) TTS.speak(word.l1, srcLang(mode)); }, 150);

    return `
<div class="prod-card popIn" id="prod-card">
  <button class="prod-audio-btn" id="prod-audio" title="Écouter (A)">🔊</button>

  <div class="prod-header">
    <span class="badge badge-level-${lvl}">${lvl}</span>
    <span class="badge badge-pos">${catLabel}</span>
    <span class="prod-mode-badge">${I18N.t('card.prodMode')}</span>
  </div>

  <p class="prod-word">${esc(word.l1)}</p>
  <p class="prod-pos">${catLabel}</p>

  <div class="prod-input-row">
    <input class="prod-input" id="prod-input"
           placeholder="${I18N.t('card.prodPlaceholder')}"
           autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
    <button class="btn btn-primary" id="prod-check">${I18N.t('card.checkBtn')}</button>
  </div>

  <div class="prod-feedback" id="prod-fb"></div>

  <div class="rating-wrap" id="rating-wrap">
    <p class="rating-label">${I18N.t('card.ratingQuestion')} <span class="kbd-hint">${I18N.t('card.ratingHint')}</span></p>
    <div class="rating-grid">
      <button class="r-btn r-again" data-q="1">${I18N.t('card.again')}<span class="r-int">${fmt(ivs.again)}</span></button>
      <button class="r-btn r-hard"  data-q="3">${I18N.t('card.hard')}<span class="r-int">${fmt(ivs.hard)}</span></button>
      <button class="r-btn r-good"  data-q="4">${I18N.t('card.good')}<span class="r-int">${fmt(ivs.good)}</span></button>
      <button class="r-btn r-easy"  data-q="5">${I18N.t('card.easy')}<span class="r-int">${fmt(ivs.easy)}</span></button>
    </div>
  </div>
</div>`;
  }

  /* ── Liaison événements ── */
  function bindEvents(container, mode, rateCallback) {
    onRate = rateCallback;

    // ── Mode recognition ──
    const scene    = container.querySelector('#card-3d');
    const cardAudio = container.querySelector('#card-audio');
    if (scene) scene.addEventListener('click', () => flip(container));
    if (cardAudio) {
      cardAudio.addEventListener('click', e => {
        e.stopPropagation();
        if (window.TTS && currentCard) TTS.speak(currentCard.l1, srcLang(mode));
      });
    }

    // ── Mode production ──
    const prodInput = container.querySelector('#prod-input');
    const prodCheck = container.querySelector('#prod-check');
    const prodAudio = container.querySelector('#prod-audio');
    if (prodInput) {
      setTimeout(() => { try { prodInput.focus(); } catch(_) {} }, 80);
      prodInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !prodAnswered) checkProd(container);
      });
    }
    if (prodCheck) prodCheck.addEventListener('click', () => { if (!prodAnswered) checkProd(container); });
    if (prodAudio) {
      prodAudio.addEventListener('click', () => {
        if (window.TTS && currentCard) TTS.speak(currentCard.l1, srcLang(mode));
      });
    }

    // ── Boutons notation ──
    container.querySelectorAll('.r-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = parseInt(btn.dataset.q, 10);
        saveRating(q, mode);
        if (onRate) onRate(q, currentCard);
      });
    });
  }

  /* ── Vérification mode production ── */
  function checkProd(container) {
    if (prodAnswered || !currentCard) return;
    const input    = container.querySelector('#prod-input');
    const fb       = container.querySelector('#prod-fb');
    const checkBtn = container.querySelector('#prod-check');
    if (!input || !fb) return;

    const raw       = input.value.trim();
    const isCorrect = fuzzyMatch(raw, currentCard.l2);
    prodAnswered    = true;

    input.classList.add(isCorrect ? 'correct' : 'wrong');
    input.disabled = true;
    if (checkBtn) checkBtn.style.display = 'none';

    fb.classList.add('show', isCorrect ? 'correct' : 'wrong');
    fb.innerHTML = isCorrect
      ? I18N.t('card.correct', esc(currentCard.l2))
      : I18N.t('card.wrong', esc(currentCard.l2)) + (raw ? I18N.t('card.wrongYou', esc(raw)) : '');

    if (window.TTS && TTS.isOn() && currentCard) {
      setTimeout(() => TTS.speak(currentCard.l2, tgtLang(currentMode)), 350);
    }

    const rw = container.querySelector('#rating-wrap');
    if (rw) rw.classList.add('show');
  }

  /* ── Retournement carte ── */
  function flip(container) {
    if (revealed) return;
    revealed = true;
    const card = container.querySelector('#card-3d');
    if (card) card.classList.add('flipped');
    const rw = container.querySelector('#rating-wrap');
    if (rw) rw.classList.add('show');
    if (window.TTS && TTS.isOn() && currentCard) {
      setTimeout(() => TTS.speak(currentCard.l2, tgtLang(currentMode)), 420);
    }
  }

  /* ── Gestionnaire clavier (appelé par App) ── */
  function handleKey(e, container) {
    if (!container) return false;

    // Production mode
    if (container.querySelector('#prod-card')) {
      if (prodAnswered && ['1','2','3','4'].includes(e.key)) {
        const qs = { '1': 1, '2': 3, '3': 4, '4': 5 };
        const btn = [...container.querySelectorAll('.r-btn')]
          .find(b => parseInt(b.dataset.q) === qs[e.key]);
        if (btn) { btn.click(); return true; }
      }
      if (e.key === 'a' || e.key === 'A') {
        if (window.TTS && currentCard) TTS.speak(currentCard.l1, srcLang(currentMode));
        return true;
      }
      return false;
    }

    // Recognition mode
    if (e.key === ' ') {
      e.preventDefault();
      if (!revealed) { flip(container); return true; }
    }
    if (e.key === 'a' || e.key === 'A') {
      if (window.TTS && currentCard) TTS.speak(currentCard.l1, srcLang(currentMode));
      return true;
    }
    if (revealed && ['1','2','3','4'].includes(e.key)) {
      const qs = { '1': 1, '2': 3, '3': 4, '4': 5 };
      const btn = [...container.querySelectorAll('.r-btn')]
        .find(b => parseInt(b.dataset.q) === qs[e.key]);
      if (btn) { btn.click(); return true; }
    }
    return false;
  }

  /* ── Enregistrement notation SRS ── */
  function saveRating(quality, mode) {
    if (!currentCard) return;
    let state = Storage.getSRSCard(mode, currentCard.id);
    if (!state) state = SRS.newCard(currentCard.id);
    Storage.saveSRSCard(mode, currentCard.id, SRS.sm2(state, quality));
  }

  /* ── Correspondance floue (accents tolérés) ── */
  function fuzzyMatch(input, answer) {
    const norm = s => (s || '').toLowerCase().trim()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
    const ni = norm(input);
    if (!ni) return false;
    const alts = answer.split(/[\/,|]/).map(a => norm(a.trim()));
    return alts.some(a => a === ni);
  }

  /* ── File de session : 60% chunks + 40% mots ── */
  function buildSessionQueue(mode, totalTarget = 28) {
    const words  = getWords(mode);
    const chunks = getChunks(mode) || [];

    const chunkTarget = Math.round(totalTarget * 0.6);
    const wordTarget  = totalTarget - chunkTarget;

    const dueChunks = SRS.getDueCards(chunks, mode).slice(0, Math.round(chunkTarget * 0.7));
    const newChunks  = SRS.getNewCards(chunks, mode, chunkTarget - dueChunks.length);
    const chunkQueue = shuffle([...dueChunks, ...newChunks]);

    const dueWords = SRS.getDueCards(words, mode).slice(0, Math.round(wordTarget * 0.7));
    const newWords  = SRS.getNewCards(words, mode, wordTarget - dueWords.length);
    const wordQueue  = shuffle([...dueWords, ...newWords]);

    return interleave(chunkQueue, wordQueue, 0.6);
  }

  function interleave(primary, secondary, ratio) {
    const result = [];
    let pi = 0, si = 0;
    const total = primary.length + secondary.length;
    while (result.length < total) {
      const usePrimary = pi < primary.length &&
        (si >= secondary.length || Math.random() < ratio);
      if (usePrimary) result.push(primary[pi++]);
      else if (si < secondary.length) result.push(secondary[si++]);
      else break;
    }
    return result;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function catName(cat) {
    const map = {
      'salutations':'Salutations','communication':'Communication',
      'collocation-tener':'Tener + ...','collocation-hacer':'Hacer + ...',
      'collocation-ir':'Ir + ...','collocation-estar':'Estar + ...',
      'vie-quotidienne':'Vie quotidienne','restaurant':'Au restaurant',
      'transport':'Transport','argentin':'Argentin 🇦🇷','travail':'Travail',
      'santé':'Santé','grammaire':'Structure grammaticale',
      'émotions':'Émotions','opinions':'Opinions',
      'connecteurs':'Connecteurs','social':'Social'
    };
    return map[cat] || cat;
  }

  function posLabel(pos) {
    const map = { v:'verbe', n:'nom', adj:'adjectif', adv:'adverbe',
                  prep:'préposition', conj:'conjonction', pron:'pronom', expr:'expression' };
    return map[pos] || pos || '';
  }

  function getCardStats(mode) {
    const all = [...getWords(mode), ...(getChunks(mode) || [])];
    return SRS.getCardStats(all, mode);
  }

  function b1Progress(mode) {
    const all = [...getWords(mode), ...(getChunks(mode) || [])];
    return SRS.b1Progress(all, mode);
  }

  return { render, bindEvents, handleKey, flip, saveRating, buildSessionQueue,
           getWords, getChunks, getCardStats, b1Progress, esc };
})();

window.Vocab = Vocab;
