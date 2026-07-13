/* ===== duel.js — Mode Duel, split-screen reveal-and-claim ===== */
const DUEL = (() => {

  const ROUNDS = 10;

  /* ── Word themes ────────────────────────────────────────────────────── */
  const THEMES = [
    {
      id: 'all', icon: '🎲', label: 'Tout mélangé',    labelEs: 'Todo mezclado',
      words: null, // filled after WORDS defined
    },
    {
      id: 'food', icon: '🍽️', label: 'Nourriture',          labelEs: 'Alimentos',
      words: [
        { en: 'water',     fr: 'eau',        es: 'agua'      },
        { en: 'bread',     fr: 'pain',       es: 'pan'       },
        { en: 'wine',      fr: 'vin',        es: 'vino'      },
        { en: 'coffee',    fr: 'café',       es: 'café'      },
        { en: 'milk',      fr: 'lait',       es: 'leche'     },
        { en: 'cheese',    fr: 'fromage',    es: 'queso'     },
        { en: 'apple',     fr: 'pomme',      es: 'manzana'   },
        { en: 'fish',      fr: 'poisson',    es: 'pescado'   },
        { en: 'chicken',   fr: 'poulet',     es: 'pollo'     },
        { en: 'rice',      fr: 'riz',        es: 'arroz'     },
        { en: 'orange',    fr: 'orange',     es: 'naranja'   },
        { en: 'tomato',    fr: 'tomate',     es: 'tomate'    },
        { en: 'egg',       fr: 'œuf',        es: 'huevo'     },
        { en: 'sugar',     fr: 'sucre',      es: 'azúcar'    },
        { en: 'to eat',    fr: 'manger',     es: 'comer'     },
        { en: 'to drink',  fr: 'boire',      es: 'beber'     },
        { en: 'meal',      fr: 'repas',      es: 'comida'    },
        { en: 'meat',      fr: 'viande',     es: 'carne'     },
        { en: 'soup',      fr: 'soupe',      es: 'sopa'      },
        { en: 'dessert',   fr: 'dessert',    es: 'postre'    },
      ],
    },
    {
      id: 'animals', icon: '🐾', label: 'Animaux',           labelEs: 'Animales',
      words: [
        { en: 'cat',       fr: 'chat',       es: 'gato'      },
        { en: 'dog',       fr: 'chien',      es: 'perro'     },
        { en: 'horse',     fr: 'cheval',     es: 'caballo'   },
        { en: 'bird',      fr: 'oiseau',     es: 'pájaro'    },
        { en: 'fish',      fr: 'poisson',    es: 'pez'       },
        { en: 'cow',       fr: 'vache',      es: 'vaca'      },
        { en: 'chicken',   fr: 'poule',      es: 'gallina'   },
        { en: 'rabbit',    fr: 'lapin',      es: 'conejo'    },
        { en: 'bear',      fr: 'ours',       es: 'oso'       },
        { en: 'lion',      fr: 'lion',       es: 'león'      },
        { en: 'tiger',     fr: 'tigre',      es: 'tigre'     },
        { en: 'elephant',  fr: 'éléphant',   es: 'elefante'  },
        { en: 'wolf',      fr: 'loup',       es: 'lobo'      },
        { en: 'snake',     fr: 'serpent',    es: 'serpiente' },
        { en: 'butterfly', fr: 'papillon',   es: 'mariposa'  },
      ],
    },
    {
      id: 'family', icon: '👨‍👩‍👧', label: 'Famille & corps',    labelEs: 'Familia & cuerpo',
      words: [
        { en: 'mother',    fr: 'mère',       es: 'madre'     },
        { en: 'father',    fr: 'père',       es: 'padre'     },
        { en: 'sister',    fr: 'sœur',       es: 'hermana'   },
        { en: 'brother',   fr: 'frère',      es: 'hermano'   },
        { en: 'friend',    fr: 'ami',        es: 'amigo'     },
        { en: 'child',     fr: 'enfant',     es: 'niño'      },
        { en: 'hand',      fr: 'main',       es: 'mano'      },
        { en: 'eye',       fr: 'œil',        es: 'ojo'       },
        { en: 'head',      fr: 'tête',       es: 'cabeza'    },
        { en: 'heart',     fr: 'cœur',       es: 'corazón'   },
        { en: 'mouth',     fr: 'bouche',     es: 'boca'      },
        { en: 'nose',      fr: 'nez',        es: 'nariz'     },
        { en: 'tooth',     fr: 'dent',       es: 'diente'    },
        { en: 'back',      fr: 'dos',        es: 'espalda'   },
        { en: 'leg',       fr: 'jambe',      es: 'pierna'    },
      ],
    },
    {
      id: 'places', icon: '🏙️', label: 'Ville & lieux',      labelEs: 'Ciudad & lugares',
      words: [
        { en: 'house',      fr: 'maison',     es: 'casa'        },
        { en: 'city',       fr: 'ville',      es: 'ciudad'      },
        { en: 'street',     fr: 'rue',        es: 'calle'       },
        { en: 'school',     fr: 'école',      es: 'escuela'     },
        { en: 'restaurant', fr: 'restaurant', es: 'restaurante' },
        { en: 'beach',      fr: 'plage',      es: 'playa'       },
        { en: 'park',       fr: 'parc',       es: 'parque'      },
        { en: 'market',     fr: 'marché',     es: 'mercado'     },
        { en: 'hospital',   fr: 'hôpital',    es: 'hospital'    },
        { en: 'airport',    fr: 'aéroport',   es: 'aeropuerto'  },
        { en: 'station',    fr: 'gare',       es: 'estación'    },
        { en: 'church',     fr: 'église',     es: 'iglesia'     },
        { en: 'hotel',      fr: 'hôtel',      es: 'hotel'       },
        { en: 'bridge',     fr: 'pont',       es: 'puente'      },
        { en: 'road',       fr: 'route',      es: 'camino'      },
      ],
    },
    {
      id: 'verbs', icon: '⚡', label: 'Verbes',              labelEs: 'Verbos',
      words: [
        { en: 'to eat',    fr: 'manger',      es: 'comer'     },
        { en: 'to drink',  fr: 'boire',       es: 'beber'     },
        { en: 'to sleep',  fr: 'dormir',      es: 'dormir'    },
        { en: 'to walk',   fr: 'marcher',     es: 'caminar'   },
        { en: 'to run',    fr: 'courir',      es: 'correr'    },
        { en: 'to speak',  fr: 'parler',      es: 'hablar'    },
        { en: 'to read',   fr: 'lire',        es: 'leer'      },
        { en: 'to write',  fr: 'écrire',      es: 'escribir'  },
        { en: 'to work',   fr: 'travailler',  es: 'trabajar'  },
        { en: 'to love',   fr: 'aimer',       es: 'amar'      },
        { en: 'to see',    fr: 'voir',        es: 'ver'       },
        { en: 'to know',   fr: 'savoir',      es: 'saber'     },
        { en: 'to come',   fr: 'venir',       es: 'venir'     },
        { en: 'to go',     fr: 'aller',       es: 'ir'        },
        { en: 'to give',   fr: 'donner',      es: 'dar'       },
        { en: 'to take',   fr: 'prendre',     es: 'tomar'     },
        { en: 'to want',   fr: 'vouloir',     es: 'querer'    },
        { en: 'to think',  fr: 'penser',      es: 'pensar'    },
        { en: 'to listen', fr: 'écouter',     es: 'escuchar'  },
        { en: 'to buy',    fr: 'acheter',     es: 'comprar'   },
      ],
    },
    {
      id: 'nature', icon: '🌿', label: 'Nature',              labelEs: 'Naturaleza',
      words: [
        { en: 'sun',       fr: 'soleil',      es: 'sol'       },
        { en: 'moon',      fr: 'lune',        es: 'luna'      },
        { en: 'star',      fr: 'étoile',      es: 'estrella'  },
        { en: 'sky',       fr: 'ciel',        es: 'cielo'     },
        { en: 'cloud',     fr: 'nuage',       es: 'nube'      },
        { en: 'rain',      fr: 'pluie',       es: 'lluvia'    },
        { en: 'snow',      fr: 'neige',       es: 'nieve'     },
        { en: 'wind',      fr: 'vent',        es: 'viento'    },
        { en: 'fire',      fr: 'feu',         es: 'fuego'     },
        { en: 'sea',       fr: 'mer',         es: 'mar'       },
        { en: 'river',     fr: 'rivière',     es: 'río'       },
        { en: 'mountain',  fr: 'montagne',    es: 'montaña'   },
        { en: 'tree',      fr: 'arbre',       es: 'árbol'     },
        { en: 'flower',    fr: 'fleur',       es: 'flor'      },
        { en: 'stone',     fr: 'pierre',      es: 'piedra'    },
        { en: 'ice',       fr: 'glace',       es: 'hielo'     },
        { en: 'earth',     fr: 'terre',       es: 'tierra'    },
        { en: 'forest',    fr: 'forêt',       es: 'bosque'    },
        { en: 'island',    fr: 'île',         es: 'isla'      },
        { en: 'desert',    fr: 'désert',      es: 'desierto'  },
      ],
    },
    {
      id: 'adjectives', icon: '🎨', label: 'Couleurs & adjectifs', labelEs: 'Colores & adjetivos',
      words: [
        { en: 'red',       fr: 'rouge',       es: 'rojo'      },
        { en: 'blue',      fr: 'bleu',        es: 'azul'      },
        { en: 'green',     fr: 'vert',        es: 'verde'     },
        { en: 'white',     fr: 'blanc',       es: 'blanco'    },
        { en: 'black',     fr: 'noir',        es: 'negro'     },
        { en: 'yellow',    fr: 'jaune',       es: 'amarillo'  },
        { en: 'big',       fr: 'grand',       es: 'grande'    },
        { en: 'small',     fr: 'petit',       es: 'pequeño'   },
        { en: 'good',      fr: 'bon',         es: 'bueno'     },
        { en: 'bad',       fr: 'mauvais',     es: 'malo'      },
        { en: 'beautiful', fr: 'beau',        es: 'hermoso'   },
        { en: 'fast',      fr: 'rapide',      es: 'rápido'    },
        { en: 'slow',      fr: 'lent',        es: 'lento'     },
        { en: 'happy',     fr: 'heureux',     es: 'feliz'     },
        { en: 'sad',       fr: 'triste',      es: 'triste'    },
        { en: 'hot',       fr: 'chaud',       es: 'caliente'  },
        { en: 'cold',      fr: 'froid',       es: 'frío'      },
        { en: 'new',       fr: 'nouveau',     es: 'nuevo'     },
        { en: 'old',       fr: 'vieux',       es: 'viejo'     },
        { en: 'strong',    fr: 'fort',        es: 'fuerte'    },
      ],
    },
    {
      id: 'argentina', icon: '🧉', label: 'Argentine',          labelEs: 'Argentina',
      words: [
        { en: 'work (lunf.)',   fr: 'boulot',         es: 'laburo'     },
        { en: 'mate (drink)',   fr: 'maté',           es: 'mate'       },
        { en: 'barbecue',      fr: 'barbecue',       es: 'asado'      },
        { en: 'hey! / buddy',  fr: 'eh ! / mec',     es: 'che'        },
        { en: 'cool (lunf.)',  fr: 'cool / sympa',   es: 'copado'     },
        { en: 'to eat (lunf.)',fr: 'manger (fam.)',   es: 'morfar'     },
        { en: 'chaos (lunf.)', fr: 'bordel',         es: 'quilombo'   },
        { en: 'guy (lunf.)',   fr: 'mec / gars',     es: 'chabón'     },
        { en: 'girl (lunf.)',  fr: 'fille / nana',   es: 'mina'       },
        { en: 'kid',           fr: 'gamin',          es: 'pibe'       },
        { en: 'bus',           fr: 'bus',            es: 'colectivo'  },
        { en: 'subway',        fr: 'métro',          es: 'subte'      },
        { en: 'flat/apartment',fr: 'appartement',    es: 'departamento'},
        { en: 'neighbourhood', fr: 'quartier',       es: 'barrio'     },
        { en: 'corner shop',   fr: 'épicerie',       es: 'kiosco'     },
        { en: 'tip / bonus',   fr: 'pourboire',      es: 'propina'    },
        { en: 'voseo (you)',   fr: 'toi (voséo)',    es: 'vos'        },
        { en: 'cool / nice',   fr: 'bien / super',   es: 'bárbaro'    },
        { en: 'half-time break',fr: 'mi-temps',      es: 'mediodía'   },
        { en: 'straw (mate)',   fr: 'paille (maté)',  es: 'bombilla'   },
      ],
    },
  ];

  /* Build "all" pool from every theme */
  const ALL_WORDS = [];
  const seen = new Set();
  THEMES.slice(1).forEach(t => t.words.forEach(w => {
    if (!seen.has(w.en)) { seen.add(w.en); ALL_WORDS.push(w); }
  }));
  THEMES[0].words = ALL_WORDS;

  /* ── Mode helpers ──────────────────────────────────────────────────── */
  function _getMode() {
    try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; }
  }
  function _ui(fr, es, mode) { return mode === 'es-fr' ? es : fr; }

  /* ── State ─────────────────────────────────────────────────────────── */
  let _st     = null;
  let _theme  = null;  // selected theme object

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ── Public API ─────────────────────────────────────────────────────── */

  function render(container) {
    if (!_theme)        renderThemePicker(container);
    else if (!_st)      renderStart(container);
    else if (_st.done)  renderEnd(container);
    else                renderRound(container);
  }

  function reset(container) { _st = null; _theme = null; render(container); }

  /* ── Theme picker ───────────────────────────────────────────────────── */

  function renderThemePicker(container) {
    const mode = _getMode();
    container.innerHTML = `
      <div class="du-picker">
        <div class="du-picker-hd">
          <div class="du-start-badge">⚔️ DUEL</div>
          <div class="du-picker-title">${_ui('Choisis un thème', 'Elige un tema', mode)}</div>
        </div>
        <div class="du-picker-grid">
          ${THEMES.map(t => `
            <button class="du-theme-card" data-tid="${t.id}">
              <span class="du-theme-ic">${t.icon}</span>
              <span class="du-theme-lbl">${mode === 'es-fr' ? (t.labelEs || t.label) : t.label}</span>
              <span class="du-theme-cnt">${t.words.length} ${_ui('mots', 'palabras', mode)}</span>
            </button>`).join('')}
        </div>
      </div>`;

    container.querySelectorAll('.du-theme-card').forEach(btn => {
      btn.addEventListener('click', () => {
        _theme = THEMES.find(t => t.id === btn.dataset.tid);
        renderStart(container);
      });
    });
  }

  /* ── Start screen ───────────────────────────────────────────────────── */

  function renderStart(container) {
    const mode = _getMode();
    const themeLabel = mode === 'es-fr' ? (_theme.labelEs || _theme.label) : _theme.label;
    container.innerHTML = `
      <div class="du-start">
        <div class="du-start-top">
          <button class="du-back-btn" id="du-back">‹ ${_ui('Thèmes', 'Temas', mode)}</button>
          <div class="du-start-badge">${_theme.icon} ${themeLabel}</div>
          <h2 class="du-start-title">${_ui('Qui est le plus rapide ?', '¿Quién es más rápido?', mode)}</h2>
          <p class="du-start-sub">
            ${_ui(
              'Un mot apparaît en anglais. Chaque joueur le traduit dans sa langue. On révèle, puis chaque joueur tape <strong>son propre côté</strong> s\'il a répondu en premier.',
              'Aparece una palabra en inglés. Cada jugador la traduce a su idioma. Se revela, y cada jugador toca <strong>su propio lado</strong> si respondió primero.',
              mode
            )}
          </p>
        </div>
        <div class="du-start-vs">
          <div class="du-start-side du-start-side--fr">
            <span class="du-start-flag">🇫🇷</span>
            <span class="du-start-lang">traduit en<br><b>français</b></span>
            <span class="du-start-arrow">← tape ici</span>
          </div>
          <div class="du-start-divider">vs</div>
          <div class="du-start-side du-start-side--ar">
            <span class="du-start-flag">🇦🇷</span>
            <span class="du-start-lang">traduce en<br><b>español</b></span>
            <span class="du-start-arrow">toca aquí →</span>
          </div>
        </div>
        <button class="du-start-btn" id="du-begin">
          ▶ ${_ui('Commencer', 'Empezar', mode)} · ${ROUNDS} ${_ui('manches', 'rondas', mode)}
        </button>
      </div>`;

    container.querySelector('#du-back').addEventListener('click', () => {
      _theme = null; renderThemePicker(container);
    });
    container.querySelector('#du-begin').addEventListener('click', () => {
      _st = { words: shuffle(_theme.words).slice(0, ROUNDS), round: 0, scores: [0, 0], done: false, locked: false };
      renderRound(container);
    });
  }

  /* ── Game round ─────────────────────────────────────────────────────── */

  function renderRound(container) {
    const mode  = _getMode();
    const word  = _st.words[_st.round];
    const pct   = (_st.round / ROUNDS) * 100;
    const themeLabel = mode === 'es-fr' ? (_theme.labelEs || _theme.label) : _theme.label;

    container.innerHTML = `
      <div class="du-game">

        <div class="du-word-area">
          <div class="du-prog-track"><div class="du-prog-fill" style="width:${pct}%"></div></div>
          <div class="du-word-meta">
            <span>${_theme.icon} ${themeLabel}</span>
            <span class="du-manche">${_st.round + 1} / ${ROUNDS}</span>
          </div>
          <div class="du-en-word">${word.en}</div>
          <div id="du-action">
            <button class="du-reveal-btn" id="du-reveal">${_ui('Révéler', 'Revelar', mode)}</button>
          </div>
        </div>

        <div class="du-halves">
          <div class="du-half du-half--fr" id="du-hfr">
            <div class="du-half-top">
              <span class="du-half-flag">🇫🇷</span>
              <span class="du-half-pts" id="du-s0">${_st.scores[0]}</span>
            </div>
            <div class="du-half-body" id="du-bfr"></div>
          </div>
          <div class="du-half du-half--ar" id="du-har">
            <div class="du-half-top">
              <span class="du-half-flag">🇦🇷</span>
              <span class="du-half-pts" id="du-s1">${_st.scores[1]}</span>
            </div>
            <div class="du-half-body" id="du-bar"></div>
          </div>
        </div>

      </div>`;

    document.getElementById('du-reveal').addEventListener('click', reveal);

    function reveal() {
      document.getElementById('du-bfr').innerHTML = `
        <div class="du-half-answer">${word.fr}</div>
        <div class="du-half-cue">← TAP ${_ui('si premier', 'si primero', mode)}</div>`;
      document.getElementById('du-bar').innerHTML = `
        <div class="du-half-answer">${word.es}</div>
        <div class="du-half-cue">TAP ${_ui('si premier', 'si primero', mode)} →</div>`;

      const action = document.getElementById('du-action');
      action.innerHTML = `<button class="du-tie-btn" id="du-tie">⚖️ ${_ui('Égalité', 'Empate', mode)}</button>`;
      document.getElementById('du-tie').addEventListener('click', e => {
        e.stopPropagation(); claim(-1);
      });

      const hfr = document.getElementById('du-hfr');
      const har  = document.getElementById('du-har');
      hfr.classList.add('du-half--ready');
      har.classList.add('du-half--ready');
      hfr.addEventListener('click', () => claim(0));
      har.addEventListener('click', () => claim(1));
    }

    function claim(w) {
      if (_st.locked) return;
      _st.locked = true;

      if (w >= 0) _st.scores[w]++;

      const hfr = document.getElementById('du-hfr');
      const har  = document.getElementById('du-har');

      if (w === 0) { hfr && hfr.classList.add('du-half--won'); har && har.classList.add('du-half--lost'); }
      if (w === 1) { har && har.classList.add('du-half--won'); hfr && hfr.classList.add('du-half--lost'); }

      setTimeout(() => {
        _st.locked = false;
        _st.round++;
        if (_st.round >= ROUNDS) { _st.done = true; renderEnd(container); }
        else renderRound(container);
      }, 1100);
    }
  }

  /* ── End screen ─────────────────────────────────────────────────────── */

  function renderEnd(container) {
    const mode     = _getMode();
    const [s0, s1] = _st.scores;
    let trophy, line1, line2;

    if (s0 > s1) {
      trophy = '🏆';
      line1  = _ui('Celui qui apprend le 🇫🇷 français', 'El que aprende el 🇫🇷 francés', mode);
      line2  = _ui('gagne le duel !', '¡gana el duelo!', mode);
    } else if (s1 > s0) {
      trophy = '🏆';
      line1  = _ui('Celui qui apprend l\'🇦🇷 espagnol', 'El que aprende el 🇦🇷 español', mode);
      line2  = _ui('gagne le duel !', '¡gana el duelo!', mode);
    } else {
      trophy = '🤝';
      line1  = _ui('Égalité !', '¡Empate!', mode);
      line2  = _ui('Match nul', 'Sin ganador', mode);
    }

    container.innerHTML = `
      <div class="du-end">
        <div class="du-end-trophy">${trophy}</div>
        <div class="du-end-winner">
          <div class="du-end-l1">${line1}</div>
          <div class="du-end-l2">${line2}</div>
        </div>
        <div class="du-end-scores">
          <div class="du-end-side du-end-side--fr">
            <span class="du-end-flag">🇫🇷</span>
            <span class="du-end-pts du-end-pts--fr">${s0}</span>
          </div>
          <span class="du-end-dash">—</span>
          <div class="du-end-side du-end-side--ar">
            <span class="du-end-pts du-end-pts--ar">${s1}</span>
            <span class="du-end-flag">🇦🇷</span>
          </div>
        </div>
        <div class="du-end-btns">
          <button class="du-replay-btn" id="du-replay">⚔️ ${_ui('Rejouer', 'Repetir', mode)}</button>
          <button class="du-theme-btn"  id="du-newtheme">🎲 ${_ui('Changer de thème', 'Cambiar tema', mode)}</button>
        </div>
      </div>`;

    container.querySelector('#du-replay').addEventListener('click', () => {
      _st = null; renderStart(container);
    });
    container.querySelector('#du-newtheme').addEventListener('click', () => {
      _st = null; _theme = null; renderThemePicker(container);
    });
  }

  return { render, reset };
})();

window.DUEL = DUEL;
