/* ===== lesson-engine.js — 6 exercise card types (direction-aware) ===== */
/*
  mode 'fr-es' : natif = FR, cible = ES  (francophone apprend l'espagnol)
  mode 'es-fr' : natif = ES, cible = FR  (hispanophone apprend le français)
*/

const LessonEngine = (() => {

  /* ── Mode helpers ───────────────────────────────────────────────── */
  function _isEsMode(mode) { return mode === 'es-fr'; }

  function _native(word, mode) {
    return _isEsMode(mode) ? (word.esTarget || word.es) : word.fr;
  }
  function _target(word, mode) {
    return _isEsMode(mode) ? word.fr : (word.esTarget || word.es);
  }
  function _nativeEx(word, mode) {
    return _isEsMode(mode) ? word.example?.es : word.example?.fr;
  }
  function _targetEx(word, mode) {
    return _isEsMode(mode) ? word.example?.fr : word.example?.es;
  }
  function _nativeFlag(mode)  { return _isEsMode(mode) ? '🇦🇷' : '🇫🇷'; }
  function _targetFlag(mode)  { return _isEsMode(mode) ? '🇫🇷' : '🇦🇷'; }

  /* ── Generic helpers ────────────────────────────────────────────── */
  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function _pick(arr, n) { return _shuffle(arr).slice(0, n); }

  /* Wrong options in the NATIVE language (for meaning-mc) */
  function _distractorsNative(unit, word, mode) {
    if (_isEsMode(mode)) {
      // Native = ES — pick other ES words that aren't the target
      return unit.words
        .filter(w => w !== word)
        .map(w => w.esTarget || w.es)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - .5);
    } else {
      // Native = FR — pick other FR words
      return unit.words
        .filter(w => w !== word)
        .map(w => w.fr)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - .5);
    }
  }

  /* Wrong options in the TARGET language (for gap-fill / translate-mc) */
  function _distractorsTarget(unit, word, mode) {
    if (_isEsMode(mode)) {
      // Target = FR — pick other FR words
      return unit.words
        .filter(w => w !== word)
        .map(w => w.fr)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - .5);
    } else {
      // Target = ES — pick other ES words
      return unit.words
        .filter(w => w !== word)
        .map(w => w.esTarget || w.es)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort(() => Math.random() - .5);
    }
  }

  /* Wrong full-sentence distractors (for translate-mc) */
  function _distractorSentences(unit, word, mode) {
    return unit.words
      .filter(w => w !== word && w.example)
      .map(w => _targetEx(w, mode))
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(() => Math.random() - .5);
  }

  function _highlight(sentence, word) {
    if (!word || !sentence) return sentence || '';
    const re = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');
    return sentence.replace(re, '<span class="le-highlight">$1</span>');
  }

  /* ══════════════════════════════════════════════════════════════════
     1. DIALOGUE CARD
  ══════════════════════════════════════════════════════════════════ */
  function renderDialogue(container, unit, onDone, mode) {
    const d = unit.dialogue;
    if (!d || !d.lines) { onDone(); return; }

    // Pick cultural note in the right language
    const esOverrides = window.CURRICULUM_B1_ES && window.CURRICULUM_B1_ES[unit.id];
    const note = (_isEsMode(mode) && esOverrides?.dialogueNote)
      ? esOverrides.dialogueNote
      : d.note;

    const btnNext     = _isEsMode(mode) ? 'Siguiente →'      : 'Suite →';
    const btnNote     = _isEsMode(mode) ? 'Nota cultural →'  : 'Note culturelle →';
    const btnContinue = _isEsMode(mode) ? 'Continuar →'      : 'Continuer →';
    const btnTrad     = _isEsMode(mode) ? 'Ver traducción'   : 'Voir la traduction';

    // target = what you're learning; native = your language
    function _targetLine(line) { return _isEsMode(mode) ? line.fr : line.es; }
    function _nativeLine(line) { return _isEsMode(mode) ? line.es : line.fr; }
    const tgtFlag = _isEsMode(mode) ? '🇫🇷' : '🇦🇷';
    const natFlag = _isEsMode(mode) ? '🇦🇷' : '🇫🇷';

    // History bubble: show target prominently + native as muted subtitle (already seen)
    function _histBubble(line, i) {
      const side = i%2===0 ? 'le-bubble--left' : 'le-bubble--right';
      return `
        <div class="le-bubble le-bubble--prev ${side}">
          <div class="le-bubble-target"><span class="le-bubble-flag">${tgtFlag}</span>${_targetLine(line)}</div>
          <div class="le-bubble-native">${natFlag} ${_nativeLine(line)}</div>
        </div>`;
    }

    // Active bubble: target language ONLY — translation hidden behind a tap
    function _activeBubble(line, i) {
      const side = i%2===0 ? 'le-bubble--left' : 'le-bubble--right';
      return `
        <div class="le-bubble le-bubble--active ${side}">
          <div class="le-bubble-target"><span class="le-bubble-flag">${tgtFlag}</span>${_targetLine(line)}</div>
          <button class="le-bubble-trad-btn" id="le-trad-btn">${btnTrad}</button>
          <div class="le-bubble-native" id="le-bubble-nat" style="display:none">${natFlag} ${_nativeLine(line)}</div>
        </div>`;
    }

    let lineIdx = 0;

    function show() {
      if (lineIdx >= d.lines.length) {
        container.innerHTML = `
          <div class="le-card le-card--note">
            <div class="le-note-icon">💡</div>
            <div class="le-note-text">${note}</div>
            <button class="le-next-btn" id="le-next">${btnContinue}</button>
          </div>`;
        container.querySelector('#le-next').addEventListener('click', onDone);
        return;
      }

      const line = d.lines[lineIdx];
      if (window.TTS) TTS.speak(_targetLine(line), _isEsMode(mode) ? 'fr' : 'es');
      const bubbles = d.lines.slice(0, lineIdx).map(_histBubble).join('');

      container.innerHTML = `
        <div class="le-card le-card--dialogue">
          <div class="le-dial-label">📖 ${unit.icon} ${unit.name}</div>
          <div class="le-dial-history">${bubbles}</div>
          ${_activeBubble(line, lineIdx)}
          <button class="le-next-btn" id="le-next">
            ${lineIdx < d.lines.length - 1 ? btnNext : btnNote}
          </button>
        </div>`;

      container.querySelector('#le-trad-btn').addEventListener('click', function() {
        document.getElementById('le-bubble-nat').style.display = 'block';
        this.style.display = 'none';
      });
      container.querySelector('#le-next').addEventListener('click', () => { lineIdx++; show(); });
    }

    show();
  }

  /* ══════════════════════════════════════════════════════════════════
     2. MEANING-MC CARD
     Sentence in TARGET language with word highlighted → pick NATIVE meaning.
  ══════════════════════════════════════════════════════════════════ */
  function renderMeaningMC(container, unit, word, onDone, mode) {
    const ex = word.example;
    if (!ex) { onDone(false); return; }

    const correct    = _native(word, mode);
    const targetWord = _target(word, mode);
    const sentence   = _isEsMode(mode) ? ex.fr : ex.es;
    const hintSent   = _isEsMode(mode) ? ex.es : ex.fr;
    const highlighted = _highlight(sentence, _isEsMode(mode) ? word.fr : (word.esTarget || word.es));

    const wrongs = _distractorsNative(unit, word, mode);
    if (wrongs.length < 2) { onDone(false); return; }

    const options = _shuffle([correct, ..._pick(wrongs, Math.min(3, wrongs.length))]);
    const label = _isEsMode(mode)
      ? '🇫🇷 ¿Qué significa esta palabra?'
      : '🇦🇷 Que signifie ce mot ?';

    // Blank out the answer word in the hint sentence so it gives context without revealing the answer
    const re = new RegExp(correct.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const hintBlanked = hintSent.replace(re, '…');

    container.innerHTML = `
      <div class="le-card le-card--mc">
        <div class="le-mc-type">${label}</div>
        <div class="le-mc-sentence">${highlighted}</div>
        <div class="le-mc-hint">${_nativeFlag(mode)} ${hintBlanked}</div>
        <div class="le-mc-options" id="le-opts">
          ${options.map((o, i) => `<button class="le-opt" data-i="${i}">${o}</button>`).join('')}
        </div>
      </div>`;

    if (window.TTS) TTS.speak(sentence, _isEsMode(mode) ? 'fr' : 'es');

    let answered = false;
    container.querySelectorAll('.le-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const isCorrect = btn.textContent.trim() === correct;
        _flashOption(btn, isCorrect, container.querySelectorAll('.le-opt'), correct);
        setTimeout(() => onDone(isCorrect), 900);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     3. GAP-FILL-MC CARD
     NATIVE sentence shown as hint. TARGET sentence with blank → pick word.
  ══════════════════════════════════════════════════════════════════ */
  function renderGapFill(container, unit, word, onDone, mode) {
    const ex = word.example;
    if (!ex) { onDone(false); return; }

    const targetWord   = _target(word, mode);
    const targetSent   = _targetEx(word, mode);
    const nativeSent   = _nativeEx(word, mode);

    if (!targetSent || !nativeSent) { onDone(false); return; }

    const blanked = targetSent.replace(new RegExp(targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '___');
    if (blanked === targetSent) { renderTranslateMC(container, unit, word, onDone, mode); return; }

    const wrongs = _distractorsTarget(unit, word, mode);
    if (wrongs.length < 2) { onDone(false); return; }

    const options = _shuffle([targetWord, ..._pick(wrongs, Math.min(3, wrongs.length))]);
    const label = _isEsMode(mode) ? '🇫🇷 Completá la frase' : '🇦🇷 Complète la phrase';

    container.innerHTML = `
      <div class="le-card le-card--mc">
        <div class="le-mc-type">${label}</div>
        <div class="le-mc-hint">${_nativeFlag(mode)} ${nativeSent}</div>
        <div class="le-mc-sentence">${blanked}</div>
        <div class="le-mc-options" id="le-opts">
          ${options.map((o, i) => `<button class="le-opt" data-i="${i}">${o}</button>`).join('')}
        </div>
      </div>`;

    let answered = false;
    container.querySelectorAll('.le-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const isCorrect = btn.textContent.trim() === targetWord;
        _flashOption(btn, isCorrect, container.querySelectorAll('.le-opt'), targetWord);
        setTimeout(() => onDone(isCorrect), 900);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     4. TRANSLATE-MC CARD
     Show NATIVE sentence → pick correct TARGET sentence.
  ══════════════════════════════════════════════════════════════════ */
  function renderTranslateMC(container, unit, word, onDone, mode) {
    const ex = word.example;
    if (!ex) { onDone(false); return; }

    const correct   = _targetEx(word, mode);
    const nativeSent = _nativeEx(word, mode);
    if (!correct || !nativeSent) { onDone(false); return; }

    const wrongs = _distractorSentences(unit, word, mode);
    if (wrongs.length < 1) { onDone(false); return; }

    const options = _shuffle([correct, ..._pick(wrongs, Math.min(3, wrongs.length))]);
    const label = _isEsMode(mode) ? '🇦🇷→🇫🇷 Traducí la oración' : '🇫🇷→🇦🇷 Traduis la phrase';

    container.innerHTML = `
      <div class="le-card le-card--mc">
        <div class="le-mc-type">${label}</div>
        <div class="le-mc-sentence">${nativeSent}</div>
        <div class="le-mc-options le-mc-options--tall" id="le-opts">
          ${options.map((o, i) => `<button class="le-opt le-opt--long" data-i="${i}">${o}</button>`).join('')}
        </div>
      </div>`;

    let answered = false;
    container.querySelectorAll('.le-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const isCorrect = btn.textContent.trim() === correct;
        _flashOption(btn, isCorrect, container.querySelectorAll('.le-opt'), correct);
        setTimeout(() => onDone(isCorrect), 900);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     5. GRAMMAR-MC CARD
     Note + question in the learner's native language.
  ══════════════════════════════════════════════════════════════════ */
  function renderGrammarMC(container, unit, onDone, mode) {
    const g = unit.grammar;
    if (!g || !g.question) { onDone(false); return; }

    const esOv = window.CURRICULUM_B1_ES && window.CURRICULUM_B1_ES[unit.id];
    const note       = (_isEsMode(mode) && esOv?.grammarNote) ? esOv.grammarNote : g.note;
    const question   = (_isEsMode(mode) && esOv?.question)    ? esOv.question    : g.question;
    const rawOptions = (_isEsMode(mode) && esOv?.options)     ? esOv.options     : g.options;
    const correctText = rawOptions[g.answer];
    const options    = _shuffle([...rawOptions]);

    container.innerHTML = `
      <div class="le-card le-card--grammar">
        <div class="le-gram-badge">📐 ${_isEsMode(mode) ? 'Gramática' : 'Grammaire'}</div>
        ${!_isEsMode(mode) && g.title ? `<div class="le-gram-title">${g.title}</div>` : ''}
        <div class="le-gram-note">${note}</div>
        ${g.examples ? g.examples.map(ex => {
          const isEs = _isEsMode(mode);
          const tgt = isEs ? `🇫🇷 ${ex.fr}` : `🇦🇷 ${ex.es}`;
          const nat = isEs ? `🇦🇷 ${ex.es}` : `🇫🇷 ${ex.fr}`;
          return `<div class="le-gram-ex">
            <span class="le-gram-tgt">${tgt}</span>
            <span class="le-gram-nat">${nat}</span>
          </div>`;
        }).join('') : ''}
        <div class="le-gram-q">${question}</div>
        <div class="le-mc-options" id="le-opts">
          ${options.map(o => `<button class="le-opt">${o}</button>`).join('')}
        </div>
      </div>`;

    let answered = false;
    container.querySelectorAll('.le-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const isCorrect = btn.textContent.trim() === correctText;
        _flashOption(btn, isCorrect, container.querySelectorAll('.le-opt'), correctText);
        setTimeout(() => onDone(isCorrect), 900);
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     6. SELF-ASSESS CARD (SRS flashcard)
     EN word → reveal NATIVE + TARGET. Native emphasized, target is what to learn.
  ══════════════════════════════════════════════════════════════════ */
  function renderSelfAssess(container, word, onDone, mode) {
    const nativeVal  = _native(word, mode);
    const targetVal  = _target(word, mode);
    const nativeFlag = _nativeFlag(mode);
    const targetFlag = _targetFlag(mode);
    const exSent     = _targetEx(word, mode);

    const assessLabel  = _isEsMode(mode) ? `${targetFlag} ¿Traducción al francés?`  : `${targetFlag} Traduction espagnole ?`;
    const revealLabel  = _isEsMode(mode) ? 'Revelar →'  : 'Révéler →';
    const btnNo        = _isEsMode(mode) ? '✗ Error'    : '✗ Raté';
    const btnYes       = _isEsMode(mode) ? '✓ ¡Sabía!'  : '✓ Su !';

    container.innerHTML = `
      <div class="le-card le-card--assess">
        <div class="le-assess-lang">${assessLabel}</div>
        <div class="le-assess-word">${nativeVal}</div>
        <div class="le-assess-hint">${word.en}</div>
        <div class="le-assess-ans" id="le-ans" style="display:none">
          <div class="le-assess-divider"></div>
          <div class="le-assess-row le-assess-row--target"><span class="le-assess-flag">${targetFlag}</span><span>${targetVal}</span></div>
          ${exSent ? `<div class="le-assess-ex">${targetFlag} "${exSent}"</div>` : ''}
        </div>
        <div id="le-reveal-wrap">
          <button class="le-reveal-btn" id="le-reveal">${revealLabel}</button>
        </div>
        <div class="le-assess-vote" id="le-vote" style="display:none">
          <button class="le-vote-no"  id="le-no">${btnNo}</button>
          <button class="le-vote-yes" id="le-yes">${btnYes}</button>
        </div>
      </div>`;

    let revealed = false;
    let answered = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      if (window.TTS) TTS.speak(targetVal, _isEsMode(mode) ? 'fr' : 'es');
      document.getElementById('le-ans').style.display = 'block';
      document.getElementById('le-reveal-wrap').style.display = 'none';
      document.getElementById('le-vote').style.display = 'flex';
      document.getElementById('le-no').addEventListener('click',  () => { if (answered) return; answered = true; onDone(false); });
      document.getElementById('le-yes').addEventListener('click', () => { if (answered) return; answered = true; onDone(true); });
    }

    container.querySelector('#le-reveal').addEventListener('click', reveal);
    container.querySelector('.le-assess-word').addEventListener('click', reveal);
  }

  /* ── Option flash feedback ──────────────────────────────────────── */
  function _flashOption(chosen, isCorrect, allBtns, correctText) {
    allBtns.forEach(b => {
      b.disabled = true;
      if (b.textContent.trim() === correctText) b.classList.add('le-opt--correct');
    });
    if (!isCorrect) chosen.classList.add('le-opt--wrong');
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  return { renderDialogue, renderMeaningMC, renderGapFill, renderTranslateMC, renderGrammarMC, renderSelfAssess };

})();

window.LessonEngine = LessonEngine;
