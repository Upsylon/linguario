/* ===== conjugation.js v2 — Exercices entrelacés (nouveau design) ===== */
const Conjugation = (() => {

  let currentEx   = null;
  let answered    = false;
  let onNext      = null;
  let lastCorrect = false;

  function buildSessionQueue(mode, count = 10) {
    const isES = mode === 'fr-es';
    const exercises   = isES ? window.ES_EXERCISES : window.FR_EXERCISES;
    const tenseGroups = isES ? window.ES_TENSE_GROUPS : window.FR_TENSE_GROUPS;
    if (!exercises || !exercises.length) return [];

    const words = isES ? window.WORDS_FR_ES : window.WORDS_ES_FR;
    const b1p   = window.SRS ? SRS.b1Progress(words || [], mode) : 0;

    let allowed = [...(tenseGroups.A1 || []), ...(tenseGroups.A2 || [])];
    if (b1p >= 60) allowed = [...allowed, ...(tenseGroups.B1 || [])];

    const available = exercises.filter(ex => allowed.includes(ex.tense));
    if (!available.length) return exercises.slice(0, count);

    // Entrelacement : 3-4 temps différents mélangés
    const tenses = [...new Set(available.map(e => e.tense))];
    const selTenses = shuffle(tenses).slice(0, Math.min(4, tenses.length));
    const byTense = {};
    selTenses.forEach(t => { byTense[t] = shuffle(available.filter(e => e.tense === t)); });

    const result = [];
    let i = 0;
    while (result.length < count) {
      const t = selTenses[i % selTenses.length];
      if (byTense[t] && byTense[t].length) result.push(byTense[t].pop());
      i++;
      if (i > count * selTenses.length * 2) break;
    }
    return shuffle(result).slice(0, count);
  }

  function render(ex) {
    currentEx = ex;
    answered  = false;

    const langLabel = ex.lang === 'es' ? '🇦🇷 Espagnol argentin' : '🇫🇷 Français';
    const verbXref  = ex.lang === 'es'
      ? `<b>${ex.verb}</b> <span style="color:var(--text-3)">= ${ex.verbFr}</span>`
      : `<b>${ex.verb}</b> <span style="color:var(--text-3)">= ${ex.verbEs}</span>`;

    const promptHtml = esc(ex.prompt)
      .replace('___', '<span class="conj-blank">___</span>');

    return `
<div class="conj-card popIn" id="conj-card">
  <div>
    <span class="conj-pill">${langLabel} · ${esc(ex.tenseLabel)}</span>
  </div>
  <p class="text-sm text-muted mb-1">${verbXref}</p>
  <div class="conj-prompt">${promptHtml}</div>

  <div class="conj-input-row">
    <input type="text" class="conj-input" id="conj-input"
           placeholder="${I18N.t('conj.placeholder')}"
           autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
    <button class="btn btn-primary" id="conj-check">${I18N.t('conj.checkBtn')}</button>
  </div>

  <div class="conj-feedback" id="conj-fb"></div>

  ${ex.lang === 'es' && ex.subject && ex.subject.includes('Vos')
    ? `<div class="conj-vos-note">${I18N.t('conj.vosNote')}</div>`
    : ''}

  <p class="conj-hint-text">${I18N.t('conj.hintPrefix')} ${esc(ex.hint)}</p>

  <div class="conj-next-wrap" id="conj-next">
    <button class="btn btn-primary btn-full" id="conj-next-btn">${I18N.t('conj.nextBtn')}</button>
  </div>
</div>`;
  }

  function bindEvents(container, nextCb) {
    onNext = nextCb;
    const input   = container.querySelector('#conj-input');
    const check   = container.querySelector('#conj-check');
    const nextBtn = container.querySelector('#conj-next-btn');

    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { if (!answered) checkAnswer(container); else if (onNext) onNext(lastCorrect); }
      });
      setTimeout(() => { try { input.focus(); } catch(_) {} }, 80);
    }
    if (check) check.addEventListener('click', () => { if (!answered) checkAnswer(container); });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (onNext) onNext(lastCorrect); });
  }

  function checkAnswer(container) {
    if (answered || !currentEx) return;
    const input  = container.querySelector('#conj-input');
    const fb     = container.querySelector('#conj-fb');
    const check  = container.querySelector('#conj-check');
    const nextW  = container.querySelector('#conj-next');
    if (!input || !fb) return;

    const raw        = input.value.trim();
    const isCorrect  = normalize(raw) === normalize(currentEx.answer);
    answered    = true;
    lastCorrect = isCorrect;

    input.classList.add(isCorrect ? 'correct' : 'wrong');
    input.disabled = true;
    if (check) check.style.display = 'none';

    fb.classList.add('show', isCorrect ? 'correct' : 'wrong');
    fb.innerHTML = isCorrect
      ? I18N.t('conj.correct', esc(currentEx.answer))
      : I18N.t('conj.wrong', esc(currentEx.answer)) + (raw ? I18N.t('conj.wrongYou', esc(raw)) : '');

    if (nextW) nextW.classList.add('show');

    if (window.App) App.recordConjResult(isCorrect);
  }

  function normalize(s) { return (s || '').toLowerCase().trim(); }

  function renderVerbTable(verbKey, lang) {
    const data = lang === 'es' ? window.ES_VERBS[verbKey] : window.FR_VERBS[verbKey];
    if (!data) return '<p class="text-muted">Verbe introuvable.</p>';

    const subjectsES = ['Yo','Vos','Él/Ella','Nosotros','Ustedes','Ellos'];
    const subjectsFR = ['Je','Tu','Il/Elle','Nous','Vous','Ils/Elles'];
    const subjects = lang === 'es' ? subjectsES : subjectsFR;

    const tensesES = {
      pInd:'Présent indicatif', pret:'Prétérit (passé simple)',
      imp:'Imparfait', fut:'Futur', cond:'Conditionnel', sub:'Subjonctif présent'
    };
    const tensFR = {
      pres:'Présent indicatif', imp:'Imparfait',
      fut:'Futur simple', cond:'Conditionnel', subj:'Subjonctif présent'
    };
    const tenses = lang === 'es' ? tensesES : tensFR;

    const translation = lang === 'es' ? data.fr : data.es;

    let html = `
      <div class="card mb-2 fadeUp">
        <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.5rem;">
          <div>
            <strong style="font-size:1.2rem;font-weight:900;">${verbKey}</strong>
            <span class="text-muted" style="margin-left:.5rem;">${translation}</span>
          </div>
          <span class="badge badge-pos">${data.type || ''}</span>
        </div>
        ${lang === 'es' && data.impVos ? `<p class="text-sm mt-1">Impératif vos : <b>${data.impVos}</b></p>` : ''}
        ${lang === 'fr' && data.pc ? `<p class="text-sm mt-1">Passé composé : <b>${data.pcAux || 'avoir'} ${data.pc}</b></p>` : ''}
      </div>`;

    Object.entries(tenses).forEach(([key, label]) => {
      const forms = data[key];
      if (!forms) return;
      html += `
        <div class="card card-sm mb-2">
          <div class="tense-section">
            <h4>${label}</h4>
            <table class="vtable">
              <thead><tr><th>${I18N.t('verbs.tableSubj')}</th><th>${I18N.t('verbs.tableForm')}</th></tr></thead>
              <tbody>`;
      subjects.forEach((subj, i) => {
        const isVos = lang === 'es' && i === 1;
        html += `<tr class="${isVos ? 'vos-row' : ''}">
          <td class="td-subj">${subj}</td>
          <td class="td-form">${forms[i] || '—'}</td>
        </tr>`;
      });
      html += `</tbody></table></div></div>`;
    });
    return html;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { buildSessionQueue, render, bindEvents, renderVerbTable, esc };
})();

window.Conjugation = Conjugation;
