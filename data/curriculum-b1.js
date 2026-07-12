/* ===== curriculum-b1.js — Parcours A1→B1 ===== */
/* 30 unités × 10 mots · dialogues · grammaire MC · exemples */

const CURRICULUM_B1 = [

  /* ── A1 ─────────────────────────────────────────────────────────── */
  {
    id:'u01', level:'a1', icon:'👋', xp:50, name:'Salutations & politesse',
    dialogue:{
      note:'En Argentine on dit "buen día" (singulier, pas "buenos días") et "chau" (de l\'it. "ciao") à la place de "adiós". "Che" sert d\'interpellation universelle — appeler quelqu\'un, exprimer la surprise, ou simplement souligner ce qu\'on dit.',
      lines:[
        {es:'— ¡Buen día! ¿Cómo estás, che?', fr:'— Bonjour ! Comment vas-tu ?'},
        {es:'— ¡Muy bien! ¿Y vos?',            fr:'— Très bien ! Et toi ?'},
        {es:'— Bárbaro. Un café, por favor.',   fr:'— Super. Un café, s\'il te plaît.'},
        {es:'— ¡Con mucho gusto! Gracias.',     fr:'— Avec plaisir ! Merci.'},
      ]
    },
    grammar:{
      title:'Voseo argentin',
      note:'En Argentine "vos" remplace "tú". Conjugaison : hablás (tú hablas), tenés (tienes), sos (eres). L\'accent tombe sur la dernière syllabe — sans accent, la forme sonne castillan et non argentin.',
      examples:[
        {fr:'Tu veux du café ?', es:'¿Querés café?'},
        {fr:'Tu es argentin ?',  es:'¿Sos argentino?'},
      ],
      question:'Comment dit-on "tu veux" en argentin ?',
      options:['quieres','querés','quieren'],
      answer:1,
    },
    phrase:{fr:'Bonjour, je m\'appelle…', es:'Hola, me llamo…'},
    words:[
      {en:'hello',        fr:'bonjour',          es:'hola',          esTarget:'hola',       example:{fr:'Je dis bonjour à mon voisin.', es:'Le digo hola a mi vecino.'}},
      {en:'goodbye',      fr:'au revoir',         es:'chau',          esTarget:'chau',       example:{fr:'Au revoir, à demain !',        es:'¡Chau, hasta mañana!'}},
      {en:'please',       fr:'s\'il te plaît',    es:'por favor',     esTarget:'por favor',  example:{fr:'Un café, s\'il te plaît.',     es:'Un café, por favor.'}},
      {en:'thank you',    fr:'merci',             es:'gracias',       esTarget:'gracias',    example:{fr:'Merci beaucoup !',             es:'¡Muchas gracias!'}},
      {en:'excuse me',    fr:'excusez-moi',       es:'perdón',        esTarget:'perdón',     example:{fr:'Excuse-moi, je suis en retard.', es:'Perdón, llego tarde.'}},
      {en:'yes',          fr:'oui',               es:'sí',            esTarget:'sí',         example:{fr:'Oui, j\'aime le café.',        es:'Sí, me gusta el café.'}},
      {en:'no',           fr:'non',               es:'no',            esTarget:'no',         example:{fr:'Non, merci.',                  es:'No, gracias.'}},
      {en:'good morning', fr:'bonjour (matin)',   es:'buen día',      esTarget:'buen día',   example:{fr:'Je dis bonjour en arrivant.',  es:'Digo buen día al llegar.'}},
      {en:'good evening', fr:'bonsoir',           es:'buenas noches', esTarget:'buenas noches',example:{fr:'Bonsoir, bonne nuit !',    es:'¡Buenas noches!'}},
      {en:'sorry',        fr:'désolé',            es:'lo siento',     esTarget:'lo siento',  example:{fr:'Désolé, je n\'ai pas compris.', es:'Lo siento, no entendí.'}},
    ],
  },

  {
    id:'u02', level:'a1', icon:'🔢', xp:50, name:'Nombres & temps',
    dialogue:{
      note:'"Mañana" = demain ET matin — le contexte clarifie. Pour l\'heure : "son las" (toutes les heures au pluriel) sauf 1h : "es la una". On précise "de la mañana/tarde/noche" plutôt que AM/PM.',
      lines:[
        {es:'— ¿Qué día es hoy?',              fr:'— Quel jour sommes-nous ?'},
        {es:'— Hoy es lunes, tres de marzo.',   fr:'— Aujourd\'hui c\'est lundi, le 3 mars.'},
        {es:'— ¿Y mañana tenés trabajo?',       fr:'— Et demain tu travailles ?'},
        {es:'— Sí, a las ocho de la mañana.',   fr:'— Oui, à huit heures du matin.'},
      ]
    },
    grammar:{
      title:'Les nombres cardinaux',
      note:'uno/una s\'accorde avec le nom : un libro, una mesa. Devant masculin : un (pas uno). 16-29 s\'écrivent en un mot : dieciséis, veintiuno. Heure : son las tres (3h), es la una (1h — singulier seulement pour 1h).',
      examples:[
        {fr:'J\'ai deux sœurs.',      es:'Tengo dos hermanas.'},
        {fr:'Il est dix heures.',     es:'Son las diez.'},
      ],
      question:'Comment dit-on "une semaine" en espagnol ?',
      options:['un semana','una semana','uno semana'],
      answer:1,
    },
    phrase:{fr:'Il est quelle heure ?', es:'¿Qué hora es?'},
    words:[
      {en:'one',       fr:'un',            es:'uno',    esTarget:'uno',    example:{fr:'J\'ai un frère.',       es:'Tengo un hermano.'}},
      {en:'two',       fr:'deux',          es:'dos',    esTarget:'dos',    example:{fr:'Deux cafés, s\'il te plaît.', es:'Dos cafés, por favor.'}},
      {en:'five',      fr:'cinq',          es:'cinco',  esTarget:'cinco',  example:{fr:'Il y a cinq personnes.', es:'Hay cinco personas.'}},
      {en:'ten',       fr:'dix',           es:'diez',   esTarget:'diez',   example:{fr:'Dix minutes.',          es:'Diez minutos.'}},
      {en:'today',     fr:'aujourd\'hui',  es:'hoy',    esTarget:'hoy',    example:{fr:'Aujourd\'hui il fait chaud.', es:'Hoy hace calor.'}},
      {en:'tomorrow',  fr:'demain',        es:'mañana', esTarget:'mañana', example:{fr:'À demain !',            es:'¡Hasta mañana!'}},
      {en:'yesterday', fr:'hier',          es:'ayer',   esTarget:'ayer',   example:{fr:'Hier j\'ai dormi tard.', es:'Ayer dormí tarde.'}},
      {en:'week',      fr:'semaine',       es:'semana', esTarget:'semana', example:{fr:'La semaine prochaine.', es:'La semana que viene.'}},
      {en:'month',     fr:'mois',          es:'mes',    esTarget:'mes',    example:{fr:'Ce mois-ci.',           es:'Este mes.'}},
      {en:'year',      fr:'an / année',    es:'año',    esTarget:'año',    example:{fr:'L\'année prochaine.',   es:'El año que viene.'}},
    ],
  },

  {
    id:'u03', level:'a1', icon:'👨‍👩‍👧', xp:50, name:'Famille',
    dialogue:{
      note:'En Argentine on dit "papá/mamá" dans la famille, rarement "padre/madre" à l\'oral.',
      lines:[
        {es:'— ¿Tenés hermanos?',                 fr:'— Tu as des frères et sœurs ?'},
        {es:'— Sí, tengo un hermano y una hermana.', fr:'— Oui, j\'ai un frère et une sœur.'},
        {es:'— ¿Y tus papás viven acá?',          fr:'— Et tes parents habitent ici ?'},
        {es:'— No, viven en Córdoba.',             fr:'— Non, ils habitent à Córdoba.'},
      ]
    },
    grammar:{
      title:'Adjectifs possessifs',
      note:'mi/mis, tu/tus, su/sus, nuestro/a/os/as — s\'accordent avec la chose possédée, pas le possesseur : mi madre ET mi padre. Attention : su puede signifier son, sa, leur ou votre — le contexte clarifie toujours.',
      examples:[
        {fr:'Mon frère est médecin.',   es:'Mi hermano es médico.'},
        {fr:'Nos parents arrivent.',    es:'Nuestros padres llegan.'},
      ],
      question:'Comment dit-on "mes amis" en espagnol ?',
      options:['mi amigos','mis amigos','mío amigos'],
      answer:1,
    },
    phrase:{fr:'J\'ai deux frères.', es:'Tengo dos hermanos.'},
    words:[
      {en:'mother',      fr:'mère',       es:'madre',   esTarget:'mamá',    example:{fr:'Ma mère cuisine bien.',    es:'Mi mamá cocina bien.'}},
      {en:'father',      fr:'père',       es:'padre',   esTarget:'papá',    example:{fr:'Mon père travaille tôt.',  es:'Mi papá trabaja temprano.'}},
      {en:'sister',      fr:'sœur',       es:'hermana', esTarget:'hermana', example:{fr:'Ma sœur aime la musique.', es:'Mi hermana ama la música.'}},
      {en:'brother',     fr:'frère',      es:'hermano', esTarget:'hermano', example:{fr:'Mon frère habite à BA.',   es:'Mi hermano vive en BA.'}},
      {en:'son',         fr:'fils',       es:'hijo',    esTarget:'hijo',    example:{fr:'Mon fils a cinq ans.',     es:'Mi hijo tiene cinco años.'}},
      {en:'daughter',    fr:'fille',      es:'hija',    esTarget:'hija',    example:{fr:'Ma fille est étudiante.', es:'Mi hija es estudiante.'}},
      {en:'husband',     fr:'mari',       es:'marido',  esTarget:'marido',  example:{fr:'Mon mari est gentil.',    es:'Mi marido es bueno.'}},
      {en:'wife',        fr:'femme',      es:'esposa',  esTarget:'esposa',  example:{fr:'Sa femme est médecin.',   es:'Su esposa es médica.'}},
      {en:'grandmother', fr:'grand-mère', es:'abuela',  esTarget:'abuela',  example:{fr:'Ma grand-mère fait des gâteaux.', es:'Mi abuela hace tortas.'}},
      {en:'grandfather', fr:'grand-père', es:'abuelo',  esTarget:'abuelo',  example:{fr:'Mon grand-père adore le foot.', es:'Mi abuelo ama el fútbol.'}},
    ],
  },

  {
    id:'u04', level:'a1', icon:'🍕', xp:50, name:'Nourriture & boissons',
    dialogue:{
      note:'L\'asado (barbecue) est le plat national argentin — un rituel social du dimanche en famille.',
      lines:[
        {es:'— ¿Qué querés comer?',              fr:'— Qu\'est-ce que tu veux manger ?'},
        {es:'— Quisiera un asado, por favor.',    fr:'— Je voudrais un asado, s\'il te plaît.'},
        {es:'— ¿Y para tomar?',                  fr:'— Et pour boire ?'},
        {es:'— Un vino tinto, gracias.',          fr:'— Un vin rouge, merci.'},
      ]
    },
    grammar:{
      title:'Articles définis et indéfinis',
      note:'el/la/los/las (défini) — un/una/unos/unas (indéfini). Contractions obligatoires : a + el = al (voy al mercado), de + el = del (vengo del trabajo). Piège : "el agua" est féminin — l\'article masc. protège la prononciation.',
      examples:[
        {fr:'Je veux de l\'eau.',     es:'Quiero agua.'},
        {fr:'Le pain est bon.',       es:'El pan está bueno.'},
      ],
      question:'Comment dit-on "une pomme" en espagnol ?',
      options:['el manzana','una manzana','un manzana'],
      answer:1,
    },
    phrase:{fr:'Je voudrais un café.', es:'Quisiera un café.'},
    words:[
      {en:'water',   fr:'eau',      es:'agua',    esTarget:'agua',    example:{fr:'Je bois de l\'eau.',    es:'Tomo agua.'}},
      {en:'bread',   fr:'pain',     es:'pan',     esTarget:'pan',     example:{fr:'Ce pain est frais.',    es:'Este pan está fresco.'}},
      {en:'wine',    fr:'vin',      es:'vino',    esTarget:'vino',    example:{fr:'Un verre de vin.',      es:'Una copa de vino.'}},
      {en:'coffee',  fr:'café',     es:'café',    esTarget:'café',    example:{fr:'Je prends un café.',    es:'Tomo un café.'}},
      {en:'milk',    fr:'lait',     es:'leche',   esTarget:'leche',   example:{fr:'Du lait chaud.',        es:'Leche caliente.'}},
      {en:'cheese',  fr:'fromage',  es:'queso',   esTarget:'queso',   example:{fr:'Du fromage argentin.',  es:'Queso argentino.'}},
      {en:'apple',   fr:'pomme',    es:'manzana', esTarget:'manzana', example:{fr:'Une pomme rouge.',      es:'Una manzana roja.'}},
      {en:'chicken', fr:'poulet',   es:'pollo',   esTarget:'pollo',   example:{fr:'Le poulet est cuit.',   es:'El pollo está listo.'}},
      {en:'rice',    fr:'riz',      es:'arroz',   esTarget:'arroz',   example:{fr:'Du riz avec du poulet.', es:'Arroz con pollo.'}},
      {en:'meat',    fr:'viande',   es:'carne',   esTarget:'carne',   example:{fr:'La viande est bien cuite.', es:'La carne está bien cocida.'}},
    ],
  },

  {
    id:'u05', level:'a1', icon:'🏠', xp:50, name:'La maison',
    dialogue:{
      note:'À Buenos Aires les appartements s\'appellent "departamentos" — les maisons individuelles sont rares en ville.',
      lines:[
        {es:'— ¿Cómo es tu departamento?',       fr:'— Comment est ton appartement ?'},
        {es:'— Es chico pero cómodo. Hay dos habitaciones.', fr:'— Il est petit mais confortable. Il y a deux chambres.'},
        {es:'— ¿Y tiene balcón?',                fr:'— Et il a un balcon ?'},
        {es:'— Sí, con vista a la calle.',        fr:'— Oui, avec vue sur la rue.'},
      ]
    },
    grammar:{
      title:'Hay — il y a',
      note:'"Hay" est invariable : Hay una mesa / Hay dos mesas. Question : ¿Hay baño? Ne pas confondre avec "está" (se trouve) : el banco está a dos cuadras. "Hay que + infinitif" = il faut faire quelque chose : Hay que estudiar.',
      examples:[
        {fr:'Il y a une fenêtre.',     es:'Hay una ventana.'},
        {fr:'Il y a deux portes.',     es:'Hay dos puertas.'},
      ],
      question:'Comment dit-on "il y a une table" ?',
      options:['Es una mesa','Está una mesa','Hay una mesa'],
      answer:2,
    },
    phrase:{fr:'Il y a trois chambres.', es:'Hay tres habitaciones.'},
    words:[
      {en:'house',    fr:'maison',        es:'casa',        esTarget:'casa',        example:{fr:'Ma maison est grande.',  es:'Mi casa es grande.'}},
      {en:'room',     fr:'pièce/chambre', es:'habitación',  esTarget:'habitación',  example:{fr:'Il y a deux pièces.',   es:'Hay dos habitaciones.'}},
      {en:'kitchen',  fr:'cuisine',       es:'cocina',      esTarget:'cocina',      example:{fr:'La cuisine est petite.', es:'La cocina es chica.'}},
      {en:'bathroom', fr:'salle de bain', es:'baño',        esTarget:'baño',        example:{fr:'Le bain est propre.',   es:'El baño está limpio.'}},
      {en:'bedroom',  fr:'chambre',       es:'dormitorio',  esTarget:'dormitorio',  example:{fr:'Ma chambre est calme.', es:'Mi dormitorio es tranquilo.'}},
      {en:'door',     fr:'porte',         es:'puerta',      esTarget:'puerta',      example:{fr:'Ferme la porte.',       es:'Cerrá la puerta.'}},
      {en:'window',   fr:'fenêtre',       es:'ventana',     esTarget:'ventana',     example:{fr:'Ouvre la fenêtre.',     es:'Abrí la ventana.'}},
      {en:'table',    fr:'table',         es:'mesa',        esTarget:'mesa',        example:{fr:'La table est ronde.',   es:'La mesa es redonda.'}},
      {en:'chair',    fr:'chaise',        es:'silla',       esTarget:'silla',       example:{fr:'Assieds-toi sur la chaise.', es:'Sentate en la silla.'}},
      {en:'bed',      fr:'lit',           es:'cama',        esTarget:'cama',        example:{fr:'Mon lit est confortable.', es:'Mi cama es cómoda.'}},
    ],
  },

  {
    id:'u06', level:'a1', icon:'🎨', xp:50, name:'Couleurs & corps',
    dialogue:{
      note:'En Argentine "rubio" (blond) et "morocho" (brun/dark) sont très courants pour décrire les cheveux.',
      lines:[
        {es:'— ¿Cómo es tu novio?',              fr:'— Comment est ton petit ami ?'},
        {es:'— Es alto, tiene el pelo negro y los ojos verdes.', fr:'— Il est grand, il a les cheveux noirs et les yeux verts.'},
        {es:'— ¿Y cómo se llama?',               fr:'— Et comment il s\'appelle ?'},
        {es:'— Lucas. Es muy lindo, che.',        fr:'— Lucas. Il est très mignon.'},
      ]
    },
    grammar:{
      title:'Accord des adjectifs',
      note:'Les adjectifs s\'accordent avec le nom : auto rojo, remera roja, ojos rojos. Invariables au féminin : azul, verde, gris, feliz. Position : en général après le nom (remera roja). Avant le nom, l\'adjectif devient expressif : una hermosa ciudad.',
      examples:[
        {fr:'Une voiture rouge.',    es:'Un auto rojo.'},
        {fr:'Des yeux bleus.',       es:'Ojos azules.'},
      ],
      question:'Comment dit-on "les mains blanches" ?',
      options:['las manos blancos','las manos blancas','los manos blancos'],
      answer:1,
    },
    phrase:{fr:'Il a les yeux bleus.', es:'Tiene los ojos azules.'},
    words:[
      {en:'red',    fr:'rouge',   es:'rojo',    esTarget:'rojo',    example:{fr:'Un tshirt rouge.',      es:'Una remera roja.'}},
      {en:'blue',   fr:'bleu',    es:'azul',    esTarget:'azul',    example:{fr:'Le ciel est bleu.',     es:'El cielo es azul.'}},
      {en:'green',  fr:'vert',    es:'verde',   esTarget:'verde',   example:{fr:'Les arbres sont verts.',es:'Los árboles son verdes.'}},
      {en:'white',  fr:'blanc',   es:'blanco',  esTarget:'blanco',  example:{fr:'Une chemise blanche.',  es:'Una camisa blanca.'}},
      {en:'black',  fr:'noir',    es:'negro',   esTarget:'negro',   example:{fr:'Des cheveux noirs.',    es:'Pelo negro.'}},
      {en:'yellow', fr:'jaune',   es:'amarillo',esTarget:'amarillo',example:{fr:'Un taxi jaune.',       es:'Un taxi amarillo.'}},
      {en:'eye',    fr:'œil',     es:'ojo',     esTarget:'ojo',     example:{fr:'Elle a les yeux verts.', es:'Tiene los ojos verdes.'}},
      {en:'hair',   fr:'cheveux', es:'pelo',    esTarget:'pelo',    example:{fr:'Ses cheveux sont longs.',es:'Su pelo es largo.'}},
      {en:'hand',   fr:'main',    es:'mano',    esTarget:'mano',    example:{fr:'Lave tes mains.',       es:'Lavate las manos.'}},
      {en:'foot',   fr:'pied',    es:'pie',     esTarget:'pie',     example:{fr:'Mes pieds sont fatigués.', es:'Mis pies están cansados.'}},
    ],
  },

  {
    id:'u07', level:'a1', icon:'💬', xp:50, name:'Verbes essentiels',
    dialogue:{
      note:'"Morfar" est le mot argot pour "manger" (du lunfardo) — très courant à Buenos Aires.',
      lines:[
        {es:'— ¿Qué hacés los domingos?',         fr:'— Qu\'est-ce que tu fais le dimanche ?'},
        {es:'— Me levanto tarde, morfamos en familia y después leemos.', fr:'— Je me lève tard, on mange en famille et ensuite on lit.'},
        {es:'— ¿No trabajás los domingos?',        fr:'— Tu ne travailles pas le dimanche ?'},
        {es:'— No, los domingos descanso.',        fr:'— Non, le dimanche je me repose.'},
      ]
    },
    grammar:{
      title:'Présent de l\'indicatif — voseo',
      note:'-ar : yo hablo / vos hablás. -er : yo como / vos comés. -ir : yo vivo / vos vivís. Irréguliers fréquents : yo tengo / vos tenés, yo soy / vos sos, yo hago / vos hacés, yo voy / vos vas. L\'accent TOUJOURS sur la dernière syllabe.',
      examples:[
        {fr:'Tu manges à quelle heure ?', es:'¿A qué hora comés?'},
        {fr:'Tu vis à Buenos Aires ?',    es:'¿Vivís en Buenos Aires?'},
      ],
      question:'Quelle est la forme voseo de "hablar" ?',
      options:['hablas','hablás','hablás usted'],
      answer:1,
    },
    phrase:{fr:'Je veux apprendre l\'espagnol.', es:'Quiero aprender español.'},
    words:[
      {en:'to eat',     fr:'manger',     es:'comer',     esTarget:'comés',    example:{fr:'Tu manges du pain ?',    es:'¿Comés pan?'}},
      {en:'to drink',   fr:'boire',      es:'beber',     esTarget:'bebés',    example:{fr:'Tu bois du vin ?',       es:'¿Bebés vino?'}},
      {en:'to sleep',   fr:'dormir',     es:'dormir',    esTarget:'dormís',   example:{fr:'Tu dors bien ?',         es:'¿Dormís bien?'}},
      {en:'to speak',   fr:'parler',     es:'hablar',    esTarget:'hablás',   example:{fr:'Tu parles espagnol ?',   es:'¿Hablás español?'}},
      {en:'to go',      fr:'aller',      es:'ir',        esTarget:'vas',      example:{fr:'Tu vas au marché ?',     es:'¿Vas al mercado?'}},
      {en:'to want',    fr:'vouloir',    es:'querer',    esTarget:'querés',   example:{fr:'Tu veux un café ?',      es:'¿Querés café?'}},
      {en:'to have',    fr:'avoir',      es:'tener',     esTarget:'tenés',    example:{fr:'Tu as du temps ?',       es:'¿Tenés tiempo?'}},
      {en:'to love',    fr:'aimer',      es:'amar',      esTarget:'amás',     example:{fr:'Tu aimes la musique ?',  es:'¿Amás la música?'}},
      {en:'to work',    fr:'travailler', es:'trabajar',  esTarget:'trabajás', example:{fr:'Tu travailles ici ?',    es:'¿Trabajás acá?'}},
      {en:'to read',    fr:'lire',       es:'leer',      esTarget:'leés',     example:{fr:'Tu lis souvent ?',       es:'¿Leés seguido?'}},
    ],
  },

  {
    id:'u08', level:'a1', icon:'🌿', xp:50, name:'Nature & animaux',
    dialogue:{
      note:'L\'Argentine couvre 5 biomes : les pampas fertiles, la Patagonie australe (glaciers, condors), les Andes de Cuyo (vignobles), le Litoral (chutes d\'Iguazú), et le Noroeste (désert de Quebrada). "El campo" désigne toute zone hors Buenos Aires.',
      lines:[
        {es:'— ¿Qué animal te gusta más?',        fr:'— Quel animal tu aimes le plus ?'},
        {es:'— Me encantan los perros. Tengo uno que se llama Coco.', fr:'— J\'adore les chiens. J\'en ai un qui s\'appelle Coco.'},
        {es:'— ¿Y qué hacés cuando llueve?',      fr:'— Et qu\'est-ce que tu fais quand il pleut ?'},
        {es:'— Me quedo en casa leyendo.',         fr:'— Je reste chez moi à lire.'},
      ]
    },
    grammar:{
      title:'Le genre des noms',
      note:'Généralement -o = masculin, -a = féminin. Mais el mapa, el idioma, el tema sont masculins en -a. "el agua" est féminin — l\'article masc. évite deux voyelles consécutives. Règle d\'or : toujours mémoriser chaque mot avec son article.',
      examples:[
        {fr:'Le chat est sur le toit.',    es:'El gato está en el techo.'},
        {fr:'La fleur est belle.',         es:'La flor es hermosa.'},
      ],
      question:'Quel est l\'article de "árbol" (arbre) ?',
      options:['la','el','los'],
      answer:1,
    },
    phrase:{fr:'Il y a beaucoup d\'arbres.', es:'Hay muchos árboles.'},
    words:[
      {en:'cat',      fr:'chat',     es:'gato',    esTarget:'gato',    example:{fr:'Mon chat s\'appelle Milo.',   es:'Mi gato se llama Milo.'}},
      {en:'dog',      fr:'chien',    es:'perro',   esTarget:'perro',   example:{fr:'Le chien court vite.',       es:'El perro corre rápido.'}},
      {en:'bird',     fr:'oiseau',   es:'pájaro',  esTarget:'pájaro',  example:{fr:'Un oiseau chante.',          es:'Un pájaro canta.'}},
      {en:'tree',     fr:'arbre',    es:'árbol',   esTarget:'árbol',   example:{fr:'L\'arbre est grand.',        es:'El árbol es grande.'}},
      {en:'flower',   fr:'fleur',    es:'flor',    esTarget:'flor',    example:{fr:'Cette fleur est belle.',     es:'Esta flor es hermosa.'}},
      {en:'river',    fr:'rivière',  es:'río',     esTarget:'río',     example:{fr:'Le fleuve est large.',       es:'El río es ancho.'}},
      {en:'mountain', fr:'montagne', es:'montaña', esTarget:'montaña', example:{fr:'La montagne est enneigée.',  es:'La montaña tiene nieve.'}},
      {en:'sun',      fr:'soleil',   es:'sol',     esTarget:'sol',     example:{fr:'Il y a du soleil.',          es:'Hay sol.'}},
      {en:'rain',     fr:'pluie',    es:'lluvia',  esTarget:'lluvia',  example:{fr:'J\'aime la pluie.',          es:'Me gusta la lluvia.'}},
      {en:'sea',      fr:'mer',      es:'mar',     esTarget:'mar',     example:{fr:'La mer est calme.',          es:'El mar está tranquilo.'}},
    ],
  },

  {
    id:'u09', level:'a1', icon:'📍', xp:50, name:'Lieux & directions',
    dialogue:{
      note:'À Buenos Aires, "a la vuelta" (au coin de la rue) est une expression très courante pour indiquer une direction.',
      lines:[
        {es:'— Perdón, ¿dónde está el subte?',   fr:'— Excuse-moi, où est le métro ?'},
        {es:'— Está a dos cuadras, a la derecha.', fr:'— Il est à deux pâtés de maisons, à droite.'},
        {es:'— ¿Y hay una farmacia cerca?',       fr:'— Et il y a une pharmacie près d\'ici ?'},
        {es:'— Sí, justo al lado del banco.',     fr:'— Oui, juste à côté de la banque.'},
      ]
    },
    grammar:{
      title:'Prépositions de lieu',
      note:'Localisation → estar + préposition : El mercado está cerca de acá. Déplacement → ir a/hacia. "Acá" (ici) remplace souvent "aquí" en argentin. "A la vuelta" = au coin de la rue — expression très porteña.',
      examples:[
        {fr:'La banque est en face.',         es:'El banco está enfrente.'},
        {fr:'L\'école est loin d\'ici.',      es:'La escuela está lejos de acá.'},
      ],
      question:'Comment dit-on "à côté de" ?',
      options:['lejos de','al lado de','enfrente de'],
      answer:1,
    },
    phrase:{fr:'Où est la gare ?', es:'¿Dónde está la estación?'},
    words:[
      {en:'school',     fr:'école',       es:'escuela',    esTarget:'escuela',    example:{fr:'L\'école est proche.',      es:'La escuela está cerca.'}},
      {en:'restaurant', fr:'restaurant',  es:'restaurante',esTarget:'restaurante',example:{fr:'Ce restaurant est bon.',    es:'Este restaurante es bueno.'}},
      {en:'market',     fr:'marché',      es:'mercado',    esTarget:'mercado',    example:{fr:'Je vais au marché.',        es:'Voy al mercado.'}},
      {en:'beach',      fr:'plage',       es:'playa',      esTarget:'playa',      example:{fr:'La plage est belle.',       es:'La playa es hermosa.'}},
      {en:'park',       fr:'parc',        es:'parque',     esTarget:'parque',     example:{fr:'On marche dans le parc.',   es:'Caminamos en el parque.'}},
      {en:'hospital',   fr:'hôpital',     es:'hospital',   esTarget:'hospital',   example:{fr:'L\'hôpital est loin.',      es:'El hospital está lejos.'}},
      {en:'airport',    fr:'aéroport',    es:'aeropuerto', esTarget:'aeropuerto', example:{fr:'L\'aéroport est grand.',    es:'El aeropuerto es grande.'}},
      {en:'hotel',      fr:'hôtel',       es:'hotel',      esTarget:'hotel',      example:{fr:'L\'hôtel est confortable.',  es:'El hotel es cómodo.'}},
      {en:'street',     fr:'rue',         es:'calle',      esTarget:'calle',      example:{fr:'Cette rue est animée.',     es:'Esta calle es animada.'}},
      {en:'square',     fr:'place',       es:'plaza',      esTarget:'plaza',      example:{fr:'La place est belle.',       es:'La plaza es hermosa.'}},
    ],
  },

  {
    id:'u10', level:'a1', icon:'😊', xp:50, name:'Émotions de base',
    dialogue:{
      note:'Les Argentins expriment les émotions sans retenue. "Recontra" et "re" intensifient tout : estoy recontra cansado, re contento. "¿Cómo estás?" demande réellement comment tu vas — une réponse développée est normale et appréciée.',
      lines:[
        {es:'— ¿Cómo estás hoy?',                fr:'— Comment tu vas aujourd\'hui ?'},
        {es:'— Estoy un poco cansada, pero contenta.', fr:'— Je suis un peu fatiguée, mais contente.'},
        {es:'— ¿Por qué estás contenta?',         fr:'— Pourquoi tu es contente ?'},
        {es:'— Porque terminé el trabajo, ¡por fin!', fr:'— Parce que j\'ai fini le travail, enfin !'},
      ]
    },
    grammar:{
      title:'Ser vs Estar',
      note:'"Ser" : identité, origine, profession (soy francés, soy médico). "Estar" : état, émotion, localisation (estoy cansado, está en BA). Piège : "ser rico" = être riche ; "estar rico" = être délicieux. Les émotions → TOUJOURS "estar".',
      examples:[
        {fr:'Je suis fatigué.',      es:'Estoy cansado.'},
        {fr:'Elle est française.',   es:'Ella es francesa.'},
      ],
      question:'Quelle phrase est correcte pour "je suis triste" ?',
      options:['Soy triste','Estoy triste','Soy estado triste'],
      answer:1,
    },
    phrase:{fr:'Je suis content(e).', es:'Estoy contento/a.'},
    words:[
      {en:'happy',     fr:'heureux',      es:'feliz',       esTarget:'feliz',       example:{fr:'Je suis heureux aujourd\'hui.',  es:'Estoy feliz hoy.'}},
      {en:'sad',       fr:'triste',       es:'triste',      esTarget:'triste',      example:{fr:'Elle est triste.',              es:'Ella está triste.'}},
      {en:'tired',     fr:'fatigué',      es:'cansado',     esTarget:'cansado',     example:{fr:'Je suis très fatigué.',         es:'Estoy muy cansado.'}},
      {en:'angry',     fr:'en colère',    es:'enojado',     esTarget:'enojado',     example:{fr:'Il est en colère.',             es:'Está enojado.'}},
      {en:'surprised', fr:'surpris',      es:'sorprendido', esTarget:'sorprendido', example:{fr:'Je suis surpris !',             es:'¡Estoy sorprendido!'}},
      {en:'afraid',    fr:'effrayé',      es:'asustado',    esTarget:'asustado',    example:{fr:'Le chien est effrayé.',         es:'El perro está asustado.'}},
      {en:'bored',     fr:'ennuyé',       es:'aburrido',    esTarget:'aburrido',    example:{fr:'Je m\'ennuie.',                 es:'Estoy aburrido.'}},
      {en:'excited',   fr:'enthousiaste', es:'emocionado',  esTarget:'emocionado',  example:{fr:'Je suis très enthousiaste !',   es:'¡Estoy muy emocionado!'}},
      {en:'hungry',    fr:'faim',          es:'hambre',      esTarget:'hambre',      example:{fr:'J\'ai très faim.',              es:'Tengo mucha hambre.'}},
      {en:'thirsty',   fr:'soif',          es:'sed',         esTarget:'sed',         example:{fr:'J\'ai soif.',                   es:'Tengo sed.'}},
    ],
  },

  /* ── A2 ─────────────────────────────────────────────────────────── */
  {
    id:'u11', level:'a2', icon:'🚇', xp:75, name:'Transport & ville',
    dialogue:{
      note:'"Subte" (métro) et "colectivo" (bus) sont les transports typiques de Buenos Aires — la SUBE est la carte rechargeable.',
      lines:[
        {es:'— ¿Cómo vas al trabajo?',            fr:'— Comment tu vas au travail ?'},
        {es:'— Tomo el subte, línea D.',           fr:'— Je prends le métro, ligne D.'},
        {es:'— ¿Y cuánto tarda?',                  fr:'— Et ça prend combien de temps ?'},
        {es:'— Unos veinte minutos, no mucho.',    fr:'— Environ vingt minutes, pas beaucoup.'},
      ]
    },
    grammar:{
      title:'Passé simple — Pretérito indefinido',
      note:'En Argentine, le passé récent s\'exprime avec l\'indéfini : Hoy comí empanadas (jamais "he comido"). -ar : viajé/viajaste/viajó/viajamos/viajaron. -er/-ir : comí/comiste/comió. Irréguliers clés : fui (ir/ser), vine (venir), dije (decir).',
      examples:[
        {fr:'J\'ai pris le bus ce matin.',   es:'Tomé el colectivo esta mañana.'},
        {fr:'Tu as vu le train ?',           es:'¿Viste el tren?'},
      ],
      question:'Comment dit-on "j\'ai voyagé" en argentin ?',
      options:['he viajado','viajé','viajaba'],
      answer:1,
    },
    phrase:{fr:'Je prends le métro.', es:'Tomo el subte.'},
    words:[
      {en:'car',       fr:'voiture',    es:'auto',       esTarget:'auto',       example:{fr:'Mon auto est garé là.',    es:'Mi auto está estacionado ahí.'}},
      {en:'bus',       fr:'bus',        es:'colectivo',  esTarget:'colectivo',  example:{fr:'Je prends le bus.',        es:'Tomo el colectivo.'}},
      {en:'train',     fr:'train',      es:'tren',       esTarget:'tren',       example:{fr:'Le train est en retard.', es:'El tren está demorado.'}},
      {en:'subway',    fr:'métro',      es:'subte',      esTarget:'subte',      example:{fr:'Le métro est rapide.',    es:'El subte es rápido.'}},
      {en:'bicycle',   fr:'vélo',       es:'bicicleta',  esTarget:'bicicleta',  example:{fr:'Je vais à vélo.',         es:'Voy en bicicleta.'}},
      {en:'taxi',      fr:'taxi',       es:'taxi',       esTarget:'taxi',       example:{fr:'Je prends un taxi.',      es:'Tomo un taxi.'}},
      {en:'station',   fr:'gare/station',es:'estación',  esTarget:'estación',   example:{fr:'La station est loin.',    es:'La estación está lejos.'}},
      {en:'ticket',    fr:'billet',     es:'boleto',     esTarget:'boleto',     example:{fr:'J\'achète un billet.',    es:'Compro un boleto.'}},
      {en:'platform',  fr:'quai',       es:'andén',      esTarget:'andén',      example:{fr:'Le quai numéro 3.',       es:'El andén número tres.'}},
      {en:'driver',    fr:'conducteur', es:'chofer',     esTarget:'chofer',     example:{fr:'Le chauffeur est sympa.', es:'El chofer es simpático.'}},
    ],
  },

  {
    id:'u12', level:'a2', icon:'☀️', xp:75, name:'Météo & saisons',
    dialogue:{
      note:'En Argentine les saisons sont inversées : l\'été va de décembre à mars. Janvier = plein été à Buenos Aires.',
      lines:[
        {es:'— ¿Qué tiempo hace hoy?',            fr:'— Quel temps fait-il aujourd\'hui ?'},
        {es:'— Hace mucho calor, casi treinta grados.', fr:'— Il fait très chaud, presque trente degrés.'},
        {es:'— ¿Y para el fin de semana?',         fr:'— Et pour le week-end ?'},
        {es:'— Dicen que va a llover el sábado.',  fr:'— On dit qu\'il va pleuvoir samedi.'},
      ]
    },
    grammar:{
      title:'Expressions météo — verbes impersonnels',
      note:'Hace calor/frío/viento/buen tiempo. Hay sol/niebla/nubes/humedad. Llueve, nieva, truena — toujours à la 3e pers. impersonnelle, sans sujet. Futur : va a llover. Buenos Aires est connue pour sa "sudestada" : vent du sud-est et pluie froide.',
      examples:[
        {fr:'Il fait très chaud.',    es:'Hace mucho calor.'},
        {fr:'Il va pleuvoir.',        es:'Va a llover.'},
      ],
      question:'Comment dit-on "il fait froid" ?',
      options:['Está frío','Hace frío','Hay frío'],
      answer:1,
    },
    phrase:{fr:'Il fait beau aujourd\'hui.', es:'Hace buen tiempo hoy.'},
    words:[
      {en:'hot',          fr:'chaud',       es:'calor',       esTarget:'calor',       example:{fr:'Il fait chaud.',          es:'Hace calor.'}},
      {en:'cold',         fr:'froid',       es:'frío',        esTarget:'frío',        example:{fr:'Il fait froid.',          es:'Hace frío.'}},
      {en:'wind',         fr:'vent',        es:'viento',      esTarget:'viento',      example:{fr:'Il y a du vent.',         es:'Hay viento.'}},
      {en:'snow',         fr:'neige',       es:'nieve',       esTarget:'nieve',       example:{fr:'Il neige en montagne.',   es:'Nieva en la montaña.'}},
      {en:'cloud',        fr:'nuage',       es:'nube',        esTarget:'nube',        example:{fr:'Des nuages sombres.',     es:'Nubes oscuras.'}},
      {en:'storm',        fr:'orage',       es:'tormenta',    esTarget:'tormenta',    example:{fr:'Un gros orage arrive.',   es:'Viene una tormenta fuerte.'}},
      {en:'temperature',  fr:'température', es:'temperatura', esTarget:'temperatura', example:{fr:'La température monte.',   es:'La temperatura sube.'}},
      {en:'season',       fr:'saison',      es:'estación',    esTarget:'estación',    example:{fr:'Ma saison préférée.',     es:'Mi estación favorita.'}},
      {en:'summer',       fr:'été',         es:'verano',      esTarget:'verano',      example:{fr:'En été il fait chaud.',   es:'En verano hace calor.'}},
      {en:'winter',       fr:'hiver',       es:'invierno',    esTarget:'invierno',    example:{fr:'En hiver il fait froid.', es:'En invierno hace frío.'}},
    ],
  },

  {
    id:'u13', level:'a2', icon:'🛒', xp:75, name:'Shopping & commerce',
    dialogue:{
      note:'"Talle" remplace "talla" en Argentine — c\'est le mot local pour la taille des vêtements.',
      lines:[
        {es:'— ¿Cuánto cuesta esta remera?',       fr:'— Combien coûte ce t-shirt ?'},
        {es:'— Tres mil pesos. ¿Qué talle usás?',  fr:'— Trois mille pesos. Quelle taille tu fais ?'},
        {es:'— La M. ¿Tienen en azul?',            fr:'— La M. Vous l\'avez en bleu ?'},
        {es:'— Sí, dejame ver en el depósito.',    fr:'— Oui, laissez-moi vérifier en réserve.'},
      ]
    },
    grammar:{
      title:'Comparatifs',
      note:'más … que / menos … que / tan … como. Superlatif : el/la más + adj. Irréguliers : bueno → mejor, malo → peor, grande → mayor, pequeño → menor. Erreur fréquente : "más mejor" est incorrect — dites toujours "mejor".',
      examples:[
        {fr:'C\'est moins cher que ça.',  es:'Es más barato que eso.'},
        {fr:'Ce magasin est meilleur.',   es:'Este negocio es mejor.'},
      ],
      question:'Comment dit-on "plus cher que" ?',
      options:['menos caro que','más caro que','tan caro que'],
      answer:1,
    },
    phrase:{fr:'Combien ça coûte ?', es:'¿Cuánto cuesta?'},
    words:[
      {en:'price',     fr:'prix',       es:'precio',   esTarget:'precio',   example:{fr:'Le prix est bon.',        es:'El precio está bien.'}},
      {en:'cheap',     fr:'pas cher',   es:'barato',   esTarget:'barato',   example:{fr:'C\'est pas cher.',        es:'Es barato.'}},
      {en:'expensive', fr:'cher',       es:'caro',     esTarget:'caro',     example:{fr:'C\'est trop cher.',       es:'Es muy caro.'}},
      {en:'to buy',    fr:'acheter',    es:'comprar',  esTarget:'comprar',  example:{fr:'Je veux acheter ça.',    es:'Quiero comprar eso.'}},
      {en:'to sell',   fr:'vendre',     es:'vender',   esTarget:'vender',   example:{fr:'Ils vendent des fruits.', es:'Venden frutas.'}},
      {en:'size',      fr:'taille',     es:'talle',    esTarget:'talle',    example:{fr:'Quelle taille tu fais ?', es:'¿Qué talle usás?'}},
      {en:'cash',      fr:'espèces',    es:'efectivo', esTarget:'efectivo', example:{fr:'Je paye en espèces.',    es:'Pago en efectivo.'}},
      {en:'receipt',   fr:'ticket',     es:'recibo',   esTarget:'recibo',   example:{fr:'Garde le ticket.',       es:'Guardá el recibo.'}},
      {en:'sale',      fr:'soldes',     es:'rebajas',  esTarget:'rebajas',  example:{fr:'Les soldes commencent.', es:'Las rebajas empiezan.'}},
      {en:'store',     fr:'magasin',    es:'negocio',  esTarget:'negocio',  example:{fr:'Ce magasin est grand.',  es:'Este negocio es grande.'}},
    ],
  },

  {
    id:'u14', level:'a2', icon:'💼', xp:75, name:'Travail & études',
    dialogue:{
      note:'"Laburo" est le mot argentin pour "travail" — vient du lunfardo, dérivé de l\'italien "lavoro".',
      lines:[
        {es:'— ¿En qué trabajás?',                fr:'— Tu fais quoi comme travail ?'},
        {es:'— Laburo en una empresa de tecnología.', fr:'— Je travaille dans une entreprise de technologie.'},
        {es:'— ¿Y te gusta?',                      fr:'— Et ça te plaît ?'},
        {es:'— Re. Aunque el sueldo podría ser mejor.', fr:'— Trop. Même si le salaire pourrait être meilleur.'},
      ]
    },
    grammar:{
      title:'Futur proche — Ir + a + infinitif',
      note:'Ir + a + infinitif : voy a trabajar, vas a estudiar, va a llover. Futur quotidien en Argentine — le futur synthétique (trabajaré) sonne formel. Pronoms : vamos a reunirnos = nos vamos a reunir — les deux ordres sont corrects.',
      examples:[
        {fr:'Je vais travailler demain.',    es:'Voy a trabajar mañana.'},
        {fr:'On va avoir une réunion.',     es:'Vamos a tener una reunión.'},
      ],
      question:'Comment dit-on "tu vas étudier" ?',
      options:['Vas estudiar','Vas a estudiar','Irás a estudiar'],
      answer:1,
    },
    phrase:{fr:'Je vais travailler demain.', es:'Voy a trabajar mañana.'},
    words:[
      {en:'work',       fr:'travail',    es:'trabajo',    esTarget:'laburo',    example:{fr:'J\'ai beaucoup de travail.', es:'Tengo mucho laburo.'}},
      {en:'office',     fr:'bureau',     es:'oficina',    esTarget:'oficina',   example:{fr:'Mon bureau est au 3e.',     es:'Mi oficina está en el tercer piso.'}},
      {en:'meeting',    fr:'réunion',    es:'reunión',    esTarget:'reunión',   example:{fr:'La réunion est à 9h.',      es:'La reunión es a las nueve.'}},
      {en:'colleague',  fr:'collègue',   es:'compañero',  esTarget:'compañero', example:{fr:'Mon collègue est sympa.',   es:'Mi compañero es copado.'}},
      {en:'boss',       fr:'patron',     es:'jefe',       esTarget:'jefe',      example:{fr:'Mon patron est exigeant.', es:'Mi jefe es exigente.'}},
      {en:'salary',     fr:'salaire',    es:'sueldo',     esTarget:'sueldo',    example:{fr:'Le salaire est bon.',       es:'El sueldo es bueno.'}},
      {en:'exam',       fr:'examen',     es:'examen',     esTarget:'examen',    example:{fr:'J\'ai un examen demain.',   es:'Tengo un examen mañana.'}},
      {en:'diploma',    fr:'diplôme',    es:'título',     esTarget:'título',    example:{fr:'J\'ai mon diplôme.',        es:'Tengo mi título.'}},
      {en:'homework',   fr:'devoir',     es:'tarea',      esTarget:'tarea',     example:{fr:'Je fais mes devoirs.',      es:'Hago la tarea.'}},
      {en:'university', fr:'université', es:'universidad',esTarget:'universidad',example:{fr:'Je suis à l\'université.', es:'Estoy en la universidad.'}},
    ],
  },

  {
    id:'u15', level:'a2', icon:'🏥', xp:75, name:'Santé & corps',
    dialogue:{
      note:'En Argentine on dit "me agarra una fiebre" (j\'attrape une fièvre) — "agarrar" (attraper) est très courant à la place de "coger".',
      lines:[
        {es:'— No me siento bien, me duele la cabeza.', fr:'— Je ne me sens pas bien, j\'ai mal à la tête.'},
        {es:'— ¿Tenés fiebre?',                    fr:'— Tu as de la fièvre ?'},
        {es:'— No sé, creo que sí.',               fr:'— Je sais pas, je crois que oui.'},
        {es:'— Andá al médico, che. No te hagas el duro.', fr:'— Va chez le médecin. Ne fais pas le dur.'},
      ]
    },
    grammar:{
      title:'Doler — exprimer la douleur',
      note:'Doler fonctionne comme gustar — le sujet est la partie du corps : me duele la cabeza (sing.) / me duelen las muelas (plur.). Jamais "yo duelo" — toujours avec pronom indirect : me/te/le/nos. Intensité : me duele un poco / mucho / horrible.',
      examples:[
        {fr:'J\'ai mal au dos.',        es:'Me duele la espalda.'},
        {fr:'J\'ai mal aux dents.',     es:'Me duelen los dientes.'},
      ],
      question:'Comment dit-on "j\'ai mal aux yeux" ?',
      options:['Me duele los ojos','Me duelen los ojos','Tengo dolor de los ojos'],
      answer:1,
    },
    phrase:{fr:'J\'ai mal à la tête.', es:'Me duele la cabeza.'},
    words:[
      {en:'doctor',       fr:'médecin',    es:'médico',      esTarget:'médico',      example:{fr:'Le médecin arrive.',        es:'El médico viene.'}},
      {en:'hospital',     fr:'hôpital',    es:'hospital',    esTarget:'hospital',    example:{fr:'Je vais à l\'hôpital.',     es:'Voy al hospital.'}},
      {en:'medicine',     fr:'médicament', es:'medicamento', esTarget:'medicamento', example:{fr:'Prends ce médicament.',     es:'Tomá este medicamento.'}},
      {en:'headache',     fr:'mal de tête',es:'dolor de cabeza',esTarget:'dolor de cabeza',example:{fr:'J\'ai mal à la tête.',   es:'Me duele la cabeza.'}},
      {en:'fever',        fr:'fièvre',     es:'fiebre',      esTarget:'fiebre',      example:{fr:'J\'ai de la fièvre.',       es:'Tengo fiebre.'}},
      {en:'cough',        fr:'toux',       es:'tos',         esTarget:'tos',         example:{fr:'J\'ai la toux.',            es:'Tengo tos.'}},
      {en:'pharmacy',     fr:'pharmacie',  es:'farmacia',    esTarget:'farmacia',    example:{fr:'La pharmacie est ouverte.', es:'La farmacia está abierta.'}},
      {en:'prescription', fr:'ordonnance', es:'receta',      esTarget:'receta',      example:{fr:'J\'ai une ordonnance.',     es:'Tengo una receta.'}},
      {en:'to hurt',      fr:'faire mal',  es:'doler',       esTarget:'doler',       example:{fr:'Ça fait mal.',              es:'Duele.'}},
      {en:'to rest',      fr:'se reposer', es:'descansar',   esTarget:'descansar',   example:{fr:'Tu dois te reposer.',       es:'Tenés que descansar.'}},
    ],
  },

  {
    id:'u16', level:'a2', icon:'🍳', xp:75, name:'Cuisine & recettes',
    dialogue:{
      note:'Les empanadas sont la fierté culinaire : tucumanas (bœuf, œuf dur, olive), porteñas (viande hachée), salteñas (caldo juteux). Les préparer ensemble est un rituel social. "Bodegón" = restaurant populaire argentin, simple, généreux et sans chichi.',
      lines:[
        {es:'— ¿Me enseñás a hacer empanadas?',   fr:'— Tu m\'apprends à faire des empanadas ?'},
        {es:'— Claro. Primero cortá la cebolla bien chiquita.', fr:'— Bien sûr. D\'abord coupe l\'oignon très fin.'},
        {es:'— ¿Y después?',                       fr:'— Et ensuite ?'},
        {es:'— Mezclá con la carne y agregá sal y comino.', fr:'— Mélange avec la viande et ajoute du sel et du cumin.'},
      ]
    },
    grammar:{
      title:'Impératif voseo',
      note:'Impératif voseo : enlever le -s du présent. hablás → hablá, comés → comé, escribís → escribí. Irréguliers utiles : andá (aller), vení (venir), hacé (faire), ponete (mets-toi), salí (sortir). L\'accent final se conserve toujours.',
      examples:[
        {fr:'Coupe les légumes.',     es:'Cortá las verduras.'},
        {fr:'Mélange bien.',          es:'Mezclá bien.'},
      ],
      question:'Quelle est la forme impérative voseo de "comer" ?',
      options:['come','comé','comés'],
      answer:1,
    },
    phrase:{fr:'Coupe les légumes.', es:'Cortá las verduras.'},
    words:[
      {en:'to cook',    fr:'cuisiner',    es:'cocinar',    esTarget:'cocinar',  example:{fr:'Tu cuisines bien.',      es:'Cocinás muy bien.'}},
      {en:'recipe',     fr:'recette',     es:'receta',     esTarget:'receta',   example:{fr:'C\'est une bonne recette.', es:'Es una buena receta.'}},
      {en:'ingredient', fr:'ingrédient',  es:'ingrediente',esTarget:'ingrediente',example:{fr:'Les ingrédients frais.', es:'Los ingredientes frescos.'}},
      {en:'oven',       fr:'four',        es:'horno',      esTarget:'horno',    example:{fr:'Chauffe le four.',       es:'Calentá el horno.'}},
      {en:'pot',        fr:'casserole',   es:'olla',       esTarget:'olla',     example:{fr:'Dans la casserole.',     es:'En la olla.'}},
      {en:'to cut',     fr:'couper',      es:'cortar',     esTarget:'cortar',   example:{fr:'Coupe le pain.',         es:'Cortá el pan.'}},
      {en:'to mix',     fr:'mélanger',    es:'mezclar',    esTarget:'mezclar',  example:{fr:'Mélange tout.',          es:'Mezclá todo.'}},
      {en:'to boil',    fr:'faire bouillir',es:'hervir',   esTarget:'hervir',   example:{fr:'Fais bouillir l\'eau.',  es:'Hacé hervir el agua.'}},
      {en:'to taste',   fr:'goûter',      es:'probar',     esTarget:'probar',   example:{fr:'Goûte et dis-moi.',      es:'Probá y decime.'}},
      {en:'salt',       fr:'sel',         es:'sal',        esTarget:'sal',      example:{fr:'Ajoute du sel.',         es:'Agregá sal.'}},
    ],
  },

  {
    id:'u17', level:'a2', icon:'📱', xp:75, name:'Technologie quotidienne',
    dialogue:{
      note:'"Mandar" (envoyer) est plus courant que "enviar" en argentin parlé, surtout pour les messages.',
      lines:[
        {es:'— ¿Me mandaste el archivo?',          fr:'— Tu m\'as envoyé le fichier ?'},
        {es:'— Sí, te lo mandé recién por WhatsApp.', fr:'— Oui, je te l\'ai envoyé à l\'instant sur WhatsApp.'},
        {es:'— No me llegó nada. ¿Tenés señal?',   fr:'— Je n\'ai rien reçu. Tu as du réseau ?'},
        {es:'— Esperate, la batería se me está acabando.', fr:'— Attends, ma batterie est en train de mourir.'},
      ]
    },
    grammar:{
      title:'Passé simple — Pretérito indefinido',
      note:'Passé simple : -ar → yo -é, él -ó (mandé, mandó). -er/-ir → yo -í, él -ió (recibí, recibió). Orthographe : -car → -qué (busqué), -gar → -gué (llegué), -zar → -cé (empecé). "Recién" (à l\'instant) se combine avec l\'indéfini : te llamé recién.',
      examples:[
        {fr:'J\'ai appelé hier.',       es:'Llamé ayer.'},
        {fr:'Il a téléchargé l\'app.', es:'Descargó la aplicación.'},
      ],
      question:'Quelle est la forme "yo" du passé simple de "mandar" ?',
      options:['mandó','mandé','mandaba'],
      answer:1,
    },
    phrase:{fr:'Je t\'ai envoyé un message.', es:'Te mandé un mensaje.'},
    words:[
      {en:'phone',      fr:'téléphone',  es:'teléfono',   esTarget:'teléfono',  example:{fr:'Mon téléphone est neuf.',    es:'Mi teléfono es nuevo.'}},
      {en:'computer',   fr:'ordinateur', es:'computadora',esTarget:'computadora',example:{fr:'L\'ordi est lent.',          es:'La computadora es lenta.'}},
      {en:'internet',   fr:'internet',   es:'internet',   esTarget:'internet',  example:{fr:'Pas d\'internet ici.',       es:'No hay internet acá.'}},
      {en:'message',    fr:'message',    es:'mensaje',    esTarget:'mensaje',   example:{fr:'J\'ai reçu un message.',     es:'Recibí un mensaje.'}},
      {en:'call',       fr:'appel',      es:'llamada',    esTarget:'llamada',   example:{fr:'Un appel manqué.',           es:'Una llamada perdida.'}},
      {en:'app',        fr:'application',es:'aplicación', esTarget:'aplicación',example:{fr:'Cette app est utile.',      es:'Esta aplicación es útil.'}},
      {en:'photo',      fr:'photo',      es:'foto',       esTarget:'foto',      example:{fr:'Une belle photo.',           es:'Una foto hermosa.'}},
      {en:'download',   fr:'télécharger',es:'descargar',  esTarget:'descargar', example:{fr:'Télécharge l\'app.',         es:'Descargá la app.'}},
      {en:'battery',    fr:'batterie',   es:'batería',    esTarget:'batería',   example:{fr:'La batterie est faible.',    es:'La batería está baja.'}},
      {en:'password',   fr:'mot de passe',es:'contraseña',esTarget:'contraseña',example:{fr:'Quel est ton mot de passe ?',es:'¿Cuál es tu contraseña?'}},
    ],
  },

  {
    id:'u18', level:'a2', icon:'🏃', xp:75, name:'Sport & loisirs',
    dialogue:{
      note:'Le football est une religion : River Plate vs Boca Juniors forment le "Superclásico", l\'un des matchs les plus passionnés du monde. En Argentine, la fidélité à son club est à vie — changer de club est presque impensable socialement.',
      lines:[
        {es:'— ¿Fuiste a la cancha el domingo?',  fr:'— Tu es allé au stade dimanche ?'},
        {es:'— Sí, fui a ver a San Lorenzo. Ganamos dos a uno.', fr:'— Oui, je suis allé voir San Lorenzo. On a gagné deux à un.'},
        {es:'— ¡Bárbaro! ¿Jugaste vos también?', fr:'— Super ! Tu as joué toi aussi ?'},
        {es:'— No, me lastimé la rodilla.',        fr:'— Non, je me suis blessé au genou.'},
      ]
    },
    grammar:{
      title:'Imparfait — Pretérito imperfecto',
      note:'Imparfait (-ar : -aba, -er/-ir : -ía) pour habitudes et descriptions. Contraste : jugaba todos los días (habitude) vs jugué ayer (action ponctuelle). Seulement 3 irréguliers : era (ser), iba (ir), veía (ver) — tout le reste est régulier !',
      examples:[
        {fr:'Quand j\'étais petit, je nageais.',  es:'Cuando era chico, nadaba.'},
        {fr:'Il jouait au foot chaque samedi.',    es:'Jugaba al fútbol cada sábado.'},
      ],
      question:'Quelle est la forme imparfait de "jugar" à la première personne ?',
      options:['jugué','jugaba','jugaría'],
      answer:1,
    },
    phrase:{fr:'J\'aimais jouer au foot.', es:'Me gustaba jugar al fútbol.'},
    words:[
      {en:'football',   fr:'football',    es:'fútbol',          esTarget:'fútbol',       example:{fr:'Le football est populaire.', es:'El fútbol es popular.'}},
      {en:'swimming',   fr:'natation',    es:'natación',        esTarget:'natación',     example:{fr:'Je fais de la natation.',    es:'Hago natación.'}},
      {en:'running',    fr:'courir',      es:'correr',          esTarget:'correr',       example:{fr:'Tu cours chaque matin ?',   es:'¿Corrés cada mañana?'}},
      {en:'to win',     fr:'gagner',      es:'ganar',           esTarget:'ganar',        example:{fr:'On a gagné !',              es:'¡Ganamos!'}},
      {en:'to lose',    fr:'perdre',      es:'perder',          esTarget:'perder',       example:{fr:'On a perdu.',               es:'Perdimos.'}},
      {en:'team',       fr:'équipe',      es:'equipo',          esTarget:'equipo',       example:{fr:'Mon équipe est forte.',     es:'Mi equipo es fuerte.'}},
      {en:'player',     fr:'joueur',      es:'jugador',         esTarget:'jugador',      example:{fr:'C\'est un bon joueur.',     es:'Es un buen jugador.'}},
      {en:'stadium',    fr:'stade',       es:'estadio',         esTarget:'cancha',       example:{fr:'On va au stade.',           es:'Vamos a la cancha.'}},
      {en:'match',      fr:'match',       es:'partido',         esTarget:'partido',      example:{fr:'Le match est ce soir.',     es:'El partido es esta noche.'}},
      {en:'training',   fr:'entraînement',es:'entrenamiento',   esTarget:'entrenamiento',example:{fr:'L\'entraînement est dur.', es:'El entrenamiento es duro.'}},
    ],
  },

  {
    id:'u19', level:'a2', icon:'✈️', xp:75, name:'Voyages',
    dialogue:{
      note:'Buenos Aires a deux aéroports : Ezeiza (EZE) pour les vols internationaux (à 35 km du centre), et Aeroparque Jorge Newbery (AEP) pour les vols intérieurs. "Hacer la valija" est l\'expression fixe — pas "hacer la maleta" en Argentine.',
      lines:[
        {es:'— ¿Cuándo viajás a Europa?',          fr:'— Quand tu voyages en Europe ?'},
        {es:'— El mes que viene. Primero París, después Barcelona.', fr:'— Le mois prochain. D\'abord Paris, ensuite Barcelone.'},
        {es:'— ¿Y tenés todo? Pasaporte, visa…',   fr:'— Et tu as tout ? Passeport, visa…'},
        {es:'— Sí, solo me falta hacer la valija.', fr:'— Oui, il me reste juste à faire la valise.'},
      ]
    },
    grammar:{
      title:'Conditionnel — Me gustaría',
      note:'Conditionnel = base du futur + terminaison -ía (même pour tous les sujets). gustar → me gustaría, poder → podría, querer → querría. Bases irrégulières : tendr- (tendría), habr- (habría), vendr- (vendría). Poli et formel en tout contexte.',
      examples:[
        {fr:'J\'aimerais aller en Argentine.',   es:'Me gustaría ir a Argentina.'},
        {fr:'Je pourrais réserver l\'hôtel.',    es:'Podría reservar el hotel.'},
      ],
      question:'Comment dit-on "j\'aimerais voyager" ?',
      options:['Me gustó viajar','Me gustaría viajar','Me gusta viajar'],
      answer:1,
    },
    phrase:{fr:'J\'aimerais visiter Buenos Aires.', es:'Me gustaría visitar Buenos Aires.'},
    words:[
      {en:'passport',    fr:'passeport',   es:'pasaporte',  esTarget:'pasaporte',  example:{fr:'Mon passeport est valide.',  es:'Mi pasaporte está vigente.'}},
      {en:'visa',        fr:'visa',        es:'visa',       esTarget:'visa',       example:{fr:'J\'ai besoin d\'un visa.',   es:'Necesito una visa.'}},
      {en:'reservation', fr:'réservation', es:'reserva',    esTarget:'reserva',    example:{fr:'J\'ai une réservation.',    es:'Tengo una reserva.'}},
      {en:'luggage',     fr:'bagage',      es:'equipaje',   esTarget:'valija',     example:{fr:'Ma valise est lourde.',     es:'Mi valija es pesada.'}},
      {en:'customs',     fr:'douane',      es:'aduana',     esTarget:'aduana',     example:{fr:'Passe la douane.',          es:'Pasá por la aduana.'}},
      {en:'boarding',    fr:'embarquement',es:'embarque',   esTarget:'embarque',   example:{fr:'Embarquement à 10h.',       es:'Embarque a las diez.'}},
      {en:'delayed',     fr:'retardé',     es:'demorado',   esTarget:'demorado',   example:{fr:'Le vol est retardé.',       es:'El vuelo está demorado.'}},
      {en:'guide',       fr:'guide',       es:'guía',       esTarget:'guía',       example:{fr:'Le guide est excellent.',   es:'El guía es excelente.'}},
      {en:'souvenir',    fr:'souvenir',    es:'recuerdo',   esTarget:'recuerdo',   example:{fr:'Un souvenir de voyage.',    es:'Un recuerdo de viaje.'}},
      {en:'map',         fr:'carte',       es:'mapa',       esTarget:'mapa',       example:{fr:'Regarde la carte.',         es:'Mirá el mapa.'}},
    ],
  },

  {
    id:'u20', level:'a2', icon:'🤝', xp:75, name:'Relations sociales',
    dialogue:{
      note:'En Argentine on se salue avec un bisou sur la joue (même entre hommes) — c\'est la norme culturelle.',
      lines:[
        {es:'— ¿Venís a la fiesta el sábado?',    fr:'— Tu viens à la fête samedi ?'},
        {es:'— Espero que sí. ¿Quiénes van a estar?', fr:'— J\'espère que oui. Qui va être là ?'},
        {es:'— Toda la barra. Va a ser re copada.', fr:'— Tout le groupe. Ça va être super.'},
        {es:'— Dale, cuento con ir.',              fr:'— Ok, je compte bien y aller.'},
      ]
    },
    grammar:{
      title:'Subjonctif — introduction',
      note:'Subjonctif présent après verbes de volonté et souhait : espero que vengas, quiero que ayudes, ojalá llegue. Formation : 1re pers. indicatif → changer la voyelle : hablo→hable, como→coma, vivo→viva. Ojalá prend TOUJOURS le subjonctif.',
      examples:[
        {fr:'J\'espère que tu viens.',       es:'Espero que vengas.'},
        {fr:'Je veux que tu m\'aides.',      es:'Quiero que me ayudes.'},
      ],
      question:'Que suit-on après "espero que" ?',
      options:['infinitif','subjonctif','conditionnel'],
      answer:1,
    },
    phrase:{fr:'J\'espère que tu viens.', es:'Espero que vengas.'},
    words:[
      {en:'friend',     fr:'ami',         es:'amigo',     esTarget:'amigo',     example:{fr:'Mon meilleur ami.',        es:'Mi mejor amigo.'}},
      {en:'neighbor',   fr:'voisin',      es:'vecino',    esTarget:'vecino',    example:{fr:'Mon voisin est sympa.',    es:'Mi vecino es buena onda.'}},
      {en:'invitation', fr:'invitation',  es:'invitación',esTarget:'invitación',example:{fr:'Une invitation à dîner.', es:'Una invitación a cenar.'}},
      {en:'party',      fr:'fête',        es:'fiesta',    esTarget:'fiesta',    example:{fr:'La fête est samedi.',     es:'La fiesta es el sábado.'}},
      {en:'date',       fr:'rendez-vous', es:'cita',      esTarget:'cita',      example:{fr:'J\'ai un rendez-vous.',   es:'Tengo una cita.'}},
      {en:'to promise', fr:'promettre',   es:'prometer',  esTarget:'prometer',  example:{fr:'Promets-moi.',            es:'Prometeme.'}},
      {en:'to forgive', fr:'pardonner',   es:'perdonar',  esTarget:'perdonar',  example:{fr:'Pardonne-moi.',           es:'Perdoname.'}},
      {en:'to argue',   fr:'se disputer', es:'discutir',  esTarget:'discutir',  example:{fr:'Ne nous disputons pas.',  es:'No discutamos.'}},
      {en:'to miss',    fr:'manquer',     es:'extrañar',  esTarget:'extrañar',  example:{fr:'Tu me manques.',          es:'Te extraño.'}},
      {en:'trust',      fr:'confiance',   es:'confianza', esTarget:'confianza', example:{fr:'J\'ai confiance en toi.', es:'Tengo confianza en vos.'}},
    ],
  },

  /* ── B1 ─────────────────────────────────────────────────────────── */
  {
    id:'u21', level:'b1', icon:'🌿', xp:100, name:'Environnement',
    dialogue:{
      note:'L\'Argentine est le 8e pays du monde. Le fleuve Paraná (l\'un des plus grands) et les forêts de Misiones (biodiversité proche d\'Amazonie) sont des enjeux environnementaux majeurs. Buenos Aires progresse en vélo, marchés bio et tri sélectif.',
      lines:[
        {es:'— ¿Qué hacés vos para cuidar el medioambiente?', fr:'— Qu\'est-ce que toi tu fais pour protéger l\'environnement ?'},
        {es:'— Reciclo, no uso auto y compro local.',         fr:'— Je recycle, je n\'utilise pas de voiture et j\'achète local.'},
        {es:'— ¿Y creés que alcanza con eso?',                fr:'— Et tu crois que c\'est suffisant ?'},
        {es:'— No creo que sea suficiente, pero hay que empezar por algo.', fr:'— Je ne pense pas que ce soit suffisant, mais il faut bien commencer par quelque chose.'},
      ]
    },
    grammar:{
      title:'Subjonctif — doute et nécessité',
      note:'Subjonctif après es importante/necesario/bueno/urgente que. Après négation et doute : no creo que sea verdad, dudo que venga. Règle : deux sujets différents + que → subjonctif. Exception : creer que affirmatif → indicatif (creo que es verdad).',
      examples:[
        {fr:'Il est nécessaire qu\'on agisse.',        es:'Es necesario que actuemos.'},
        {fr:'Je ne crois pas que ce soit vrai.',      es:'No creo que sea verdad.'},
      ],
      question:'Après "es importante que", quel mode utilise-t-on ?',
      options:['indicatif','subjonctif','infinitif'],
      answer:1,
    },
    phrase:{fr:'Il est important de recycler.', es:'Es importante que reciclemos.'},
    words:[
      {en:'pollution',    fr:'pollution',    es:'contaminación', esTarget:'contaminación', example:{fr:'La pollution augmente.',        es:'La contaminación aumenta.'}},
      {en:'climate',      fr:'climat',       es:'clima',         esTarget:'clima',         example:{fr:'Le climat change.',            es:'El clima está cambiando.'}},
      {en:'renewable',    fr:'renouvelable', es:'renovable',     esTarget:'renovable',     example:{fr:'Énergie renouvelable.',        es:'Energía renovable.'}},
      {en:'waste',        fr:'déchets',      es:'residuos',      esTarget:'residuos',      example:{fr:'Réduire les déchets.',         es:'Reducir los residuos.'}},
      {en:'forest',       fr:'forêt',        es:'bosque',        esTarget:'bosque',        example:{fr:'La forêt est protégée.',       es:'El bosque está protegido.'}},
      {en:'species',      fr:'espèce',       es:'especie',       esTarget:'especie',       example:{fr:'Une espèce menacée.',          es:'Una especie en peligro.'}},
      {en:'to protect',   fr:'protéger',     es:'proteger',      esTarget:'proteger',      example:{fr:'Protéger la nature.',          es:'Proteger la naturaleza.'}},
      {en:'to recycle',   fr:'recycler',     es:'reciclar',      esTarget:'reciclar',      example:{fr:'Je recycle le plastique.',     es:'Reciclo el plástico.'}},
      {en:'carbon',       fr:'carbone',      es:'carbono',       esTarget:'carbono',       example:{fr:'Empreinte carbone.',           es:'Huella de carbono.'}},
      {en:'biodiversity', fr:'biodiversité', es:'biodiversidad', esTarget:'biodiversidad', example:{fr:'La biodiversité est riche.',   es:'La biodiversidad es rica.'}},
    ],
  },

  {
    id:'u22', level:'b1', icon:'🎭', xp:100, name:'Culture & arts',
    dialogue:{
      note:'L\'Argentine a produit des géants : Borges (littérature labyrinthique), Piazzolla (tango nuevo), Mercedes Sosa (nueva canción), Campanella (Oscar pour "El secreto de sus ojos"). Buenos Aires compte plus de théâtres par habitant que Londres.',
      lines:[
        {es:'— ¿Fuiste a ver la exposición de Xul Solar?',   fr:'— Tu es allé voir l\'expo de Xul Solar ?'},
        {es:'— Sí, fue filmado un documental sobre él también.', fr:'— Oui, un documentaire a aussi été tourné sur lui.'},
        {es:'— ¿Te gustó?',                                  fr:'— Tu as aimé ?'},
        {es:'— Mucho. Es un artista que me inspira un montón.', fr:'— Beaucoup. C\'est un artiste qui m\'inspire énormément.'},
      ]
    },
    grammar:{
      title:'La voix passive — ser + participe',
      note:'Passif : ser + participe accordé avec le sujet. La novela fue escrita por Borges (fém. parce que "novela"). Alternative fréquente à l\'oral : "se filmó una película" — le se passif est plus naturel en argentin que la construction avec ser.',
      examples:[
        {fr:'Le roman a été écrit par Borges.',   es:'La novela fue escrita por Borges.'},
        {fr:'Le musée a été inauguré hier.',      es:'El museo fue inaugurado ayer.'},
      ],
      question:'Comment former une phrase passive en espagnol ?',
      options:['estar + participe','ser + participe','haber + participe'],
      answer:1,
    },
    phrase:{fr:'Ce film a été tourné en Argentine.', es:'Esta película fue filmada en Argentina.'},
    words:[
      {en:'exhibition',   fr:'exposition',  es:'exposición',    esTarget:'exposición',    example:{fr:'L\'exposition est gratuite.',  es:'La exposición es gratuita.'}},
      {en:'theater',      fr:'théâtre',     es:'teatro',        esTarget:'teatro',        example:{fr:'On va au théâtre.',           es:'Vamos al teatro.'}},
      {en:'director',     fr:'réalisateur', es:'director',      esTarget:'director',      example:{fr:'Un grand réalisateur.',       es:'Un gran director.'}},
      {en:'novel',        fr:'roman',       es:'novela',        esTarget:'novela',        example:{fr:'Je lis un roman.',            es:'Leo una novela.'}},
      {en:'sculpture',    fr:'sculpture',   es:'escultura',     esTarget:'escultura',     example:{fr:'Une belle sculpture.',        es:'Una escultura hermosa.'}},
      {en:'to inspire',   fr:'inspirer',    es:'inspirar',      esTarget:'inspirar',      example:{fr:'Ça m\'inspire.',              es:'Eso me inspira.'}},
      {en:'critic',       fr:'critique',    es:'crítica',       esTarget:'crítica',       example:{fr:'La critique est bonne.',      es:'La crítica es buena.'}},
      {en:'audience',     fr:'public',      es:'público',       esTarget:'público',       example:{fr:'Le public applaudit.',        es:'El público aplaude.'}},
      {en:'traditional',  fr:'traditionnel',es:'tradicional',   esTarget:'tradicional',   example:{fr:'Un style traditionnel.',      es:'Un estilo tradicional.'}},
      {en:'contemporary', fr:'contemporain',es:'contemporáneo', esTarget:'contemporáneo', example:{fr:'L\'art contemporain.',        es:'El arte contemporáneo.'}},
    ],
  },

  {
    id:'u23', level:'b1', icon:'💭', xp:100, name:'Opinions & débat',
    dialogue:{
      note:'Les Argentins sont passionnés de débat — politique, économie, culture, tout se discute ouvertement. "¿Y vos qué pensás?" invite chacun à s\'exprimer. Le débat n\'est pas perçu comme agressif mais comme une marque d\'intelligence et d\'engagement.',
      lines:[
        {es:'— A mí me parece que hay demasiada desigualdad.', fr:'— À mon avis il y a trop d\'inégalité.'},
        {es:'— Entiendo lo que decís, aunque no estoy del todo de acuerdo.', fr:'— Je comprends ce que tu dis, même si je ne suis pas tout à fait d\'accord.'},
        {es:'— ¿Por qué? Dame tus argumentos.',    fr:'— Pourquoi ? Donne-moi tes arguments.'},
        {es:'— Sin embargo, hay que reconocer que mejoró bastante.', fr:'— Cependant, il faut reconnaître que ça s\'est bien amélioré.'},
      ]
    },
    grammar:{
      title:'Connecteurs d\'opinion',
      note:'Bien articuler : A mí me parece que (opinion), por un lado…por otro (deux aspects), sin embargo (opposition). Nuance : aunque + indicatif = même si (fait réel) / aunque + subjonctif = bien que (hypothèse). Hay que reconocer que = concession forte.',
      examples:[
        {fr:'D\'un côté c\'est bien, de l\'autre non.', es:'Por un lado está bien, por otro no.'},
        {fr:'Cependant, la situation s\'améliore.',     es:'Sin embargo, la situación mejora.'},
      ],
      question:'Comment dit-on "cependant" en espagnol ?',
      options:['además','sin embargo','aunque'],
      answer:1,
    },
    phrase:{fr:'À mon avis, c\'est important.', es:'A mí me parece que es importante.'},
    words:[
      {en:'to agree',      fr:'être d\'accord',        es:'estar de acuerdo',    esTarget:'de acuerdo',    example:{fr:'Je suis d\'accord.',          es:'Estoy de acuerdo.'}},
      {en:'to disagree',   fr:'ne pas être d\'accord', es:'no estar de acuerdo', esTarget:'en desacuerdo', example:{fr:'Je ne suis pas d\'accord.',    es:'No estoy de acuerdo.'}},
      {en:'opinion',       fr:'opinion',               es:'opinión',             esTarget:'opinión',       example:{fr:'Quelle est ton opinion ?',    es:'¿Cuál es tu opinión?'}},
      {en:'argument',      fr:'argument',              es:'argumento',           esTarget:'argumento',     example:{fr:'Un bon argument.',            es:'Un buen argumento.'}},
      {en:'evidence',      fr:'preuve',                es:'evidencia',           esTarget:'evidencia',     example:{fr:'La preuve est claire.',       es:'La evidencia es clara.'}},
      {en:'however',       fr:'cependant',             es:'sin embargo',         esTarget:'sin embargo',   example:{fr:'Cependant, il faut voir.',    es:'Sin embargo, hay que ver.'}},
      {en:'although',      fr:'bien que',              es:'aunque',              esTarget:'aunque',        example:{fr:'Bien que ce soit dur.',       es:'Aunque es difícil.'}},
      {en:'on the contrary',fr:'au contraire',         es:'al contrario',        esTarget:'al contrario',  example:{fr:'Au contraire, c\'est facile.',es:'Al contrario, es fácil.'}},
      {en:'to doubt',      fr:'douter',                es:'dudar',               esTarget:'dudar',         example:{fr:'Je doute de ça.',             es:'Dudo de eso.'}},
      {en:'to convince',   fr:'convaincre',            es:'convencer',           esTarget:'convencer',     example:{fr:'Tu m\'as convaincu.',         es:'Me convenciste.'}},
    ],
  },

  {
    id:'u24', level:'b1', icon:'🌍', xp:100, name:'Société',
    dialogue:{
      note:'L\'Argentine a connu de nombreuses crises économiques — la crise de 2001 est encore dans toutes les mémoires.',
      lines:[
        {es:'— ¿Cómo ves la situación social del país?',    fr:'— Comment tu vois la situation sociale du pays ?'},
        {es:'— Es compleja. Hay mucha desigualdad, pero también mucha solidaridad.', fr:'— C\'est complexe. Il y a beaucoup d\'inégalité, mais aussi beaucoup de solidarité.'},
        {es:'— ¿Y creés que la democracia funciona?',       fr:'— Et tu penses que la démocratie fonctionne ?'},
        {es:'— Sí, aunque le falta mucho por mejorar.',     fr:'— Oui, même s\'il reste beaucoup à améliorer.'},
      ]
    },
    grammar:{
      title:'Conditionnel passé — irréel du passé',
      note:'Irréel du passé : Si hubiera + participio + habría + infinitif. Si hubiera estudiado más, habría aprobado. "Hubiera" est l\'imparfait du subjonctif de haber. En argentin familier, "hubiese" est interchangeable — les deux formes sont acceptées.',
      examples:[
        {fr:'J\'aurais pu faire mieux.',         es:'Hubiera podido hacerlo mejor.'},
        {fr:'Si j\'avais su, je serais venu.',   es:'Si lo hubiera sabido, habría venido.'},
      ],
      question:'Comment dit-on "j\'aurais pu" ?',
      options:['podría','habría podido','hubiera poder'],
      answer:1,
    },
    phrase:{fr:'La solidarité est importante.', es:'La solidaridad es importante.'},
    words:[
      {en:'inequality',  fr:'inégalité',   es:'desigualdad', esTarget:'desigualdad', example:{fr:'L\'inégalité augmente.',      es:'La desigualdad aumenta.'}},
      {en:'freedom',     fr:'liberté',     es:'libertad',    esTarget:'libertad',    example:{fr:'La liberté est un droit.',    es:'La libertad es un derecho.'}},
      {en:'rights',      fr:'droits',      es:'derechos',    esTarget:'derechos',    example:{fr:'Nos droits sont importants.', es:'Nuestros derechos son importantes.'}},
      {en:'community',   fr:'communauté',  es:'comunidad',   esTarget:'comunidad',   example:{fr:'Notre communauté est forte.', es:'Nuestra comunidad es fuerte.'}},
      {en:'volunteer',   fr:'bénévole',    es:'voluntario',  esTarget:'voluntario',  example:{fr:'Je suis bénévole.',          es:'Soy voluntario.'}},
      {en:'diversity',   fr:'diversité',   es:'diversidad',  esTarget:'diversidad',  example:{fr:'La diversité nous enrichit.', es:'La diversidad nos enriquece.'}},
      {en:'integration', fr:'intégration', es:'integración', esTarget:'integración', example:{fr:'L\'intégration prend du temps.', es:'La integración lleva tiempo.'}},
      {en:'solidarity',  fr:'solidarité',  es:'solidaridad', esTarget:'solidaridad', example:{fr:'Un acte de solidarité.',     es:'Un acto de solidaridad.'}},
      {en:'protest',     fr:'manifestation',es:'protesta',   esTarget:'protesta',    example:{fr:'Une manifestation pacifique.', es:'Una protesta pacífica.'}},
      {en:'democracy',   fr:'démocratie',  es:'democracia',  esTarget:'democracia',  example:{fr:'La démocratie est fragile.', es:'La democracia es frágil.'}},
    ],
  },

  {
    id:'u25', level:'b1', icon:'🧠', xp:100, name:'Psychologie & émotions',
    dialogue:{
      note:'Buenos Aires a le plus grand nombre de psychanalystes par habitant au monde. "Ir al psicólogo" ou "hacer terapia" est banal à tous les niveaux sociaux et sans stigmatisation. Les Argentins parlent ouvertement de leur vie intérieure.',
      lines:[
        {es:'— Últimamente me siento muy ansioso.',           fr:'— Dernièrement je me sens très anxieux.'},
        {es:'— ¿Qué te pasa? ¿Hablaste con alguien?',        fr:'— Qu\'est-ce qui se passe ? Tu en as parlé avec quelqu\'un ?'},
        {es:'— No, me quedé solo con mis pensamientos.',      fr:'— Non, je suis resté seul avec mes pensées.'},
        {es:'— Che, ponete las pilas. Buscá ayuda, no te quedes así.', fr:'— Allez, reprends-toi. Cherche de l\'aide, ne reste pas comme ça.'},
      ]
    },
    grammar:{
      title:'Verbes pronominaux complexes',
      note:'Gradations de changement : ponerse (rapide/émotionnel : se puso nervioso), quedarse (rester dans cet état : se quedó callado), volverse (transformation progressive : se volvió pesimista). Sentirse exprime l\'état ressenti : me siento bien/mal/ansioso.',
      examples:[
        {fr:'Je me sens plus confiant.',     es:'Me siento más seguro.'},
        {fr:'Il est devenu triste.',         es:'Se puso triste.'},
      ],
      question:'Quelle structure exprime un changement d\'état ?',
      options:['ser + adjectif','ponerse + adjectif','estar + adjectif'],
      answer:1,
    },
    phrase:{fr:'Je me sens plus confiant.', es:'Me siento más seguro/a.'},
    words:[
      {en:'confidence', fr:'confiance',  es:'confianza',  esTarget:'confianza',  example:{fr:'J\'ai confiance en moi.',   es:'Tengo confianza en mí.'}},
      {en:'anxiety',    fr:'anxiété',    es:'ansiedad',   esTarget:'ansiedad',   example:{fr:'L\'anxiété est difficile.', es:'La ansiedad es difícil.'}},
      {en:'motivation', fr:'motivation', es:'motivación', esTarget:'motivación', example:{fr:'J\'ai de la motivation.',   es:'Tengo motivación.'}},
      {en:'stress',     fr:'stress',     es:'estrés',     esTarget:'estrés',     example:{fr:'Le stress m\'épuise.',      es:'El estrés me agota.'}},
      {en:'resilience', fr:'résilience', es:'resiliencia',esTarget:'resiliencia',example:{fr:'La résilience aide.',       es:'La resiliencia ayuda.'}},
      {en:'empathy',    fr:'empathie',   es:'empatía',    esTarget:'empatía',    example:{fr:'L\'empathie est clé.',      es:'La empatía es clave.'}},
      {en:'identity',   fr:'identité',   es:'identidad',  esTarget:'identidad',  example:{fr:'Mon identité m\'importe.', es:'Mi identidad me importa.'}},
      {en:'to heal',    fr:'guérir',     es:'sanar',      esTarget:'sanar',      example:{fr:'Il faut du temps pour guérir.', es:'Lleva tiempo sanar.'}},
      {en:'pride',      fr:'fierté',     es:'orgullo',    esTarget:'orgullo',    example:{fr:'Je suis fier de toi.',      es:'Estoy orgulloso de vos.'}},
      {en:'nostalgia',  fr:'nostalgie',  es:'nostalgia',  esTarget:'nostalgia',  example:{fr:'Un sentiment de nostalgie.', es:'Un sentimiento de nostalgia.'}},
    ],
  },

  {
    id:'u26', level:'b1', icon:'💰', xp:100, name:'Économie',
    dialogue:{
      note:'L\'inflation en Argentine est un sujet du quotidien — les prix changent parfois chaque semaine.',
      lines:[
        {es:'— ¿Viste cómo subieron los precios?',           fr:'— Tu as vu comment les prix ont augmenté ?'},
        {es:'— Sí, la inflación está por las nubes.',        fr:'— Oui, l\'inflation est au plafond.'},
        {es:'— El gobierno dijo que la economía está mejorando.', fr:'— Le gouvernement a dit que l\'économie s\'améliorait.'},
        {es:'— Espero que sea verdad, porque el sueldo no alcanza.', fr:'— J\'espère que c\'est vrai, parce que le salaire ne suffit pas.'},
      ]
    },
    grammar:{
      title:'Discours indirect — Estilo indirecto',
      note:'Discours indirect : le temps recule d\'un cran. Présent → imparfait : "voy" → dijo que iba. Passé simple → plus-que-parf. : "fui" → dijo que había ido. Introducteurs courants : dijo que, contó que, explicó que, aclaró que, reconoció que.',
      examples:[
        {fr:'Il a dit qu\'il allait partir.',       es:'Dijo que se iba a ir.'},
        {fr:'Elle a dit que c\'était difficile.',   es:'Dijo que era difícil.'},
      ],
      question:'Que devient "voy a venir" au discours indirect ?',
      options:['dijo que va a venir','dijo que iba a venir','dijo que vendría'],
      answer:1,
    },
    phrase:{fr:'L\'économie est en croissance.', es:'La economía está en crecimiento.'},
    words:[
      {en:'unemployment', fr:'chômage',       es:'desempleo',   esTarget:'desempleo',   example:{fr:'Le chômage augmente.',       es:'El desempleo aumenta.'}},
      {en:'inflation',    fr:'inflation',     es:'inflación',   esTarget:'inflación',   example:{fr:'L\'inflation est forte.',    es:'La inflación es alta.'}},
      {en:'budget',       fr:'budget',        es:'presupuesto', esTarget:'presupuesto', example:{fr:'Le budget est limité.',      es:'El presupuesto es limitado.'}},
      {en:'investment',   fr:'investissement',es:'inversión',   esTarget:'inversión',   example:{fr:'Un bon investissement.',     es:'Una buena inversión.'}},
      {en:'poverty',      fr:'pauvreté',      es:'pobreza',     esTarget:'pobreza',     example:{fr:'Réduire la pauvreté.',       es:'Reducir la pobreza.'}},
      {en:'growth',       fr:'croissance',    es:'crecimiento', esTarget:'crecimiento', example:{fr:'La croissance économique.',  es:'El crecimiento económico.'}},
      {en:'crisis',       fr:'crise',         es:'crisis',      esTarget:'crisis',      example:{fr:'Une crise économique.',      es:'Una crisis económica.'}},
      {en:'loan',         fr:'prêt',          es:'préstamo',    esTarget:'préstamo',    example:{fr:'Demander un prêt.',          es:'Pedir un préstamo.'}},
      {en:'entrepreneur', fr:'entrepreneur',  es:'emprendedor', esTarget:'emprendedor', example:{fr:'Un entrepreneur courageux.', es:'Un emprendedor valiente.'}},
      {en:'competition',  fr:'concurrence',   es:'competencia', esTarget:'competencia', example:{fr:'La concurrence est forte.',  es:'La competencia es fuerte.'}},
    ],
  },

  {
    id:'u27', level:'b1', icon:'📰', xp:100, name:'Médias & information',
    dialogue:{
      note:'Clarín et La Nación sont les deux grands journaux argentins — le débat médiatique est très vif en Argentine.',
      lines:[
        {es:'— ¿Leíste las noticias de hoy?',               fr:'— Tu as lu les nouvelles d\'aujourd\'hui ?'},
        {es:'— Sí, pero no entiendo lo que dice ese periodista.', fr:'— Oui, mais je ne comprends pas ce que dit ce journaliste.'},
        {es:'— Es que hay mucha información falsa circulando.',    fr:'— C\'est qu\'il y a beaucoup de fausses informations qui circulent.'},
        {es:'— Hay que chequear siempre la fuente, che.',   fr:'— Il faut toujours vérifier la source.'},
      ]
    },
    grammar:{
      title:'Pronoms relatifs — lo que, cuyo',
      note:'"Que" est le relatif le plus fréquent : el artículo que leí. "Lo que" = ce que/ce qui : lo que dice es importante. "Cuyo/cuya" s\'accorde avec le nom suivant : el autor cuya novela admiro. Après prépositions : la razón por la cual vine.',
      examples:[
        {fr:'Ce qu\'il dit est faux.',           es:'Lo que dice es falso.'},
        {fr:'Le journaliste dont j\'ai lu l\'article.', es:'El periodista cuyo artículo leí.'},
      ],
      question:'Comment traduit-on "ce que tu fais" ?',
      options:['que hacés','lo que hacés','el que hacés'],
      answer:1,
    },
    phrase:{fr:'Je ne comprends pas ce qu\'il dit.', es:'No entiendo lo que dice.'},
    words:[
      {en:'news',         fr:'actualités',  es:'noticias',    esTarget:'noticias',    example:{fr:'Les news de ce matin.',      es:'Las noticias de esta mañana.'}},
      {en:'journalist',   fr:'journaliste', es:'periodista',  esTarget:'periodista',  example:{fr:'Ce journaliste est connu.',  es:'Este periodista es conocido.'}},
      {en:'advertisement',fr:'publicité',   es:'publicidad',  esTarget:'publicidad',  example:{fr:'Trop de publicité.',         es:'Demasiada publicidad.'}},
      {en:'fake news',    fr:'fake news',   es:'noticia falsa',esTarget:'noticia falsa',example:{fr:'C\'est une fake news.',    es:'Es una noticia falsa.'}},
      {en:'influence',    fr:'influence',   es:'influencia',  esTarget:'influencia',  example:{fr:'Grande influence.',          es:'Gran influencia.'}},
      {en:'source',       fr:'source',      es:'fuente',      esTarget:'fuente',      example:{fr:'Vérifie la source.',         es:'Chequeá la fuente.'}},
      {en:'broadcast',    fr:'diffusion',   es:'transmisión', esTarget:'transmisión', example:{fr:'Diffusion en direct.',       es:'Transmisión en vivo.'}},
      {en:'editorial',    fr:'éditorial',   es:'editorial',   esTarget:'editorial',   example:{fr:'L\'éditorial du journal.',   es:'El editorial del diario.'}},
      {en:'censorship',   fr:'censure',     es:'censura',     esTarget:'censura',     example:{fr:'La censure est dangereuse.', es:'La censura es peligrosa.'}},
      {en:'headline',     fr:'titre',       es:'titular',     esTarget:'titular',     example:{fr:'Le titre est accrocheur.',   es:'El titular llama la atención.'}},
    ],
  },

  {
    id:'u28', level:'b1', icon:'🇦🇷', xp:100, name:'Argot & culture argentine',
    dialogue:{
      note:'Le lunfardo est l\'argot de Buenos Aires — né entre 1880-1920 avec l\'immigration italienne et espagnole. Toujours vivant dans le tango et la vie quotidienne.',
      lines:[
        {es:'— ¡Che, qué quilombo hay en la calle!',         fr:'— Dis donc, quel bordel dans la rue !'},
        {es:'— Sí, re copado igual. Hay música en vivo.',   fr:'— Oui, trop bien quand même. Il y a de la musique live.'},
        {es:'— ¿Y vos tenés plata para morfar algo?',        fr:'— Et toi t\'as du fric pour manger un truc ?'},
        {es:'— Sí, bárbaro. Buscamos un bodegón cerca.',    fr:'— Oui, super. On cherche un resto typique près d\'ici.'},
      ]
    },
    grammar:{
      title:'Le Lunfardo — argot porteño',
      note:'Argot né avec l\'immigration européenne : laburo (it. lavoro), fiaca (it. fiacca). "Re" est un intensificateur universel : re copado, re difícil, re loco. Le vesre (verlan porteño) inverse les syllabes : tango → gotan, café → feca, zapato → patosa.',
      examples:[
        {fr:'C\'est super cool !',       es:'¡Qué re copado!'},
        {fr:'J\'ai la flemme de bosser.', es:'Tengo fiaca de laburar.'},
      ],
      question:'Que signifie "morfar" en argentin ?',
      options:['dormir','manger','partir'],
      answer:1,
    },
    phrase:{fr:'C\'est super cool !', es:'¡Qué copado, che!'},
    words:[
      {en:'hey! (Arg.)',    fr:'dis donc !',       es:'che',      esTarget:'che',      example:{fr:'Hé, viens voir !',           es:'¡Che, vení a ver!'}},
      {en:'cool (Arg.)',    fr:'super cool',       es:'copado',   esTarget:'copado',   example:{fr:'C\'est vraiment cool.',      es:'Es re copado.'}},
      {en:'mate (drink)',   fr:'maté',             es:'mate',     esTarget:'mate',     example:{fr:'Un maté le matin.',          es:'Un mate por la mañana.'}},
      {en:'money (Arg.)',   fr:'fric / thunes',    es:'plata',    esTarget:'plata',    example:{fr:'Je n\'ai pas de fric.',      es:'No tengo plata.'}},
      {en:'guy (Arg.)',     fr:'mec / gars',       es:'pibe',     esTarget:'pibe',     example:{fr:'Ce mec est sympa.',         es:'Ese pibe es buena onda.'}},
      {en:'girl (Arg.)',    fr:'fille / meuf',     es:'mina',     esTarget:'mina',     example:{fr:'Cette fille est cool.',      es:'Esa mina es copada.'}},
      {en:'very (Arg.)',    fr:'super / vachement',es:'re',       esTarget:'re',       example:{fr:'C\'est super bon.',          es:'Está re bueno.'}},
      {en:'mess (Arg.)',    fr:'bordel / foutoir', es:'quilombo', esTarget:'quilombo', example:{fr:'Quel bordel !',              es:'¡Qué quilombo!'}},
      {en:'awesome (Arg.)', fr:'génial',           es:'bárbaro',  esTarget:'bárbaro',  example:{fr:'C\'est génial !',           es:'¡Bárbaro!'}},
      {en:'to eat (Arg.)',  fr:'bouffer',          es:'morfar',   esTarget:'morfar',   example:{fr:'On va bouffer ?',           es:'¿Vamos a morfar?'}},
    ],
  },

  {
    id:'u29', level:'b1', icon:'💡', xp:100, name:'Innovation & idées',
    dialogue:{
      note:'Buenos Aires est un hub de startups en Amérique Latine — avec des licornes comme Mercado Libre et Globant nées dans le pays.',
      lines:[
        {es:'— Si tuviera más tiempo, lanzaría mi propia startup.', fr:'— Si j\'avais plus de temps, je lancerais ma propre startup.'},
        {es:'— ¿Y cuál sería la idea?',                    fr:'— Et quelle serait l\'idée ?'},
        {es:'— Una app de inteligencia artificial para aprender idiomas.', fr:'— Une app d\'intelligence artificielle pour apprendre les langues.'},
        {es:'— ¡Interesante! El desafío sería la competencia.', fr:'— Intéressant ! Le défi serait la concurrence.'},
      ]
    },
    grammar:{
      title:'Hypothèses — Si + imparfait subjonctif + conditionnel',
      note:'Hypothèse irréelle au présent : Si + imparfait subj. (-ra) + conditionnel (-ría). Si tuviera plata, viajaría. Irréguliers clés : fuera (si j\'étais), tuviera (si j\'avais), pudiera (si je pouvais), quisiera (si je voulais). Contraste : si tengo → futur (réalisable).',
      examples:[
        {fr:'Si j\'avais de l\'argent, je voyagerais.',   es:'Si tuviera plata, viajaría.'},
        {fr:'Si tu voulais, tu pourrais.',                es:'Si quisieras, podrías.'},
      ],
      question:'Quelle structure pour une hypothèse irréelle au présent ?',
      options:['si + présent + futur','si + imparfait subj + conditionnel','si + subjonctif présent + futur'],
      answer:1,
    },
    phrase:{fr:'Si j\'avais le temps, j\'étudierais plus.', es:'Si tuviera tiempo, estudiaría más.'},
    words:[
      {en:'innovation',  fr:'innovation',              es:'innovación',           esTarget:'innovación',           example:{fr:'L\'innovation est clé.',         es:'La innovación es clave.'}},
      {en:'research',    fr:'recherche',               es:'investigación',         esTarget:'investigación',         example:{fr:'La recherche avance.',           es:'La investigación avanza.'}},
      {en:'discover',    fr:'découvrir',               es:'descubrir',             esTarget:'descubrir',             example:{fr:'On a découvert quelque chose.',  es:'Descubrimos algo nuevo.'}},
      {en:'solution',    fr:'solution',                es:'solución',              esTarget:'solución',              example:{fr:'Une solution créative.',          es:'Una solución creativa.'}},
      {en:'challenge',   fr:'défi',                    es:'desafío',               esTarget:'desafío',               example:{fr:'Un grand défi.',                 es:'Un gran desafío.'}},
      {en:'technology',  fr:'technologie',             es:'tecnología',            esTarget:'tecnología',            example:{fr:'La technologie change tout.',     es:'La tecnología cambia todo.'}},
      {en:'AI',          fr:'intelligence artificielle',es:'inteligencia artificial',esTarget:'IA',                 example:{fr:'L\'IA est partout.',              es:'La IA está en todos lados.'}},
      {en:'data',        fr:'données',                 es:'datos',                 esTarget:'datos',                 example:{fr:'Les données sont précieuses.',    es:'Los datos son valiosos.'}},
      {en:'startup',     fr:'startup',                 es:'startup',               esTarget:'startup',               example:{fr:'Ma startup grandit.',             es:'Mi startup crece.'}},
      {en:'impact',      fr:'impact',                  es:'impacto',               esTarget:'impacto',               example:{fr:'Un grand impact social.',         es:'Un gran impacto social.'}},
    ],
  },

  {
    id:'u30', level:'b1', icon:'🗣️', xp:120, name:'Expression avancée — B1 ✓',
    dialogue:{
      note:'¡Felicitaciones — llegaste al nivel B1! En Argentine, argumenter avec précision est très apprécié. Les Argentins valorisent les interlocuteurs qui structurent leurs idées. Avec ces connecteurs, tu peux participer à n\'importe quelle conversation.',
      lines:[
        {es:'— En conclusión, creo que aprender un idioma cambia la vida.', fr:'— En conclusion, je pense qu\'apprendre une langue change la vie.'},
        {es:'— Además, abre puertas que de otra forma estarían cerradas.', fr:'— De plus, ça ouvre des portes qui autrement seraient fermées.'},
        {es:'— Sin embargo, requiere mucho esfuerzo y constancia.',        fr:'— Cependant, ça demande beaucoup d\'effort et de persévérance.'},
        {es:'— Siempre y cuando lo disfrutes, vale la pena.',              fr:'— Du moment que tu en profites, ça vaut la peine.'},
      ]
    },
    grammar:{
      title:'Connecteurs de discours avancés',
      note:'Pour structurer votre discours : en cuanto a + nom (en ce qui concerne), cabe destacar que (il convient de noter), a pesar de que + indicatif (malgré le fait que), siempre y cuando + subjonctif (à condition que), por lo tanto (par conséquent).',
      examples:[
        {fr:'En ce qui concerne la culture…',  es:'En cuanto a la cultura…'},
        {fr:'À condition que tu pratiques…',   es:'Siempre y cuando practiques…'},
      ],
      question:'Comment dit-on "à condition que" ?',
      options:['a pesar de que','siempre y cuando','en cuanto a'],
      answer:1,
    },
    phrase:{fr:'En conclusion, je pense que…', es:'En conclusión, creo que…'},
    words:[
      {en:'apparently',     fr:'apparemment',      es:'aparentemente',   esTarget:'aparentemente',   example:{fr:'Apparemment c\'est vrai.',      es:'Aparentemente es verdad.'}},
      {en:'obviously',      fr:'évidemment',       es:'obviamente',      esTarget:'obviamente',      example:{fr:'Évidemment, oui.',              es:'Obviamente, sí.'}},
      {en:'furthermore',    fr:'de plus',          es:'además',          esTarget:'además',          example:{fr:'De plus, c\'est gratuit.',      es:'Además, es gratis.'}},
      {en:'consequently',   fr:'par conséquent',   es:'por lo tanto',    esTarget:'por lo tanto',    example:{fr:'Par conséquent, on attend.',    es:'Por lo tanto, esperamos.'}},
      {en:'nevertheless',   fr:'néanmoins',        es:'sin embargo',     esTarget:'sin embargo',     example:{fr:'Néanmoins, on continue.',       es:'Sin embargo, seguimos.'}},
      {en:'throughout',     fr:'tout au long de',  es:'a lo largo de',   esTarget:'a lo largo de',   example:{fr:'Tout au long du voyage.',       es:'A lo largo del viaje.'}},
      {en:'meanwhile',      fr:'pendant ce temps', es:'mientras tanto',  esTarget:'mientras tanto',  example:{fr:'Pendant ce temps, j\'attends.', es:'Mientras tanto, espero.'}},
      {en:'regarding',      fr:'en ce qui concerne',es:'en cuanto a',    esTarget:'en cuanto a',     example:{fr:'En ce qui concerne l\'école.',  es:'En cuanto a la escuela.'}},
      {en:'provided that',  fr:'à condition que',  es:'siempre y cuando',esTarget:'siempre y cuando',example:{fr:'À condition que tu viennes.',  es:'Siempre y cuando vengas.'}},
      {en:'in conclusion',  fr:'en conclusion',    es:'en conclusión',   esTarget:'en conclusión',   example:{fr:'En conclusion, c\'est bien.',   es:'En conclusión, está bien.'}},
    ],
  },
];

window.CURRICULUM_B1 = CURRICULUM_B1;
