/* ===== storage.js — localStorage wrappers ===== */
const Storage = (() => {
  const P = 'langapp:';

  function get(key, fallback = null) {
    try {
      const v = localStorage.getItem(P + key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  }

  function set(key, value) {
    try { localStorage.setItem(P + key, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function remove(key) { localStorage.removeItem(P + key); }

  function getProfile() {
    return get('profile', { name: '', mode: 'fr-es', onboarded: false, createdAt: null });
  }
  function saveProfile(p) { return set('profile', p); }

  function getSRSCard(mode, id) { return get(`srs:${mode}:${id}`, null); }
  function saveSRSCard(mode, id, state) { return set(`srs:${mode}:${id}`, state); }

  function getStats() {
    return get('stats', {
      streak: 0, lastStudied: null, totalWords: 0, totalDrills: 0,
      xpTotal: 0, sessions: 0, history: []
    });
  }
  function saveStats(s) { return set('stats', s); }

  function getDailySessions() { return get('daily', []); }
  function saveDailySessions(a) { return set('daily', a); }

  function getAllSRSKeys(mode) {
    const result = {};
    const prefix = P + `srs:${mode}:`;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        const id = k.slice(prefix.length);
        try { result[id] = JSON.parse(localStorage.getItem(k)); } catch {}
      }
    }
    return result;
  }

  function hasViewedLesson(unitId) {
    const s = getStats();
    return !!(s.lessonsViewed && s.lessonsViewed[unitId]);
  }
  function markLessonViewed(unitId) {
    const s = getStats();
    if (!s.lessonsViewed) s.lessonsViewed = {};
    s.lessonsViewed[unitId] = true;
    saveStats(s);
  }

  /* Unit progression rounds: 0=not started, 1=Découverte done,
     2=Reconnaissance done, 3=Rappel done, 4=Validation passed */
  function getUnitRound(unitId) {
    const s = getStats();
    return (s.unitRounds && s.unitRounds[unitId]) || 0;
  }
  function setUnitRound(unitId, round) {
    const s = getStats();
    if (!s.unitRounds) s.unitRounds = {};
    s.unitRounds[unitId] = round;
    saveStats(s);
  }

  function clearMode(mode) {
    const prefix = P + `srs:${mode}:`;
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  }

  function clearAll() {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(P)) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  }

  return { get, set, remove, getProfile, saveProfile, getSRSCard, saveSRSCard,
           getStats, saveStats, getDailySessions, saveDailySessions,
           getAllSRSKeys, clearMode, clearAll, hasViewedLesson, markLessonViewed,
           getUnitRound, setUnitRound };
})();

window.Storage = Storage;
