/* ===== dashboard.js v4 — i18n + Dernière session + Progression ===== */
const Dashboard = (() => {

  /* ── Système de niveaux ── */
  const LEVELS = [
    { min: 0,     key: 'level.0', icon: '🌱' },
    { min: 200,   key: 'level.1', icon: '🗺️' },
    { min: 600,   key: 'level.2', icon: '⭐' },
    { min: 1500,  key: 'level.3', icon: '🌟' },
    { min: 3000,  key: 'level.4', icon: '💎' },
    { min: 6000,  key: 'level.5', icon: '🏅' },
    { min: 10000, key: 'level.6', icon: '🏆' },
  ];

  function getLevelIdx(xp) {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) { if (xp >= LEVELS[i].min) idx = i; }
    return idx;
  }

  function getLevelInfo(xp) {
    const idx     = getLevelIdx(xp);
    const current = LEVELS[idx];
    const next    = LEVELS[idx + 1] || null;
    const progress = next
      ? Math.round(((xp - current.min) / (next.min - current.min)) * 100)
      : 100;
    return {
      icon: current.icon,
      name: I18N.t(current.key),
      nameKey: current.key,
      next: next ? { name: I18N.t(next.key), icon: next.icon, min: next.min } : null,
      progress,
      idx,
    };
  }

  /* ── Succès ── */
  const ACHIEVEMENTS = [
    { id: 'first',    labelKey: 'ach.first',    check: s => s.sessions >= 1 },
    { id: 'streak3',  labelKey: 'ach.streak3',  check: s => s.streak >= 3 },
    { id: 'streak7',  labelKey: 'ach.streak7',  check: s => s.streak >= 7 },
    { id: 'streak30', labelKey: 'ach.streak30', check: s => s.streak >= 30 },
    { id: 'w50',      labelKey: 'ach.w50',      check: s => s.totalWords >= 50 },
    { id: 'w200',     labelKey: 'ach.w200',     check: s => s.totalWords >= 200 },
    { id: 'w500',     labelKey: 'ach.w500',     check: s => s.totalWords >= 500 },
    { id: 's10',      labelKey: 'ach.s10',      check: s => s.sessions >= 10 },
    { id: 's50',      labelKey: 'ach.s50',      check: s => s.sessions >= 50 },
    { id: 'xp1k',     labelKey: 'ach.xp1k',    check: s => s.xpTotal >= 1000 },
    { id: 'xp5k',     labelKey: 'ach.xp5k',    check: s => s.xpTotal >= 5000 },
  ];

  function checkAchievements(stats) {
    const earned    = stats.achievements || [];
    const earnedIds = new Set(earned.map(a => a.id));
    const newOnes   = [];
    ACHIEVEMENTS.forEach(a => {
      if (!earnedIds.has(a.id) && a.check(stats)) {
        earned.push({ id: a.id, date: SRS.today() });
        newOnes.push({ ...a, label: I18N.t(a.labelKey) });
      }
    });
    stats.achievements = earned;
    return newOnes;
  }

  /* ── Temps relatif ── */
  function timeAgo(isoTime) {
    if (!isoTime) return '';
    const diff  = Date.now() - new Date(isoTime).getTime();
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (hours < 1)  return I18N.t('dash.timeJustNow');
    if (hours < 24) return I18N.t('dash.timeHours', hours);
    if (days === 1) return I18N.t('dash.timeYesterday');
    return I18N.t('dash.timeDays', days);
  }

  /* ── Carte dernière session ── */
  function renderLastSession(stats) {
    const history = stats.history || [];
    const today   = SRS.today();
    const last    = history.length > 0 ? history[history.length - 1] : null;

    if (!last) {
      return `
<div class="last-sess-card last-sess-empty fadeUp">
  <div class="last-sess-icon">🌱</div>
  <div class="last-sess-info">
    <div class="last-sess-title">${I18N.t('dash.lastSession')}</div>
    <div class="last-sess-detail">${I18N.t('dash.lastSessionNone')}</div>
  </div>
</div>`;
    }

    const isToday = last.date === today;
    const when    = last.time ? timeAgo(last.time) : (isToday ? I18N.t('dash.lastSessionToday') : last.date);
    const cards   = (last.words || 0) + (last.drills || 0);
    const mins    = last.duration ? Math.round(last.duration / 60) : null;
    const xp      = last.xp || 0;

    const detailParts = [
      cards > 0 ? I18N.t('dash.cards', cards) : null,
      mins  > 0 ? I18N.t('dash.min', mins) : null,
      xp    > 0 ? I18N.t('dash.xpEarned', xp) : null,
    ].filter(Boolean).join(' · ');

    return `
<div class="last-sess-card ${isToday ? 'last-sess-today' : ''} fadeUp">
  <div class="last-sess-icon">${isToday ? '✅' : '⏱'}</div>
  <div class="last-sess-info">
    <div class="last-sess-title">
      ${I18N.t(isToday ? 'dash.lastSessionToday' : 'dash.lastSession')}
      <span class="last-sess-when">${when}</span>
    </div>
    <div class="last-sess-detail">${detailParts || '—'}</div>
  </div>
  ${!isToday ? `<button class="btn btn-sm btn-outline last-sess-btn" id="last-sess-resume">${I18N.t('dash.resume')}</button>` : ''}
</div>`;
  }

  /* ── Rendu dashboard ── */
  function render(mode) {
    const profile   = Storage.getProfile();
    const stats     = Storage.getStats();
    const cardStats = Vocab.getCardStats(mode);
    const b1        = Vocab.b1Progress(mode);
    const streak    = stats.streak || 0;
    const xpTotal   = stats.xpTotal || 0;
    const level     = getLevelInfo(xpTotal);
    const earnedIds = new Set((stats.achievements || []).map(a => a.id));
    const today     = SRS.today();
    const studiedToday = stats.lastStudied === today;

    const dueCount  = cardStats.due + Math.min(cardStats.unseen, 15);
    const b1Idx     = Math.min(3, Math.floor(b1 / 25));
    const motivMsg  = I18N.t('motiv.' + b1Idx);

    return `
<div class="dash-header fadeUp">
  <div>
    <h2>${I18N.t('dash.greeting', esc(profile.name || '…'))}</h2>
    <p>${mode === 'fr-es' ? I18N.t('mode.label.fr-es') : I18N.t('mode.label.es-fr')} · ${SRS.today()}</p>
  </div>
</div>

<!-- Dernière session -->
${renderLastSession(stats)}

<!-- Niveau -->
<div class="level-section fadeUp">
  <div class="level-icon">${level.icon}</div>
  <div class="level-info">
    <div class="level-name">${level.name}</div>
    <div class="level-track">
      <div class="level-fill" style="width:${level.progress}%"></div>
    </div>
    <div class="level-next">
      ${level.next
        ? I18N.t('level.next', level.next.name, level.next.icon, level.next.min - xpTotal)
        : I18N.t('level.max')}
    </div>
  </div>
  <div class="level-xp">${xpTotal} XP</div>
</div>

<!-- CTA Session -->
<div class="session-hero">
  <div class="session-hero-text">
    <h3>${studiedToday
      ? I18N.t('dash.todayStudied', cardStats.due)
      : I18N.t('dash.dueCount', dueCount)}</h3>
    <p>${I18N.t('dash.sessionSub')}</p>
  </div>
  <button class="btn" id="dash-start">
    ${studiedToday ? I18N.t('dash.continueBtn') : I18N.t('dash.sessionCta')}
  </button>
</div>

<!-- Stats -->
<div class="stats-grid">
  <div class="stat-card c-streak">
    <div class="stat-value">${streak >= 3 ? '🔥' : '📅'} ${streak}</div>
    <div class="stat-label">${I18N.t('stat.streak')}</div>
  </div>
  <div class="stat-card c-mature">
    <div class="stat-value">${cardStats.mature}</div>
    <div class="stat-label">${I18N.t('stat.mature')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">${cardStats.learned}</div>
    <div class="stat-label">${I18N.t('stat.seen')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">${cardStats.total - cardStats.seen}</div>
    <div class="stat-label">${I18N.t('stat.remaining')}</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">${stats.sessions || 0}</div>
    <div class="stat-label">${I18N.t('stat.sessions')}</div>
  </div>
  <div class="stat-card c-xp">
    <div class="stat-value">${xpTotal}</div>
    <div class="stat-label">${I18N.t('stat.xp')}</div>
  </div>
</div>

<!-- Barre B1 -->
<div class="b1-wrap">
  <div class="flex justify-between items-center">
    <h3>${I18N.t('b1.title')}</h3>
    <span class="b1-pct">${b1}%</span>
  </div>
  <p class="b1-sub">${I18N.t('b1.sub', cardStats.mature, cardStats.total)}</p>
  <div class="b1-track">
    <div class="b1-fill" style="width:${b1}%"></div>
  </div>
  <div class="b1-markers">
    ${I18N.t('b1.markers').map(m => `<span>${m}</span>`).join('')}
  </div>
  <p class="tip-card mt-2">${motivMsg}</p>
</div>

<!-- Activité -->
<div class="card activity-wrap">
  <p class="section-label">${I18N.t('activity.title')}</p>
  ${renderDots(stats.history)}
  <p class="text-sm mt-1" style="color:var(--text-3)">${I18N.t('activity.legend')}</p>
</div>

<!-- Raccourcis -->
<p class="section-label">${I18N.t('quick.title')}</p>
<div class="quick-actions">
  <button class="btn btn-outline btn-sm" id="dash-parcours">${I18N.t('nav.parcours')}</button>
  <button class="btn btn-outline btn-sm" id="dash-vocab">${I18N.t('quick.vocab')}</button>
  <button class="btn btn-outline btn-sm" id="dash-chunks">${I18N.t('quick.chunks')}</button>
  <button class="btn btn-outline btn-sm" id="dash-conj">${I18N.t('quick.conj')}</button>
  <button class="btn btn-outline btn-sm" id="dash-verbs">${I18N.t('quick.verbs')}</button>
  <button class="btn btn-outline btn-sm" id="dash-switch">${I18N.t('quick.switch')}</button>
</div>

<!-- Succès -->
<div class="achievements-section">
  <p class="section-label">${I18N.t('ach.title')}</p>
  <div class="achievements-grid">
    ${ACHIEVEMENTS.map(a => {
      const done  = earnedIds.has(a.id);
      const label = I18N.t(a.labelKey);
      return `<div class="ach-badge${done ? '' : ' locked'}">${label}</div>`;
    }).join('')}
  </div>
</div>

<!-- Conseil -->
${scienceTip()}
    `;
  }

  function scienceTip() {
    const tips = {
      fr: [
        `<b>🧠 Science</b> : Lewis (1993) a montré que les <b>groupes de mots (chunks)</b> sont mémorisés et récupérés plus vite que les mots isolés.`,
        `<b>⏰ SRS</b> : La répétition espacée (Ebbinghaus, 1885) est la méthode prouvée pour la mémoire long terme. Révise chaque jour !`,
        `<b>🔀 Entrelacement</b> : Mélanger plusieurs temps de conjugaison par session est plus efficace que d'étudier bloc par bloc (Rohrer, 2012).`,
        `<b>🇦🇷 Vos</b> : En espagnol argentin, <b>vos</b> remplace <b>tú</b>. Terminaisons : -ás, -és, -ís (hablás, comés, vivís).`,
      ],
      es: [
        `<b>🧠 Ciencia</b> : Lewis (1993) demostró que las <b>expresiones (chunks)</b> se memorizan y recuperan más rápido que palabras aisladas.`,
        `<b>⏰ SRS</b> : La repetición espaciada (Ebbinghaus, 1885) es el método probado para la memoria a largo plazo. ¡Repasa cada día!`,
        `<b>🔀 Intercalación</b> : Mezclar varios tiempos verbales por sesión es más eficaz que estudiarlos en bloques (Rohrer, 2012).`,
        `<b>🇦🇷 Vos</b> : En español argentino, <b>vos</b> reemplaza <b>tú</b>. Terminaciones: -ás, -és, -ís (hablás, comés, vivís).`,
      ]
    };
    const lang  = Storage.getProfile().mode === 'es-fr' ? 'es' : 'fr';
    const arr   = tips[lang];
    const idx   = Math.floor((Date.now() / 86400000)) % arr.length;
    return `<div class="tip-card"><p class="text-sm">${arr[idx]}</p></div>`;
  }

  function renderDots(history) {
    const today = SRS.today();
    let html = '<div class="activity-dots">';
    for (let i = 29; i >= 0; i--) {
      const d      = SRS.addDays(today, -i);
      const e      = (history || []).find(h => h.date === d);
      const active = e && ((e.words || 0) + (e.drills || 0)) > 0;
      const isToday = d === today;
      const tip  = e ? `${d}: ${e.words||0}m, ${e.drills||0}c${e.xp ? ', +'+e.xp+'XP' : ''}` : d;
      html += `<div class="dot ${isToday ? 'today' : active ? 'done' : ''}" title="${tip}"></div>`;
    }
    html += '</div>';
    return html;
  }

  function bindEvents(container, navigate) {
    const on = (id, fn) => { const el = container.querySelector('#' + id); if (el) el.addEventListener('click', fn); };
    on('dash-start',      () => navigate('session', 'mixed'));
    on('dash-parcours',   () => navigate('parcours'));
    on('dash-vocab',      () => navigate('session', 'vocab'));
    on('dash-chunks',     () => navigate('session', 'chunks'));
    on('dash-conj',       () => navigate('session', 'conj'));
    on('dash-verbs',      () => navigate('verbs'));
    on('dash-switch',     () => navigate('switch-mode'));
    on('last-sess-resume',() => navigate('session', 'mixed'));
  }

  function recordSession(mode, wordsStudied, drillsDone, xpEarned, duration) {
    const stats    = Storage.getStats();
    const today    = SRS.today();
    const xpBefore = stats.xpTotal || 0;
    const lvlBefore = getLevelIdx(xpBefore);

    // Streak
    if (stats.lastStudied === today) {
      /* same day — no streak change */
    } else if (stats.lastStudied === SRS.addDays(today, -1)) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      stats.streak = 1;
    }
    stats.lastStudied = today;
    stats.totalWords  = (stats.totalWords  || 0) + wordsStudied;
    stats.totalDrills = (stats.totalDrills || 0) + drillsDone;
    stats.xpTotal     = (stats.xpTotal     || 0) + xpEarned;
    stats.sessions    = (stats.sessions    || 0) + 1;

    // History — richer format
    if (!stats.history) stats.history = [];
    const sessionTime = new Date().toISOString();
    const existing    = stats.history.find(h => h.date === today);
    if (existing) {
      existing.words    = (existing.words    || 0) + wordsStudied;
      existing.drills   = (existing.drills   || 0) + drillsDone;
      existing.xp       = (existing.xp       || 0) + xpEarned;
      existing.duration = (existing.duration || 0) + (duration || 0);
      existing.time     = sessionTime;
    } else {
      stats.history.push({
        date: today, words: wordsStudied, drills: drillsDone,
        xp: xpEarned, duration: duration || 0, time: sessionTime
      });
    }
    stats.history = stats.history.slice(-90);

    // Achievements
    const newAchievements = checkAchievements(stats);

    Storage.saveStats(stats);

    const lvlAfter = getLevelIdx(stats.xpTotal);
    const leveledUp = lvlAfter > lvlBefore ? getLevelInfo(stats.xpTotal) : null;

    return { stats, newAchievements, leveledUp };
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { render, bindEvents, recordSession, getLevelInfo, getLevelIdx, checkAchievements };
})();

window.Dashboard = Dashboard;
