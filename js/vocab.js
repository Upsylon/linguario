/* ===== vocab.js — Lexique : révision vocabulaire par thème v2 ===== */
const Vocab = (() => {

  let _el        = null;
  let _filter    = 'all';
  let _openUnits = new Set();
  let _inited    = false;

  const GROUPS = [
    { key: 'a1', label: 'A1', desc: 'Débutant',      color: '#6ee7b7' },
    { key: 'a2', label: 'A2', desc: 'Intermédiaire', color: '#60a5fa' },
    { key: 'b1', label: 'B1', desc: 'Avancé',        color: '#c084fc' },
  ];

  // ── Public ────────────────────────────────────────────────────────────
  function render(el) {
    _el = el;
    if (!_inited) {
      _inited = true;
      const cur = XP.getCurrentUnitId();
      if (cur) _openUnits.add(cur);
    }
    _draw();
  }

  // ── Main render ───────────────────────────────────────────────────────
  function _draw() {
    if (!_el) return;
    const mode   = Storage.getProfile().mode || 'fr-es';
    const prog   = XP.getUnitProgress();
    const units  = window.CURRICULUM_B1 || [];
    const isFrEs = mode === 'fr-es';
    const curId  = XP.getCurrentUnitId();

    const rich = units.map(unit => {
      const p = prog[unit.id] || { seen: [], mastered: [] };
      const seenSet     = new Set(p.seen);
      const masteredSet = new Set(p.mastered);
      return {
        unit,
        seenCount: p.seen.length,
        words: unit.words.map(w => ({
          ...w,
          isSeen:     seenSet.has(w.en),
          isMastered: masteredSet.has(w.en),
        })),
      };
    });

    const total       = rich.reduce((s, u) => s + u.words.length, 0);
    const seen        = rich.reduce((s, u) => s + u.seenCount, 0);
    const pct         = total ? Math.round(seen / total * 100) : 0;
    const toSeeCnt    = rich
      .filter(u => u.seenCount > 0)
      .reduce((s, u) => s + u.words.filter(w => !w.isSeen).length, 0);

    const vis = rich.filter(({ seenCount, words }) => {
      if (_filter === 'seen')   return seenCount > 0;
      if (_filter === 'unseen') return seenCount > 0 && words.some(w => !w.isSeen);
      return true;
    });

    const groups = GROUPS.map(g => ({
      ...g,
      items: vis.filter(u => u.unit.level === g.key),
    })).filter(g => g.items.length > 0);

    _el.innerHTML = `
      <div class="vc-wrap">

        <div class="vc-topbar">
          <div class="vc-hd-row">
            <span class="vc-title">${isFrEs ? 'Lexique' : 'Léxico'}</span>
            <span class="vc-prog-lbl">${seen}<span class="vc-prog-tot">/${total} ${isFrEs ? 'mots' : 'palabras'}</span></span>
          </div>
          <div class="vc-globalbar">
            <div class="vc-globalfill" style="width:${pct}%"></div>
          </div>
          <div class="vc-tabs">
            <button class="vc-tab${_filter === 'all'    ? ' vc-tab--on' : ''}" data-f="all">
              ${isFrEs ? 'Tous' : 'Todos'}<span class="vc-tn">${total}</span>
            </button>
            <button class="vc-tab${_filter === 'seen'   ? ' vc-tab--on' : ''}" data-f="seen">
              ${isFrEs ? 'Appris' : 'Aprendidos'}<span class="vc-tn vc-tn--blue">${seen}</span>
            </button>
            <button class="vc-tab${_filter === 'unseen' ? ' vc-tab--on' : ''}" data-f="unseen">
              ${isFrEs ? 'À voir' : 'Por ver'}<span class="vc-tn vc-tn--dim">${toSeeCnt}</span>
            </button>
          </div>
        </div>

        <div class="vc-list">
          ${groups.length === 0
            ? `<div class="vc-empty">
                 <div class="vc-empty-ico">📖</div>
                 <p class="vc-empty-msg">${_emptyMsg(isFrEs)}</p>
               </div>`
            : groups.map(g => _groupHtml(g, mode, curId)).join('')
          }
        </div>

      </div>`;

    _el.querySelectorAll('.vc-tab').forEach(btn => {
      btn.addEventListener('click', () => { _filter = btn.dataset.f; _draw(); });
    });

    _el.querySelectorAll('.vc-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => _toggle(btn.dataset.unit));
    });

    _el.querySelectorAll('.vc-play-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const unit = (window.CURRICULUM_B1 || []).find(u => u.id === btn.dataset.unit);
        if (unit && window.App) App.showLessonForUnit(unit);
      });
    });
  }

  // ── Toggle unit open/close (no full redraw) ───────────────────────────
  function _toggle(id) {
    const open   = _openUnits.has(id);
    const unitEl = _el && _el.querySelector(`.vc-unit[data-id="${id}"]`);
    if (open) _openUnits.delete(id); else _openUnits.add(id);
    if (!unitEl) return;
    const body  = unitEl.querySelector('.vc-body');
    const arrow = unitEl.querySelector('.vc-arrow');
    if (!open) {
      unitEl.classList.add('vc-unit--open');
      if (body)  body.removeAttribute('hidden');
      if (arrow) arrow.textContent = '▲';
    } else {
      unitEl.classList.remove('vc-unit--open');
      if (body)  body.setAttribute('hidden', '');
      if (arrow) arrow.textContent = '▼';
    }
  }

  function _emptyMsg(isFrEs) {
    if (_filter === 'unseen') return isFrEs
      ? '🎉 Tous les mots des unités commencées ont été vus !'
      : '🎉 ¡Has visto todas las palabras de las unidades comenzadas!';
    if (_filter === 'seen') return isFrEs
      ? 'Lance une leçon pour voir tes premiers mots ici !'
      : '¡Empieza una lección para ver tus primeras palabras aquí!';
    return isFrEs ? 'Aucun mot à afficher.' : 'Ninguna palabra que mostrar.';
  }

  // ── Level group ───────────────────────────────────────────────────────
  function _groupHtml({ key, label, desc, color, items }, mode, curId) {
    const inner = items.map(u => _unitHtml(u, mode, curId)).filter(Boolean).join('');
    if (!inner) return '';
    return `
      <div class="vc-group">
        <div class="vc-grp-hd">
          <span class="vc-grp-pip" style="background:${color}"></span>
          <span class="vc-grp-lv" style="color:${color}">${label}</span>
          <span class="vc-grp-desc">${desc}</span>
        </div>
        ${inner}
      </div>`;
  }

  // ── Unit block ────────────────────────────────────────────────────────
  function _unitHtml({ unit, words, seenCount }, mode, curId) {
    const isFrEs = mode === 'fr-es';
    const total  = words.length;
    const isOpen = _openUnits.has(unit.id);
    const isCur  = unit.id === curId;
    const pct    = Math.round(seenCount / total * 100);
    const done   = seenCount === total;

    let shown = words;
    if (_filter === 'seen')   shown = words.filter(w => w.isSeen);
    if (_filter === 'unseen') shown = words.filter(w => !w.isSeen);
    if (shown.length === 0)   return '';

    const revLbl = isFrEs ? 'Réviser' : 'Repasar';
    const colA   = isFrEs ? '🇫🇷 Français' : '🇦🇷 Español';
    const colB   = isFrEs ? '🇦🇷 Español'  : '🇫🇷 Français';

    return `
      <div class="vc-unit${isOpen ? ' vc-unit--open' : ''}${isCur ? ' vc-unit--cur' : ''}" data-id="${unit.id}">
        <div class="vc-unit-hd">
          <button class="vc-toggle-btn" data-unit="${unit.id}">
            <span class="vc-ico">${unit.icon}</span>
            <div class="vc-meta">
              <span class="vc-uname">${esc(unit.name)}</span>
              <div class="vc-pbar"><div class="vc-pfill${done ? ' vc-pfill--done' : ''}" style="width:${pct}%"></div></div>
            </div>
            <span class="vc-cnt">${seenCount}<span class="vc-ctot">/${total}</span></span>
            <span class="vc-arrow">${isOpen ? '▲' : '▼'}</span>
          </button>
          <button class="vc-play-btn" data-unit="${unit.id}" title="${revLbl}">▶</button>
        </div>

        <div class="vc-body"${isOpen ? '' : ' hidden'}>
          <div class="vc-col-hd">
            <span>${colA}</span>
            <span>${colB}</span>
          </div>
          ${shown.map(w => _wordHtml(w, mode)).join('')}
        </div>
      </div>`;
  }

  // ── Word row ──────────────────────────────────────────────────────────
  function _wordHtml(w, mode) {
    const isFrEs = mode === 'fr-es';
    const src    = isFrEs ? w.fr : w.es;
    const tgt    = isFrEs ? (w.esTarget || w.es) : w.fr;
    const exSrc  = isFrEs ? w.example.fr : w.example.es;
    const exTgt  = isFrEs ? w.example.es : w.example.fr;
    const dotCls = w.isMastered ? 'vc-dot--done' : w.isSeen ? 'vc-dot--seen' : 'vc-dot--new';
    const dotLbl = w.isMastered ? 'Maîtrisé' : w.isSeen ? 'Vu' : 'Pas encore vu';

    return `
      <details class="vc-word">
        <summary class="vc-wrow">
          <span class="vc-dot ${dotCls}" title="${dotLbl}"></span>
          <span class="vc-wsrc">${esc(src)}</span>
          <span class="vc-wsep">→</span>
          <span class="vc-wtgt">${esc(tgt)}</span>
          <span class="vc-wchev">›</span>
        </summary>
        <div class="vc-wex">
          <div class="vc-wex-s">${esc(exSrc)}</div>
          <div class="vc-wex-t">${esc(exTgt)}</div>
        </div>
      </details>`;
  }

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return { render };
})();

window.Vocab = Vocab;
