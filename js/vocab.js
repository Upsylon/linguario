/* ===== vocab.js — Lexique : révision vocabulaire par thème v4 ===== */
const Vocab = (() => {

  let _el        = null;
  let _filter    = 'all';
  let _search    = '';
  let _openUnits = new Set();
  let _inited    = false;
  let _lastMode  = null;

  const GROUPS = [
    { key: 'a1', label: 'A1', descFr: 'Débutant',      descEs: 'Principiante', color: '#6ee7b7' },
    { key: 'a2', label: 'A2', descFr: 'Intermédiaire', descEs: 'Intermedio',   color: '#60a5fa' },
    { key: 'b1', label: 'B1', descFr: 'Avancé',        descEs: 'Avanzado',     color: '#c084fc' },
  ];

  // ── Public ────────────────────────────────────────────────────────────
  function render(el) {
    _el = el;
    const mode = Storage.getProfile().mode || 'fr-es';
    if (mode !== _lastMode) {
      _lastMode = mode;
      _filter = 'all';
      _search = '';
      _openUnits = new Set();
      _inited = false;
    }
    if (!_inited) {
      _inited = true;
      const cur = XP.getCurrentUnitId();
      if (cur) _openUnits.add(cur);
    }
    _draw();
  }

  // ── Main render ───────────────────────────────────────────────────────
  function _draw(preserveScroll) {
    if (!_el) return;

    // Save scroll and search focus before DOM replacement
    const list       = _el.querySelector('.vc-list');
    const savedScroll = (preserveScroll && list) ? list.scrollTop : 0;
    const prevInp    = _el.querySelector('#vc-search');
    const hadFocus   = prevInp && prevInp === document.activeElement;
    const savedCur   = hadFocus ? prevInp.selectionStart : null;

    const mode   = Storage.getProfile().mode || 'fr-es';
    const prog   = XP.getUnitProgress();
    const units  = window.CURRICULUM_B1 || [];
    const isFrEs = mode === 'fr-es';
    const curId  = XP.getCurrentUnitId();
    const q      = _search.toLowerCase().trim();

    // Enrich words with seen/mastered status
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

    // Apply text search
    const searched = q
      ? rich.map(u => ({
          ...u,
          words: u.words.filter(w =>
            (isFrEs ? w.fr : w.es).toLowerCase().includes(q) ||
            (isFrEs ? (w.esTarget || w.es) : w.fr).toLowerCase().includes(q)
          ),
        })).filter(u => u.words.length > 0)
      : rich;

    // Global stats (always from full data)
    const total    = rich.reduce((s, u) => s + u.words.length, 0);
    const seen     = rich.reduce((s, u) => s + u.seenCount, 0);
    const pct      = total ? Math.round(seen / total * 100) : 0;
    const toSeeCnt = rich
      .filter(u => u.seenCount > 0)
      .reduce((s, u) => s + u.words.filter(w => !w.isSeen).length, 0);

    // Apply status filter
    const vis = searched.filter(({ seenCount, words }) => {
      if (_filter === 'seen')   return seenCount > 0 || words.some(w => w.isSeen);
      if (_filter === 'unseen') return seenCount > 0 && words.some(w => !w.isSeen);
      return true;
    });

    const searchCount = vis.reduce((s, u) => s + u.words.length, 0);

    // Groups with stats from full data
    const groups = GROUPS.map(g => {
      const groupAll = rich.filter(u => u.unit.level === g.key);
      return {
        ...g,
        desc:         isFrEs ? g.descFr : g.descEs,
        items:        vis.filter(u => u.unit.level === g.key),
        seenInGroup:  groupAll.reduce((s, u) => s + u.seenCount, 0),
        totalInGroup: groupAll.reduce((s, u) => s + u.words.length, 0),
      };
    }).filter(g => g.items.length > 0);

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
          <div class="vc-topbar-row2">
            <div class="vc-search-wrap">
            <span class="vc-search-ico">🔍</span>
            <input class="vc-search" type="search" id="vc-search"
                   placeholder="${isFrEs ? 'Rechercher un mot…' : 'Buscar una palabra…'}"
                   value="${esc(_search)}" autocomplete="off" />
            ${q ? `<button class="vc-search-clr" id="vc-search-clr" aria-label="Effacer">✕</button>` : ''}
            </div>
            ${groups.length > 0 && !q
              ? `<button class="vc-expand-all" id="vc-expand-all" title="${isFrEs ? 'Tout ouvrir / fermer' : 'Abrir / cerrar todo'}">⊞</button>`
              : ''}
          </div>
          ${q ? `<div class="vc-search-info">${searchCount} ${isFrEs ? `résultat${searchCount !== 1 ? 's' : ''}` : `resultado${searchCount !== 1 ? 's' : ''}`}</div>` : ''}
        </div>

        ${!q ? `<div class="vc-practice-global">
          <button class="vc-practice-global-btn" id="vc-practice-global">
            🃏 ${isFrEs ? 'Pratiquer le Lexique' : 'Practicar el Léxico'}
          </button>
        </div>` : ''}

        <div class="vc-list">
          ${groups.length === 0
            ? `<div class="vc-empty">
                 <div class="vc-empty-ico">${q ? '🔍' : '📖'}</div>
                 <p class="vc-empty-msg">${q
                   ? (isFrEs ? `Aucun résultat pour « ${esc(q)} »` : `Sin resultados para « ${esc(q)} »`)
                   : _emptyMsg(isFrEs)}</p>
               </div>`
            : groups.map(g => _groupHtml(g, mode, curId, !!q)).join('')
          }
        </div>

        <div class="vc-legend">
          <span class="vc-leg-item"><span class="vc-dot vc-dot--new"></span>${isFrEs ? 'Pas vu' : 'No visto'}</span>
          <span class="vc-leg-item"><span class="vc-dot vc-dot--seen"></span>${isFrEs ? 'Vu' : 'Visto'}</span>
          <span class="vc-leg-item"><span class="vc-dot vc-dot--done"></span>${isFrEs ? 'Maîtrisé' : 'Dominado'}</span>
        </div>

      </div>`;

    // Restore scroll position
    const newList = _el.querySelector('.vc-list');
    if (newList && savedScroll > 0) newList.scrollTop = savedScroll;

    // TTS delegation — play target word when 🔊 button is clicked in expanded detail
    if (newList && window.TTS && TTS.supported()) {
      newList.addEventListener('click', e => {
        const btn = e.target.closest('.vc-tts-btn');
        if (btn) { e.stopPropagation(); TTS.speak(btn.dataset.tts, btn.dataset.lang); }
      });
    }

    // Bind filter tabs
    _el.querySelectorAll('.vc-tab').forEach(btn => {
      btn.addEventListener('click', () => { _filter = btn.dataset.f; _draw(false); });
    });

    // Bind search — restore focus & cursor ONLY if user was already in the field
    const inp = _el.querySelector('#vc-search');
    if (inp) {
      if (hadFocus) {
        inp.focus();
        const pos = savedCur !== null ? savedCur : inp.value.length;
        try { inp.setSelectionRange(pos, pos); } catch (_) {}
      }
      inp.addEventListener('input', () => {
        const pos = inp.selectionStart;
        _search = inp.value;
        _draw(true);
        const ni = _el.querySelector('#vc-search');
        if (ni) { ni.focus(); try { ni.setSelectionRange(pos, pos); } catch(_) {} }
      });
    }

    const clr = _el.querySelector('#vc-search-clr');
    if (clr) clr.addEventListener('click', () => { _search = ''; _draw(false); });

    // Expand / collapse all
    const expAll = _el.querySelector('#vc-expand-all');
    if (expAll && !q) {
      expAll.addEventListener('click', () => {
        const allIds = (window.CURRICULUM_B1 || []).map(u => u.id);
        const anyOpen = allIds.some(id => _openUnits.has(id));
        if (anyOpen) {
          _openUnits.clear();
        } else {
          allIds.forEach(id => _openUnits.add(id));
        }
        _draw(true);
      });
    }

    // Unit toggles (inline, no redraw)
    _el.querySelectorAll('.vc-toggle-btn').forEach(btn => {
      // While searching, toggles are disabled (units forced open)
      if (q) return;
      btn.addEventListener('click', () => _toggle(btn.dataset.unit));
    });

    // Play buttons (lesson)
    _el.querySelectorAll('.vc-play-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const unit = (window.CURRICULUM_B1 || []).find(u => u.id === btn.dataset.unit);
        if (unit && window.App) App.showLessonForUnit(unit);
      });
    });

    // Global practice button (top of Lexique)
    const globalBtn = _el.querySelector('#vc-practice-global');
    if (globalBtn) {
      globalBtn.addEventListener('click', () => {
        const mode = Storage.getProfile().mode || 'fr-es';
        if (window.VocabPractice) VocabPractice.start(_el, null, mode);
      });
    }

    // Per-unit practice buttons (inside each unit body)
    _el.querySelectorAll('.vc-practice-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const mode = Storage.getProfile().mode || 'fr-es';
        const unit = (window.CURRICULUM_B1 || []).find(u => u.id === btn.dataset.unit);
        if (unit && window.VocabPractice) VocabPractice.start(_el, unit, mode);
      });
    });
  }

  // ── Toggle unit (no full redraw) ──────────────────────────────────────
  function _toggle(id) {
    const open   = _openUnits.has(id);
    if (open) _openUnits.delete(id); else _openUnits.add(id);
    const unitEl = _el && _el.querySelector(`.vc-unit[data-id="${id}"]`);
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
  function _groupHtml({ key, label, desc, color, items, seenInGroup, totalInGroup }, mode, curId, forceOpen) {
    const inner = items.map(u => _unitHtml(u, mode, curId, forceOpen)).filter(Boolean).join('');
    if (!inner) return '';
    const grpPct   = totalInGroup ? Math.round(seenInGroup / totalInGroup * 100) : 0;
    const grpDone  = seenInGroup === totalInGroup && totalInGroup > 0;
    return `
      <div class="vc-group">
        <div class="vc-grp-hd">
          <span class="vc-grp-pip" style="background:${color}"></span>
          <span class="vc-grp-lv" style="color:${color}">${label}</span>
          <span class="vc-grp-desc">${desc}</span>
          <span class="vc-grp-stat" style="color:${color}">${seenInGroup}/${totalInGroup}</span>
        </div>
        ${inner}
      </div>`;
  }

  // ── Unit block ────────────────────────────────────────────────────────
  function _unitHtml({ unit, words, seenCount }, mode, curId, forceOpen) {
    const isFrEs = mode === 'fr-es';
    const total  = words.length;
    const isOpen = forceOpen || _openUnits.has(unit.id);
    const isCur  = unit.id === curId;
    const pct    = Math.round(seenCount / total * 100);
    const done   = seenCount === total;

    let shown = words;
    if (_filter === 'seen')   shown = words.filter(w => w.isSeen);
    if (_filter === 'unseen') shown = words.filter(w => !w.isSeen);
    if (shown.length === 0)   return '';

    const revLbl  = isFrEs ? 'Réviser' : 'Repasar';
    const colA    = isFrEs ? '🇫🇷 Français' : '🇦🇷 Español';
    const colB    = isFrEs ? '🇦🇷 Español'  : '🇫🇷 Français';
    const curTag  = isCur
      ? `<span class="vc-cur-tag">${isFrEs ? 'En cours' : 'En curso'}</span>`
      : '';

    return `
      <div class="vc-unit${isOpen ? ' vc-unit--open' : ''}${isCur ? ' vc-unit--cur' : ''}" data-id="${unit.id}">
        <div class="vc-unit-hd">
          <button class="vc-toggle-btn" data-unit="${unit.id}" ${forceOpen ? 'disabled' : ''}>
            <span class="vc-ico">${unit.icon}</span>
            <div class="vc-meta">
              <div class="vc-name-row">
                <span class="vc-uname">${esc(unit.name)}</span>
                ${curTag}
              </div>
              <div class="vc-pbar">
                <div class="vc-pfill${done ? ' vc-pfill--done' : ''}" style="width:${pct}%"></div>
              </div>
            </div>
            <span class="vc-cnt">${seenCount}<span class="vc-ctot">/${total}</span></span>
            <span class="vc-arrow">${isOpen ? '▲' : '▼'}</span>
          </button>
          <button class="vc-play-btn" data-unit="${unit.id}" title="${revLbl}">▶</button>
        </div>
        <div class="vc-body"${isOpen ? '' : ' hidden'}>
          <div class="vc-practice-cta">
            <button class="vc-practice-btn" data-unit="${unit.id}">
              🃏 ${isFrEs ? 'Pratiquer ce thème' : 'Practicar este tema'}
            </button>
          </div>
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
    const isFrEs  = mode === 'fr-es';
    const src     = isFrEs ? w.fr : w.es;
    const tgt     = isFrEs ? (w.esTarget || w.es) : w.fr;
    const exSrc   = isFrEs ? w.example.fr : w.example.es;
    const exTgt   = isFrEs ? w.example.es : w.example.fr;
    const tgtLang = isFrEs ? 'es' : 'fr';
    const dotCls  = w.isMastered ? 'vc-dot--done' : w.isSeen ? 'vc-dot--seen' : 'vc-dot--new';
    const dotLbl  = w.isMastered
      ? (isFrEs ? 'Maîtrisé' : 'Dominado')
      : w.isSeen
        ? (isFrEs ? 'Vu' : 'Visto')
        : (isFrEs ? 'Pas encore vu' : 'No visto');
    const hasTTS  = window.TTS && TTS.supported();
    const listenLbl = isFrEs ? 'Écouter' : 'Escuchar';

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
          ${hasTTS ? `<button class="vc-tts-btn" data-tts="${esc(tgt)}" data-lang="${tgtLang}" title="${listenLbl}">🔊 ${esc(tgt)}</button>` : ''}
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
