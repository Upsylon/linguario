/* ===== srs.js — Algorithme SM-2 (Spaced Repetition) ===== */
const SRS = (() => {
  function today() {
    return new Date().toISOString().split('T')[0];
  }

  function addDays(dateStr, n) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + n);
    return d.toISOString().split('T')[0];
  }

  function newCard(cardId) {
    return { cardId, interval: 0, easeFactor: 2.5, due: today(), reps: 0, lapses: 0 };
  }

  /* quality: 0=oubli total, 1=mauvais, 2=difficile avec aide,
              3=difficile, 4=correct, 5=parfait */
  function sm2(card, quality) {
    const q = Math.max(0, Math.min(5, Math.round(quality)));
    const c = { ...card };

    if (q < 3) {
      c.reps = 0;
      c.interval = 1;
      c.lapses = (c.lapses || 0) + 1;
    } else {
      if (c.reps === 0)      c.interval = 1;
      else if (c.reps === 1) c.interval = 6;
      else                   c.interval = Math.round(c.interval * c.easeFactor);
      c.reps++;
    }

    c.easeFactor = Math.max(1.3,
      c.easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
    );
    c.due = addDays(today(), c.interval);
    return c;
  }

  function isDue(card) {
    return !card || card.due <= today();
  }

  function isMature(card) {
    return card && card.reps >= 3 && card.interval >= 21;
  }

  function isLearned(card) {
    return card && card.reps >= 1;
  }

  /* Cartes dues pour révision (triées par date la plus ancienne en premier) */
  function getDueCards(words, mode) {
    const t = today();
    return words
      .filter(w => {
        const s = Storage.getSRSCard(mode, w.id);
        return !s || s.due <= t;
      })
      .sort((a, b) => {
        const sa = Storage.getSRSCard(mode, a.id);
        const sb = Storage.getSRSCard(mode, b.id);
        const da = sa ? sa.due : '0000-00-00';
        const db = sb ? sb.due : '0000-00-00';
        return da < db ? -1 : da > db ? 1 : 0;
      });
  }

  /* Nouvelles cartes jamais vues */
  function getNewCards(words, mode, limit = 15) {
    const seen = Storage.getAllSRSKeys(mode);
    return words.filter(w => !seen[w.id]).slice(0, limit);
  }

  /* Statistiques globales */
  function getCardStats(words, mode) {
    const t = today();
    let seen = 0, due = 0, mature = 0, learned = 0;
    words.forEach(w => {
      const s = Storage.getSRSCard(mode, w.id);
      if (s) {
        seen++;
        if (s.due <= t) due++;
        if (isMature(s)) mature++;
        if (isLearned(s)) learned++;
      }
    });
    return { total: words.length, seen, unseen: words.length - seen, due, mature, learned };
  }

  /* Niveau B1 estimé : % des 2000 mots fréquents maîtrisés (interval >= 21) */
  function b1Progress(words, mode) {
    const target = Math.min(words.length, 2000);
    const stats = getCardStats(words, mode);
    return Math.min(100, Math.round((stats.mature / target) * 100));
  }

  return { today, addDays, newCard, sm2, isDue, isMature, isLearned,
           getDueCards, getNewCards, getCardStats, b1Progress };
})();

window.SRS = SRS;
