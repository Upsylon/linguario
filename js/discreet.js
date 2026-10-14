/* ===== discreet.js — Mode discret : la page se déguise en article de presse financière =====
   Entrée : double-clic sur le logo 🌊 du header.
   Sortie : clic sur la date en haut à gauche (uniquement).
   Encadré épinglé à droite : ‹ › (thème précédent / suivant, aussi ← / →) · mot à deviner.
   Le mot est déguisé en dépêche (sa phrase d'exemple) en 2ᵉ position du fil « En continu », entre 2 fausses dépêches.
   La réponse affichée est la phrase traduite.
   Double-clic n'importe où : la dépêche LinguaRío est remplacée par une vraie fausse dépêche économique
   (R/S désactivés) ; nouveau double-clic pour la faire revenir.
   Scroll rapide : bascule aussi en mode finance (sans retour automatique).
   R = raté (lien « Commenter »), S = su (lien « Partager »), aussi au clavier : 1er appui enregistre et affiche la réponse, 2e appui = mot suivant. */
const Discreet = (() => {

  const KEY        = 'langapp:discreet';
  const THEME_KEY  = 'langapp:discreet-theme';
  const FAST_PX    = 500;   // scroll rapide = plus de FAST_PX parcourus en FAST_MS
  const FAST_MS    = 250;
  const PAPER      = 'L\'Observateur des Marchés';
  const FAVICON    = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" rx="2" fill="#1a3a5c"/>' +
    '<path d="M3 12l3-4 3 2 4-6" stroke="#fff" stroke-width="1.6" fill="none"/></svg>');

  // Corps d'article : '## ' = intertitre ; {{texte|n}} = lien vers l'article n.
  const ARTICLES = [
    {
      kicker: 'Banques centrales',
      title: 'Les banquiers centraux face au casse-tête d\'une inflation qui refuse de disparaître',
      lead: 'Après deux années de resserrement monétaire, les instituts d\'émission hésitent entre prudence et assouplissement. Les marchés, eux, ont déjà tranché.',
      author: 'Claire Vautier',
      body: [
        'Le scénario d\'un atterrissage en douceur reste le plus probable aux yeux d\'une majorité d\'économistes, mais la dernière ligne droite s\'annonce plus longue que prévu. L\'inflation sous-jacente, notamment dans les services, continue de résister aux hausses de taux successives, alors même que les prix de l\'énergie se sont nettement détendus.',
        'Dans les salles de marché, les anticipations de baisse de taux se sont multipliées ces dernières semaines. Les courbes de rendement intègrent désormais plusieurs mouvements d\'ici à la fin de l\'année prochaine, un calendrier que les banquiers centraux se gardent bien de valider publiquement.',
        '## Le spectre de l\'erreur de calendrier',
        '« Le risque principal est de relâcher la pression trop tôt », résume un gérant obligataire basé à Genève. Une erreur de calendrier pourrait raviver les tensions sur les prix et contraindre les autorités à un revirement coûteux en crédibilité. Les précédents historiques, souvent cités dans les notes de recherche, invitent à la prudence.',
        'À l\'inverse, maintenir des taux élevés trop longtemps ferait peser un risque croissant sur l\'activité. Le crédit aux entreprises ralentit, les faillites progressent dans certains secteurs, et le marché du logement reste sous pression dans plusieurs pays — un sujet que nous avons détaillé dans notre {{analyse sur l\'immobilier résidentiel|4}}.',
        '## Le franc, toujours valeur refuge',
        'Les devises reflètent cette incertitude. Le franc suisse conserve son statut de valeur refuge, tandis que l\'euro oscille au gré des publications de données conjoncturelles. Les exportateurs helvétiques, déjà confrontés à une demande européenne atone, surveillent de près l\'évolution du taux de change.',
        'Les investisseurs institutionnels privilégient pour l\'heure les échéances courtes, dans l\'attente d\'un signal plus clair. Les fonds monétaires ont enregistré des souscriptions record, signe d\'une prudence généralisée que les gérants actions, eux, commencent à remettre en question — voir notre article sur {{la rotation sectorielle en Bourse|3}}.',
        '## Des communications scrutées à la virgule près',
        'Les prochaines réunions de politique monétaire seront décortiquées par les analystes. Au-delà de la décision elle-même, c\'est le ton des communications — et les projections internes — qui pourrait faire bouger les lignes. La moindre nuance dans le vocabulaire employé peut suffire à déplacer les marchés obligataires.',
        'Pour les épargnants, la période impose de revoir certaines habitudes. Les rendements des comptes rémunérés devraient progressivement baisser, rendant à nouveau attractives des classes d\'actifs délaissées depuis la remontée des taux.',
      ],
    },
    {
      kicker: 'Gestion de fortune',
      title: 'Gestion privée : la course à la taille s\'accélère en Suisse',
      lead: 'Pression sur les marges, coûts réglementaires, investissements technologiques : les acteurs de taille moyenne cherchent la bonne stratégie pour rester dans la course.',
      author: 'Marc-Antoine Berset',
      body: [
        'La place financière suisse vit une phase de consolidation discrète mais continue. Les établissements de taille intermédiaire, longtemps protégés par la fidélité de leur clientèle, voient leurs marges s\'éroder sous l\'effet conjugué de la concurrence et des exigences réglementaires.',
        'Les coûts de conformité ont, selon plusieurs dirigeants interrogés, presque doublé en une décennie. Lutte contre le blanchiment, échange automatique d\'informations, protection des investisseurs : chaque nouvelle règle mobilise des équipes et des systèmes dont seuls les grands acteurs peuvent amortir le coût.',
        '## La technologie, nouveau terrain de jeu',
        'La digitalisation de la relation client constitue un autre défi de taille. Les attentes d\'une nouvelle génération d\'investisseurs, habitués aux applications mobiles et à la transparence tarifaire, obligent les banques à repenser leur offre de services. Les outils d\'{{intelligence artificielle|5}} commencent d\'ailleurs à s\'inviter dans le quotidien des conseillers.',
        'Plusieurs dirigeants du secteur estiment que la taille critique a sensiblement augmenté en une décennie. Les rapprochements, qu\'ils prennent la forme de fusions ou de partenariats technologiques, devraient se poursuivre dans les prochaines années.',
        '## La spécialisation, une alternative crédible',
        'Pour autant, la spécialisation reste une voie crédible. Les maisons qui misent sur une expertise pointue — succession, entrepreneurs, philanthropie — parviennent à préserver leur positionnement sans chercher à tout prix la croissance externe.',
        'Certaines boutiques de gestion indépendantes se distinguent ainsi par une approche très personnalisée, avec un nombre restreint de clients par conseiller. Un modèle qui séduit une clientèle fortunée en quête de proximité, mais dont la rentabilité dépend fortement de la stabilité des équipes.',
        '## La guerre des talents',
        'Reste la question des talents. Les conseillers expérimentés, porteurs d\'une clientèle fidèle, sont plus courtisés que jamais, ce qui alimente une inflation salariale que les comptes de résultat peinent à absorber. Les départs groupés d\'équipes entières ne sont plus rares.',
        'Dans ce contexte, l\'environnement de taux joue un rôle ambivalent : il a soutenu les revenus d\'intérêts ces deux dernières années, mais la {{détente monétaire attendue|0}} pourrait rapidement inverser la tendance.',
      ],
    },
    {
      kicker: 'Matières premières',
      title: 'Le pétrole sous tension, entre offre abondante et risques géopolitiques',
      lead: 'Les cours de l\'or noir évoluent dans un couloir étroit. Les analystes s\'attendent pourtant à une volatilité accrue d\'ici la fin de l\'exercice.',
      author: 'Julien Rochat',
      body: [
        'Le marché pétrolier semble pris en étau. D\'un côté, une production mondiale robuste et des stocks confortables pèsent sur les prix. De l\'autre, les tensions géopolitiques entretiennent une prime de risque que les opérateurs ne peuvent ignorer.',
        'Les grands producteurs tentent de maintenir une discipline collective, mais les divergences d\'intérêts entre membres compliquent l\'exercice. Chaque réunion fait l\'objet de spéculations intenses sur d\'éventuels ajustements de quotas.',
        '## Une demande aux signaux contradictoires',
        'La demande, elle, envoie des signaux contradictoires. La consommation des économies émergentes progresse, tandis que les pays industrialisés poursuivent leur transition vers des sources d\'énergie moins carbonées. Les ventes de véhicules électriques, en particulier, commencent à peser sur les projections de long terme.',
        'Les compagnies pétrolières continuent de privilégier les retours aux actionnaires plutôt que l\'augmentation massive des investissements d\'exploration. Une discipline saluée par les marchés, mais qui pourrait limiter l\'offre à moyen terme et provoquer de nouvelles tensions sur les prix.',
        '## L\'or au plus haut',
        'Du côté des métaux, l\'or poursuit sa trajectoire ascendante, soutenu par les achats des banques centrales et la recherche de protection des investisseurs. Le métal jaune profite également de la perspective d\'une {{baisse des taux directeurs|0}}, qui réduit le coût d\'opportunité de le détenir.',
        'Le cuivre, baromètre de l\'activité industrielle, reste quant à lui suspendu aux perspectives de la demande asiatique. Les besoins liés à l\'électrification et aux {{centres de données|5}} soutiennent toutefois les projections à long terme.',
        '## Quelle place dans un portefeuille ?',
        'Pour les investisseurs privés, les matières premières restent un diversifiant apprécié, mais leur volatilité invite à la mesure. La plupart des gérants recommandent une exposition limitée, de préférence via des véhicules diversifiés plutôt que des paris directionnels.',
      ],
    },
    {
      kicker: 'Marchés actions',
      title: 'Bourse : la rotation sectorielle s\'invite dans les portefeuilles',
      lead: 'Après une longue domination des valeurs technologiques, les gérants redécouvrent les secteurs cycliques et les petites capitalisations.',
      author: 'Sophie Delacrétaz',
      body: [
        'La concentration de la performance boursière sur une poignée de valeurs géantes inquiète de plus en plus d\'investisseurs. Plusieurs gérants affirment avoir commencé à réduire leur exposition au profit de secteurs jugés plus raisonnablement valorisés.',
        'Les indices pondérés par la capitalisation n\'ont jamais été aussi dépendants d\'un petit nombre de titres. Une situation qui, selon certains stratèges, expose les investisseurs passifs à un risque de concentration qu\'ils sous-estiment souvent.',
        '## Les cycliques reprennent des couleurs',
        'Les valeurs industrielles, la santé et certaines banques profitent de ce mouvement de rééquilibrage. Les petites et moyennes capitalisations, délaissées depuis plusieurs années, affichent des décotes historiquement élevées, ce qui attire les investisseurs à la recherche de valeur.',
        'La perspective d\'une {{politique monétaire plus accommodante|0}} constitue un catalyseur important : les petites entreprises, plus endettées et plus sensibles au coût du crédit, seraient les premières bénéficiaires d\'une baisse des taux.',
        '## Une rotation encore fragile',
        'Cette rotation reste toutefois fragile. Chaque publication de résultats des grands noms de la technologie suffit à relancer l\'appétit pour la croissance, rappelant que le marché n\'a pas encore choisi son camp. Les investissements massifs liés à l\'{{intelligence artificielle|5}} continuent de nourrir l\'optimisme.',
        'Le marché suisse, réputé défensif grâce au poids de ses grandes valeurs de la santé et de la consommation, a sous-performé lors des phases d\'euphorie mais résiste mieux dans les corrections.',
        '## Le conseil des professionnels',
        'Pour les épargnants, le message des professionnels est constant : diversifier, éviter de concentrer son exposition sur un seul thème, et garder un horizon de placement suffisamment long pour traverser les phases de turbulence. Un rééquilibrage régulier du portefeuille reste la meilleure protection contre les excès du marché.',
      ],
    },
    {
      kicker: 'Immobilier',
      title: 'Immobilier résidentiel : la pénurie de logements soutient les prix',
      lead: 'Malgré la remontée des coûts de financement, les prix de la pierre résistent dans les grands centres urbains. En cause : une offre structurellement insuffisante.',
      author: 'Nicolas Perrenoud',
      body: [
        'Les promoteurs le répètent depuis plusieurs trimestres : les procédures d\'autorisation s\'allongent et les recours se multiplient, freinant la mise sur le marché de nouveaux logements. Dans les agglomérations les plus dynamiques, le taux de vacance atteint des niveaux historiquement bas.',
        'La croissance démographique, portée notamment par l\'immigration de travail, accentue encore la pression. Les régions lémanique et zurichoise concentrent les tensions les plus fortes, avec des délais de recherche qui s\'allongent pour les ménages.',
        '## Les acheteurs reprennent espoir',
        'Côté acheteurs, la détente des taux hypothécaires redonne un peu d\'air aux ménages, même si les exigences de fonds propres continuent d\'exclure une partie des primo-accédants. Les banques constatent un regain de demandes de financement depuis le {{changement de ton des banques centrales|0}}.',
        'Les courtiers notent également un intérêt croissant pour les régions périphériques, où les prix restent plus accessibles. Le télétravail partiel, désormais bien ancré, rend ces localisations plus attractives qu\'avant la pandémie.',
        '## Les institutionnels toujours présents',
        'Les investisseurs institutionnels, caisses de pension en tête, maintiennent une allocation significative à l\'immobilier, attirés par la stabilité des revenus locatifs. Les fonds immobiliers cotés ont d\'ailleurs retrouvé les faveurs des marchés après une période de décote, un mouvement qui s\'inscrit dans la {{rotation observée en Bourse|3}}.',
        'Pour les gérants de fortune, l\'immobilier reste une brique centrale des portefeuilles de la clientèle privée, comme le rappelle notre enquête sur {{la consolidation du secteur|1}}.',
        '## Des enjeux sociaux grandissants',
        'Les experts s\'accordent sur un point : sans accélération de la construction, la tension sur les loyers devrait persister, avec des conséquences sociales et politiques que les autorités ne peuvent plus ignorer. Plusieurs cantons étudient des mesures pour simplifier les procédures et densifier les zones déjà bâties.',
      ],
    },
    {
      kicker: 'Tendances',
      title: 'Intelligence artificielle : les entreprises passent de l\'expérimentation au déploiement',
      lead: 'Les projets pilotes laissent place à des usages à grande échelle. Les directions financières, elles, réclament désormais des preuves de retour sur investissement.',
      author: 'Laura Messerli',
      body: [
        'Pendant deux ans, les entreprises ont multiplié les tests. Aujourd\'hui, la question n\'est plus de savoir s\'il faut adopter ces outils, mais comment les intégrer durablement dans les processus métiers.',
        'Les fonctions support — juridique, finance, service client — sont les premières concernées. Les gains de productivité annoncés sont parfois spectaculaires, mais leur mesure précise reste un exercice délicat, faute d\'indicateurs standardisés.',
        '## Des investissements colossaux',
        'Les investissements dans les infrastructures de calcul atteignent des montants considérables, ce qui alimente un débat récurrent sur la rentabilité future de ces dépenses. Certains observateurs y voient les prémices d\'une bulle, d\'autres une transformation comparable à l\'arrivée d\'internet.',
        'Ces dépenses ont des effets en cascade sur d\'autres marchés : la demande en électricité et en {{métaux industriels comme le cuivre|2}} progresse, tandis que les valeurs liées aux semi-conducteurs continuent de {{tirer les indices boursiers|3}}.',
        '## La finance en première ligne',
        'Le secteur financier figure parmi les plus avancés. Analyse documentaire, détection de fraudes, préparation des entretiens clients : les cas d\'usage se multiplient, y compris dans la {{gestion de fortune|1}}, où les conseillers disposent désormais d\'assistants capables de synthétiser un dossier en quelques secondes.',
        'Les régulateurs, de leur côté, rappellent que la responsabilité finale reste humaine. Transparence des modèles, protection des données et gestion des biais figurent en tête de leurs préoccupations.',
        '## Former plutôt que remplacer',
        'Pour les salariés, l\'enjeu porte davantage sur la formation que sur la substitution. Les entreprises qui réussissent leur transition sont celles qui accompagnent leurs équipes dans l\'apprentissage de ces nouveaux outils, en impliquant les métiers dès la conception des projets.',
      ],
    },
  ];

  const FEED_CATS = ['Marchés', 'Devises', 'Entreprises', 'Économie', 'Taux', 'Matières premières', 'Immobilier'];
  const DECOYS = [
    ['Devises', 'Le franc se raffermit légèrement face à l\'euro'],
    ['Marchés', 'Les Bourses européennes ouvrent en ordre dispersé'],
    ['Taux', 'Le rendement obligataire à dix ans se replie'],
    ['Entreprises', 'Un groupe industriel relève ses prévisions annuelles'],
    ['Économie', 'Le moral des consommateurs se stabilise en octobre'],
    ['Matières premières', 'Le Brent recule après la publication des stocks'],
    ['Immobilier', 'Les demandes de permis de construire en hausse'],
    ['Marchés', 'Les valeurs bancaires soutiennent l\'indice phare'],
    ['Économie', 'Le chômage reste stable selon les derniers chiffres'],
    ['Entreprises', 'Résultats trimestriels conformes aux attentes du consensus'],
    ['Devises', 'Le dollar marque une pause avant les statistiques américaines'],
    ['Taux', 'Les marchés anticipent un statu quo lors de la prochaine réunion'],
  ];

  const OPINIONS = [
    ['Philippe Jaccard', 'La Suisse doit cesser de considérer le franc fort comme une fatalité'],
    ['Anne-Sophie Gilliéron', 'Pourquoi la prévoyance professionnelle mérite un vrai débat'],
    ['Thomas Ruchet', 'Les entreprises familiales, angle mort de la politique économique'],
    ['Hélène Dubuis', 'Inflation : ne crions pas victoire trop tôt'],
    ['Daniel Kohler', 'L\'innovation financière a besoin de règles claires, pas de plus de règles'],
  ];

  const TICKER = [
    ['SMI', 12045], ['CAC 40', 7612], ['DAX', 19480], ['EURO STOXX 50', 4950],
    ['EUR/CHF', 0.9412], ['USD/CHF', 0.8631], ['Or (oz)', 2650], ['Brent', 76.4],
  ];

  let _el = null, _artIdx = -1, _tickTimer = null;
  let _themes = [], _themeIdx = 0, _queue = [], _word = null, _answered = false, _hidden = false, _decoys = [];
  let _prevTitle = '', _prevIcon = '';

  // ── Init ──────────────────────────────────────────────────────────────
  function init() {
    const logo = document.querySelector('.app-logo');
    if (logo) logo.addEventListener('dblclick', e => { e.preventDefault(); enter(); });
    document.addEventListener('keydown', _onKey);
    if (_get(KEY) === '1') enter();
  }

  function enter() {
    if (_el) return;
    _set(KEY, '1');
    _el = document.createElement('div');
    _el.id = 'discreet';
    document.body.appendChild(_el);
    document.body.classList.add('discreet-on');

    _prevTitle = document.title;
    const ico = document.querySelector('link[rel="icon"]');
    if (ico) { _prevIcon = ico.href; ico.href = FAVICON; }

    _buildThemes();
    const saved = _themes.findIndex(t => t.id === _get(THEME_KEY));
    _themeIdx = saved >= 0 ? saved : 0;

    _renderShell();
    _showArticle(Math.floor(Math.random() * ARTICLES.length));
    _setTheme(_themeIdx);
    window.addEventListener('scroll', _onScroll, { passive: true });
    _tickTimer = setInterval(_paintTicker, 7000);
  }

  function exit() {
    if (!_el) return;
    _set(KEY, '0');
    clearInterval(_tickTimer);
    window.removeEventListener('scroll', _onScroll);
    _el.remove(); _el = null;
    document.body.classList.remove('discreet-on');
    document.title = _prevTitle;
    const ico = document.querySelector('link[rel="icon"]');
    if (ico && _prevIcon) ico.href = _prevIcon;
  }

  // ── Page ──────────────────────────────────────────────────────────────
  function _renderShell() {
    const date = new Date().toLocaleDateString('fr-CH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    _el.innerHTML = `
      <div class="dz-top">
        <span class="dz-date">${date}</span>
        <span class="dz-top-r"><span>Newsletters</span><span>E-paper</span><span class="dz-acc">Mon compte</span></span>
      </div>
      <header class="dz-mast">
        <div class="dz-paper">${PAPER}</div>
        <nav class="dz-nav">
          <span>Suisse</span><span>Monde</span><span class="on">Économie</span><span>Finance</span><span>Opinions</span><span>Culture</span><span>Sciences</span><span>Sport</span><span>Lifestyle</span>
        </nav>
      </header>
      <div class="dz-ticker" id="dz-ticker"></div>
      <div class="dz-grid">
        <article class="dz-art" id="dz-art"></article>
        <aside class="dz-side">
          <div class="dz-box dz-op">
            <div class="dz-box-h">Opinions</div>
            <div id="dz-op"></div>
          </div>
          <div class="dz-box dz-lex">
            <div class="dz-box-h">En continu</div>
            <div class="dz-lex-nav">
              <button id="dz-prev" aria-label="Précédent">‹</button><button id="dz-nxt" aria-label="Suivant">›</button>
            </div>
            <div class="dz-feedwrap">
              <div id="dz-decoy1"></div>
              <div class="dz-feed">
                <div class="dz-feed-meta" id="dz-meta"></div>
                <div class="dz-lex-w" id="dz-w"><span id="dz-q"></span> <span class="dz-lex-t" id="dz-t"></span></div>
              </div>
              <div id="dz-decoy2"></div>
            </div>
            <div class="dz-lex-btns">
              <button id="dz-r" class="dz-link">Commenter</button><span>·</span><button id="dz-s" class="dz-link">Partager</button>
            </div>
          </div>
          <div class="dz-box dz-mostbox">
            <div class="dz-box-h">Les plus lus</div>
            <ol class="dz-most" id="dz-most"></ol>
          </div>
        </aside>
      </div>
      <footer class="dz-foot">
        <div class="dz-foot-in">
          <div class="dz-foot-name">${PAPER}</div>
          <div class="dz-foot-links"><span>Qui sommes-nous</span><span>Charte éditoriale</span><span>Abonnements</span><span>Publicité</span><span>Contact</span><span>Protection des données</span><span>Conditions générales</span></div>
          <div class="dz-foot-c">© ${new Date().getFullYear()} ${PAPER}. Tous droits réservés. Toute reproduction interdite sans autorisation.</div>
        </div>
      </footer>`;

    _el.querySelector('.dz-date').addEventListener('click', exit);
    _el.querySelector('#dz-prev').addEventListener('click', () => _setTheme(_themeIdx - 1));
    _el.querySelector('#dz-nxt').addEventListener('click', () => _setTheme(_themeIdx + 1));
    _el.querySelector('#dz-r').addEventListener('click', () => _grade(false));
    _el.querySelector('#dz-s').addEventListener('click', () => _grade(true));
    _el.addEventListener('dblclick', e => {
      if (e.target.closest('button, a, .dz-date')) return;
      try { window.getSelection().removeAllRanges(); } catch (err) {}
      _setHidden(!_hidden);
    });
    _el.addEventListener('click', e => {
      const a = e.target.closest('[data-art]');
      if (a) { e.preventDefault(); _showArticle(+a.dataset.art); }
    });
    _paintTicker();
    _el.querySelector('#dz-op').innerHTML = OPINIONS.slice().sort(() => Math.random() - 0.5).slice(0, 3)
      .map(([who, t]) => `<div class="dz-op-i"><div class="dz-op-a">${who}</div><div class="dz-op-t">${t}</div></div>`).join('');
  }

  function _showArticle(idx) {
    _artIdx = idx;
    const a = ARTICLES[idx];
    const others = ARTICLES.map((o, i) => ({ o, i })).filter(x => x.i !== idx);
    const related = others.slice(0, 3);
    document.title = a.title.slice(0, 60) + ' — ' + PAPER;

    const link = s => s.replace(/\{\{(.+?)\|(\d+)\}\}/g, (_, txt, n) => `<a href="#" data-art="${n}">${txt}</a>`);
    _el.querySelector('#dz-art').innerHTML = `
      <div class="dz-crumb">Économie <span>›</span> ${a.kicker}</div>
      <div class="dz-kicker"><span class="dz-badge">Abonnés</span>${a.kicker}</div>
      <h1 class="dz-title">${a.title}</h1>
      <p class="dz-lead">${a.lead}</p>
      ${a.body.map(p => p.startsWith('## ') ? `<h2>${p.slice(3)}</h2>` : `<p>${link(p)}</p>`).join('')}
      <div class="dz-tags">${[a.kicker, 'Suisse', 'Conjoncture', 'Investissement'].map(t => `<a href="#" data-art="${(idx + 1 + t.length) % ARTICLES.length}">${t}</a>`).join('')}</div>
      <div class="dz-also">
        <div class="dz-box-h">À lire aussi</div>
        ${related.map(({ o, i }) => `
          <a class="dz-also-item" href="#" data-art="${i}">
            <span class="dz-also-k">${o.kicker}</span>
            <span class="dz-also-t">${o.title}</span>
            <span class="dz-also-l">${o.lead}</span>
          </a>`).join('')}
      </div>`;
    _el.querySelector('#dz-most').innerHTML = others.slice(0, 4)
      .map(({ o, i }) => `<li><a href="#" data-art="${i}">${o.title}</a></li>`).join('');
    _ignoreScrollUntil = Date.now() + 400; // retour en haut programmé ≠ scroll rapide
    window.scrollTo(0, 0);
  }

  function _paintTicker() {
    const t = _el && _el.querySelector('#dz-ticker');
    if (!t) return;
    const q = TICKER.map(([name, base]) => {
      const pct = (Math.random() - 0.48) * 1.6;
      const dec = base < 10 ? 4 : base < 1000 ? 2 : 0;
      const val = (base * (1 + pct / 100)).toLocaleString('fr-CH', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      const chg = `<i class="${pct >= 0 ? 'up' : 'dn'}">${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%</i>`;
      return { name, val, chg };
    });
    t.innerHTML = q.map(x => `<span class="dz-tk"><b>${x.name}</b> ${x.val} ${x.chg}</span>`).join('');
  }

  // ── Thèmes & mots ─────────────────────────────────────────────────────
  function _mode() { return (window.Storage && Storage.getProfile().mode) || 'fr-es'; }

  function _buildThemes() {
    const isFrEs = _mode() === 'fr-es';
    const units  = (window.CURRICULUM_B1 || []).filter(u => (u.words || []).length);
    const refs   = (window.VOCAB_REFS || []).filter(r => (r.words || []).length);
    const all    = [...units, ...refs];
    _shorts = {};
    all.forEach(u => { _shorts[u.id] = _shortName(u.name); });
    _themes = [
      { id: 'all', name: isFrEs ? 'Tout' : 'Todo', words: all.flatMap(u => u.words.map(w => ({ ...w, _uid: u.id }))) },
      ...all.map(u => ({ id: u.id, name: isFrEs ? u.name : (u.nameEs || u.name), words: u.words.map(w => ({ ...w, _uid: u.id })) })),
    ];
  }

  // Nom de thème en 1 mot (« Salutations & politesse » → Salutations, « Cours du 2 juin — Loisirs… » → Loisirs)
  let _shorts = {};
  function _shortName(n) {
    let s = /^Leçon/.test(n) ? n.split('·')[1].split('—')[0] : n.includes('—') ? n.split('—')[1] : n;
    s = s.trim().replace(/^(Le |La |Les |L'|Des |Du )/i, '');
    return s.split(/[\s,&·()—-]+/)[0];
  }

  function _setTheme(i) {
    if (!_themes.length) return;
    if (_hidden) { _paintHiddenFeed(); return; } // mode finance : ‹ › renouvellent juste le fil
    _themeIdx = (i + _themes.length) % _themes.length;
    const th = _themes[_themeIdx];
    _set(THEME_KEY, th.id);
    _queue = _orderQueue(th.words);
    _nextWord();
  }

  // Comme le mode Pratiquer : à revoir > nouveaux > sus
  function _orderQueue(words) {
    const mode = _mode();
    const st = w => (window.VocabPractice && VocabPractice.getWordStatus) ? VocabPractice.getWordStatus(mode, w._uid, w.en) : 'new';
    const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const learning = [], fresh = [], known = [];
    words.forEach(w => { const s = st(w); (s === 'learning' ? learning : s === 'new' ? fresh : known).push(w); });
    return [...shuffle(learning), ...shuffle(fresh), ...shuffle(known)];
  }

  // Mode "panique" : la dépêche du mot devient une dépêche économique ordinaire
  function _setHidden(on) {
    _hidden = on;
    const t = _el.querySelector('#dz-t');
    if (on) {
      _setLine('#dz-t', '');
      _paintHiddenFeed();
    } else {
      _paintDecoys(); // les 3 dépêches se renouvellent à chaque double-clic
      _setLine('#dz-t', '');
      _answered = false;
      _setLine('#dz-q', _sentence(_word, true));
    }
  }

  // Fil 100 % finance : 3 dépêches économiques (double-clic, puis à chaque ‹ ›)
  function _paintHiddenFeed() {
    _paintDecoys();
    const d = _pick(DECOYS.filter(x => !_decoys.includes(x)));
    _paintMeta(d[0]);
    _setLine('#dz-q', d[1]);
  }

  // Phrase + réponse partagent un bloc de 2 lignes (comme les autres dépêches) → hauteur constante.
  // Police réduite seulement si les deux ne tiennent pas en 2 lignes (≈ 6 phrases sur 1400).
  function _setLine(sel, text) {
    _el.querySelector(sel).textContent = text;
    const box = _el.querySelector('#dz-w');
    box.style.fontSize = '';
    let fs = parseFloat(getComputedStyle(box).fontSize);
    while (box.scrollHeight > box.clientHeight + 1 && fs > 10) { fs -= 0.5; box.style.fontSize = fs + 'px'; }
  }

  function _grade(ok) {
    if (!_word || _hidden) return;
    if (_answered) { _nextWord(); return; }
    _answered = true;
    if (window.VocabPractice && VocabPractice.markResult) { try { VocabPractice.markResult(_mode(), _word, ok); } catch (e) {} }
    if (!ok) _queue.splice(Math.min(4, _queue.length), 0, _word); // raté → revient un peu plus tard
    _setLine('#dz-t', _sentence(_word, false));
  }

  // Phrase d'exemple (côté question ou réponse) ; à défaut, le mot lui-même
  function _sentence(w, question) {
    const isFrEs = _mode() === 'fr-es';
    const ex = w.example || {};
    const exQ = isFrEs ? ex.fr : ex.es, exA = isFrEs ? ex.es : ex.fr;
    if (exQ && exA) return question ? exQ : exA;
    return question ? (isFrEs ? w.fr : w.es) : (isFrEs ? (w.esTarget || w.es) : w.fr);
  }

  function _nextWord() {
    if (_hidden) return;
    if (!_queue.length) _queue = _orderQueue(_themes[_themeIdx].words);
    _word = _queue.shift() || null;
    if (!_el || !_word) return;
    _answered = false;
    _setLine('#dz-q', _sentence(_word, true));
    _setLine('#dz-t', '');
    _paintDecoys(); // les 3 dépêches changent ensemble (mot suivant ou ‹ ›)
  }

  const _hhmm = d => d.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' });
  const _pick = a => a[Math.floor(Math.random() * a.length)];

  // Heure de la dépêche du mot : entre les deux fausses dépêches (change à chaque mot)
  let _decoyTimes = [Date.now(), Date.now()];
  function _paintMeta(cat) {
    const [t1, t2] = _decoyTimes;
    const t = new Date(t2 + Math.random() * (t1 - t2));
    _el.querySelector('#dz-meta').textContent = `${_hhmm(t)} · ${cat || _pick(FEED_CATS)}`;
  }

  // 2 fausses dépêches (1ʳᵉ et 3ᵉ du fil) — fixes pendant qu'on répond, changent avec le mot suivant
  function _paintDecoys() {
    const d1 = _pick(DECOYS);
    let d2; do { d2 = _pick(DECOYS); } while (d2 === d1);
    _decoys = [d1, d2];
    const t1 = Date.now() - (1 + Math.floor(Math.random() * 3)) * 60000;
    const t2 = t1 - (18 + Math.floor(Math.random() * 20)) * 60000;
    _decoyTimes = [t1 - 60000, t2 + 60000];
    const item = (d, t) => `<div class="dz-feed"><div class="dz-feed-meta">${_hhmm(new Date(t))} · ${d[0]}</div><div class="dz-feed-txt">${d[1]}</div></div>`;
    _el.querySelector('#dz-decoy1').innerHTML = item(d1, t1);
    _el.querySelector('#dz-decoy2').innerHTML = item(d2, t2);
    if (_word && !_hidden) _paintMeta(_shorts[_word._uid]);
  }

  // Scroll rapide → mode finance (seulement dans ce sens ; retour par double-clic)
  let _scrollHist = [], _lastY = 0, _ignoreScrollUntil = 0;
  function _onScroll() {
    const now = Date.now(), y = window.scrollY;
    const dy = Math.abs(y - _lastY);
    _lastY = y;
    if (!_el || _hidden || now < _ignoreScrollUntil) { _scrollHist = []; return; }
    _scrollHist.push([now, dy]);
    _scrollHist = _scrollHist.filter(([t]) => now - t <= FAST_MS);
    if (_scrollHist.reduce((sum, [, d]) => sum + d, 0) > FAST_PX) {
      _scrollHist = [];
      _setHidden(true);
    }
  }

  function _onKey(e) {
    if (!_el || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input, textarea, [contenteditable]')) return;
    const k = e.key.toLowerCase();
    if      (k === 's')          { e.preventDefault(); _grade(true); }
    else if (k === 'r')          { e.preventDefault(); _grade(false); }
    else if (k === 'arrowleft')  { e.preventDefault(); _setTheme(_themeIdx - 1); }
    else if (k === 'arrowright') { e.preventDefault(); _setTheme(_themeIdx + 1); }
  }

  // ── Storage (fail-safe) ───────────────────────────────────────────────
  function _get(k)    { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function _set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  return { init, enter, exit };
})();

document.addEventListener('DOMContentLoaded', () => Discreet.init());
