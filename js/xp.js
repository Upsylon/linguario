/* ===== xp.js — Système XP & Gamification LinguaRío ===== */
const XP = (() => {

  const K = {
    xp:        'lrio:xp',
    streak:    'lrio:streak',
    lastDay:   'lrio:lastDay',
    unitProg:  'lrio:unitProg',  // {unitId: {seen:[], mastered:[]}}
    sessions:  'lrio:sessions',  // total sessions done
  };

  /* ── Levels ────────────────────────────────────────────────────────── */
  const LEVELS = [
    { id: 'a1',  name: 'A1',    label: 'Débutant',        min: 0,     max: 800,      color: '#6ee7b7' },
    { id: 'a2',  name: 'A2',    label: 'Intermédiaire',   min: 800,   max: 2500,     color: '#60a5fa' },
    { id: 'b1',  name: 'B1 ⟶', label: 'En cours…',       min: 2500,  max: 6000,     color: '#c084fc' },
    { id: 'b1c', name: 'B1 ✓', label: 'B1 accompli !',   min: 6000,  max: 10000,    color: '#f59e0b' },
    { id: 'b2',  name: 'B2 ⟶', label: 'Avancé',          min: 10000, max: 18000,    color: '#f472b6' },
    { id: 'b2c', name: 'B2 ✓', label: 'Objectif atteint!',min: 18000, max: Infinity, color: '#e879f9' },
  ];

  /* ── XP crud ───────────────────────────────────────────────────────── */
  function getXP()  { return parseInt(localStorage.getItem(K.xp) || '0'); }
  function addXP(n) {
    const v = Math.max(0, getXP() + n);
    try { localStorage.setItem(K.xp, v); } catch(_) {}
    return v;
  }

  function getLevel() {
    const xp = getXP();
    return LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length - 1];
  }

  function getLevelProgress() {
    const xp = getXP();
    const lv = getLevel();
    if (lv.max === Infinity) return 1;
    return Math.min(1, (xp - lv.min) / (lv.max - lv.min));
  }

  function getNextLevel() {
    const lv = getLevel();
    const idx = LEVELS.indexOf(lv);
    return LEVELS[idx + 1] || null;
  }

  function xpToNext() {
    const xp = getXP();
    const lv = getLevel();
    return lv.max === Infinity ? 0 : Math.max(0, lv.max - xp);
  }

  /* ── Streak ────────────────────────────────────────────────────────── */
  function getStreak() {
    const today     = _dayKey();
    const last      = localStorage.getItem(K.lastDay);
    const yesterday = _dayKey(-1);
    const s         = parseInt(localStorage.getItem(K.streak) || '0');
    if (last === today)      return s;
    if (last === yesterday)  return s;
    return 0; // broken
  }

  function recordActivity() {
    const today     = _dayKey();
    const last      = localStorage.getItem(K.lastDay);
    const yesterday = _dayKey(-1);
    if (last === today) return getStreak(); // already done today

    let s = parseInt(localStorage.getItem(K.streak) || '0');
    s = (last === yesterday) ? s + 1 : 1;
    try {
      localStorage.setItem(K.streak, s);
      localStorage.setItem(K.lastDay, today);
      const sessions = parseInt(localStorage.getItem(K.sessions) || '0') + 1;
      localStorage.setItem(K.sessions, sessions);
    } catch(_) {}

    return s;
  }

  function getTotalSessions() { return parseInt(localStorage.getItem(K.sessions) || '0'); }

  /* ── Unit Progress ─────────────────────────────────────────────────── */
  function getUnitProgress() {
    try { return JSON.parse(localStorage.getItem(K.unitProg) || '{}'); }
    catch { return {}; }
  }

  function markWordSeen(unitId, wordEn) {
    const p = getUnitProgress();
    if (!p[unitId]) p[unitId] = { seen: [], mastered: [] };
    if (!p[unitId].seen.includes(wordEn)) p[unitId].seen.push(wordEn);
    try { localStorage.setItem(K.unitProg, JSON.stringify(p)); } catch(_) {}
  }

  function markWordMastered(unitId, wordEn) {
    const p = getUnitProgress();
    if (!p[unitId]) p[unitId] = { seen: [], mastered: [] };
    if (!p[unitId].seen.includes(wordEn))     p[unitId].seen.push(wordEn);
    if (!p[unitId].mastered.includes(wordEn)) p[unitId].mastered.push(wordEn);
    try { localStorage.setItem(K.unitProg, JSON.stringify(p)); } catch(_) {}
  }

  function getUnitStats(unitId, totalWords) {
    const p = getUnitProgress();
    const u = p[unitId] || { seen: [], mastered: [] };
    return {
      seen:     u.seen.length,
      mastered: u.mastered.length,
      total:    totalWords,
      pct:      totalWords ? Math.round(u.seen.length / totalWords * 100) : 0,
    };
  }

  /* ── Current unit ──────────────────────────────────────────────────── */
  function getCurrentUnitId() {
    if (!window.CURRICULUM_B1) return 'u01';
    const prog = getUnitProgress();
    for (const unit of window.CURRICULUM_B1) {
      const s = prog[unit.id] || { seen: [] };
      if (s.seen.length < unit.words.length) return unit.id;
    }
    return window.CURRICULUM_B1[window.CURRICULUM_B1.length - 1].id;
  }

  function getCurrentUnit() {
    const id = getCurrentUnitId();
    return (window.CURRICULUM_B1 || []).find(u => u.id === id) || null;
  }

  /* ── XP Rewards ────────────────────────────────────────────────────── */
  const REWARDS = {
    correct:        10,
    speedBonus:      5,   // answered within 4 seconds
    wrong:           0,
    newWord:        15,   // first time seeing a word
    sessionComplete: 50,
    perfectSession: 100,  // all correct
    dailyStreak:    20,   // × streak multiplier
  };

  /* ── Achievements ──────────────────────────────────────────────────── */
  const ACHIEVEMENTS = [
    { id: 'first',     icon: '🌊', label: 'Premier pas',       desc: 'Première session complétée',            test: (_xp, s) => s >= 1          },
    { id: 'streak3',   icon: '🔥', label: 'En feu',            desc: '3 jours d\'affilée',                    test: (_xp, _s, streak) => streak >= 3  },
    { id: 'streak7',   icon: '⚡', label: 'Une semaine',       desc: '7 jours d\'affilée',                    test: (_xp, _s, streak) => streak >= 7  },
    { id: 'xp500',     icon: '✨', label: 'Premiers 500 XP',   desc: 'Atteint 500 XP',                        test: (xp) => xp >= 500            },
    { id: 'a2',        icon: '🎯', label: 'Niveau A2',         desc: 'Atteint le niveau A2',                  test: (xp) => xp >= 800            },
    { id: 'b1start',   icon: '🚀', label: 'Cap sur le B1',     desc: 'Atteint le niveau B1 intermédiaire',    test: (xp) => xp >= 2500           },
    { id: 'b1done',    icon: '🏆', label: 'B1 atteint !',      desc: 'Objectif B1 accompli',                  test: (xp) => xp >= 6000           },
    { id: 'sessions10',icon: '💪', label: '10 sessions',       desc: '10 sessions complétées',                test: (_xp, s) => s >= 10          },
    { id: 'sessions50',icon: '🦾', label: '50 sessions',       desc: '50 sessions complétées',                test: (_xp, s) => s >= 50          },
    { id: 'b2start',   icon: '🌟', label: 'Cap sur le B2',     desc: 'Atteint le niveau B2 intermédiaire',    test: (xp) => xp >= 10000          },
    { id: 'b2done',    icon: '👑', label: 'B2 atteint !',      desc: 'Objectif B2 accompli — félicitations !', test: (xp) => xp >= 18000         },
  ];

  function getUnlocked() {
    const xp     = getXP();
    const streak = getStreak();
    const sess   = getTotalSessions();
    return ACHIEVEMENTS.filter(a => a.test(xp, sess, streak));
  }

  /* ── Helpers ───────────────────────────────────────────────────────── */
  function _dayKey(offset = 0) {
    const d = new Date(Date.now() + offset * 86400000);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  /* ── Public API ────────────────────────────────────────────────────── */
  return {
    getXP, addXP,
    getLevel, getLevelProgress, getNextLevel, xpToNext,
    getStreak, recordActivity, getTotalSessions,
    getUnitProgress, markWordSeen, markWordMastered, getUnitStats,
    getCurrentUnit, getCurrentUnitId,
    REWARDS, ACHIEVEMENTS, LEVELS,
    getUnlocked,
  };
})();

window.XP = XP;
