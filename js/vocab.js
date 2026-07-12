/* ===== vocab.js — Lexique : révision vocabulaire par thème ===== */
const Vocab = (() => {

  let _el        = null;
  let _filter    = 'all';   // 'all' | 'seen' | 'unseen'
  let _openUnits = new Set();

  // ── Public ────────────────────────────────────────────────────────────
  function render(el) {
    _el = el;
    _draw();
  }

  // ── Main render ───────────────────────────────────────────────────────
  function _draw() {
    if (!_el) return;
    const mode   = (Storage.getProfile().mode || 'fr-es');
    const prog   = XP.getUnitProgress();
    const units  = window.CURRICULUM_B1 || [];
    const isFrEs = mode === 'fr-es';

    const allUnits = units.map(unit => {
      const p = prog[unit.id] || { seen: [], mastered: [] };
      const seenSet     = new Set(p.seen);
      const masteredSet = new Set(p.mastered);
      const words = unit.words.map(w => ({
        ...w,
        isSeen:     seenSet.has(w.en),
        isMastered: masteredSet.has(w.en),
      }));
      return { unit, words, seenCount: p.seen.length, masteredCount: p.mastered.length };
    });

    const totalWords  = allUnits.reduce((s, u) => s + u.words.length, 0);
    const seenWords   = allUnits.reduce((s, u) => s + u.seenCount, 0);
    const unseenWords = totalWords - seenWords;

    const visible = allUnits.filter(({ seenCount, words }) => {
      if (_filter === 'seen')   return seenCount > 0;
      if (_filter === 'unseen') return words.some(w => !w.isSeen);
      return true;
    });

    _el.innerHTML = `
      <div class="vc-wrap">
        <div class="vc-topbar">
          <span class="vc-title">${isFrEs ? 'Lexique' : 'Léxico'}</span>
          <div class="vc-filters">
            <button class="vc-f${_filter === 'all'    ? ' vc-f--on' : ''}" data-f="all">
              ${isFrEs ? 'Tous' : 'Todos'}<span class="vc-badge">${totalWords}</span>
            </button>
            <button class="vc-f${_filter === 'seen'   ? ' vc-f--on' : ''}" data-f="seen">
              ${isFrEs ? 'Vus' : 'Vistos'}<span class="vc-badge">${seenWords}</span>
            </button>
            <button class="vc-f${_filter === 'unseen' ? ' vc-f--on' : ''}" data-f="unseen">
              ${isFrEs ? 'À voir' : 'Por ver'}<span class="vc-badge">${unseenWords}</span>
            </button>
          </div>
        </div>

        <div class="vc-list">
          ${visible.length === 0
            ? `<p class="vc-empty">${isFrEs ? 'Aucun mot à afficher ici.' : 'Ninguna palabra que mostrar.'}</p>`
            : visible.map(({ unit, words, seenCount }) => _unitBlock(unit, words, seenCount, mode)).join('')
          }
        </div>
      </div>`;

    _el.querySelectorAll('.vc-f').forEach(btn => {
      btn.addEventListener('click', () => { _filter = btn.dataset.f; _draw(); });
    });

    _el.querySelectorAll('.vc-unit-hd').forEach(hd => {
      hd.addEventListener('click', () => {
        const id   = hd.dataset.unit;
        const open = _openUnits.has(id);
        if (open) _openUnits.delete(id); else _openUnits.add(id);
        const unitEl = hd.closest('.vc-unit');
        const body   = unitEl && unitEl.querySelector('.vc-body');
        const arrow  = hd.querySelector('.vc-arrow');
        if (!open) {
          unitEl.classList.add('vc-unit--open');
          if (body)  body.removeAttribute('hidden');
          if (arrow) arrow.textContent = '▲';
        } else {
          unitEl.classList.remove('vc-unit--open');
          if (body)  body.setAttribute('hidden', '');
          if (arrow) arrow.textContent = '▼';
        }
      });
    });
  }

  // ── Unit block ────────────────────────────────────────────────────────
  function _unitBlock(unit, words, seenCount, mode) {
    const isFrEs = mode === 'fr-es';
    const total  = words.length;
    const isOpen = _openUnits.has(unit.id);
    const pct    = Math.round(seenCount / total * 100);
    const done   = seenCount === total;

    let shown = words;
    if (_filter === 'seen')   shown = words.filter(w => w.isSeen);
    if (_filter === 'unseen') shown = words.filter(w => !w.isSeen);
    if (shown.length === 0)   return '';

    return `
      <div class="vc-unit${isOpen ? ' vc-unit--open' : ''}">
        <button class="vc-unit-hd" data-unit="${unit.id}">
          <span class="vc-unit-ico">${unit.icon}</span>
          <div class="vc-unit-meta">
            <span class="vc-unit-name">${esc(unit.name)}</span>
            <div class="vc-prog-bar">
              <div class="vc-prog-fill${done ? ' vc-prog-fill--done' : ''}" style="width:${pct}%"></div>
            </div>
          </div>
          <span class="vc-unit-cnt">${seenCount}<span class="vc-unit-tot">/${total}</span></span>
          <span class="vc-arrow">${isOpen ? '▲' : '▼'}</span>
        </button>

        <div class="vc-body"${isOpen ? '' : ' hidden'}>
          <div class="vc-col-labels">
            <span>${isFrEs ? '🇫🇷 Français' : '🇦🇷 Español'}</span>
            <span>${isFrEs ? '🇦🇷 Español' : '🇫🇷 Français'}</span>
          </div>
          ${shown.map(w => _wordRow(w, mode)).join('')}
        </div>
      </div>`;
  }

  // ── Word row (uses <details> for example on click) ─────────────────────
  function _wordRow(w, mode) {
    const isFrEs = mode === 'fr-es';
    const src    = isFrEs ? w.fr          : w.es;
    const tgt    = isFrEs ? (w.esTarget || w.es) : w.fr;
    const exSrc  = isFrEs ? w.example.fr  : w.example.es;
    const exTgt  = isFrEs ? w.example.es  : w.example.fr;

    const dotCls = w.isMastered ? 'vc-dot--done' : w.isSeen ? 'vc-dot--seen' : 'vc-dot--new';

    return `
      <details class="vc-word">
        <summary class="vc-word-row">
          <span class="vc-dot ${dotCls}"></span>
          <span class="vc-src">${esc(src)}</span>
          <span class="vc-sep">→</span>
          <span class="vc-tgt">${esc(tgt)}</span>
          <span class="vc-ex-ico">💬</span>
        </summary>
        <div class="vc-ex">
          <div class="vc-ex-line vc-ex-line--src">${esc(exSrc)}</div>
          <div class="vc-ex-line vc-ex-line--tgt">${esc(exTgt)}</div>
        </div>
      </details>`;
  }

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return { render };
})();

window.Vocab = Vocab;
