/* ===== parcours.js — Roadmap B1 ===== */

const Parcours = (() => {

  function _getMode() {
    try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; }
  }

  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }

  function render(container) {
    const curriculum = window.CURRICULUM_B1 || [];
    if (!curriculum.length) { container.innerHTML = '<div style="padding:2rem;color:#eee">Curriculum non chargé.</div>'; return; }

    const mode       = _getMode();
    const currentId  = XP.getCurrentUnitId();
    const currentXp  = XP.getXP();
    const level      = XP.getLevel();
    const progPct    = Math.round(XP.getLevelProgress() * 100);
    const streak     = XP.getStreak();

    const levelGroups = [
      { id: 'a1', label: _ui('Niveau A1 — Débutant',     'Nivel A1 — Principiante',   mode), color: '#6ee7b7', units: curriculum.filter(u => u.level === 'a1') },
      { id: 'a2', label: _ui('Niveau A2 — Intermédiaire','Nivel A2 — Intermedio',      mode), color: '#60a5fa', units: curriculum.filter(u => u.level === 'a2') },
      { id: 'b1', label: _ui('Niveau B1 — Objectif',     'Nivel B1 — Objetivo',        mode), color: '#c084fc', units: curriculum.filter(u => u.level === 'b1') },
    ];

    const prog    = XP.getUnitProgress();
    const a1Done  = curriculum.filter(u => u.level === 'a1').some(u => (prog[u.id]?.seen?.length || 0) > 0);
    const a2Done  = curriculum.filter(u => u.level === 'a2').some(u => (prog[u.id]?.seen?.length || 0) > 0);
    const unlocks = { a1: true, a2: a1Done, b1: a2Done };

    container.innerHTML = `
      <div class="pa-wrap">
        <div class="pa-header">
          <div class="pa-hd-left">
            <div class="pa-hd-level" style="color:${level.color}">${level.name}</div>
            <div class="pa-hd-label">${level.label}</div>
          </div>
          <div class="pa-hd-right">
            <div class="pa-hd-xp">${currentXp.toLocaleString()} XP</div>
            ${streak ? `<div class="pa-hd-streak">🔥 ${streak}</div>` : ''}
          </div>
        </div>
        <div class="pa-lv-bar"><div class="pa-lv-fill" style="width:${progPct}%;background:${level.color}"></div></div>

        ${levelGroups.map(group => {
          const locked = !unlocks[group.id];
          return `
          <div class="pa-group${locked ? ' pa-group--locked' : ''}">
            <div class="pa-group-hd">
              <div class="pa-group-dot" style="background:${group.color}"></div>
              <div class="pa-group-name" style="color:${group.color}">${group.label}</div>
              ${locked ? `<div class="pa-lock">${_lockMsg(group.id, curriculum, prog, mode)}</div>` : ''}
            </div>
            <div class="pa-units">
              ${group.units.map(unit => _renderUnit(unit, unit.id === currentId, locked, prog, mode)).join('')}
            </div>
          </div>`;
        }).join('')}

        ${_renderAchievements(mode)}
      </div>`;

    container.querySelectorAll('.pa-unit[data-uid]').forEach(el => {
      el.addEventListener('click', () => { const uid = el.dataset.uid; if (uid) _startUnit(uid, container); });
    });
  }

  function _renderUnit(unit, isCurrent, locked, prog, mode) {
    const stats = XP.getUnitStats(unit.id, unit.words.length);
    const done  = stats.pct === 100;
    const wordLabel = _ui('mots', 'palabras', mode);

    let statusIcon = done
      ? '<span class="pa-unit-check">✓</span>'
      : isCurrent ? '<span class="pa-unit-pulse">●</span>'
      : locked ? '' : '<span class="pa-unit-arr">›</span>';

    return `
      <div class="pa-unit${isCurrent ? ' pa-unit--current' : ''}${done ? ' pa-unit--done' : ''}${locked ? ' pa-unit--locked' : ''}"
           ${locked ? '' : `data-uid="${unit.id}"`}>
        <div class="pa-unit-ic">${unit.icon}</div>
        <div class="pa-unit-body">
          <div class="pa-unit-name">${unit.name}</div>
          <div class="pa-unit-meta">${stats.seen}/${stats.total} ${wordLabel} · +${unit.xp} XP</div>
          ${!locked && stats.pct > 0 ? `<div class="pa-unit-bar"><div class="pa-unit-fill" style="width:${stats.pct}%"></div></div>` : ''}
        </div>
        ${statusIcon}
      </div>`;
  }

  function _lockMsg(groupId, curriculum, prog, mode) {
    if (groupId === 'a2') {
      const a1Units   = curriculum.filter(u => u.level === 'a1');
      const seenTotal = a1Units.reduce((n, u) => n + (prog[u.id]?.seen?.length || 0), 0);
      const wordTotal = a1Units.reduce((n, u) => n + u.words.length, 0);
      return _ui(
        `🔒 Commence le A1 — ${seenTotal}/${wordTotal} mots vus`,
        `🔒 Empezá el A1 — ${seenTotal}/${wordTotal} palabras vistas`,
        mode
      );
    }
    if (groupId === 'b1') {
      const a2Units   = curriculum.filter(u => u.level === 'a2');
      const seenTotal = a2Units.reduce((n, u) => n + (prog[u.id]?.seen?.length || 0), 0);
      const wordTotal = a2Units.reduce((n, u) => n + u.words.length, 0);
      return _ui(
        `🔒 Débloque le A2 d'abord — ${seenTotal}/${wordTotal} mots vus`,
        `🔒 Desbloqueá el A2 primero — ${seenTotal}/${wordTotal} palabras vistas`,
        mode
      );
    }
    return _ui('🔒 Complète le niveau précédent', '🔒 Completá el nivel anterior', mode);
  }

  function _renderAchievements(mode) {
    const unlocked = XP.getUnlocked();
    if (!unlocked.length) return '';
    return `
      <div class="pa-achieve">
        <div class="pa-achieve-title">${_ui('Succès débloqués', 'Logros desbloqueados', mode)}</div>
        <div class="pa-achieve-list">
          ${unlocked.map(a => `
            <div class="pa-badge" title="${a.desc}">
              <div class="pa-badge-ic">${a.icon}</div>
              <div class="pa-badge-lbl">${a.label}</div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function _startUnit(uid, container) {
    const unit = (window.CURRICULUM_B1 || []).find(u => u.id === uid);
    if (!unit) return;
    _renderUnitDetail(container, unit);
  }

  function _renderUnitDetail(container, unit) {
    const mode  = _getMode();
    const esData = (window.CURRICULUM_B1_ES || {})[unit.id] || {};
    const gramNote  = (mode === 'es-fr' && esData.grammarNote)  ? esData.grammarNote  : unit.grammar.note;
    const gramTitle = unit.grammar.title;

    const prog  = XP.getUnitProgress();
    const seen  = prog[unit.id]?.seen || [];
    const stats = XP.getUnitStats(unit.id, unit.words.length);

    container.innerHTML = `
      <div class="pa-detail">
        <div class="pa-detail-nav">
          <button class="pa-detail-back" id="pa-back">‹ ${_ui('Parcours', 'Recorrido', mode)}</button>
          <div class="pa-detail-lvbadge pa-detail-lv--${unit.level}">${unit.level.toUpperCase()}</div>
        </div>

        <div class="pa-detail-hero">
          <div class="pa-detail-icon">${unit.icon}</div>
          <div class="pa-detail-title">${unit.name}</div>
          <div class="pa-detail-stat">${stats.seen}/${stats.total} ${_ui('mots', 'palabras', mode)} · ${stats.pct}% · +${unit.xp} XP</div>
        </div>

        <div class="pa-gram">
          <div class="pa-gram-hd">📖 ${gramTitle}</div>
          <div class="pa-gram-body">${gramNote}</div>
          <div class="pa-gram-phrase">
            <span>🇫🇷 <em>${unit.phrase.fr}</em></span>
            <span>🇦🇷 <em>${unit.phrase.es}</em></span>
          </div>
        </div>

        <div class="pa-words">
          <div class="pa-words-title">${_ui('Vocabulaire', 'Vocabulario', mode)}</div>
          ${unit.words.map(w => {
            const ok = seen.includes(w.en);
            return `<div class="pa-word${ok ? ' pa-word--ok' : ''}">
              <span class="pa-word-fr">🇫🇷 ${w.fr}</span>
              <span class="pa-word-es">🇦🇷 ${w.esTarget || w.es}</span>
              ${ok ? '<span class="pa-word-ck">✓</span>' : ''}
            </div>`;
          }).join('')}
        </div>

        <button class="pa-start-btn" id="pa-start-unit">▶ ${_ui('Réviser cette unité', 'Repasar esta unidad', mode)}</button>
      </div>`;

    container.querySelector('#pa-back').addEventListener('click', () => render(container));
    container.querySelector('#pa-start-unit').addEventListener('click', () => App.showLessonForUnit(unit));
  }

  return { render };
})();

window.Parcours = Parcours;
