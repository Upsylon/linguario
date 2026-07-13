/* ===== vocab-practice.js — Drill SRS pour le Lexique ===== */
/*
  Statuts par mot (clés voc:mode:uid:en) :
    new      → jamais vu
    learning → a commis des erreurs (ou vu une seule fois correctement)
    known    → 2 réponses correctes consécutives

  Si faux à n'importe quel moment → retour à 'learning', streak = 0.

  Composition de session (10 mots), PROBABILISTE PAR CATÉGORIE :
    Slot 1-10 : pour chaque slot, on choisit d'abord la catégorie par dé :
      - P=65% → piocher dans 'learning' (faux)   — fallback : known, puis new
      - P=30% → piocher dans 'known'   (correct) — fallback : learning, puis new
      - P=5%  → piocher dans 'new'     (jamais vu) — fallback : learning, puis known
    Ce procédé maintient les ratios même si le pool est déséquilibré
    (ex. : 200 mots appris, 0 faux → les 65% tombent sur 'known' ou 'new').

  Pool de mots : global (tous les thèmes) ou restreint à une unité.
  Repasses intra-session : jusqu'à 2 passes pour les mots manqués.
*/
const VocabPractice = (() => {

  /* ── Storage ──────────────────────────────────────────────────────── */
  function _k(mode, uid, en) { return `voc:${mode}:${uid}:${en}`; }
  function _load(k)           { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }
  function _save(k, v)        { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

  function _getStatus(mode, uid, en) {
    const d = _load(_k(mode, uid, en));
    return d ? (d.status || 'new') : 'new';
  }

  function _markResult(mode, word, isCorrect) {
    const uid = word._uid;
    const k   = _k(mode, uid, word.en);
    const d   = _load(k) || { status: 'new', streak: 0, wrongCount: 0 };
    if (isCorrect) {
      d.streak = (d.streak || 0) + 1;
      if      (d.status === 'new')                       d.status = 'learning';
      else if (d.status === 'learning' && d.streak >= 2) d.status = 'known';
      // known + correct → stays known
    } else {
      d.status    = 'learning';
      d.streak    = 0;
      d.wrongCount = (d.wrongCount || 0) + 1;
    }
    d.lastSeen = Date.now();
    _save(k, d);
    // Synchronise la progression unité (barre Lexique/Parcours)
    if (window.XP) {
      XP.markWordSeen(uid, word.en);
      if (d.status === 'known') XP.markWordMastered(uid, word.en);
    }
  }

  /* ── Session builder ─────────────────────────────────────────────── */
  /*
    unitOrNull : unit object si pratique par thème, null si session globale.
    Chaque mot du pool porte ._uid (identifiant d'unité) pour le stockage.
  */
  function _buildSession(unitOrNull, mode) {
    const TARGET   = 10;
    const allUnits = window.CURRICULUM_B1 || [];

    // Pool source : unité seule ou toutes les unités
    const source = unitOrNull
      ? unitOrNull.words.map(w => ({ ...w, _uid: unitOrNull.id }))
      : allUnits.flatMap(u => u.words.map(w => ({ ...w, _uid: u.id })));

    if (!source.length) return [];

    // Répartir dans 3 catégories, chacune mélangée
    const catMap = { learning: [], known: [], new: [] };
    for (const w of source) {
      const s = _getStatus(mode, w._uid, w.en);
      catMap[s === 'learning' ? 'learning' : s === 'known' ? 'known' : 'new'].push(w);
    }
    const pools = {
      learning: _shuffle(catMap.learning),
      known:    _shuffle(catMap.known),
      new:      catMap.new, // nouveaux mots : on garde l'ordre curriculum
    };

    // Déduplication (clé = uid:en) — évite les doublons si deux unités partagent un mot
    const picked = new Set();
    const result  = [];

    // Prend le premier mot disponible d'un pool
    function take(pool) {
      for (const w of pool) {
        const key = `${w._uid}:${w.en}`;
        if (!picked.has(key)) { picked.add(key); result.push(w); return true; }
      }
      return false;
    }

    // Sélection probabiliste par catégorie pour chaque slot
    const LIMIT = Math.min(TARGET, source.length);
    for (let i = 0; i < LIMIT; i++) {
      const r = Math.random();
      if      (r < 0.65) { if (!take(pools.learning) && !take(pools.known) && !take(pools.new)) break; }
      else if (r < 0.95) { if (!take(pools.known)    && !take(pools.learning) && !take(pools.new)) break; }
      else               { if (!take(pools.new)      && !take(pools.learning) && !take(pools.known)) break; }
    }

    return _shuffle(result);
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
  function _goVocab()        { if (window.App) App.showVocab(); }

  function _sessionLabel(unitOrNull, mode) {
    if (unitOrNull) return `${unitOrNull.icon} ${unitOrNull.name}`;
    return _ui('🌍 Pratique globale', '🌍 Práctica global', mode);
  }

  /* ── Barre de progression ────────────────────────────────────────── */
  function _renderBar(container, qi, total, pass, unitOrNull, mode) {
    const pct = Math.round(((qi + 1) / total) * 100);
    const passLabel = pass > 0
      ? ` <span class="vp-pass-tag">${_ui('Repasse', 'Repaso', mode)} ${pass}</span>`
      : '';
    container.innerHTML = `
      <div class="vp-wrap">
        <div class="vp-topbar">
          <button class="vp-close" id="vp-close">✕</button>
          <div class="vp-progwrap">
            <div class="vp-progbar"><div class="vp-progfill" style="width:${pct}%"></div></div>
          </div>
          <div class="vp-counter">${qi + 1} / ${total}</div>
        </div>
        <div class="vp-unit-lbl">${_sessionLabel(unitOrNull, mode)}${passLabel}</div>
        <div id="vp-body" class="vp-body"></div>
      </div>`;
    container.querySelector('#vp-close').addEventListener('click', () => _goVocab());
  }

  /* ── Clé de mot (uid + en, séparateur non-ambigu) ───────────────── */
  function _wordKey(word) { return `${word._uid}\x00${word.en}`; }

  function _keyToWord(key) {
    const sep = key.indexOf('\x00');
    return { uid: key.slice(0, sep), en: key.slice(sep + 1) };
  }

  /* ── Runner de session ───────────────────────────────────────────── */
  function _runSession(container, session, unitOrNull, mode) {
    /*
      finalResults : Map wordKey → true/false
      Enregistre le DERNIER résultat de chaque mot unique.
      Si faux en passe 0 puis vrai en passe 1 → true.
      Si faux dans toutes les passes → false.
      Taille = nombre de mots uniques vus (= taille session initiale).
    */
    const finalResults = new Map();

    function runPass(queue, pass) {
      const missedKeys = new Set();
      let qi = 0;

      function next() {
        if (qi >= queue.length) {
          if (missedKeys.size > 0 && pass < 2) {
            // Reconstruit la file des mots ratés
            const allWords = (window.CURRICULUM_B1 || []).flatMap(u =>
              u.words.map(w => ({ ...w, _uid: u.id }))
            );
            const requeue = _shuffle(
              [...missedKeys].map(k => {
                const { uid, en } = _keyToWord(k);
                return allWords.find(w => w._uid === uid && w.en === en);
              }).filter(Boolean)
            );
            runPass(requeue, pass + 1);
          } else {
            _renderEnd(container, unitOrNull, mode, finalResults);
          }
          return;
        }

        const word = queue[qi];
        const wk   = _wordKey(word);
        _renderBar(container, qi, queue.length, pass, unitOrNull, mode);
        const body = container.querySelector('#vp-body');

        LessonEngine.renderSelfAssess(body, word, (isCorrect) => {
          _markResult(mode, word, isCorrect);
          finalResults.set(wk, isCorrect); // écrase → toujours le dernier résultat
          if (isCorrect) {
            missedKeys.delete(wk);
          } else {
            missedKeys.add(wk);
          }
          qi++;
          next();
        }, mode);
      }

      next();
    }

    runPass(session, 0);
  }

  /* ── Écran de fin ────────────────────────────────────────────────── */
  function _renderEnd(container, unitOrNull, mode, finalResults) {
    // finalResults : Map wordKey → bool (état final de chaque mot unique)
    const correct  = [...finalResults.values()].filter(v => v).length;
    const wrong    = finalResults.size - correct;
    const accuracy = finalResults.size > 0 ? Math.round(correct / finalResults.size * 100) : 0;
    const xpGain   = correct * 5;
    if (xpGain > 0 && window.XP) XP.addXP(xpGain);

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
          <button class="vp-btn-again" id="vp-again">↩ ${_ui('Recommencer', 'Repetir', mode)}</button>
          <button class="vp-btn-back"  id="vp-back">‹ ${_ui('Retour au Lexique', 'Volver al Léxico', mode)}</button>
        </div>
      </div>`;

    container.querySelector('#vp-close').addEventListener('click', () => _goVocab());
    container.querySelector('#vp-back').addEventListener('click',  () => _goVocab());
    container.querySelector('#vp-again').addEventListener('click', () => start(container, unitOrNull, mode));
  }

  /* ── État vide ───────────────────────────────────────────────────── */
  function _renderEmpty(container, unitOrNull, mode) {
    container.innerHTML = `
      <div class="vp-wrap">
        <div class="vp-topbar">
          <button class="vp-close" id="vp-close">✕</button>
          <span class="vp-unit-lbl">${_sessionLabel(unitOrNull, mode)}</span>
        </div>
        <div class="vp-empty">
          <div class="vp-empty-ico">📭</div>
          <p>${_ui('Aucun mot à pratiquer.', 'Sin palabras para practicar.', mode)}</p>
        </div>
      </div>`;
    container.querySelector('#vp-close').addEventListener('click', () => _goVocab());
  }

  /* ── API publique ────────────────────────────────────────────────── */
  /*
    container   : élément DOM dans lequel afficher la session
    unitOrNull  : objet unité pour pratique ciblée, ou null pour session globale
    mode        : 'fr-es' | 'es-fr'
  */
  function start(container, unitOrNull, mode) {
    if (!window.LessonEngine) { console.warn('VocabPractice: LessonEngine non chargé'); return; }
    const session = _buildSession(unitOrNull, mode);
    if (!session.length) { _renderEmpty(container, unitOrNull, mode); return; }
    _runSession(container, session, unitOrNull, mode);
  }

  function getWordStatus(mode, uid, en) { return _getStatus(mode, uid, en); }

  return { start, getWordStatus };
})();

window.VocabPractice = VocabPractice;
