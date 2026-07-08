/* ===== i18n.js ===== */
const I18N = (() => {
  const S = {
    fr: {
      /* Home / Dashboard */
      'home.streak':          'jours de suite',
      'home.seen':            'expressions vues',
      'home.mastered':        'maîtrisées',
      'home.go':              '▶ Commencer la session',
      'home.nothingToday':    'Tout à jour !',
      'home.allDone':         'Parcours terminé !',
      'home.allDoneSub':      'Tu as vu toutes les expressions. Continue à réviser !',
      'home.parcours':        'Voir le curriculum',
      'home.today':           "Aujourd'hui",
      'home.reviews':         'révisions',
      'home.newCards':        'nouvelles',
      'home.currentUnit':     'Unité en cours',
      'home.greeting':        n => `Bonjour, ${n} 👋`,
      'home.greetingGeneric': 'Bonjour ! 👋',

      /* Curriculum */
      'cu.title':       'Curriculum',
      'cu.lesson':      'Leçon',
      'cu.practice':    'Exercices',
      'cu.cards':       'Flashcards',
      'cu.nothingHere': 'Rien à faire ici pour l\'instant !',
      'cu.allSeen':     'Toutes les cartes ont été vues ✓',

      /* Flashcard tab */
      'fct.title':     'Révisions rapides',
      'fct.sub':       'Mode reconnaissance — aucune frappe',
      'fct.reviewAll': n => `Tout réviser (${n} cartes)`,
      'fct.empty':     'Commence une leçon pour voir tes premières cartes !',
      'fct.byUnit':    'Par unité',
      'fct.cards':     'cartes',

      /* Review tab */
      'rev.title':         'Révisions SRS',
      'rev.dueTitle':      "Cartes dues aujourd'hui",
      'rev.dueSub':        "Révisez avant d'oublier",
      'rev.due':           'cartes à réviser',
      'rev.start':         'Réviser maintenant →',
      'rev.none':          'Rien à réviser — tout à jour !',
      'rev.upcomingTitle': 'À venir',
      'rev.tomorrow':      'Demain',
      'rev.in3days':       'Dans 3 jours',
      'rev.in7days':       'Cette semaine',
      'rev.statsTitle':    'Statistiques',
      'rev.statSeen':      'vues',
      'rev.statLearning':  'en cours',
      'rev.statMature':    'maîtrisées',

      /* Session */
      'sess.new':       'Nouvelle',
      'sess.review':    'Révision',
      'sess.reveal':    'Voir',
      'sess.again':     '🔄 À revoir',
      'sess.hard':      '😐 Difficile',
      'sess.easy':      '😊 Je savais',
      'sess.grammar':   'Grammaire',
      'sess.fillPlaceholder': 'Écris en espagnol…',
      'sess.seeAnswer': 'Voir la réponse',
      'sess.doneTitle': 'Fait !',
      'sess.doneSub':   'Reviens demain pour tes révisions.',
      'sess.statNew':       'nouvelles',
      'sess.statReviewed':  'révisées',
      'sess.statCorrect':   'correct',
      'sess.homeBtn':   'Retour →',

      /* Lesson */
      'lesson.sections':         n => `${n} section${n > 1 ? 's' : ''} · expressions & dialogues`,
      'lesson.objective':        'Lis et écoute — tu vas tout reconnaître !',
      'lesson.startBtn':         'Commencer →',
      'lesson.nextBtn':          'Suivant →',
      'lesson.testBtn':          'Pratiquer →',
      'lesson.endTitle':         'Leçon terminée !',
      'lesson.endSub':           u => `Prêt(e) à pratiquer les expressions de "${u}" ?`,
      'lesson.reviewBtn':        '← Revoir',
      'lesson.listenBtn':        'Écouter',
      'lesson.expressionsTitle': 'Expressions',
      'lesson.dialogueTitle':    'Dialogue',
      'lesson.back':             '← Retour',

      /* Mode */
      'mode.title':    'Changer de direction',
      'mode.current':  l => `Actuel : <b>${l}</b>`,
      'mode.switch':   l => `Passer en : <b>${l}</b>`,
      'mode.warn':     'Tes progrès sont conservés séparément.',
      'mode.ok':       'Changer',
      'mode.cancel':   'Annuler',
      'mode.lbl.fr-es': '🇫🇷 → 🇦🇷 Espagnol argentin',
      'mode.lbl.es-fr': '🇦🇷 → 🇫🇷 Français',

      /* Verb tables */
      'verbs.tableSubj': 'Pronom',
      'verbs.tableForm': 'Forme',

      /* Toast */
      'toast.welcome':    n => `Bienvenue ${n} ! 🎉`,
      'toast.modeChange': 'Direction changée !',
      'toast.unitDone':   'Unité complète !',
      'toast.ttsOn':      '🔊 Son activé',
      'toast.ttsOff':     '🔇 Son désactivé',
    },

    es: {
      /* Home / Dashboard */
      'home.streak':          'días seguidos',
      'home.seen':            'expresiones vistas',
      'home.mastered':        'dominadas',
      'home.go':              '▶ Empezar la sesión',
      'home.nothingToday':    '¡Al día!',
      'home.allDone':         '¡Recorrido completo!',
      'home.allDoneSub':      'Ya viste todas las expresiones. ¡Seguí repasando!',
      'home.parcours':        'Ver el currículo',
      'home.today':           'Hoy',
      'home.reviews':         'repasos',
      'home.newCards':        'nuevas',
      'home.currentUnit':     'Unidad actual',
      'home.greeting':        n => `¡Hola, ${n}! 👋`,
      'home.greetingGeneric': '¡Hola! 👋',

      /* Curriculum */
      'cu.title':       'Currículo',
      'cu.lesson':      'Lección',
      'cu.practice':    'Ejercicios',
      'cu.cards':       'Flashcards',
      'cu.nothingHere': '¡Nada por hacer aquí por ahora!',
      'cu.allSeen':     '¡Todas las tarjetas vistas ✓',

      /* Flashcard tab */
      'fct.title':     'Repaso rápido',
      'fct.sub':       'Modo reconocimiento — sin escritura',
      'fct.reviewAll': n => `Repasar todo (${n} tarjetas)`,
      'fct.empty':     '¡Completá una lección para ver tus primeras tarjetas!',
      'fct.byUnit':    'Por unidad',
      'fct.cards':     'tarjetas',

      /* Review tab */
      'rev.title':         'Repasos SRS',
      'rev.dueTitle':      'Tarjetas de hoy',
      'rev.dueSub':        'Repasá antes de olvidar',
      'rev.due':           'tarjetas pendientes',
      'rev.start':         'Repasar ahora →',
      'rev.none':          '¡Sin repasos — al día!',
      'rev.upcomingTitle': 'Próximas',
      'rev.tomorrow':      'Mañana',
      'rev.in3days':       'En 3 días',
      'rev.in7days':       'Esta semana',
      'rev.statsTitle':    'Estadísticas',
      'rev.statSeen':      'vistas',
      'rev.statLearning':  'aprendiendo',
      'rev.statMature':    'dominadas',

      /* Session */
      'sess.new':       'Nueva',
      'sess.review':    'Repaso',
      'sess.reveal':    'Ver',
      'sess.again':     '🔄 Otra vez',
      'sess.hard':      '😐 Difícil',
      'sess.easy':      '😊 Lo sabía',
      'sess.grammar':   'Gramática',
      'sess.fillPlaceholder': 'Escribí en francés…',
      'sess.seeAnswer': 'Ver la respuesta',
      'sess.doneTitle': '¡Listo!',
      'sess.doneSub':   'Volvé mañana para tus repasos.',
      'sess.statNew':       'nuevas',
      'sess.statReviewed':  'repasadas',
      'sess.statCorrect':   'correcto',
      'sess.homeBtn':   'Volver →',

      /* Lesson */
      'lesson.sections':         n => `${n} sección${n > 1 ? 'es' : ''} · expresiones y diálogos`,
      'lesson.objective':        '¡Leé y escuchá — vas a reconocer todo!',
      'lesson.startBtn':         'Empezar →',
      'lesson.nextBtn':          'Siguiente →',
      'lesson.testBtn':          'Practicar →',
      'lesson.endTitle':         '¡Lección terminada!',
      'lesson.endSub':           u => `¿Listo/a para practicar las expresiones de "${u}"?`,
      'lesson.reviewBtn':        '← Repasar',
      'lesson.listenBtn':        'Escuchar',
      'lesson.expressionsTitle': 'Expresiones',
      'lesson.dialogueTitle':    'Diálogo',
      'lesson.back':             '← Volver',

      /* Mode */
      'mode.title':    'Cambiar dirección',
      'mode.current':  l => `Actual: <b>${l}</b>`,
      'mode.switch':   l => `Cambiar a: <b>${l}</b>`,
      'mode.warn':     'Tu progreso se guarda por separado.',
      'mode.ok':       'Cambiar',
      'mode.cancel':   'Cancelar',
      'mode.lbl.fr-es': '🇫🇷 → 🇦🇷 Español argentino',
      'mode.lbl.es-fr': '🇦🇷 → 🇫🇷 Francés',

      /* Verb tables */
      'verbs.tableSubj': 'Pronombre',
      'verbs.tableForm': 'Forma',

      /* Toast */
      'toast.welcome':    n => `¡Bienvenido/a ${n}! 🎉`,
      'toast.modeChange': '¡Dirección cambiada!',
      'toast.unitDone':   '¡Unidad completa!',
      'toast.ttsOn':      '🔊 Sonido activado',
      'toast.ttsOff':     '🔇 Sonido desactivado',
    }
  };

  function _lang() {
    try { return (Storage.getProfile().mode || 'fr-es') === 'fr-es' ? 'fr' : 'es'; }
    catch { return 'fr'; }
  }

  function t(key, ...args) {
    const val = S[_lang()][key];
    if (typeof val === 'function') return val(...args);
    return val != null ? String(val) : key;
  }

  return { t };
})();
window.I18N = I18N;
