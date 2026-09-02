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

  const REFS = [
    {
      id: 'ref_conj', icon: '🔗',
      name: 'Conjonctions & connecteurs', nameEs: 'Conjunciones y conectores',
      words: [
        // ── Opposition / concession ──────────────────────────────────────
        { en: 'but',                 fr: 'mais',                          es: 'pero',                        esTarget: 'pero',                        example: { fr: 'Je veux venir, mais je suis fatigué.', es: 'Quiero venir, pero estoy cansado.' } },
        { en: 'however',             fr: 'pourtant / cependant',          es: 'sin embargo / no obstante',   esTarget: 'igual / de todas formas',     example: { fr: 'C\'est difficile, pourtant je continue.', es: 'Es difícil, sin embargo sigo.' } },
        { en: 'nevertheless',        fr: 'néanmoins / toutefois',         es: 'no obstante / aun así',       esTarget: 'igual / aun así',             example: { fr: 'C\'est cher ; néanmoins, ça vaut le coup.', es: 'Es caro; igual, vale la pena.' } },
        { en: 'while/whereas',       fr: 'tandis que / alors que',        es: 'mientras que / en cambio',    esTarget: 'mientras que',                example: { fr: 'Il travaille tandis qu\'elle se repose.', es: 'Él trabaja mientras que ella descansa.' } },
        { en: 'although',            fr: 'bien que + subj.',              es: 'aunque',                      esTarget: 'aunque',                      example: { fr: 'Bien qu\'il fasse froid, elle sort.', es: 'Aunque hace frío, ella sale.' } },
        { en: 'even if',             fr: 'même si',                       es: 'aunque / incluso si',         esTarget: 'aunque',                      example: { fr: 'Je viens même si tu n\'es pas là.', es: 'Vengo aunque no estés.' } },
        { en: 'despite',             fr: 'malgré',                        es: 'a pesar de',                  esTarget: 'a pesar de',                  example: { fr: 'Il sourit malgré la douleur.', es: 'Sonríe a pesar del dolor.' } },
        { en: 'anyway',              fr: 'quand même / tout de même',     es: 'de todas formas / igual',     esTarget: 'igual / de todas formas',     example: { fr: 'Je vais essayer quand même.', es: 'Voy a intentarlo igual.' } },
        { en: 'on the other hand',   fr: 'en revanche / par contre',      es: 'en cambio / por otro lado',   esTarget: 'en cambio',                   example: { fr: 'Il est rapide. En revanche, il est imprudent.', es: 'Es rápido. En cambio, es imprudente.' } },
        // ── Cause ────────────────────────────────────────────────────────
        { en: 'because',             fr: 'parce que / car',               es: 'porque',                      esTarget: 'porque',                      example: { fr: 'Je reste parce qu\'il pleut.', es: 'Me quedo porque llueve.' } },
        { en: 'since (given that)',  fr: 'puisque',                       es: 'ya que / puesto que',         esTarget: 'ya que',                      example: { fr: 'Puisque tu es là, aide-moi.', es: 'Ya que estás acá, ayudame.' } },
        { en: 'given that',          fr: 'étant donné que / vu que',      es: 'dado que / visto que',        esTarget: 'dado que',                    example: { fr: 'Vu qu\'il est absent, on reporte.', es: 'Dado que está ausente, lo postergamos.' } },
        { en: 'thanks to',           fr: 'grâce à',                       es: 'gracias a',                   esTarget: 'gracias a',                   example: { fr: 'Grâce à toi, j\'ai réussi.', es: 'Gracias a vos, lo logré.' } },
        { en: 'because of',          fr: 'à cause de',                    es: 'a causa de / por culpa de',   esTarget: 'por culpa de / a causa de',   example: { fr: 'Il est en retard à cause du trafic.', es: 'Llegó tarde por culpa del tráfico.' } },
        // ── Conséquence ──────────────────────────────────────────────────
        { en: 'so/therefore',        fr: 'donc / alors',                  es: 'entonces / por lo tanto',     esTarget: 'entonces / por eso',          example: { fr: 'Il est tard, donc je pars.', es: 'Es tarde, entonces me voy.' } },
        { en: 'consequently',        fr: 'par conséquent / c\'est pourquoi', es: 'por consiguiente / por eso', esTarget: 'por eso / por lo tanto',   example: { fr: 'Il a travaillé dur, c\'est pourquoi il a réussi.', es: 'Trabajó duro, por eso triunfó.' } },
        // ── But / objectif ───────────────────────────────────────────────
        { en: 'in order to',         fr: 'afin de + inf.',                es: 'a fin de / para + inf.',      esTarget: 'para + inf.',                 example: { fr: 'J\'étudie afin de progresser.', es: 'Estudio para progresar.' } },
        { en: 'so that',             fr: 'pour que + subj.',              es: 'para que + subj.',            esTarget: 'para que + subj.',            example: { fr: 'Je parle fort pour que tu entendes.', es: 'Hablo fuerte para que escuches.' } },
        // ── Condition ────────────────────────────────────────────────────
        { en: 'if',                  fr: 'si',                            es: 'si',                          esTarget: 'si',                          example: { fr: 'Si tu veux, on peut sortir.', es: 'Si querés, podemos salir.' } },
        { en: 'unless',              fr: 'à moins que + subj.',           es: 'a menos que + subj.',         esTarget: 'a menos que + subj.',         example: { fr: 'Je viendrai, à moins qu\'il pleuve.', es: 'Voy a venir, a menos que llueva.' } },
        { en: 'provided that',       fr: 'à condition que + subj.',       es: 'con tal de que + subj.',      esTarget: 'siempre y cuando',            example: { fr: 'Tu peux sortir à condition que tu rentres tôt.', es: 'Podés salir siempre y cuando vuelvas temprano.' } },
        // ── Temps ────────────────────────────────────────────────────────
        { en: 'when',                fr: 'quand / lorsque',               es: 'cuando',                      esTarget: 'cuando',                      example: { fr: 'Appelle-moi quand tu arrives.', es: 'Llamame cuando llegues.' } },
        { en: 'while',               fr: 'pendant que',                   es: 'mientras (que)',               esTarget: 'mientras',                    example: { fr: 'Je lis pendant qu\'il cuisine.', es: 'Leo mientras él cocina.' } },
        { en: 'as soon as',          fr: 'dès que / aussitôt que',        es: 'en cuanto / apenas',          esTarget: 'en cuanto / ni bien',         example: { fr: 'Appelle-moi dès que tu arrives.', es: 'Llamame en cuanto llegues.' } },
        { en: 'since (time)',         fr: 'depuis que',                    es: 'desde que',                   esTarget: 'desde que',                   example: { fr: 'Depuis qu\'il vit ici, il est heureux.', es: 'Desde que vive acá, es feliz.' } },
        { en: 'until',               fr: 'jusqu\'à ce que + subj.',       es: 'hasta que',                   esTarget: 'hasta que',                   example: { fr: 'Attends jusqu\'à ce qu\'il revienne.', es: 'Esperá hasta que vuelva.' } },
        { en: 'before',              fr: 'avant de + inf.',               es: 'antes de + inf.',             esTarget: 'antes de + inf.',             example: { fr: 'Réfléchis avant de parler.', es: 'Pensá antes de hablar.' } },
        { en: 'after',               fr: 'après + inf. passé',            es: 'después de + inf.',           esTarget: 'después de + inf.',           example: { fr: 'Après avoir mangé, il sort.', es: 'Después de comer, sale.' } },
        { en: 'as long as',          fr: 'tant que',                      es: 'mientras / siempre que',      esTarget: 'mientras',                    example: { fr: 'Tant que tu es là, je suis heureux.', es: 'Mientras estés, soy feliz.' } },
        // ── Ordre / structure ────────────────────────────────────────────
        { en: 'first',               fr: 'd\'abord / premièrement',       es: 'primero / en primer lugar',   esTarget: 'primero',                     example: { fr: 'D\'abord, parlons de ça.', es: 'Primero, hablemos de esto.' } },
        { en: 'then/next',           fr: 'puis / ensuite',                es: 'luego / después',             esTarget: 'después / luego',             example: { fr: 'Je mange, puis je lis.', es: 'Como, luego leo.' } },
        { en: 'finally',             fr: 'enfin / finalement',            es: 'por fin / finalmente',        esTarget: 'finalmente / al final',       example: { fr: 'Enfin, nous arrivons !', es: '¡Por fin llegamos!' } },
        // ── Ajout / illustration ─────────────────────────────────────────
        { en: 'moreover',            fr: 'de plus / en outre',            es: 'además',                      esTarget: 'además',                      example: { fr: 'C\'est beau et de plus, c\'est gratuit.', es: 'Es lindo y además es gratis.' } },
        { en: 'not only...but also', fr: 'non seulement...mais aussi',    es: 'no solo...sino también',      esTarget: 'no solo...sino también',      example: { fr: 'Il est non seulement intelligent, mais aussi généreux.', es: 'No solo es inteligente, sino también generoso.' } },
        { en: 'for example',         fr: 'par exemple',                   es: 'por ejemplo',                 esTarget: 'por ejemplo',                 example: { fr: 'J\'aime les fruits, par exemple les mangues.', es: 'Me gustan las frutas, por ejemplo los mangos.' } },
        { en: 'that is to say',      fr: 'c\'est-à-dire / autrement dit', es: 'es decir / o sea',            esTarget: 'o sea',                       example: { fr: 'Il est bilingue, c\'est-à-dire qu\'il parle deux langues.', es: 'Es bilingüe, o sea que habla dos idiomas.' } },
        { en: 'according to',        fr: 'selon / d\'après',              es: 'según',                       esTarget: 'según',                       example: { fr: 'Selon la météo, il va neiger.', es: 'Según el pronóstico, va a nevar.' } },
        { en: 'in any case',         fr: 'en tout cas / de toute façon',  es: 'de todos modos / igual',      esTarget: 'igual / de todos modos',      example: { fr: 'En tout cas, je serai là.', es: 'De todos modos, voy a estar.' } },
      ],
    },
    {
      id: 'ref_verb', icon: '⚡',
      name: 'Verbes essentiels', nameEs: 'Verbos esenciales',
      words: [
        // ── Auxiliaires & modaux ─────────────────────────────────────────
        { en: 'to be (identity)',    fr: 'être',                          es: 'ser',                         esTarget: 'ser',                         example: { fr: 'Je suis étudiant.', es: 'Soy estudiante.' } },
        { en: 'to be (state)',       fr: 'être (état)',                   es: 'estar',                       esTarget: 'estar',                       example: { fr: 'Je suis fatigué.', es: 'Estoy cansado.' } },
        { en: 'to have',             fr: 'avoir',                         es: 'tener',                       esTarget: 'tener',                       example: { fr: 'J\'ai un chat.', es: 'Tengo un gato.' } },
        { en: 'can/to be able to',   fr: 'pouvoir',                       es: 'poder',                       esTarget: 'poder',                       example: { fr: 'Je peux t\'aider.', es: 'Puedo ayudarte.' } },
        { en: 'to want',             fr: 'vouloir',                       es: 'querer',                      esTarget: 'querer',                      example: { fr: 'Je veux un café.', es: 'Quiero un café.' } },
        { en: 'must/to have to',     fr: 'devoir',                        es: 'deber / tener que',           esTarget: 'tener que',                   example: { fr: 'Tu dois étudier.', es: 'Tenés que estudiar.' } },
        { en: 'to know (fact)',      fr: 'savoir',                        es: 'saber',                       esTarget: 'saber',                       example: { fr: 'Je sais parler français.', es: 'Sé hablar francés.' } },
        { en: 'to know (person)',    fr: 'connaître',                     es: 'conocer',                     esTarget: 'conocer',                     example: { fr: 'Je connais Buenos Aires.', es: 'Conozco Buenos Aires.' } },
        // ── Verbes de mouvement ──────────────────────────────────────────
        { en: 'to go',               fr: 'aller',                         es: 'ir',                          esTarget: 'ir',                          example: { fr: 'Je vais au marché.', es: 'Voy al mercado.' } },
        { en: 'to come',             fr: 'venir',                         es: 'venir',                       esTarget: 'venir',                       example: { fr: 'Viens avec moi !', es: '¡Vení conmigo!' } },
        { en: 'to leave/go out',     fr: 'partir / sortir',               es: 'irse / salir',                esTarget: 'irse / salir',                example: { fr: 'Je pars demain matin.', es: 'Me voy mañana a la mañana.' } },
        { en: 'to arrive',           fr: 'arriver',                       es: 'llegar',                      esTarget: 'llegar',                      example: { fr: 'J\'arrive dans dix minutes.', es: 'Llego en diez minutos.' } },
        { en: 'to return',           fr: 'rentrer / revenir',             es: 'volver / regresar',           esTarget: 'volver',                      example: { fr: 'À quelle heure tu rentres ?', es: '¿A qué hora volvés?' } },
        { en: 'to stay/remain',      fr: 'rester',                        es: 'quedarse / permanecer',       esTarget: 'quedarse',                    example: { fr: 'Je reste ici ce soir.', es: 'Me quedo acá esta noche.' } },
        // ── Verbes d\'action fondamentaux ─────────────────────────────────
        { en: 'to do/make',          fr: 'faire',                         es: 'hacer',                       esTarget: 'hacer',                       example: { fr: 'Qu\'est-ce que tu fais ?', es: '¿Qué hacés?' } },
        { en: 'to take',             fr: 'prendre',                       es: 'tomar',                       esTarget: 'tomar',                       example: { fr: 'Je prends le bus.', es: 'Tomo el colectivo.' } },
        { en: 'to give',             fr: 'donner',                        es: 'dar',                         esTarget: 'dar',                         example: { fr: 'Donne-moi ton numéro.', es: 'Dame tu número.' } },
        { en: 'to put',              fr: 'mettre',                        es: 'poner',                       esTarget: 'poner',                       example: { fr: 'Mets ton manteau !', es: '¡Ponete el abrigo!' } },
        { en: 'to look for',         fr: 'chercher',                      es: 'buscar',                      esTarget: 'buscar',                      example: { fr: 'Je cherche mon téléphone.', es: 'Busco mi teléfono.' } },
        { en: 'to find',             fr: 'trouver',                       es: 'encontrar',                   esTarget: 'encontrar',                   example: { fr: 'J\'ai trouvé la solution.', es: 'Encontré la solución.' } },
        { en: 'to use',              fr: 'utiliser / se servir de',       es: 'usar / utilizar',             esTarget: 'usar',                        example: { fr: 'J\'utilise un dictionnaire.', es: 'Uso un diccionario.' } },
        { en: 'to open',             fr: 'ouvrir',                        es: 'abrir',                       esTarget: 'abrir',                       example: { fr: 'Ouvre la fenêtre !', es: '¡Abrí la ventana!' } },
        { en: 'to close',            fr: 'fermer',                        es: 'cerrar',                      esTarget: 'cerrar',                      example: { fr: 'Ferme la porte, s\'il te plaît.', es: 'Cerrá la puerta, por favor.' } },
        // ── Communication / perception ───────────────────────────────────
        { en: 'to speak',            fr: 'parler',                        es: 'hablar',                      esTarget: 'hablar',                      example: { fr: 'Tu parles bien espagnol.', es: 'Hablás bien el español.' } },
        { en: 'to say/tell',         fr: 'dire',                          es: 'decir',                       esTarget: 'decir',                       example: { fr: 'Qu\'est-ce qu\'il dit ?', es: '¿Qué dice?' } },
        { en: 'to ask',              fr: 'demander',                      es: 'pedir / preguntar',           esTarget: 'pedir / preguntar',           example: { fr: 'Je lui demande son avis.', es: 'Le pido su opinión.' } },
        { en: 'to answer',           fr: 'répondre',                      es: 'responder / contestar',       esTarget: 'contestar',                   example: { fr: 'Il ne répond pas à mes messages.', es: 'No contesta mis mensajes.' } },
        { en: 'to understand',       fr: 'comprendre',                    es: 'entender / comprender',       esTarget: 'entender',                    example: { fr: 'Je comprends tout.', es: 'Entiendo todo.' } },
        { en: 'to explain',          fr: 'expliquer',                     es: 'explicar',                    esTarget: 'explicar',                    example: { fr: 'Explique-moi comment ça marche.', es: 'Explicame cómo funciona.' } },
        { en: 'to hear',             fr: 'entendre',                      es: 'oír / escuchar',              esTarget: 'escuchar',                    example: { fr: 'J\'entends du bruit dehors.', es: 'Escucho ruido afuera.' } },
        { en: 'to see',              fr: 'voir',                          es: 'ver',                         esTarget: 'ver',                         example: { fr: 'Je vois la montagne.', es: 'Veo la montaña.' } },
        // ── Intellect / émotions ─────────────────────────────────────────
        { en: 'to think/believe',    fr: 'penser / croire',               es: 'pensar / creer',              esTarget: 'pensar / creer',              example: { fr: 'Je pense que c\'est vrai.', es: 'Pienso que es verdad.' } },
        { en: 'to like/love',        fr: 'aimer',                         es: 'querer / gustar',             esTarget: 'querer / gustar',             example: { fr: 'J\'aime voyager.', es: 'Me encanta viajar.' } },
        { en: 'to prefer',           fr: 'préférer',                      es: 'preferir',                    esTarget: 'preferir',                    example: { fr: 'Je préfère le café au thé.', es: 'Prefiero el café al té.' } },
        { en: 'to feel',             fr: 'se sentir',                     es: 'sentirse',                    esTarget: 'sentirse',                    example: { fr: 'Je me sens bien ici.', es: 'Me siento bien acá.' } },
        { en: 'to hope',             fr: 'espérer',                       es: 'esperar',                     esTarget: 'esperar',                     example: { fr: 'J\'espère te revoir bientôt.', es: 'Espero volverte a ver pronto.' } },
        { en: 'to learn',            fr: 'apprendre',                     es: 'aprender',                    esTarget: 'aprender',                    example: { fr: 'J\'apprends l\'espagnol.', es: 'Aprendo el francés.' } },
        { en: 'to forget',           fr: 'oublier',                       es: 'olvidar',                     esTarget: 'olvidar',                     example: { fr: 'J\'ai oublié mon portable.', es: 'Olvidé el celular.' } },
        { en: 'to remember',         fr: 'se souvenir de',                es: 'recordar / acordarse de',     esTarget: 'acordarse de',                example: { fr: 'Tu te souviens de lui ?', es: '¿Te acordás de él?' } },
        // ── Décision / progression ───────────────────────────────────────
        { en: 'to start',            fr: 'commencer',                     es: 'empezar / comenzar',          esTarget: 'empezar',                     example: { fr: 'On commence à 9h.', es: 'Empezamos a las 9.' } },
        { en: 'to finish',           fr: 'finir / terminer',              es: 'terminar',                    esTarget: 'terminar',                    example: { fr: 'J\'ai fini mon travail.', es: 'Terminé mi trabajo.' } },
        { en: 'to continue',         fr: 'continuer',                     es: 'continuar / seguir',          esTarget: 'seguir',                      example: { fr: 'Continue ton chemin.', es: 'Seguí tu camino.' } },
        { en: 'to stop (doing)',      fr: 'arrêter de + inf.',             es: 'dejar de + inf.',             esTarget: 'dejar de + inf.',             example: { fr: 'Arrête de crier !', es: '¡Dejá de gritar!' } },
        { en: 'to choose',           fr: 'choisir',                       es: 'elegir / escoger',            esTarget: 'elegir',                      example: { fr: 'Choisis ton plat.', es: 'Elegí tu plato.' } },
        { en: 'to decide',           fr: 'décider',                       es: 'decidir',                     esTarget: 'decidir',                     example: { fr: 'J\'ai décidé de partir.', es: 'Decidí irme.' } },
        { en: 'to try',              fr: 'essayer',                       es: 'intentar / tratar de',        esTarget: 'intentar',                    example: { fr: 'Essaie encore une fois.', es: 'Intentá una vez más.' } },
        { en: 'to succeed',          fr: 'réussir',                       es: 'lograr / tener éxito',        esTarget: 'lograr',                      example: { fr: 'Il a réussi son examen.', es: 'Aprobó el examen.' } },
        { en: 'to become',           fr: 'devenir',                       es: 'volverse / convertirse en',   esTarget: 'volverse',                    example: { fr: 'Il est devenu médecin.', es: 'Se convirtió en médico.' } },
        { en: 'to allow/let',        fr: 'permettre',                     es: 'permitir / dejar',            esTarget: 'dejar / permitir',            example: { fr: 'Ça me permet de progresser.', es: 'Eso me deja progresar.' } },
        // ── Vie quotidienne ──────────────────────────────────────────────
        { en: 'to write',            fr: 'écrire',                        es: 'escribir',                    esTarget: 'escribir',                    example: { fr: 'J\'écris une lettre.', es: 'Escribo una carta.' } },
        { en: 'to read',             fr: 'lire',                          es: 'leer',                        esTarget: 'leer',                        example: { fr: 'Je lis tous les jours.', es: 'Leo todos los días.' } },
        { en: 'to eat',              fr: 'manger',                        es: 'comer',                       esTarget: 'comer',                       example: { fr: 'On mange ensemble ?', es: '¿Comemos juntos?' } },
        { en: 'to drink',            fr: 'boire',                         es: 'tomar / beber',               esTarget: 'tomar',                       example: { fr: 'Je bois un verre d\'eau.', es: 'Tomo un vaso de agua.' } },
        { en: 'to buy',              fr: 'acheter',                       es: 'comprar',                     esTarget: 'comprar',                     example: { fr: 'J\'achète du pain chaque matin.', es: 'Compro pan cada mañana.' } },
        { en: 'to pay',              fr: 'payer',                         es: 'pagar',                       esTarget: 'pagar',                       example: { fr: 'Tu peux payer par carte.', es: 'Podés pagar con tarjeta.' } },
        { en: 'to work',             fr: 'travailler',                    es: 'trabajar',                    esTarget: 'trabajar',                    example: { fr: 'Elle travaille dans un hôpital.', es: 'Trabaja en un hospital.' } },
        { en: 'to live/reside',      fr: 'habiter / vivre',               es: 'vivir',                       esTarget: 'vivir',                       example: { fr: 'J\'habite à Paris depuis 3 ans.', es: 'Vivo en París hace 3 años.' } },
        { en: 'to wait',             fr: 'attendre',                      es: 'esperar',                     esTarget: 'esperar',                     example: { fr: 'J\'attends le bus depuis 20 min.', es: 'Espero el colectivo hace 20 min.' } },
        { en: 'to follow',           fr: 'suivre',                        es: 'seguir',                      esTarget: 'seguir',                      example: { fr: 'Suis-moi, je connais le chemin.', es: 'Seguime, conozco el camino.' } },
        { en: 'to need',             fr: 'avoir besoin de',               es: 'necesitar',                   esTarget: 'necesitar',                   example: { fr: 'J\'ai besoin d\'aide.', es: 'Necesito ayuda.' } },
      ],
    },
    {
      id: 'ref_expr', icon: '💬',
      name: "S'exprimer au quotidien", nameEs: 'Expresarse en el día a día',
      words: [
        // ── Politesse & salutations ──
        { en: 'Good morning!',                    fr: 'Bonjour !',                              es: '¡Buenos días!',                   esTarget: '¡Buen día!',                        example: { fr: '', es: '' } },
        { en: 'How are you?',                     fr: 'Comment ça va ?',                        es: '¿Cómo estás?',                    esTarget: '¿Cómo estás?',                      example: { fr: '', es: '' } },
        { en: "I'm fine, thanks.",                fr: 'Ça va bien, merci.',                     es: 'Bien, gracias.',                  esTarget: 'Bien, gracias.',                    example: { fr: '', es: '' } },
        { en: 'See you soon!',                    fr: 'À bientôt !',                            es: '¡Hasta pronto!',                  esTarget: '¡Hasta pronto!',                    example: { fr: '', es: '' } },
        { en: 'Have a good day!',                 fr: 'Bonne journée !',                        es: '¡Que tengas un buen día!',        esTarget: '¡Que tengas un buen día!',          example: { fr: '', es: '' } },
        { en: 'Congratulations!',                 fr: 'Félicitations !',                        es: '¡Felicitaciones!',                esTarget: '¡Felicitaciones!',                  example: { fr: '', es: '' } },
        { en: 'Good luck!',                       fr: 'Bonne chance !',                         es: '¡Buena suerte!',                  esTarget: '¡Buena suerte!',                    example: { fr: '', es: '' } },
        { en: 'Enjoy your meal!',                 fr: 'Bon appétit !',                          es: '¡Buen provecho!',                 esTarget: '¡Buen provecho!',                   example: { fr: '', es: '' } },
        // ── Souhaits & désirs ──
        { en: "I'd like a coffee.",               fr: "J'aimerais un café.",                    es: 'Quisiera un café.',               esTarget: 'Me gustaría un café.',              example: { fr: '', es: '' } },
        { en: "I'd like to go to the cinema.",    fr: 'Je voudrais aller au cinéma.',           es: 'Quisiera ir al cine.',            esTarget: 'Quisiera ir al cine.',              example: { fr: '', es: '' } },
        { en: 'I feel like sleeping.',            fr: "J'ai envie de dormir.",                  es: 'Tengo ganas de dormir.',          esTarget: 'Tengo ganas de dormir.',            example: { fr: '', es: '' } },
        { en: 'That would make me happy.',        fr: 'Ça me ferait plaisir.',                  es: 'Me daría mucho gusto.',           esTarget: 'Me daría mucho gusto.',             example: { fr: '', es: '' } },
        { en: 'That would be great!',             fr: 'Ce serait super !',                      es: '¡Sería genial!',                  esTarget: '¡Sería genial!',                    example: { fr: '', es: '' } },
        { en: "I'd rather stay here.",            fr: 'Je préférerais rester ici.',             es: 'Preferiría quedarme aquí.',       esTarget: 'Preferiría quedarme acá.',           example: { fr: '', es: '' } },
        { en: 'I really want to see you.',        fr: "J'ai vraiment envie de te voir.",        es: 'Tengo muchas ganas de verte.',    esTarget: 'Tengo muchas ganas de verte.',       example: { fr: '', es: '' } },
        { en: 'I dream of travelling.',           fr: 'Je rêve de voyager.',                    es: 'Sueño con viajar.',               esTarget: 'Sueño con viajar.',                 example: { fr: '', es: '' } },
        // ── Plans & intentions ──
        { en: "I'll go to the beach this weekend.", fr: "J'irai à la plage ce week-end.",       es: 'Voy a ir a la playa este finde.', esTarget: 'Voy a ir a la playa este finde.',   example: { fr: '', es: '' } },
        { en: 'Shall we eat together tonight?',   fr: 'On va manger ensemble ce soir ?',        es: '¿Comemos juntos esta noche?',     esTarget: '¿Comemos juntos esta noche?',        example: { fr: '', es: '' } },
        { en: 'We could visit the museum.',       fr: 'On pourrait visiter le musée.',          es: 'Podríamos visitar el museo.',     esTarget: 'Podríamos visitar el museo.',        example: { fr: '', es: '' } },
        { en: "I'm planning to go on a trip.",    fr: "J'ai prévu de partir en voyage.",        es: 'Tengo planeado salir de viaje.',  esTarget: 'Tengo planeado salir de viaje.',     example: { fr: '', es: '' } },
        { en: "I think I'll be back around 6.",   fr: 'Je pense rentrer vers 18h.',             es: 'Creo que vuelvo a las 18.',       esTarget: 'Creo que vuelvo a las 18.',         example: { fr: '', es: '' } },
        { en: 'Where shall we meet?',             fr: 'On se retrouve où ?',                    es: '¿Dónde nos encontramos?',         esTarget: '¿Dónde nos encontramos?',           example: { fr: '', es: '' } },
        { en: 'What are you doing tomorrow?',     fr: 'Tu fais quoi demain ?',                  es: '¿Qué hacés mañana?',              esTarget: '¿Qué hacés mañana?',                example: { fr: '', es: '' } },
        { en: "I'll call you later.",             fr: "Je t'appellerai plus tard.",             es: 'Te llamo más tarde.',             esTarget: 'Te llamo más tarde.',               example: { fr: '', es: '' } },
        // ── Passé & narration ──
        { en: 'I went to the supermarket.',       fr: 'Je suis allé au supermarché.',           es: 'Fui al supermercado.',            esTarget: 'Fui al supermercado.',              example: { fr: '', es: '' } },
        { en: 'We had a great dinner last night.',fr: 'On a très bien mangé hier soir.',        es: 'Anoche comimos muy bien.',        esTarget: 'Anoche comimos muy bien.',           example: { fr: '', es: '' } },
        { en: 'I forgot my phone at home.',       fr: "J'ai oublié mon portable à la maison.",  es: 'Olvidé el celular en casa.',      esTarget: 'Olvidé el celular en casa.',         example: { fr: '', es: '' } },
        { en: 'It went very well.',               fr: "Ça s'est très bien passé.",              es: 'Salió muy bien.',                 esTarget: 'Salió muy bien.',                   example: { fr: '', es: '' } },
        { en: 'I was so tired.',                  fr: "J'étais tellement fatigué.",             es: 'Estaba tan cansado.',             esTarget: 'Estaba tan cansado.',               example: { fr: '', es: '' } },
        { en: 'We bumped into each other.',       fr: "On s'est retrouvés par hasard.",         es: 'Nos encontramos de casualidad.',  esTarget: 'Nos encontramos de casualidad.',     example: { fr: '', es: '' } },
        { en: 'I had a great evening.',           fr: "J'ai passé une excellente soirée.",      es: 'Pasé una noche excelente.',       esTarget: 'Pasé una noche excelente.',          example: { fr: '', es: '' } },
        { en: 'He told me something strange.',    fr: "Il m'a dit quelque chose de bizarre.",   es: 'Me dijo algo raro.',              esTarget: 'Me dijo algo raro.',                example: { fr: '', es: '' } },
        // ── Questions courantes ──
        { en: 'Are you happy?',                   fr: 'Est-ce que tu es content(e) ?',          es: '¿Estás contento/a?',              esTarget: '¿Estás contento/a?',                example: { fr: '', es: '' } },
        { en: 'Do you need help?',                fr: "Tu as besoin d'aide ?",                   es: '¿Necesitás ayuda?',               esTarget: '¿Necesitás ayuda?',                 example: { fr: '', es: '' } },
        { en: 'How much does it cost?',           fr: "C'est combien ?",                         es: '¿Cuánto cuesta?',                 esTarget: '¿Cuánto cuesta?',                   example: { fr: '', es: '' } },
        { en: 'Where is the station?',            fr: 'Où se trouve la gare ?',                  es: '¿Dónde queda la estación?',       esTarget: '¿Dónde queda la estación?',         example: { fr: '', es: '' } },
        { en: 'What time does it close?',         fr: 'À quelle heure ça ferme ?',               es: '¿A qué hora cierra?',             esTarget: '¿A qué hora cierra?',               example: { fr: '', es: '' } },
        { en: 'Do you have a table for two?',     fr: 'Vous avez une table pour deux ?',         es: '¿Tienen mesa para dos?',          esTarget: '¿Tienen mesa para dos?',            example: { fr: '', es: '' } },
        { en: 'Are you coming with us?',          fr: 'Tu viens avec nous ?',                    es: '¿Venís con nosotros?',            esTarget: '¿Venís con nosotros?',              example: { fr: '', es: '' } },
        { en: "Is that OK with you?",             fr: 'Ça te va ?',                              es: '¿Te parece bien?',                esTarget: '¿Te parece bien?',                  example: { fr: '', es: '' } },
        // ── Opinions & sentiments ──
        { en: "I think it's a good idea.",        fr: "Je pense que c'est une bonne idée.",      es: 'Me parece que es una buena idea.',esTarget: 'Me parece que es una buena idea.',   example: { fr: '', es: '' } },
        { en: 'I find that very interesting.',    fr: 'Je trouve ça très intéressant.',          es: 'Lo encuentro muy interesante.',   esTarget: 'Lo encuentro muy interesante.',      example: { fr: '', es: '' } },
        { en: 'I love this place!',               fr: "J'adore cet endroit !",                   es: '¡Me encanta este lugar!',         esTarget: '¡Me encanta este lugar!',            example: { fr: '', es: '' } },
        { en: "That's a shame.",                  fr: "C'est dommage.",                           es: 'Qué lástima.',                    esTarget: 'Qué lástima.',                      example: { fr: '', es: '' } },
        { en: "I'm really sorry.",                fr: 'Je suis vraiment désolé(e).',             es: 'Lo siento mucho.',                esTarget: 'Lo siento mucho.',                  example: { fr: '', es: '' } },
        { en: 'That makes me think of you.',      fr: 'Ça me fait penser à toi.',                es: 'Eso me hace pensar en vos.',      esTarget: 'Eso me hace pensar en vos.',         example: { fr: '', es: '' } },
        { en: "I'm not really interested.",       fr: "Ça ne m'intéresse pas vraiment.",         es: 'No me interesa mucho.',           esTarget: 'No me interesa mucho.',             example: { fr: '', es: '' } },
        { en: "That's great news!",               fr: "C'est une excellente nouvelle !",          es: '¡Qué buena noticia!',             esTarget: '¡Qué buena noticia!',               example: { fr: '', es: '' } },
        // ── Communication pratique ──
        { en: 'Can you repeat, please?',          fr: "Tu peux répéter, s'il te plaît ?",        es: '¿Podés repetir, por favor?',      esTarget: '¿Podés repetir, por favor?',         example: { fr: '', es: '' } },
        { en: "I don't understand very well.",    fr: 'Je ne comprends pas très bien.',          es: 'No entiendo muy bien.',           esTarget: 'No entiendo muy bien.',             example: { fr: '', es: '' } },
        { en: 'How do you say this in Spanish?',  fr: 'Comment dit-on ça en espagnol ?',         es: '¿Cómo se dice esto en español?',  esTarget: '¿Cómo se dice esto en español?',     example: { fr: '', es: '' } },
        { en: 'Could you speak more slowly?',     fr: 'Tu pourrais parler plus lentement ?',     es: '¿Podrías hablar más despacio?',   esTarget: '¿Podrías hablar más despacio?',      example: { fr: '', es: '' } },
        { en: 'What does that mean?',             fr: "Qu'est-ce que ça veut dire ?",             es: '¿Qué significa eso?',             esTarget: '¿Qué significa eso?',               example: { fr: '', es: '' } },
        { en: 'Let me explain.',                  fr: "Laisse-moi t'expliquer.",                 es: 'Dejame explicarte.',              esTarget: 'Dejame explicarte.',                example: { fr: '', es: '' } },
        { en: "I'll tell you about it later.",    fr: "Je t'en parlerai plus tard.",             es: 'Te cuento después.',              esTarget: 'Te cuento después.',                example: { fr: '', es: '' } },
      ],
    },
    {
      id: 'ref_conjug', icon: '🔀',
      name: 'Conjugaisons essentielles', nameEs: 'Conjugaciones esenciales',
      words: [
        // ── Présent ──
        { en: 'être: je suis (présent)',           fr: 'je suis',           es: 'soy',          esTarget: 'soy',         example: { fr: 'Je suis content.',          es: 'Estoy contento.'         } },
        { en: 'être: tu es (présent)',             fr: 'tu es',             es: 'sos / eres',   esTarget: 'vos sos',     example: { fr: 'Tu es prêt ?',              es: '¿Estás listo?'           } },
        { en: "avoir: j'ai (présent)",             fr: "j'ai",              es: 'tengo',        esTarget: 'tengo',       example: { fr: "J'ai faim.",                es: 'Tengo hambre.'           } },
        { en: 'avoir: tu as (présent)',            fr: 'tu as',             es: 'tenés / tienes',esTarget: 'vos tenés',  example: { fr: 'Tu as le temps ?',          es: '¿Tenés tiempo?'          } },
        { en: 'aller: je vais (présent)',          fr: 'je vais',           es: 'voy',          esTarget: 'voy',         example: { fr: 'Je vais bien.',             es: 'Estoy bien.'             } },
        { en: 'aller: tu vas (présent)',           fr: 'tu vas',            es: 'vas',          esTarget: 'vos vas',     example: { fr: 'Tu vas à la plage ?',       es: '¿Vas a la playa?'        } },
        { en: 'faire: je fais (présent)',          fr: 'je fais',           es: 'hago',         esTarget: 'hago',        example: { fr: 'Je fais du sport.',         es: 'Hago deporte.'           } },
        { en: 'faire: tu fais (présent)',          fr: 'tu fais',           es: 'hacés / haces',esTarget: 'vos hacés',   example: { fr: 'Tu fais quoi ?',            es: '¿Qué hacés?'             } },
        { en: 'vouloir: je veux (présent)',        fr: 'je veux',           es: 'quiero',       esTarget: 'quiero',      example: { fr: 'Je veux dormir.',           es: 'Quiero dormir.'          } },
        { en: 'pouvoir: je peux (présent)',        fr: 'je peux',           es: 'puedo',        esTarget: 'puedo',       example: { fr: 'Je peux venir.',            es: 'Puedo venir.'            } },
        // ── Futur simple ──
        { en: "aller: j'irai (futur)",             fr: "j'irai",            es: 'iré',          esTarget: 'iré',         example: { fr: "J'irai à Paris.",           es: 'Iré a París.'            } },
        { en: 'aller: tu iras (futur)',            fr: 'tu iras',           es: 'irás',         esTarget: 'vas a ir',    example: { fr: 'Tu iras là-bas ?',          es: '¿Vas a ir allá?'         } },
        { en: 'aller: nous irons (futur)',         fr: 'nous irons',        es: 'iremos',       esTarget: 'vamos a ir',  example: { fr: 'Nous irons ensemble.',      es: 'Vamos a ir juntos.'      } },
        { en: 'être: je serai (futur)',            fr: 'je serai',          es: 'estaré',       esTarget: 'voy a estar', example: { fr: 'Je serai là demain.',       es: 'Voy a estar mañana.'     } },
        { en: 'être: tu seras (futur)',            fr: 'tu seras',          es: 'estarás',      esTarget: 'vas a estar', example: { fr: 'Tu seras content.',         es: 'Vas a estar contento.'   } },
        { en: "avoir: j'aurai (futur)",            fr: "j'aurai",           es: 'tendré',       esTarget: 'voy a tener', example: { fr: "J'aurai le temps.",         es: 'Voy a tener tiempo.'     } },
        { en: 'faire: je ferai (futur)',           fr: 'je ferai',          es: 'haré',         esTarget: 'voy a hacer', example: { fr: 'Je ferai de mon mieux.',    es: 'Voy a hacer lo mejor.'   } },
        { en: 'faire: tu feras (futur)',           fr: 'tu feras',          es: 'harás',        esTarget: 'vas a hacer', example: { fr: 'Tu feras quoi demain ?',    es: '¿Qué vas a hacer mañana?'} },
        { en: 'vouloir: je voudrai (futur)',       fr: 'je voudrai',        es: 'querré',       esTarget: 'voy a querer',example: { fr: 'Je voudrai y retourner.',   es: 'Voy a querer volver.'    } },
        { en: 'pouvoir: je pourrai (futur)',       fr: 'je pourrai',        es: 'podré',        esTarget: 'voy a poder', example: { fr: 'Je pourrai venir.',         es: 'Voy a poder venir.'      } },
        // ── Passé composé ──
        { en: "manger: j'ai mangé (passé composé)", fr: "j'ai mangé",      es: 'comí',         esTarget: 'comí',        example: { fr: "J'ai mangé une pizza.",     es: 'Comí una pizza.'         } },
        { en: 'manger: tu as mangé (passé composé)',fr: 'tu as mangé',      es: 'comiste',      esTarget: 'comiste',     example: { fr: 'Tu as mangé quoi ?',        es: '¿Qué comiste?'           } },
        { en: 'manger: nous avons mangé (passé composé)',fr: 'nous avons mangé',es: 'comimos',  esTarget: 'comimos',     example: { fr: 'Nous avons mangé ensemble.',es: 'Comimos juntos.'         } },
        { en: "aller: je suis allé(e) (passé composé)", fr: "je suis allé(e)", es: 'fui',      esTarget: 'fui',         example: { fr: "Je suis allé au marché.",   es: 'Fui al mercado.'         } },
        { en: "aller: tu es allé(e) (passé composé)",   fr: "tu es allé(e)",   es: 'fuiste',   esTarget: 'fuiste',      example: { fr: 'Tu es allé où ?',           es: '¿A dónde fuiste?'        } },
        { en: "partir: je suis parti(e) (passé composé)",fr: "je suis parti(e)",es: 'me fui',  esTarget: 'me fui',      example: { fr: 'Je suis parti tôt.',        es: 'Me fui temprano.'        } },
        { en: "faire: j'ai fait (passé composé)",  fr: "j'ai fait",         es: 'hice',         esTarget: 'hice',        example: { fr: "J'ai fait du sport.",       es: 'Hice deporte.'           } },
        { en: "voir: j'ai vu (passé composé)",     fr: "j'ai vu",           es: 'vi',           esTarget: 'vi',          example: { fr: "J'ai vu ce film.",          es: 'Vi esa película.'        } },
        { en: "parler: j'ai parlé (passé composé)",fr: "j'ai parlé",        es: 'hablé',        esTarget: 'hablé',       example: { fr: "J'ai parlé avec lui.",      es: 'Hablé con él.'           } },
        { en: "venir: je suis venu(e) (passé composé)", fr: "je suis venu(e)", es: 'vine',     esTarget: 'vine',        example: { fr: "Je suis venu(e) ici.",      es: 'Vine acá.'               } },
        // ── Imparfait ──
        { en: "être: j'étais (imparfait)",         fr: "j'étais",           es: 'estaba',       esTarget: 'estaba',      example: { fr: "J'étais fatigué.",          es: 'Estaba cansado.'         } },
        { en: 'être: tu étais (imparfait)',        fr: 'tu étais',          es: 'estabas',      esTarget: 'estabas',     example: { fr: 'Tu étais là.',              es: 'Estabas ahí.'            } },
        { en: 'être: il était (imparfait)',        fr: 'il était',          es: 'estaba',       esTarget: 'estaba',      example: { fr: 'Il était content.',         es: 'Estaba contento.'        } },
        { en: "avoir: j'avais (imparfait)",        fr: "j'avais",           es: 'tenía',        esTarget: 'tenía',       example: { fr: "J'avais faim.",             es: 'Tenía hambre.'           } },
        { en: 'avoir: tu avais (imparfait)',       fr: 'tu avais',          es: 'tenías',       esTarget: 'tenías',      example: { fr: 'Tu avais raison.',          es: 'Tenías razón.'           } },
        { en: 'manger: je mangeais (imparfait)',   fr: 'je mangeais',       es: 'comía',        esTarget: 'comía',       example: { fr: 'Je mangeais souvent ici.',  es: 'Comía seguido acá.'      } },
        { en: 'manger: tu mangeais (imparfait)',   fr: 'tu mangeais',       es: 'comías',       esTarget: 'comías',      example: { fr: 'Tu mangeais quoi ?',        es: '¿Qué comías?'            } },
        { en: "aller: j'allais (imparfait)",       fr: "j'allais",          es: 'iba',          esTarget: 'iba',         example: { fr: "J'allais souvent là-bas.",  es: 'Iba seguido allá.'       } },
        { en: 'aller: nous allions (imparfait)',   fr: 'nous allions',      es: 'íbamos',       esTarget: 'íbamos',      example: { fr: 'Nous allions à la plage.',  es: 'Íbamos a la playa.'      } },
        { en: 'faire: je faisais (imparfait)',     fr: 'je faisais',        es: 'hacía',        esTarget: 'hacía',       example: { fr: 'Je faisais du sport.',      es: 'Hacía deporte.'          } },
        // ── Conditionnel présent ──
        { en: 'être: je serais (conditionnel)',    fr: 'je serais',         es: 'estaría',      esTarget: 'estaría',     example: { fr: 'Je serais content.',        es: 'Estaría contento.'       } },
        { en: 'être: tu serais (conditionnel)',    fr: 'tu serais',         es: 'estarías',     esTarget: 'estarías',    example: { fr: 'Tu serais là ?',            es: '¿Estarías ahí?'          } },
        { en: "avoir: j'aurais (conditionnel)",    fr: "j'aurais",          es: 'tendría',      esTarget: 'tendría',     example: { fr: "J'aurais le temps.",        es: 'Tendría tiempo.'         } },
        { en: "aller: j'irais (conditionnel)",     fr: "j'irais",           es: 'iría',         esTarget: 'iría',        example: { fr: "J'irais en Argentine.",     es: 'Iría a Argentina.'       } },
        { en: 'aller: nous irions (conditionnel)', fr: 'nous irions',       es: 'iríamos',      esTarget: 'iríamos',     example: { fr: 'Nous irions ensemble.',     es: 'Iríamos juntos.'         } },
        { en: 'vouloir: je voudrais (conditionnel)',fr: 'je voudrais',      es: 'quisiera',     esTarget: 'quisiera',    example: { fr: 'Je voudrais un café.',      es: 'Quisiera un café.'       } },
        { en: 'pouvoir: je pourrais (conditionnel)',fr: 'je pourrais',      es: 'podría',       esTarget: 'podría',      example: { fr: 'Je pourrais venir.',        es: 'Podría venir.'           } },
        { en: 'faire: je ferais (conditionnel)',   fr: 'je ferais',         es: 'haría',        esTarget: 'haría',       example: { fr: 'Je ferais de mon mieux.',   es: 'Haría lo mejor.'         } },
        { en: 'devoir: je devrais (conditionnel)', fr: 'je devrais',        es: 'debería',      esTarget: 'debería',     example: { fr: 'Je devrais partir.',        es: 'Debería irme.'           } },
        { en: 'savoir: je saurais (conditionnel)', fr: 'je saurais',        es: 'sabría',       esTarget: 'sabría',      example: { fr: 'Je saurais quoi faire.',    es: 'Sabría qué hacer.'       } },
      ],
    },

    {
      id: 'ref_c01', icon: '🪪',
      name: 'Cours du 31 mai — Infos personnelles', nameEs: 'Clase del 31 de mayo — Datos personales',
      words: [
        { en: 'journalist', fr: 'le/la journaliste', es: 'el periodista / la periodista', esTarget: 'el periodista / la periodista', example: { fr: 'Elle est journaliste.', es: 'Ella es periodista.' } },
        { en: 'all good / everything fine', fr: 'tout va bien', es: 'todo bien', esTarget: 'todo bien', example: { fr: '— Tout va bien ? — Oui, tout va bien.', es: '— ¿Todo bien? — Sí, todo bien.' } },
      ],
    },

    {
      id: 'ref_c02', icon: '🎾',
      name: 'Cours du 2 juin — Loisirs & temps libre', nameEs: 'Clase del 2 de junio — Ocio y tiempo libre',
      words: [
        { en: 'to play', fr: 'jouer', es: 'jugar', esTarget: 'jugar', example: { fr: 'Je joue avec mes amis.', es: 'Juego con mis amigos.' } },
        { en: 'to go to the movies', fr: 'aller au cinéma', es: 'ir al cine', esTarget: 'ir al cine', example: { fr: 'On va au cinéma ce soir ?', es: '¿Vamos al cine esta noche?' } },
        { en: 'to play cards', fr: 'jouer aux cartes', es: 'jugar a las cartas', esTarget: 'jugar a las cartas', example: { fr: 'On joue aux cartes ?', es: '¿Jugamos a las cartas?' } },
        { en: 'to play tennis', fr: 'jouer au tennis', es: 'jugar al tenis', esTarget: 'jugar al tenis', example: { fr: 'Il joue au tennis le samedi.', es: 'Él juega al tenis los sábados.' } },
        { en: 'to go on vacation', fr: 'partir en vacances', es: 'ir de vacaciones', esTarget: 'ir de vacaciones', example: { fr: 'On part en vacances en janvier.', es: 'Vamos de vacaciones en enero.' } },
        { en: 'to go to a concert', fr: 'aller à un concert', es: 'ir a un concierto', esTarget: 'ir a un concierto', example: { fr: 'On va à un concert vendredi.', es: 'Vamos a un concierto el viernes.' } },
        { en: 'to watch a movie', fr: 'regarder un film', es: 'ver una película', esTarget: 'ver una película', example: { fr: 'On regarde un film ce soir.', es: 'Vemos una película esta noche.' } },
        { en: 'to sunbathe', fr: 'prendre le soleil', es: 'tomar el sol', esTarget: 'tomar el sol', example: { fr: 'Elle prend le soleil à la plage.', es: 'Ella toma el sol en la playa.' } },
        { en: 'breakfast', fr: 'le petit-déjeuner', es: 'el desayuno', esTarget: 'el desayuno', example: { fr: 'Je prends un café au petit-déjeuner.', es: 'Tomo un café en el desayuno.' } },
        { en: 'lunch', fr: 'le déjeuner', es: 'el almuerzo', esTarget: 'el almuerzo', example: { fr: 'Le déjeuner est prêt.', es: 'El almuerzo está listo.' } },
        { en: 'afternoon snack', fr: 'le goûter', es: 'la merienda', esTarget: 'la merienda', example: { fr: 'Les enfants prennent leur goûter.', es: 'Los chicos toman la merienda.' } },
        { en: 'dinner', fr: 'le dîner', es: 'la cena', esTarget: 'la cena', example: { fr: 'Le dîner est à 21h.', es: 'La cena es a las 21.' } },
        { en: 'to have breakfast', fr: 'prendre le petit-déjeuner', es: 'desayunar', esTarget: 'desayunar', example: { fr: 'Je déjeune tôt.', es: 'Desayuno temprano.' } },
        { en: 'to have lunch', fr: 'déjeuner', es: 'almorzar', esTarget: 'almorzar', example: { fr: 'On déjeune ensemble ?', es: '¿Almorzamos juntos?' } },
        { en: 'to have a snack', fr: 'goûter', es: 'merendar', esTarget: 'merendar', example: { fr: 'Les enfants goûtent à 17h.', es: 'Los chicos meriendan a las 17.' } },
        { en: 'to have dinner', fr: 'dîner', es: 'cenar', esTarget: 'cenar', example: { fr: 'On dîne à quelle heure ?', es: '¿A qué hora cenamos?' } },
        { en: 'to play basketball', fr: 'jouer au basket', es: 'jugar al baloncesto', esTarget: 'jugar al básquet', example: { fr: 'Il joue au basket le mardi.', es: 'Él juega al básquet los martes.' } },
        { en: 'to go shopping', fr: 'faire du shopping', es: 'ir de compras', esTarget: 'ir de compras', example: { fr: 'On va faire du shopping samedi.', es: 'Vamos de compras el sábado.' } },
        { en: 'to go to the theater', fr: 'aller au théâtre', es: 'ir al teatro', esTarget: 'ir al teatro', example: { fr: 'On va au théâtre ce soir.', es: 'Vamos al teatro esta noche.' } },
        { en: 'to watch a play', fr: 'voir une pièce de théâtre', es: 'ver una obra de teatro', esTarget: 'ver una obra de teatro', example: { fr: "J'ai vu une belle pièce.", es: 'Vi una linda obra de teatro.' } },
        { en: 'to have drinks', fr: 'prendre un verre', es: 'tomar unas copas', esTarget: 'tomar unas copas', example: { fr: 'On prend un verre après le travail ?', es: '¿Tomamos unas copas después del trabajo?' } },
        { en: 'homework', fr: 'les devoirs', es: 'la tarea', esTarget: 'la tarea', example: { fr: "J'ai fini mes devoirs.", es: 'Terminé la tarea.' } },
      ],
    },

    {
      id: 'ref_c03', icon: '📖',
      name: 'Cours du 16 juin — Verbes & Ser/Estar', nameEs: 'Clase del 16 de junio — Verbos y Ser/Estar',
      words: [
        { en: "I don't know", fr: 'je ne sais pas', es: 'no sé', esTarget: 'no sé', example: { fr: 'Je ne sais pas où il est.', es: 'No sé dónde está.' } },
        { en: 'to ask (a question)', fr: 'demander', es: 'preguntar', esTarget: 'preguntar', example: { fr: 'Je peux te demander une chose ?', es: '¿Te puedo preguntar algo?' } },
        { en: 'to ask for / order', fr: 'demander / commander', es: 'pedir', esTarget: 'pedir', example: { fr: "Je vais demander de l'aide.", es: 'Voy a pedir ayuda.' } },
        { en: 'to learn', fr: 'apprendre', es: 'aprender', esTarget: 'aprender', example: { fr: "J'apprends l'espagnol.", es: 'Aprendo español.' } },
        { en: 'friend', fr: "l'ami / l'amie", es: 'el amigo / la amiga', esTarget: 'el amigo / la amiga', example: { fr: "C'est mon ami.", es: 'Es mi amigo.' } },
        { en: 'meeting', fr: 'la réunion', es: 'la reunión', esTarget: 'la reunión', example: { fr: "J'ai une réunion à 10h.", es: 'Tengo una reunión a las 10.' } },
        { en: 'together', fr: 'ensemble', es: 'juntos / juntas', esTarget: 'juntos / juntas', example: { fr: 'On travaille ensemble.', es: 'Trabajamos juntos.' } },
        { en: 'notebook', fr: 'le cahier', es: 'el cuaderno', esTarget: 'el cuaderno', example: { fr: "J'écris dans mon cahier.", es: 'Escribo en mi cuaderno.' } },
        { en: 'student', fr: "l'étudiant / l'étudiante", es: 'el estudiante / la estudiante', esTarget: 'el estudiante / la estudiante', example: { fr: 'Elle est étudiante.', es: 'Ella es estudiante.' } },
        { en: 'teacher', fr: 'le professeur / la professeure', es: 'el profesor / la profesora', esTarget: 'el profesor / la profesora', example: { fr: 'Le professeur explique bien.', es: 'El profesor explica bien.' } },
        { en: 'wall', fr: 'le mur', es: 'la pared', esTarget: 'la pared', example: { fr: 'Le tableau est sur le mur.', es: 'El cuadro está en la pared.' } },
        { en: 'strawberry (AR)', fr: 'la fraise', es: 'la frutilla', esTarget: 'la frutilla', example: { fr: 'Une tarte aux fraises.', es: 'Una tarta de frutillas.' } },
        { en: 'bicycle', fr: 'le vélo', es: 'la bicicleta', esTarget: 'la bicicleta', example: { fr: 'Je vais au travail à vélo.', es: 'Voy al trabajo en bicicleta.' } },
        { en: 'to play the piano', fr: 'jouer du piano', es: 'tocar el piano', esTarget: 'tocar el piano', example: { fr: 'Elle joue du piano tous les jours.', es: 'Ella toca el piano todos los días.' } },
        { en: 'parents', fr: 'les parents', es: 'los padres', esTarget: 'los padres', example: { fr: 'Mes parents habitent ici.', es: 'Mis padres viven acá.' } },
        { en: 'mom / dad', fr: 'maman / papa', es: 'mamá / papá', esTarget: 'mamá / papá', example: { fr: 'Maman travaille beaucoup.', es: 'Mamá trabaja mucho.' } },
        { en: 'Mr. / Mrs.', fr: 'monsieur / madame', es: 'señor / señora', esTarget: 'señor / señora', example: { fr: 'Bonjour, monsieur.', es: 'Buen día, señor.' } },
        { en: 'smiling', fr: 'souriant / en train de sourire', es: 'sonriendo', esTarget: 'sonriendo', example: { fr: 'Elle est souriante.', es: 'Ella está sonriendo.' } },
        { en: 'girlfriend',            fr: 'la copine',                    es: 'la novia',         esTarget: 'la novia',        example: { fr: 'Sa copine s\'appelle Cecilia.', es: 'Su novia se llama Cecilia.' } },
        { en: 'colleague/mate',        fr: 'le/la collègue',              es: 'el compañero / la compañera', esTarget: 'el compañero / la compañera', example: { fr: 'Un collègue de travail.', es: 'Un compañero de trabajo.' } },
        { en: 'tall (ser)',            fr: 'grand (physiquement)',        es: 'alto',      esTarget: 'alto',      example: { fr: 'Il est grand.',              es: 'Él es alto.' } },
        { en: 'pregnant (estar)',      fr: 'enceinte',                     es: 'embarazada', esTarget: 'embarazada', example: { fr: 'Elle est enceinte.',        es: 'Ella está embarazada.' } },
        { en: 'sick (estar)',          fr: 'malade',                       es: 'enfermo',    esTarget: 'enfermo',   example: { fr: 'Il est malade aujourd\'hui.', es: 'Él está enfermo hoy.' } },
        { en: 'green / unripe',        fr: 'vert / pas mûr',               es: 'verde',      esTarget: 'verde',     example: { fr: 'Cette banane est pas mûre.', es: 'Esta banana está verde.' } },
        { en: 'closed (estar)',        fr: 'fermé',                        es: 'cerrado',    esTarget: 'cerrado',   example: { fr: 'La porte est fermée.',       es: 'La puerta está cerrada.' } },
        { en: 'open (estar)',          fr: 'ouvert',                       es: 'abierto',    esTarget: 'abierto',   example: { fr: 'Le bar est ouvert.',         es: 'El bar está abierto.' } },
        { en: 'cheerful (ser/estar)',  fr: 'joyeux / de bonne humeur',     es: 'alegre',     esTarget: 'alegre',    example: { fr: 'Elle est de bonne humeur.',  es: 'Ella está alegre.' } },
        { en: 'rich / tasty',          fr: 'riche / délicieux',           es: 'rico',       esTarget: 'rico',      example: { fr: 'Ce plat est délicieux.',     es: 'Esta comida está rica.' } },
        { en: 'kind / attentive',      fr: 'attentionné / attentif',      es: 'atento',     esTarget: 'atento',    example: { fr: 'Il est très attentionné.',   es: 'Él es muy atento.' } },
        { en: 'tired (estar)',         fr: 'fatigué',                      es: 'cansado',    esTarget: 'cansado',   example: { fr: 'Je suis fatigué.',           es: 'Estoy cansado.' } },
        { en: 'crazy',                 fr: 'fou',                           es: 'loco',       esTarget: 'loco',      example: { fr: 'Il devient fou.',            es: 'Se está volviendo loco.' } },
        { en: 'sitting (estar)',       fr: 'assis',                        es: 'sentado',    esTarget: 'sentado',   example: { fr: 'Elle est assise.',           es: 'Ella está sentada.' } },
        { en: 'lying down (estar)',    fr: 'allongé / couché',            es: 'acostado',   esTarget: 'acostado',  example: { fr: 'Il est allongé sur le lit.', es: 'Él está acostado en la cama.' } },
        { en: 'happy',                 fr: 'heureux',                      es: 'feliz',      esTarget: 'feliz',     example: { fr: 'Je suis heureux aujourd\'hui.', es: 'Estoy feliz hoy.' } },
        { en: 'big / important',       fr: 'grand (importance)',          es: 'grande',     esTarget: 'grande',    example: { fr: 'C\'est un grand jour.',      es: 'Es un día grande.' } },
      ],
    },

    {
      id: 'ref_c04', icon: '🔄',
      name: 'Cours du 25 juin — Estar + gérondif', nameEs: 'Clase del 25 de junio — Estar + gerundio',
      words: [
        { en: 'to repair', fr: 'réparer', es: 'reparar', esTarget: 'reparar', example: { fr: 'Il répare le téléphone.', es: 'Él repara el celular.' } },
        { en: 'to work / function', fr: 'fonctionner', es: 'funcionar', esTarget: 'funcionar', example: { fr: 'Le téléphone ne fonctionne pas.', es: 'El celular no funciona.' } },
        { en: 'little cake / cookie', fr: 'la petite pâtisserie', es: 'la masita', esTarget: 'la masita', example: { fr: 'On mange des petites pâtisseries.', es: 'Comemos masitas.' } },
        { en: 'the facts', fr: 'les faits', es: 'los hechos', esTarget: 'los hechos', example: { fr: 'Raconte-moi les faits.', es: 'Contame los hechos.' } },
        { en: 'cellphone', fr: 'le portable', es: 'el celular', esTarget: 'el celular', example: { fr: 'Mon portable est cassé.', es: 'Mi celular está roto.' } },
        { en: 'to walk', fr: 'marcher', es: 'caminar', esTarget: 'caminar', example: { fr: "Je marche jusqu'au travail.", es: 'Camino hasta el trabajo.' } },
        { en: 'to buy', fr: 'acheter', es: 'comprar', esTarget: 'comprar', example: { fr: "J'achète du pain.", es: 'Compro pan.' } },
        { en: 'gift', fr: 'le cadeau', es: 'el regalo', esTarget: 'el regalo', example: { fr: "C'est un cadeau pour toi.", es: 'Es un regalo para vos.' } },
        { en: 'to look for', fr: 'chercher', es: 'buscar', esTarget: 'buscar', example: { fr: 'Je cherche mes clés.', es: 'Busco mis llaves.' } },
        { en: 'to travel', fr: 'voyager', es: 'viajar', esTarget: 'viajar', example: { fr: "J'aime voyager.", es: 'Me gusta viajar.' } },
        { en: 'to say', fr: 'dire', es: 'decir', esTarget: 'decir', example: { fr: 'Dis-moi la vérité.', es: 'Decime la verdad.' } },
        { en: 'the truth', fr: 'la vérité', es: 'la verdad', esTarget: 'la verdad', example: { fr: 'Je dis toujours la vérité.', es: 'Siempre digo la verdad.' } },
        { en: 'brother', fr: 'le frère', es: 'el hermano', esTarget: 'el hermano', example: { fr: 'Mon frère habite à Genève.', es: 'Mi hermano vive en Ginebra.' } },
        { en: 'to finish', fr: 'terminer', es: 'terminar', esTarget: 'terminar', example: { fr: "J'ai fini le projet.", es: 'Terminé el proyecto.' } },
        { en: 'on time', fr: "à l'heure", es: 'a tiempo', esTarget: 'a tiempo', example: { fr: "J'arrive toujours à l'heure.", es: 'Siempre llego a tiempo.' } },
        { en: 'nap', fr: 'la sieste', es: 'la siesta', esTarget: 'la siesta', example: { fr: 'Je fais une petite sieste.', es: 'Duermo una siesta corta.' } },
        { en: 'to serve', fr: 'servir', es: 'servir', esTarget: 'servir', example: { fr: 'Ils servent le dîner à 21h.', es: 'Sirven la cena a las 21.' } },
        { en: 'to help', fr: 'aider', es: 'ayudar', esTarget: 'ayudar', example: { fr: "Je peux t'aider.", es: 'Te puedo ayudar.' } },
        { en: 'girl', fr: 'la fille (enfant)', es: 'la niña', esTarget: 'la niña', example: { fr: 'La petite fille joue dehors.', es: 'La niña juega afuera.' } },
        { en: 'to repeat', fr: 'répéter', es: 'repetir', esTarget: 'repetir', example: { fr: "Tu peux répéter, s'il te plaît ?", es: '¿Podés repetir, por favor?' } },
        { en: 'to prefer', fr: 'préférer', es: 'preferir', esTarget: 'preferir', example: { fr: 'Je préfère le café.', es: 'Prefiero el café.' } },
        { en: 'beer', fr: 'la bière', es: 'la cerveza', esTarget: 'la cerveza', example: { fr: 'Une bière bien fraîche.', es: 'Una cerveza bien fría.' } },
        { en: 'lately', fr: 'dernièrement', es: 'últimamente', esTarget: 'últimamente', example: { fr: 'Dernièrement, je travaille beaucoup.', es: 'Últimamente trabajo mucho.' } },
        { en: 'to swim', fr: 'nager', es: 'nadar', esTarget: 'nadar', example: { fr: "J'aime nager.", es: 'Me gusta nadar.' } },
        { en: 'fun', fr: 'amusant', es: 'divertido', esTarget: 'divertido', example: { fr: "C'est très amusant.", es: 'Es muy divertido.' } },
        { en: 'to enjoy', fr: 'profiter', es: 'disfrutar', esTarget: 'disfrutar', example: { fr: 'Profite de tes vacances.', es: 'Disfrutá tus vacaciones.' } },
        { en: 'to start', fr: 'commencer', es: 'empezar', esTarget: 'empezar', example: { fr: 'Le film commence à 20h.', es: 'La película empieza a las 20.' } },
        { en: 'without saying goodbye', fr: 'sans dire au revoir', es: 'sin decir adiós', esTarget: 'sin decir adiós', example: { fr: 'Il est parti sans dire au revoir.', es: 'Se fue sin decir adiós.' } },
        { en: 'exciting', fr: 'passionnant', es: 'emocionante', esTarget: 'emocionante', example: { fr: "C'est un film passionnant.", es: 'Es una película emocionante.' } },
        { en: 'to run', fr: 'courir', es: 'correr', esTarget: 'correr', example: { fr: 'Je cours tous les matins.', es: 'Corro todas las mañanas.' } },
      ],
    },

    {
      id: 'ref_c05', icon: '🎨',
      name: 'Cours du 30 juin — Couleurs & activités', nameEs: 'Clase del 30 de junio — Colores y actividades',
      words: [
        { en: 'curiosity', fr: 'la curiosité', es: 'la curiosidad', esTarget: 'la curiosidad', example: { fr: 'Par curiosité.', es: 'Por curiosidad.' } },
        { en: 'far', fr: 'loin', es: 'lejos', esTarget: 'lejos', example: { fr: "C'est loin d'ici ?", es: '¿Está lejos de acá?' } },
        { en: 'alone / only', fr: 'seul', es: 'solo', esTarget: 'solo', example: { fr: 'Il vit seul.', es: 'Vive solo.' } },
        { en: 'to give', fr: 'donner', es: 'dar', esTarget: 'dar', example: { fr: 'Je te donne un livre.', es: 'Te doy un libro.' } },
        { en: 'to donate', fr: 'faire un don', es: 'donar', esTarget: 'donar', example: { fr: 'Elle a fait un don.', es: 'Ella donó.' } },
        { en: 'word', fr: 'le mot', es: 'la palabra', esTarget: 'la palabra', example: { fr: 'Un nouveau mot.', es: 'Una palabra nueva.' } },
        { en: 'candy', fr: 'le bonbon', es: 'el caramelo', esTarget: 'el caramelo', example: { fr: "J'aime les bonbons.", es: 'Me gustan los caramelos.' } },
        { en: 'to watch / look at', fr: 'regarder', es: 'mirar', esTarget: 'mirar', example: { fr: 'Je regarde la télé.', es: 'Miro la tele.' } },
        { en: 'to cook', fr: 'cuisiner', es: 'cocinar', esTarget: 'cocinar', example: { fr: "J'aime cuisiner.", es: 'Me gusta cocinar.' } },
        { en: 'to feel hot', fr: 'avoir chaud', es: 'pasar calor', esTarget: 'pasar calor', example: { fr: "J'ai très chaud.", es: 'Estoy pasando mucho calor.' } },
        { en: 'to stroll in the park', fr: 'se promener dans le parc', es: 'pasear por el parque', esTarget: 'pasear por el parque', example: { fr: 'On se promène dans le parc ?', es: '¿Paseamos por el parque?' } },
        { en: 'to bake cakes', fr: 'faire des gâteaux', es: 'hacer tortas', esTarget: 'hacer tortas', example: { fr: 'Ma mère fait des gâteaux.', es: 'Mi mamá hace tortas.' } },
        { en: 'tomato', fr: 'la tomate', es: 'el tomate', esTarget: 'el tomate', example: { fr: 'Une salade de tomates.', es: 'Una ensalada de tomate.' } },
        { en: 'milk', fr: 'le lait', es: 'la leche', esTarget: 'la leche', example: { fr: 'Un verre de lait.', es: 'Un vaso de leche.' } },
        { en: 'oil (petroleum)', fr: 'le pétrole', es: 'el petróleo', esTarget: 'el petróleo', example: { fr: 'Le prix du pétrole.', es: 'El precio del petróleo.' } },
        { en: 'chocolate', fr: 'le chocolat', es: 'el chocolate', esTarget: 'el chocolate', example: { fr: "J'adore le chocolat.", es: 'Adoro el chocolate.' } },
        { en: 'flower', fr: 'la fleur', es: 'la flor', esTarget: 'la flor', example: { fr: 'Une fleur rose.', es: 'Una flor rosa.' } },
        { en: 'sky', fr: 'le ciel', es: 'el cielo', esTarget: 'el cielo', example: { fr: 'Le ciel est bleu.', es: 'El cielo está azul.' } },
        { en: 'sun', fr: 'le soleil', es: 'el sol', esTarget: 'el sol', example: { fr: 'Le soleil brille.', es: 'El sol brilla.' } },
        { en: 'rainbow', fr: "l'arc-en-ciel", es: 'el arcoíris', esTarget: 'el arcoíris', example: { fr: 'Un bel arc-en-ciel.', es: 'Un lindo arcoíris.' } },
        { en: 'grass', fr: "l'herbe", es: 'el pasto', esTarget: 'el pasto', example: { fr: "L'herbe est verte.", es: 'El pasto está verde.' } },
        { en: 'transparent', fr: 'transparent', es: 'transparente', esTarget: 'transparente', example: { fr: "L'eau est transparente.", es: 'El agua es transparente.' } },
        { en: 'multicolour', fr: 'multicolore', es: 'multicolor', esTarget: 'multicolor', example: { fr: "L'arc-en-ciel est multicolore.", es: 'El arcoíris es multicolor.' } },
        { en: 'computer', fr: "l'ordinateur", es: 'la computadora', esTarget: 'la computadora', example: { fr: "C'est un nouvel ordinateur.", es: 'Es una computadora nueva.' } },
        { en: 'to adore', fr: 'adorer', es: 'adorar', esTarget: 'adorar', example: { fr: "J'adore les cultures différentes.", es: 'Adoro las culturas diferentes.' } },
        { en: 'culture', fr: 'la culture', es: 'la cultura', esTarget: 'la cultura', example: { fr: 'Une culture différente.', es: 'Una cultura diferente.' } },
        { en: 'different', fr: 'différent', es: 'diferente', esTarget: 'diferente', example: { fr: "C'est différent.", es: 'Es diferente.' } },
        { en: 'vacation', fr: 'les vacances', es: 'las vacaciones', esTarget: 'las vacaciones', example: { fr: 'Je veux des vacances tranquilles.', es: 'Quiero tener unas vacaciones tranquilas.' } },
        { en: 'busy', fr: 'occupé', es: 'ocupado', esTarget: 'ocupado', example: { fr: "J'ai une journée chargée au travail.", es: 'Tengo un día ocupado en el trabajo.' } },
        { en: 'banana', fr: 'la banane', es: 'la banana', esTarget: 'la banana', example: { fr: 'Une banane jaune.', es: 'Una banana amarilla.' } },
        { en: 'cat', fr: 'le chat', es: 'el gato', esTarget: 'el gato', example: { fr: 'Un chat noir.', es: 'Un gato negro.' } },
        { en: 'hospital', fr: "l'hôpital", es: 'el hospital', esTarget: 'el hospital', example: { fr: 'Un hôpital blanc.', es: 'Un hospital blanco.' } },
        { en: 'building',              fr: 'le bâtiment',                  es: 'el edificio',      esTarget: 'el edificio',     example: { fr: 'Un bâtiment blanc.',           es: 'Un edificio blanco.' } },
        { en: 'ocean', fr: "l'océan", es: 'el océano', esTarget: 'el océano', example: { fr: "L'océan est bleu.", es: 'El océano es azul.' } },
        { en: 'plant', fr: 'la plante', es: 'la planta', esTarget: 'la planta', example: { fr: 'Une plante verte.', es: 'Una planta verde.' } },
        { en: 'elephant', fr: "l'éléphant", es: 'el elefante', esTarget: 'el elefante', example: { fr: 'Un éléphant gris.', es: 'Un elefante gris.' } },
        { en: 'to do pilates',         fr: 'faire du pilates',            es: 'hacer pilates',   esTarget: 'hacer pilates',  example: { fr: 'Il fait du pilates.',         es: 'Él hace pilates.' } },
        { en: 'to be on a diet',       fr: 'faire un régime',             es: 'hacer régimen',   esTarget: 'hacer régimen', example: { fr: 'Elle fait un régime.',        es: 'Ella hace régimen.' } },
        { en: 'to exercise',           fr: "faire de l'exercice",          es: 'hacer ejercicio', esTarget: 'hacer ejercicio', example: { fr: "Tu fais de l'exercice ?",   es: '¿Vos hacés ejercicio?' } },
        { en: 'to go for a walk/hike', fr: 'faire une balade',            es: 'hacer una caminata', esTarget: 'hacer una caminata', example: { fr: 'On fait une balade ?',   es: '¿Hacemos una caminata?' } },
        { en: 'mate (drink)',          fr: 'le maté',                      es: 'el mate',         esTarget: 'el mate',        example: { fr: 'Il boit du maté.',            es: 'Él toma mate.' } },
        { en: 'potato',                fr: 'la pomme de terre',           es: 'la papa',         esTarget: 'la papa',        example: { fr: 'Du poulet avec des pommes de terre.', es: 'Pollo con papas.' } },
        { en: 'peso (currency)',       fr: 'le peso (monnaie)',           es: 'el peso',         esTarget: 'el peso',        example: { fr: "Ça coûte plus de pesos.",     es: 'Cuesta más pesos.' } },
      ],
    },

    {
      id: 'ref_c06', icon: '🔑',
      name: 'Cours du 7 juillet — Possessifs & quotidien', nameEs: 'Clase del 7 de julio — Posesivos y vida cotidiana',
      words: [
        { en: 'my',                    fr: 'mon / ma / mes',              es: 'mi / mis',        esTarget: 'mi / mis',       example: { fr: 'Mon nom est Pat.',            es: 'Mi nombre es Pat.' } },
        { en: 'your (informal)',       fr: 'ton / ta / tes',              es: 'tu / tus',        esTarget: 'tu / tus',       example: { fr: 'Tes livres sont là.',         es: 'Tus libros están ahí.' } },
        { en: 'his/her/their',         fr: 'son / sa / ses',              es: 'su / sus',        esTarget: 'su / sus',       example: { fr: 'Ses parents sont gentils.',   es: 'Sus padres son amables.' } },
        { en: 'our',                   fr: 'notre / nos',                 es: 'nuestro / nuestra', esTarget: 'nuestro / nuestra', example: { fr: 'Nos chiens sont éduqués.',  es: 'Nuestros perros son educados.' } },
        { en: 'key',                   fr: 'la clé',                       es: 'la llave',        esTarget: 'la llave',       example: { fr: "Où sont mes clés ?",          es: '¿Dónde están mis llaves?' } },
        { en: 'to belong',             fr: 'appartenir',                   es: 'pertenecer',      esTarget: 'pertenecer',     example: { fr: 'À qui appartient ceci ?',     es: '¿A quién pertenece esto?' } },
        { en: 'pet', fr: "l'animal de compagnie", es: 'la mascota', esTarget: 'la mascota', example: { fr: "J'ai deux animaux de compagnie.", es: 'Tengo dos mascotas.' } },
        { en: 'even though', fr: 'même si / bien que', es: 'aunque', esTarget: 'aunque', example: { fr: 'Même si elle a des chats, ses chats sont espiègles.', es: 'Aunque tiene gatos, sus gatos son traviesos.' } },
        { en: 'hobby', fr: 'le passe-temps', es: 'el pasatiempo', esTarget: 'el pasatiempo', example: { fr: 'Mon passe-temps est de lire.', es: 'Mi pasatiempo es leer.' } },
        { en: 'dog', fr: 'le chien', es: 'el perro', esTarget: 'el perro', example: { fr: 'Nos chiens sont bien élevés.', es: 'Nuestros perros son educados.' } },
        { en: 'doctor (f.)', fr: 'la docteure', es: 'la doctora', esTarget: 'la doctora', example: { fr: 'Ma mère est docteure.', es: 'Mi mamá es doctora.' } },
        { en: 'to take pictures', fr: 'prendre des photos', es: 'tomar fotos', esTarget: 'tomar fotos', example: { fr: 'Il prend des photos au parc.', es: 'Él toma fotos en el parque.' } },
        { en: 'well-behaved',          fr: 'bien élevé / poli',           es: 'educado',          esTarget: 'educado',         example: { fr: 'Nos chiens sont bien élevés.', es: 'Nuestros perros son educados.' } },
        { en: 'trick', fr: 'le tour / la ruse', es: 'el truco', esTarget: 'el truco', example: { fr: 'Ils savent plusieurs tours.', es: 'Saben varios trucos.' } },
        { en: 'neighbour',             fr: 'le voisin / la voisine',      es: 'el vecino / la vecina', esTarget: 'el vecino / la vecina', example: { fr: 'Ma voisine a des chats.', es: 'Mi vecina tiene gatos.' } },
        { en: 'mischievous',           fr: 'coquin / espiègle',           es: 'travieso',         esTarget: 'travieso',        example: { fr: 'Ses chats sont espiègles.',    es: 'Sus gatos son traviesos.' } },
        { en: 'definitely', fr: 'définitivement', es: 'definitivamente', esTarget: 'definitivamente', example: { fr: 'Nos chiens sont définitivement meilleurs.', es: 'Nuestros perros son definitivamente mejores.' } },
        { en: 'to be the same age',    fr: 'avoir le même âge',           es: 'tener la misma edad', esTarget: 'tener la misma edad', example: { fr: 'Nous avons le même âge.', es: 'Tenemos la misma edad.' } },
        { en: 'classroom', fr: 'la salle de classe', es: 'el salón de clases', esTarget: 'el salón de clases', example: { fr: 'Ton portable est dans la salle de classe.', es: 'Tu celular está en el salón de clases.' } },
        { en: 'physics project', fr: 'le projet de physique', es: 'el proyecto de física', esTarget: 'el proyecto de física', example: { fr: 'Notre projet de physique a gagné.', es: 'Nuestro proyecto de física ganó.' } },
        { en: 'to win', fr: 'gagner', es: 'ganar', esTarget: 'ganar', example: { fr: 'On a gagné la première place !', es: '¡Ganamos el primer lugar!' } },
        { en: 'first place', fr: 'la première place', es: 'el primer lugar', esTarget: 'el primer lugar', example: { fr: 'On a gagné la première place.', es: 'Ganamos el primer lugar.' } },
        { en: 'great / awesome', fr: 'génial', es: 'genial', esTarget: 'genial', example: { fr: 'On est géniaux !', es: '¡Somos geniales!' } },
        { en: 'again', fr: 'encore / une fois de plus', es: 'otra vez', esTarget: 'otra vez', example: { fr: 'Où sont mes livres, encore une fois ?', es: '¿Dónde están mis libros otra vez?' } },
        { en: 'airplane', fr: "l'avion", es: 'el avión', esTarget: 'el avión', example: { fr: "Elle joue avec l'avion.", es: 'Ella juega con el avión.' } },
        { en: 'to play the guitar', fr: 'jouer de la guitare', es: 'tocar la guitarra', esTarget: 'tocar la guitarra', example: { fr: 'Je joue de la guitare.', es: 'Yo toco la guitarra.' } },
        { en: 'to play chess', fr: 'jouer aux échecs', es: 'jugar al ajedrez', esTarget: 'jugar al ajedrez', example: { fr: 'Il joue aux échecs.', es: 'Él juega ajedrez.' } },
        { en: 'to bake sweets',        fr: 'cuisiner des choses sucrées',  es: 'cocinar cosas dulces', esTarget: 'cocinar cosas dulces', example: { fr: 'Il cuisine des choses sucrées.', es: 'Él cocina cosas dulces.' } },
        { en: 'global warming',        fr: 'le réchauffement climatique',  es: 'el calentamiento global', esTarget: 'el calentamiento global', example: { fr: 'Le réchauffement climatique m\'inquiète.', es: 'Me preocupa el calentamiento global.' } },
        { en: 'fashion',               fr: 'la mode',                       es: 'la moda',          esTarget: 'la moda',         example: { fr: 'La mode ne m\'intéresse pas trop.', es: 'No me interesa mucho la moda.' } },
        { en: 'romance novel',         fr: "le roman d'amour",             es: 'el libro de romance', esTarget: 'el libro de romance', example: { fr: 'Elle lit un roman d\'amour.', es: 'Ella lee un libro de romance.' } },
        { en: "it doesn't interest me at all", fr: "ça ne m'intéresse pas du tout", es: 'no me interesa para nada', esTarget: 'no me interesa para nada', example: { fr: "La mode ne m'intéresse pas du tout.", es: 'La moda no me interesa para nada.' } },
        { en: 'football match', fr: 'le match de foot', es: 'el partido de fútbol', esTarget: 'el partido de fútbol', example: { fr: 'Ils jouent un match de foot au quartier.', es: 'Juegan un partido de fútbol en el barrio.' } },
        { en: 'meat', fr: 'la viande', es: 'la carne', esTarget: 'la carne', example: { fr: "J'aime la viande.", es: 'Me gusta la carne.' } },
        { en: 'asado (BBQ)',       fr: "le barbecue argentin",        es: 'el asado',                 esTarget: 'el asado',                example: { fr: 'Un asado le dimanche.',            es: 'Un asado el domingo.' } },
        { en: 'folk music gathering', fr: 'la soirée folklorique',    es: 'la peña folclórica',       esTarget: 'la peña folclórica',      example: { fr: 'On va à la soirée folklorique.',   es: 'Vamos a la peña folclórica.' } },
        { en: 'wine tasting',      fr: 'la dégustation de vin',       es: 'la cata de vino',          esTarget: 'la cata de vino',         example: { fr: 'Une dégustation de vin à la bodega.', es: 'Una cata de vino en la bodega.' } },
        { en: 'winery',            fr: 'le domaine viticole',         es: 'la bodega',                esTarget: 'la bodega',               example: { fr: 'Visiter une bodega à Mendoza.',    es: 'Visitar una bodega en Mendoza.' } },
      ],
    },

    {
      id: 'ref_c07', icon: '💛',
      name: 'Cours du 21 juillet — Goûts & motivations', nameEs: 'Clase del 21 de julio — Gustos y motivaciones',
      words: [
        { en: 'long time no see',      fr: 'ça fait longtemps',           es: 'tanto tiempo',     esTarget: 'tanto tiempo',    example: { fr: "Ça fait longtemps, non ?",     es: '¡Tanto tiempo!' } },
        { en: "how's it going?",       fr: 'comment ça va ?',              es: '¿qué tal?',        esTarget: '¿qué tal?',       example: { fr: "Comment ça va, aujourd'hui ?", es: '¿Qué tal, hoy?' } },
        { en: 'good luck',             fr: 'bonne chance',                 es: 'buena suerte',     esTarget: 'buena suerte',    example: { fr: 'Bonne chance pour l\'examen !', es: '¡Buena suerte con el examen!' } },
        { en: 'to dance',              fr: 'danser',                        es: 'bailar',           esTarget: 'bailar',          example: { fr: "J'aime danser.",               es: 'Me gusta bailar.' } },
        { en: 'book', fr: 'le livre', es: 'el libro', esTarget: 'el libro', example: { fr: "Je n'aime pas ce livre.", es: 'No me gusta ese libro.' } },
        { en: 'food', fr: 'la nourriture', es: 'la comida', esTarget: 'la comida', example: { fr: "J'aime la comida argentine.", es: 'Me gusta la comida argentina.' } },
        { en: 'movie', fr: 'le film', es: 'la película', esTarget: 'la película', example: { fr: "J'aime cette película.", es: 'Me gusta esa película.' } },
        { en: 'romantic', fr: 'romantique', es: 'romántica', esTarget: 'romántica', example: { fr: "C'est une comédie romantique.", es: 'Es una película romántica.' } },
        { en: 'party',                 fr: 'la fête',                       es: 'la fiesta',        esTarget: 'la fiesta',       example: { fr: 'La fête était géniale.',       es: 'La fiesta estuvo genial.' } },
        { en: 'job / work', fr: 'le travail', es: 'el trabajo', esTarget: 'el trabajo', example: { fr: "J'aime mon travail.", es: 'Me gusta mi trabajo.' } },
        { en: 'to chat (online)', fr: 'chatter', es: 'chatear', esTarget: 'chatear', example: { fr: 'Je chatte avec mes amis.', es: 'Chateo con mis amigos.' } },
        { en: 'to improve', fr: 'améliorer / progresser', es: 'mejorar', esTarget: 'mejorar', example: { fr: "Je veux progresser en espagnol.", es: 'Quiero mejorar mi español.' } },
        { en: 'to pass (an exam/course)', fr: 'réussir / valider', es: 'aprobar', esTarget: 'aprobar', example: { fr: "J'ai réussi le cours.", es: 'Aprobé el curso.' } },
        { en: 'apart from',            fr: 'à part / en plus de',         es: 'aparte de',       esTarget: 'aparte de',      example: { fr: 'À part ça, tout va bien.',    es: 'Aparte de eso, todo bien.' } },
        { en: 'besides',               fr: 'en plus de',                   es: 'además de',       esTarget: 'además de',      example: { fr: 'En plus de ça, il pleut.',    es: 'Además de eso, llueve.' } },
        { en: 'dream', fr: 'le rêve', es: 'el sueño', esTarget: 'el sueño', example: { fr: 'Quel est ton rêve ?', es: '¿Cuál es tu sueño?' } },
        { en: 'wish', fr: 'le souhait / le désir', es: 'el deseo', esTarget: 'el deseo', example: { fr: "C'est mon plus grand souhait.", es: 'Es mi mayor deseo.' } },
        { en: 'countryside', fr: 'la campagne', es: 'el campo', esTarget: 'el campo', example: { fr: 'Je veux vivre à la campagne.', es: 'Quiero vivir en el campo.' } },
        { en: 'children (kids)', fr: 'les enfants', es: 'los hijos', esTarget: 'los hijos', example: { fr: 'Je veux avoir des enfants.', es: 'Quiero tener hijos.' } },
        { en: 'partner / couple', fr: 'le/la partenaire', es: 'la pareja', esTarget: 'la pareja', example: { fr: 'Je veux une relation stable.', es: 'Quiero una pareja estable.' } },
        { en: 'millionaire', fr: 'millionnaire', es: 'millonario', esTarget: 'millonario', example: { fr: 'Il veut être millionnaire.', es: 'Él quiere ser millonario.' } },
        { en: 'famous',                fr: 'célèbre',                       es: 'famoso',           esTarget: 'famoso',          example: { fr: 'Un monument célèbre.',         es: 'Un monumento famoso.' } },
        { en: 'to do sports', fr: 'faire du sport', es: 'hacer deporte', esTarget: 'hacer deporte', example: { fr: 'Je fais du sport le week-end.', es: 'Hago deporte el fin de semana.' } },
        { en: 'to pay', fr: 'payer', es: 'pagar', esTarget: 'pagar', example: { fr: 'Je dois payer la facture.', es: 'Tengo que pagar la factura.' } },
        { en: 'bill', fr: 'la facture', es: 'la factura', esTarget: 'la factura', example: { fr: 'La facture est arrivée.', es: 'Llegó la factura.' } },
        { en: 'to need', fr: 'avoir besoin de', es: 'necesitar', esTarget: 'necesitar', example: { fr: "J'ai besoin d'argent.", es: 'Necesito dinero.' } },
        { en: 'place', fr: "l'endroit", es: 'el lugar', esTarget: 'el lugar', example: { fr: "C'est un bel endroit.", es: 'Es un lindo lugar.' } },
        { en: 'to create', fr: 'créer', es: 'crear', esTarget: 'crear', example: { fr: 'Je veux créer une entreprise.', es: 'Quiero crear una empresa.' } },
        { en: 'to discover', fr: 'découvrir', es: 'descubrir', esTarget: 'descubrir', example: { fr: 'Je veux découvrir le monde.', es: 'Quiero descubrir el mundo.' } },
        { en: 'experience', fr: "l'expérience", es: 'la experiencia', esTarget: 'la experiencia', example: { fr: "C'est une belle expérience.", es: 'Es una linda experiencia.' } },
        { en: 'love', fr: "l'amour", es: 'el amor', esTarget: 'el amor', example: { fr: "L'amour est important.", es: 'El amor es importante.' } },
        { en: 'profession', fr: 'la profession', es: 'la profesión', esTarget: 'la profesión', example: { fr: 'Quelle est ta profession ?', es: '¿Cuál es tu profesión?' } },
        { en: 'space', fr: "l'espace", es: 'el espacio', esTarget: 'el espacio', example: { fr: "L'espace m'intéresse.", es: 'Me interesa el espacio.' } },
        { en: 'astronaut', fr: "l'astronaute", es: 'el astronauta', esTarget: 'el astronauta', example: { fr: 'Il veut être astronaute.', es: 'Él quiere ser astronauta.' } },
        { en: 'engineer', fr: "l'ingénieur / l'ingénieure", es: 'el ingeniero / la ingeniera', esTarget: 'el ingeniero / la ingeniera', example: { fr: 'Elle est ingénieure.', es: 'Ella es ingeniera.' } },
        { en: 'career', fr: 'la carrière', es: 'la carrera', esTarget: 'la carrera', example: { fr: 'Il pense à sa carrière.', es: 'Él piensa en su carrera.' } },
        { en: 'future', fr: "l'avenir / le futur", es: 'el futuro', esTarget: 'el futuro', example: { fr: 'Je pense au futur.', es: 'Pienso en el futuro.' } },
      ],
    },

    {
      id: 'ref_c08', icon: '🗺️',
      name: 'Cours du 27 juillet — Lieux & intérêts', nameEs: 'Clase del 27 de julio — Lugares e intereses',
      words: [
        { en: 'people',                fr: 'les gens',                     es: 'la gente',         esTarget: 'la gente',        example: { fr: 'Les gens sont sympas.',        es: 'La gente es amable.' } },
        { en: 'art',                   fr: "l'art",                         es: 'el arte',          esTarget: 'el arte',         example: { fr: "L'art m'intéresse.",           es: 'Me interesa el arte.' } },
        { en: 'nature',                fr: 'la nature',                    es: 'la naturaleza',    esTarget: 'la naturaleza',   example: { fr: "J'aime la nature.",            es: 'Me gusta la naturaleza.' } },
        { en: 'nightlife',             fr: 'la vie nocturne',              es: 'la vida nocturna', esTarget: 'la vida nocturna',example: { fr: 'La vie nocturne de Buenos Aires.', es: 'La vida nocturna de Buenos Aires.' } },
        { en: 'craftwork',             fr: "l'artisanat",                   es: 'la artesanía',     esTarget: 'la artesanía',    example: { fr: "J'achète de l'artisanat local.", es: 'Compro artesanía local.' } },
        { en: 'beach',                 fr: 'la plage',                     es: 'la playa',         esTarget: 'la playa',        example: { fr: 'On va à la plage.',            es: 'Vamos a la playa.' } },
        { en: 'cinema', fr: 'le cinéma', es: 'el cine', esTarget: 'el cine', example: { fr: "J'aime le cinéma.", es: 'Me gusta el cine.' } },
        { en: 'literature', fr: 'la littérature', es: 'la literatura', esTarget: 'la literatura', example: { fr: "La littérature m'intéresse.", es: 'Me interesa la literatura.' } },
        { en: 'politics', fr: 'la politique', es: 'la política', esTarget: 'la política', example: { fr: 'Il parle de politique.', es: 'Él habla de política.' } },
        { en: 'football / soccer', fr: 'le foot', es: 'el fútbol', esTarget: 'el fútbol', example: { fr: 'Il regarde le foot le dimanche.', es: 'Ve fútbol los domingos.' } },
        { en: 'economy', fr: "l'économie", es: 'la economía', esTarget: 'la economía', example: { fr: "L'économie va mal.", es: 'La economía anda mal.' } },
        { en: 'to guess', fr: 'deviner', es: 'adivinar', esTarget: 'adivinar', example: { fr: 'Devine ce que je fais.', es: 'Adiviná qué hago.' } },
        { en: 'probably', fr: 'probablement', es: 'probablemente', esTarget: 'probablemente', example: { fr: "C'est probablement vrai.", es: 'Probablemente sea verdad.' } },
        { en: 'building',              fr: 'le bâtiment',                  es: 'el edificio',      esTarget: 'el edificio',     example: { fr: 'Un bâtiment blanc.',           es: 'Un edificio blanco.' } },
        { en: 'fountain',              fr: 'la fontaine',                  es: 'la fuente',        esTarget: 'la fuente',       example: { fr: 'Une fontaine sur la place.',   es: 'Una fuente en la plaza.' } },
        { en: 'village',               fr: 'le village',                   es: 'el pueblo',        esTarget: 'el pueblo',       example: { fr: 'Un petit village.',            es: 'Un pueblo chico.' } },
        { en: 'city', fr: 'la ville', es: 'la ciudad', esTarget: 'la ciudad', example: { fr: 'Une belle ville.', es: 'Una linda ciudad.' } },
        { en: 'to broadcast', fr: 'diffuser / transmettre', es: 'transmitir', esTarget: 'transmitir', example: { fr: 'Ils diffusent le match.', es: 'Transmiten el partido.' } },
        { en: 'important', fr: 'important', es: 'importante', esTarget: 'importante', example: { fr: "C'est très important.", es: 'Es muy importante.' } },
        { en: 'symbol', fr: 'le symbole', es: 'el símbolo', esTarget: 'el símbolo', example: { fr: "C'est un symbole de la ville.", es: 'Es un símbolo de la ciudad.' } },
        { en: 'completely', fr: 'complètement', es: 'completamente', esTarget: 'completamente', example: { fr: "Je suis d'accord, complètement.", es: 'Estoy de acuerdo, completamente.' } },
        { en: 'pedestrianized', fr: 'piéton(ne)', es: 'peatonal', esTarget: 'peatonal', example: { fr: 'Une rue piétonne.', es: 'Una calle peatonal.' } },
        { en: 'to represent', fr: 'représenter', es: 'representar', esTarget: 'representar', example: { fr: 'Il représente son pays.', es: 'Representa a su país.' } },
        { en: 'history / story', fr: "l'histoire", es: 'la historia', esTarget: 'la historia', example: { fr: 'Une ville avec une longue histoire.', es: 'Una ciudad con mucha historia.' } },
        { en: 'nightclub (AR)',        fr: 'la boîte de nuit',            es: 'el boliche',       esTarget: 'el boliche',      example: { fr: 'On va en boîte ce soir ?',     es: '¿Vamos al boliche esta noche?' } },
        { en: 'walk / promenade', fr: 'la promenade', es: 'el paseo', esTarget: 'el paseo', example: { fr: 'On fait une promenade.', es: 'Hacemos un paseo.' } },
        { en: 'tourist office',        fr: 'l\'office de tourisme',        es: 'la oficina de turismo', esTarget: 'la oficina de turismo', example: { fr: "Demande à l'office de tourisme.", es: 'Preguntá en la oficina de turismo.' } },
        { en: 'swimming pool',         fr: 'la piscine',                   es: 'la piscina',       esTarget: 'la piscina',      example: { fr: "L'hôtel a une piscine.",       es: 'El hotel tiene piscina.' } },
        { en: 'official language', fr: 'la langue officielle', es: 'la lengua oficial', esTarget: 'la lengua oficial', example: { fr: "L'espagnol est la langue officielle.", es: 'El español es la lengua oficial.' } },
        { en: 'hill',                  fr: 'la colline',                   es: 'el cerro',         esTarget: 'el cerro',        example: { fr: 'On monte sur la colline.',     es: 'Subimos al cerro.' } },
        { en: 'jungle',                fr: 'la jungle',                    es: 'la selva',         esTarget: 'la selva',        example: { fr: 'La jungle amazonienne.',       es: 'La selva amazónica.' } },
        { en: 'ruins',                 fr: 'les ruines',                   es: 'las ruinas',       esTarget: 'las ruinas',      example: { fr: 'Visiter des ruines anciennes.', es: 'Visitar ruinas antiguas.' } },
        { en: 'lake',                  fr: 'le lac',                        es: 'el lago',          esTarget: 'el lago',         example: { fr: 'Un lac magnifique.',           es: 'Un lago precioso.' } },
        { en: 'gorgeous',              fr: 'magnifique',                   es: 'precioso',         esTarget: 'precioso',        example: { fr: 'Un lac magnifique.',           es: 'Un lago precioso.' } },
        { en: 'cathedral',             fr: 'la cathédrale',                es: 'la catedral',      esTarget: 'la catedral',     example: { fr: 'La cathédrale du centre.',     es: 'La catedral del centro.' } },
        { en: 'country', fr: 'le pays', es: 'el país', esTarget: 'el país', example: { fr: 'Un beau pays.', es: 'Un lindo país.' } },
        { en: 'tearoom',               fr: 'le salon de thé',              es: 'la confitería',    esTarget: 'la confitería',   example: { fr: 'Un café dans un salon de thé.', es: 'Un café en la confitería.' } },
        { en: 'nature reserve',        fr: 'le parc naturel',              es: 'el parque natural', esTarget: 'el parque natural', example: { fr: 'Un parc naturel protégé.',  es: 'Un parque natural protegido.' } },
        { en: 'forest',                fr: 'la forêt',                     es: 'el bosque',        esTarget: 'el bosque',       example: { fr: 'Une balade en forêt.',         es: 'Un paseo por el bosque.' } },
        { en: 'biology', fr: 'la biologie', es: 'la biología', esTarget: 'la biología', example: { fr: "J'étudie la biologie.", es: 'Estudio biología.' } },
        { en: 'fantastic', fr: 'fantastique', es: 'fantástico', esTarget: 'fantástico', example: { fr: "C'est fantastique !", es: '¡Es fantástico!' } },
        { en: 'exactly', fr: 'exactement', es: 'exactamente', esTarget: 'exactamente', example: { fr: 'Exactement !', es: '¡Exactamente!' } },
        { en: 'century', fr: 'le siècle', es: 'el siglo', esTarget: 'el siglo', example: { fr: 'Au vingtième siècle.', es: 'En el siglo veinte.' } },
        { en: 'coast',                 fr: 'la côte',                       es: 'la costa',         esTarget: 'la costa',        example: { fr: 'Une ville sur la côte.',       es: 'Una ciudad en la costa.' } },
      ],
    },

    {
      id: 'ref_c09', icon: '🍲',
      name: 'Cours du 30 juillet — Cuisine typique & langues', nameEs: 'Clase del 30 de julio — Comida típica e idiomas',
      words: [
        { en: 'touristy',              fr: 'touristique',                  es: 'turístico',        esTarget: 'turístico',       example: { fr: 'Un quartier très touristique.', es: 'Un barrio muy turístico.' } },
        { en: 'kind (person)',         fr: 'aimable',                       es: 'amable',           esTarget: 'amable',          example: { fr: 'Les gens sont très aimables.', es: 'La gente es muy amable.' } },
        { en: 'popular',               fr: 'populaire',                     es: 'popular',          esTarget: 'popular',         example: { fr: 'Une chanson populaire.',       es: 'Una canción populaire.' } },
        { en: 'chimichurri',       fr: 'le chimichurri',              es: 'el chimichurri',           esTarget: 'el chimichurri',          example: { fr: 'Du chimichurri sur le bife.',      es: 'Chimichurri sobre el bife.' } },
        { en: 'dressing/sauce',    fr: "l'assaisonnement",             es: 'el aderezo',               esTarget: 'el aderezo',              example: { fr: "L'assaisonnement de la salade.",   es: 'El aderezo de la ensalada.' } },
        { en: "I'm in no hurry", fr: 'je ne suis pas pressé', es: 'no tengo apuro', esTarget: 'no tengo apuro', example: { fr: 'Je ne suis pas pressé, prends ton temps.', es: 'No tengo apuro, tomate tu tiempo.' } },
        { en: 'cave', fr: 'la grotte', es: 'la cueva', esTarget: 'la cueva', example: { fr: 'On a visité une grotte.', es: 'Visitamos una cueva.' } },
        { en: 'clock / watch', fr: "l'horloge / la montre", es: 'el reloj', esTarget: 'el reloj', example: { fr: "Quelle heure indique l'horloge ?", es: '¿Qué hora marca el reloj?' } },
        { en: 'Guaraní (language)', fr: 'le guarani', es: 'el guaraní', esTarget: 'el guaraní', example: { fr: 'Le guarani est parlé au Paraguay.', es: 'El guaraní se habla en Paraguay.' } },
        { en: 'chacarera (folk dance)', fr: 'la chacarera', es: 'la chacarera', esTarget: 'la chacarera', example: { fr: 'On danse la chacarera.', es: 'Bailamos la chacarera.' } },
        { en: 'dance', fr: 'la danse', es: 'la danza', esTarget: 'la danza', example: { fr: 'Une danse folklorique.', es: 'Una danza folclórica.' } },
        { en: 'the north', fr: 'le nord', es: 'el norte', esTarget: 'el norte', example: { fr: 'Dans le nord du pays.', es: 'En el norte del país.' } },
        { en: 'type / kind', fr: 'le type', es: 'el tipo', esTarget: 'el tipo', example: { fr: 'Quel type de musique ?', es: '¿Qué tipo de música?' } },
        { en: 'song', fr: 'la chanson', es: 'la canción', esTarget: 'la canción', example: { fr: "J'aime beaucoup cette chanson.", es: 'Me interesa mucho esa canción.' } },
        { en: 'mother tongue', fr: 'la langue maternelle', es: 'la lengua materna', esTarget: 'la lengua materna', example: { fr: 'Le français est ma langue maternelle.', es: 'El francés es mi lengua materna.' } },
        { en: 'more or less', fr: 'plus ou moins', es: 'más o menos', esTarget: 'más o menos', example: { fr: 'Je comprends plus ou moins.', es: 'Entiendo más o menos.' } },
        { en: 'very badly', fr: 'très mal', es: 'muy mal', esTarget: 'muy mal', example: { fr: "Je parle très mal l'italien.", es: 'Hablo muy mal italiano.' } },
        { en: 'month', fr: 'le mois', es: 'el mes', esTarget: 'el mes', example: { fr: 'On se voit le mois prochain.', es: 'Nos vemos el mes que viene.' } },
        { en: 'to answer', fr: 'répondre', es: 'responder', esTarget: 'responder', example: { fr: 'Réponds à la question.', es: 'Respondé la pregunta.' } },
        { en: 'newspaper', fr: 'le journal', es: 'el diario', esTarget: 'el diario', example: { fr: 'Je lis le journal.', es: 'Leo el diario.' } },
        { en: 'magazine', fr: 'le magazine', es: 'la revista', esTarget: 'la revista', example: { fr: 'Une revue de mode.', es: 'Una revista de moda.' } },
        { en: 'recording', fr: "l'enregistrement", es: 'la grabación', esTarget: 'la grabación', example: { fr: "J'écoute un enregistrement.", es: 'Escucho una grabación.' } },
        { en: 'audio', fr: "l'audio", es: 'el audio', esTarget: 'el audio', example: { fr: "L'audio ne fonctionne pas.", es: 'El audio no funciona.' } },
        { en: 'pronunciation', fr: 'la prononciation', es: 'la pronunciación', esTarget: 'la pronunciación', example: { fr: 'Je pratique ma prononciation.', es: 'Practico mi pronunciación.' } },
        { en: 'postcard', fr: 'la carte postale', es: 'la postal', esTarget: 'la postal', example: { fr: "J'envoie une carte postale.", es: 'Mando una postal.' } },
        { en: 'excursion', fr: "l'excursion", es: 'la excursión', esTarget: 'la excursión', example: { fr: 'Une excursion à la montagne.', es: 'Una excursión a la montaña.' } },
        { en: 'game', fr: 'le jeu', es: 'el juego', esTarget: 'el juego', example: { fr: "C'est un jeu amusant.", es: 'Es un juego divertido.' } },
        { en: 'typical dish', fr: 'le plat typique', es: 'el plato típico', esTarget: 'el plato típico', example: { fr: 'Le plat typique argentin.', es: 'El plato típico argentino.' } },
        { en: 'to translate', fr: 'traduire', es: 'traducir', esTarget: 'traducir', example: { fr: 'Je traduis un texte.', es: 'Traduzco un texto.' } },
        { en: 'to sing', fr: 'chanter', es: 'cantar', esTarget: 'cantar', example: { fr: "J'aime chanter.", es: 'Me gusta cantar.' } },
        { en: 'to have fun', fr: "s'amuser", es: 'divertirse', esTarget: 'divertirse', example: { fr: "On s'amuse beaucoup.", es: 'Nos divertimos mucho.' } },
        { en: 'to continue', fr: 'continuer', es: 'continuar', esTarget: 'continuar', example: { fr: 'Je continue à étudier.', es: 'Continúo estudiando.' } },
        { en: 'mistake', fr: "l'erreur", es: 'el error', esTarget: 'el error', example: { fr: "J'ai fait une erreur.", es: 'Cometí un error.' } },
        { en: 'spelling', fr: "l'orthographe", es: 'la ortografía', esTarget: 'la ortografía', example: { fr: "Il fait des erreurs d'orthographe.", es: 'Tiene errores de ortografía.' } },
        { en: 'currently', fr: 'actuellement', es: 'actualmente', esTarget: 'actualmente', example: { fr: "J'étudie actuellement l'espagnol.", es: 'Actualmente estudio español.' } },
        { en: 'travel agency', fr: "l'agence de voyage", es: 'la agencia de turismo', esTarget: 'la agencia de turismo', example: { fr: "Je réserve à l'agence de voyage.", es: 'Reservo en la agencia de turismo.' } },
        { en: 'text message', fr: 'le message texte', es: 'el mensaje de texto', esTarget: 'el mensaje de texto', example: { fr: "J'envoie un message texte.", es: 'Mando un mensaje de texto.' } },
        { en: 'television', fr: 'la télévision', es: 'la televisión', esTarget: 'la televisión', example: { fr: 'Je regarde la télévision.', es: 'Miro la televisión.' } },
        { en: 'Arabic (language)', fr: "l'arabe", es: 'el árabe', esTarget: 'el árabe', example: { fr: "J'apprends l'arabe.", es: 'Aprendo árabe.' } },
      ],
    },

    {
      id: 'ref_c10', icon: '💬',
      name: 'Cours du 6 août — Ser/Estar & révisions', nameEs: 'Clase del 6 de agosto — Ser/Estar y repaso',
      words: [
        { en: 'specific',              fr: 'spécifique',                   es: 'específico',      esTarget: 'específico',     example: { fr: 'À une heure spécifique.',     es: 'A una hora específica.' } },
        { en: 'every day',             fr: 'tous les jours',              es: 'todos los días',  esTarget: 'todos los días', example: { fr: 'Je travaille tous les jours.', es: 'Trabajo todos los días.' } },
        { en: 'rush hour',             fr: "l'heure de pointe",            es: 'la hora pico',    esTarget: 'la hora pico',   example: { fr: "C'est l'heure de pointe.",    es: 'Es la hora pico.' } },
        { en: 'boss',                  fr: 'le chef / la cheffe',         es: 'el jefe / la jefa',   esTarget: 'el jefe / la jefa', example: { fr: 'Mon chef s\'appelle Antonio.', es: 'Mi jefe se llama Antonio.' } },
        { en: 'to work (slang)',       fr: 'bosser',                        es: 'laburar',          esTarget: 'laburar',         example: { fr: 'Je bosse tout le week-end.',   es: 'Laburo todo el fin de semana.' } },
        { en: 'what a shame',          fr: 'quel dommage',                 es: 'qué pena',         esTarget: 'qué pena',        example: { fr: 'Quel dommage, il pleut !',     es: '¡Qué pena, está lloviendo!' } },
        { en: 'better', fr: 'mieux', es: 'mejor', esTarget: 'mejor', example: { fr: "C'est mieux comme ça.", es: 'Así es mejor.' } },
        { en: 'a catastrophe', fr: 'une catastrophe', es: 'una catástrofe', esTarget: 'una catástrofe', example: { fr: 'Le vendredi est une catastrophe.', es: 'El viernes es una catástrofe.' } },
        { en: 'to take a day off', fr: 'prendre un jour de congé', es: 'tomarse un día', esTarget: 'tomarse un día', example: { fr: 'Je vais prendre un jour de congé.', es: 'Me voy a tomar un día.' } },
        { en: "everything's fine", fr: 'tout va bien', es: 'todo está bien', esTarget: 'todo está bien', example: { fr: 'Ne t\'inquiète pas, tout va bien.', es: 'No te preocupes, todo está bien.' } },
        { en: 'to own / possess', fr: 'posséder', es: 'poseer', esTarget: 'poseer', example: { fr: 'Je ne possède pas de voiture.', es: 'No poseo un auto.' } },
        { en: 'on time', fr: "à l'heure", es: 'a la hora', esTarget: 'a la hora', example: { fr: "Le train est à l'heure.", es: 'El tren está a la hora.' } },
        { en: "it's certain that", fr: 'il est certain que', es: 'es seguro que', esTarget: 'es seguro que', example: { fr: "Il est certain que le train part à l'heure.", es: 'Es seguro que el tren sale a la hora.' } },
        { en: 'order / request', fr: 'la commande / la demande', es: 'el pedido', esTarget: 'el pedido', example: { fr: 'Ta commande est prête.', es: 'Tu pedido está listo.' } },
        { en: 'flamenco', fr: 'le flamenco', es: 'el flamenco', esTarget: 'el flamenco', example: { fr: "Ça ne m'intéresse pas, le flamenco.", es: 'No me interesa el flamenco.' } },
        { en: 'ranch / stay', fr: 'le ranch / le séjour à la campagne', es: 'la estancia', esTarget: 'la estancia', example: { fr: 'Un séjour dans un ranch argentin.', es: 'Una estancia argentina.' } },
        { en: 'grammar', fr: 'la grammaire', es: 'la gramática', esTarget: 'la gramática', example: { fr: 'La grammaire espagnole.', es: 'La gramática española.' } },
        { en: 'sport', fr: 'le sport', es: 'el deporte', esTarget: 'el deporte', example: { fr: "J'aime le sport.", es: 'Me gusta el deporte.' } },
        { en: 'math', fr: 'les maths', es: 'la matemática', esTarget: 'la matemática', example: { fr: "Je n'aime pas les maths.", es: 'No me gusta la matemática.' } },
        { en: 'horse', fr: 'le cheval', es: 'el caballo', esTarget: 'el caballo', example: { fr: "J'aime les chevaux.", es: 'Me interesan los caballos.' } },
        { en: 'language', fr: 'la langue', es: 'el idioma', esTarget: 'el idioma', example: { fr: 'Un nouveau langage.', es: 'Un nuevo idioma.' } },
        { en: 'theater', fr: 'le théâtre', es: 'el teatro', esTarget: 'el teatro', example: { fr: 'Je ne suis pas fan de théâtre.', es: 'No me interesa el teatro.' } },
        { en: 'guitar', fr: 'la guitare', es: 'la guitarra', esTarget: 'la guitarra', example: { fr: "J'aime la guitare.", es: 'Me gusta la guitarra.' } },
        { en: 'class', fr: 'la classe / le cours', es: 'la clase', esTarget: 'la clase', example: { fr: 'Une classe intéressante.', es: 'Una clase interesante.' } },
        { en: 'collection', fr: 'la collection', es: 'la colección', esTarget: 'la colección', example: { fr: 'Une collection de photos.', es: 'Una colección de fotos.' } },
        { en: 'silverwork', fr: "l'orfèvrerie", es: 'la platería', esTarget: 'la platería', example: { fr: "J'aime l'orfèvrerie argentine.", es: 'Me gusta la platería argentina.' } },
        { en: 'IT worker / computer scientist', fr: 'informaticien(ne)', es: 'informático', esTarget: 'informático', example: { fr: 'Juan est informaticien.', es: 'Juan es informático.' } },
        { en: 'irregular', fr: 'irrégulier', es: 'irregular', esTarget: 'irregular', example: { fr: 'Ce verbe est très irrégulier.', es: 'Este verbo es muy irregular.' } },
      ],
    },

    {
      id: 'ref_c11', icon: '🌎',
      name: 'Cours du 10 août — Nationalités (repaso) & mucho/muy', nameEs: 'Clase del 10 de agosto — Nacionalidades (repaso) y mucho/muy',
      words: [
        { en: 'weird',                 fr: 'bizarre',                       es: 'raro',             esTarget: 'raro',            example: { fr: "C'est bizarre.",               es: 'Es raro.' } },
        { en: 'unique',                fr: 'unique',                        es: 'único',            esTarget: 'único',           example: { fr: 'La cuisine de maman est unique.', es: 'La comida de la mamá es única.' } },
        { en: 'to have time to',       fr: 'avoir le temps de',           es: 'tener tiempo para', esTarget: 'tener tiempo para', example: { fr: "Je n'ai pas le temps.",   es: 'No tengo tiempo.' } },
        { en: 'to carry out / realize', fr: 'réaliser', es: 'realizar', esTarget: 'realizar', example: { fr: "Je n'ai pas le temps de le faire.", es: 'No tengo el tiempo para realizarlo.' } },
        { en: 'to bring', fr: 'apporter', es: 'traer', esTarget: 'traer', example: { fr: 'Apporte les activités de pratique.', es: 'Traé las actividades de práctica.' } },
        { en: 'Colombian',     fr: 'colombien / colombienne',     es: 'colombiano / colombiana',   esTarget: 'colombiano / colombiana',  example: { fr: 'Elle est colombienne.',          es: 'Ella es colombiana.' } },
        { en: 'Salvadoran',    fr: 'salvadorien / salvadorienne', es: 'salvadoreño / salvadoreña', esTarget: 'salvadoreño / salvadoreña',example: { fr: 'Il est salvadorien.',            es: 'Él es salvadoreño.' } },
        { en: 'Syrian',        fr: 'syrien / syrienne',           es: 'sirio / siria',             esTarget: 'sirio / siria',            example: { fr: 'Elle est syrienne.',             es: 'Ella es siria.' } },
        { en: 'Moroccan',      fr: 'marocain / marocaine',        es: 'marroquí',                  esTarget: 'marroquí',                 example: { fr: 'Il est marocain.',               es: 'Él es marroquí.' } },
        { en: 'Belgian',       fr: 'belge',                        es: 'belga',                     esTarget: 'belga',                    example: { fr: 'Elle est belge.',                es: 'Ella es belga.' } },
        { en: 'Canadian',      fr: 'canadien / canadienne',       es: 'canadiense',                esTarget: 'canadiense',               example: { fr: 'Il est canadien.',               es: 'Él es canadiense.' } },
        { en: 'Iranian',       fr: 'iranien / iranienne',         es: 'iraní',                     esTarget: 'iraní',                    example: { fr: 'Elle est iranienne.',            es: 'Ella es iraní.' } },
        { en: 'Croatian',      fr: 'croate',                       es: 'croata',                    esTarget: 'croata',                   example: { fr: 'Il est croate.',                 es: 'Él es croata.' } },
        { en: 'Chinese',       fr: 'chinois / chinoise',          es: 'chino / china',             esTarget: 'chino / china',            example: { fr: 'Elle est chinoise.',             es: 'Ella es china.' } },
        { en: 'colleague', fr: 'le/la collègue', es: 'el colega', esTarget: 'el colega', example: { fr: 'Mon collègue travaille lentement.', es: 'Mi colega trabaja lentamente.' } },
        { en: 'USB drive', fr: 'la clé USB', es: 'el pendrive', esTarget: 'el pendrive', example: { fr: "J'ai beaucoup de musique sur ma clé USB.", es: 'Tengo mucha música en mi pendrive.' } },
        { en: 'apple', fr: 'la pomme', es: 'la manzana', esTarget: 'la manzana', example: { fr: 'Cet arbre a beaucoup de pommes.', es: 'Ese árbol tiene muchas manzanas.' } },
        { en: 'to be hungry',          fr: 'avoir faim',                   es: 'tener hambre',    esTarget: 'tener hambre',   example: { fr: "J'ai très faim.",             es: 'Tengo mucha hambre.' } },
        { en: 'to be thirsty',         fr: 'avoir soif',                   es: 'tener sed',       esTarget: 'tener sed',      example: { fr: "J'ai soif.",                  es: 'Tengo sed.' } },
        { en: 'to drink alcohol', fr: "boire de l'alcool", es: 'beber alcohol', esTarget: 'tomar alcohol', example: { fr: "Je bois beaucoup d'alcool le week-end.", es: 'Bebo mucho alcohol los fines de semana.' } },
        { en: 'drink (alcoholic)', fr: 'le verre / le shot', es: 'el trago', esTarget: 'el trago', example: { fr: "J'ai bu plusieurs verres au bar.", es: 'Bebí muchos tragos en el bar.' } },
        { en: 'last night', fr: 'hier soir', es: 'anoche', esTarget: 'anoche', example: { fr: 'Hier soir, on a bu plusieurs verres.', es: 'Anoche bebimos muchos tragos.' } },
        { en: 'tree', fr: "l'arbre", es: 'el árbol', esTarget: 'el árbol', example: { fr: 'Cet arbre a beaucoup de fleurs.', es: 'Ese árbol tiene muchas flores.' } },
        { en: 'normally', fr: 'normalement', es: 'normalmente', esTarget: 'normalmente', example: { fr: 'Tu cuisines beaucoup, normalement.', es: 'Vos normalmente cocinás mucho.' } },
        { en: 'a bit of',              fr: 'un peu de',                    es: 'un poco de',      esTarget: 'un poco de',     example: { fr: 'Un peu de musique.',          es: 'Un poco de música.' } },
        { en: 'just a little bit',     fr: 'un tout petit peu',           es: 'un poquito',      esTarget: 'un poquito',     example: { fr: "J'en veux juste un tout petit peu.", es: 'Quiero solo un poquito.' } },
        { en: 'person', fr: 'la personne', es: 'la persona', esTarget: 'la persona', example: { fr: "On n'est pas nombreux à la maison.", es: 'En casa no somos muchas personas.' } },
        { en: 'lazy', fr: 'paresseux', es: 'vago', esTarget: 'vago', example: { fr: 'Il est un peu paresseux.', es: 'Es un poco vago.' } },
        { en: 'hardworking', fr: 'travailleur', es: 'trabajador', esTarget: 'trabajador', example: { fr: 'Elle est très travailleuse.', es: 'Ella es muy trabajadora.' } },
        { en: 'to achieve', fr: 'atteindre / réussir à', es: 'lograr', esTarget: 'lograr', example: { fr: 'Il travaille dur pour atteindre son but.', es: 'Trabaja arduo para lograr su meta.' } },
        { en: 'goal', fr: "le but / l'objectif", es: 'la meta', esTarget: 'la meta', example: { fr: "L'objectif du mois.", es: 'La meta del mes.' } },
        { en: 'hard / strenuous', fr: 'dur / ardu', es: 'arduo', esTarget: 'arduo', example: { fr: 'Je veux travailler dur pour être le directeur.', es: 'Quiero trabajar muy arduo para ser el director.' } },
        { en: 'to speak in public', fr: 'parler en public', es: 'hablar en público', esTarget: 'hablar en público', example: { fr: 'Ça me gêne beaucoup de parler en public.', es: 'A mí me da mucha pena hablar en público.' } },
        { en: 'mind', fr: "l'esprit", es: 'la mente', esTarget: 'la mente', example: { fr: "Beaucoup lire, c'est bon pour l'esprit.", es: 'Leer mucho es bueno para la mente.' } },
        { en: 'to freeze', fr: 'congeler', es: 'congelar', esTarget: 'congelar', example: { fr: "J'achète beaucoup de viande, je dois la congeler.", es: 'Compro mucha carne, tengo que congelarla.' } },
        { en: 'analysis', fr: "l'analyse", es: 'el análisis', esTarget: 'el análisis', example: { fr: "L'analyse que tu as présentée est très bonne.", es: 'El análisis que presentaste está muy bien.' } },
        { en: 'to present', fr: 'présenter', es: 'presentar', esTarget: 'presentar', example: { fr: "J'ai présenté un bon travail.", es: 'Presenté un buen trabajo.' } },
        { en: 'congratulations', fr: 'félicitations', es: 'las felicitaciones', esTarget: 'las felicitaciones', example: { fr: 'Félicitations pour ton examen !', es: '¡Felicitaciones por tu examen!' } },
        { en: 'slowly', fr: 'lentement', es: 'lentamente', esTarget: 'lentamente', example: { fr: 'Mon collègue travaille lentement mais fait beaucoup de choses.', es: 'Mi colega trabaja muy lentamente pero hace muchas cosas.' } },
        { en: 'one moment please', fr: "un instant, s'il vous plaît", es: 'un momento por favor', esTarget: 'un momento, por favor', example: { fr: "— Je peux débarrasser ? — Un instant, s'il vous plaît.", es: '— ¿Puedo retirar? — Un momento, por favor.' } },
        { en: 'ready', fr: 'prêt', es: 'listo', esTarget: 'listo', example: { fr: "C'est prêt ?", es: '¿Está listo?' } },
      ],
    },

    {
      id: 'ref_c12', icon: '🍴',
      name: 'Cours du 17 août — Nationalités & gastronomie', nameEs: 'Clase del 17 de agosto — Nacionalidades y gastronomía',
      words: [
        { en: 'Japanese',      fr: 'japonais / japonaise',        es: 'japonés / japonesa',       esTarget: 'japonés / japonesa',       example: { fr: 'Elle est japonaise.',            es: 'Ella es japonesa.' } },
        { en: 'Dutch',         fr: 'néerlandais / néerlandaise',  es: 'holandés / holandesa',      esTarget: 'holandés / holandesa',     example: { fr: 'Il est néerlandais.',            es: 'Él es holandés.' } },
        { en: 'Portuguese',    fr: 'portugais / portugaise',      es: 'portugués / portuguesa',    esTarget: 'portugués / portuguesa',   example: { fr: 'Le fado est portugais.',         es: 'El fado es portugués.' } },
        { en: 'German',        fr: 'allemand / allemande',        es: 'alemán / alemana',          esTarget: 'alemán / alemana',         example: { fr: 'Elle est allemande.',            es: 'Ella es alemana.' } },
        { en: 'Russian',       fr: 'russe',                        es: 'ruso / rusa',               esTarget: 'ruso / rusa',              example: { fr: 'Il parle russe.',                es: 'Él habla ruso.' } },
        { en: 'English',       fr: 'anglais / anglaise',          es: 'inglés / inglesa',          esTarget: 'inglés / inglesa',         example: { fr: 'Elle est anglaise.',             es: 'Ella es inglesa.' } },
        { en: 'Greek',         fr: 'grec / grecque',              es: 'griego / griega',           esTarget: 'griego / griega',          example: { fr: "C'est un plat grec.",            es: 'Es un plato griego.' } },
        { en: 'Hawaiian',      fr: 'hawaïen / hawaïenne',         es: 'hawaiano / hawaiana',       esTarget: 'hawaiano / hawaiana',      example: { fr: 'Une chemise hawaïenne.',         es: 'Una camisa hawaiana.' } },
        { en: 'Brazilian',     fr: 'brésilien / brésilienne',     es: 'brasileño / brasileña',     esTarget: 'brasileño / brasileña',    example: { fr: 'Elle est brésilienne.',          es: 'Ella es brasileña.' } },
        { en: 'Italian',       fr: 'italien / italienne',         es: 'italiano / italiana',       esTarget: 'italiano / italiana',      example: { fr: 'La pizza est italienne.',        es: 'La pizza es italiana.' } },
        { en: 'American (US)', fr: 'américain / américaine',      es: 'estadounidense',            esTarget: 'estadounidense',           example: { fr: 'Il est américain.',              es: 'Él es estadounidense.' } },
        { en: 'Argentinian',   fr: 'argentin / argentine',        es: 'argentino / argentina',     esTarget: 'argentino / argentina',    example: { fr: 'Le tango est argentin.',         es: 'El tango es argentino.' } },
        { en: 'Indian',        fr: 'indien / indienne',           es: 'indio / india',             esTarget: 'indio / india',            example: { fr: 'Un plat indien.',                es: 'Un plato indio.' } },
        { en: 'Mexican',       fr: 'mexicain / mexicaine',        es: 'mexicano / mexicana',       esTarget: 'mexicano / mexicana',      example: { fr: 'Elle est mexicaine.',            es: 'Ella es mexicana.' } },
        { en: 'Venezuelan',    fr: 'vénézuélien / vénézuélienne', es: 'venezolano / venezolana',   esTarget: 'venezolano / venezolana',  example: { fr: 'Il est vénézuélien.',            es: 'Él es venezolano.' } },
        { en: 'Bolivian',      fr: 'bolivien / bolivienne',       es: 'boliviano / boliviana',     esTarget: 'boliviano / boliviana',    example: { fr: 'Elle est bolivienne.',           es: 'Ella es boliviana.' } },
        { en: 'Guatemalan',    fr: 'guatémaltèque',                es: 'guatemalteco / guatemalteca', esTarget: 'guatemalteco / guatemalteca', example: { fr: 'Il est guatémaltèque.',   es: 'Él es guatemalteco.' } },
        { en: 'Cuban',         fr: 'cubain / cubaine',            es: 'cubano / cubana',           esTarget: 'cubano / cubana',          example: { fr: 'Elle est cubaine.',              es: 'Ella es cubana.' } },
        { en: 'Ecuadorian',    fr: 'équatorien / équatorienne',   es: 'ecuatoriano / ecuatoriana', esTarget: 'ecuatoriano / ecuatoriana',example: { fr: 'Il est équatorien.',             es: 'Él es ecuatoriano.' } },
        { en: 'Honduran',      fr: 'hondurien / hondurienne',     es: 'hondureño / hondureña',     esTarget: 'hondureño / hondureña',    example: { fr: 'Elle est hondurienne.',          es: 'Ella es hondureña.' } },
        { en: 'Chilean',       fr: 'chilien / chilienne',         es: 'chileno / chilena',         esTarget: 'chileno / chilena',        example: { fr: 'Il est chilien.',                es: 'Él es chileno.' } },
        { en: 'tango',         fr: 'le tango',                     es: 'el tango',                  esTarget: 'el tango',                 example: { fr: 'Le tango est né à Buenos Aires.', es: 'El tango nació en Buenos Aires.' } },
        { en: 'paella',        fr: 'la paella',                    es: 'la paella',                 esTarget: 'la paella',                example: { fr: 'La paella est espagnole.',       es: 'La paella es española.' } },
        { en: 'sushi',         fr: 'les sushis',                   es: 'el sushi',                  esTarget: 'el sushi',                 example: { fr: "J'aime les sushis.",             es: 'Me gusta el sushi.' } },
        { en: 'curry',         fr: 'le curry',                     es: 'el curry',                  esTarget: 'el curry',                 example: { fr: 'Un curry indien.',               es: 'Un curry indio.' } },
        { en: 'bossa nova',    fr: 'la bossa nova',                es: 'la bossa nova',             esTarget: 'la bossa nova',             example: { fr: 'La bossa nova est brésilienne.', es: 'La bossa nova es brasileña.' } },
        { en: 'fado',          fr: 'le fado',                      es: 'el fado',                   esTarget: 'el fado',                  example: { fr: 'Le fado se chante à Lisbonne.',  es: 'El fado se canta en Lisboa.' } },

        // ── Restaurant & gastronomie argentine ──────────────────────────
        { en: 'waiter',            fr: 'le serveur / la serveuse',   es: 'el mozo / la moza',        esTarget: 'el mozo / la moza',       example: { fr: 'Le serveur prend la commande.',    es: 'El mozo toma el pedido.' } },
        { en: 'customer',          fr: 'le client / la cliente',     es: 'el cliente / la clienta',  esTarget: 'el cliente / la clienta', example: { fr: 'Le client commande une entrée.',   es: 'El cliente pide una entrada.' } },
        { en: 'menu',              fr: 'le menu / la carte',         es: 'el menú',                  esTarget: 'el menú',                 example: { fr: 'Le menu du jour.',                 es: 'El menú del día.' } },
        { en: 'starter',           fr: "l'entrée",                    es: 'la entrada',               esTarget: 'la entrada',              example: { fr: "En entrée, je veux la soupe.",     es: 'De entrada quiero la sopa.' } },
        { en: 'main course',       fr: 'le plat principal',          es: 'el plato principal',       esTarget: 'el plato principal',      example: { fr: 'Le plat principal est prêt.',      es: 'El plato principal está listo.' } },
        { en: 'dessert',           fr: 'le dessert',                 es: 'el postre',                esTarget: 'el postre',               example: { fr: 'Vous voulez un dessert ?',         es: '¿Quieren postre?' } },
        { en: "soup of the day",   fr: 'la soupe du jour',           es: 'la sopa del día',          esTarget: 'la sopa del día',         example: { fr: 'La soupe du jour est à la courge.',es: 'La sopa del día es de calabaza.' } },
        { en: 'full salad',        fr: 'la salade composée',         es: 'la ensalada completa',     esTarget: 'la ensalada completa',    example: { fr: 'La salade composée a du thon.',    es: 'La ensalada completa tiene atún.' } },
        { en: 'stuffed tomatoes',  fr: 'les tomates farcies',        es: 'los tomates rellenos',     esTarget: 'los tomates rellenos',    example: { fr: "J'adore les tomates farcies.",     es: 'Me encantan los tomates rellenos.' } },
        { en: 'roast chicken',     fr: 'le poulet au four',          es: 'el pollo al horno',        esTarget: 'el pollo al horno',       example: { fr: 'Poulet au four avec des frites.',  es: 'Pollo al horno con papas.' } },
        { en: 'bife de chorizo',   fr: 'le bife de chorizo',         es: 'el bife de chorizo',       esTarget: 'el bife de chorizo',      example: { fr: 'Un bife de chorizo avec salade.',  es: 'Un bife de chorizo con ensalada.' } },
        { en: 'rice with squid',   fr: 'le riz aux calamars',        es: 'el arroz con calamares',   esTarget: 'el arroz con calamares',  example: { fr: 'Le riz aux calamars est délicieux.', es: 'El arroz con calamares está rico.' } },
        { en: 'homemade flan',     fr: 'le flan maison',             es: 'el flan casero',           esTarget: 'el flan casero',          example: { fr: 'Le flan maison avec de la crème.', es: 'El flan casero con crema.' } },
        { en: 'fruit salad',       fr: 'la salade de fruits',        es: 'la ensalada de frutas',    esTarget: 'la ensalada de frutas',   example: { fr: 'Une salade de fruits fraîche.',    es: 'Una ensalada de frutas fresca.' } },
        { en: 'dulce de leche pancake', fr: 'la crêpe au dulce de leche', es: 'el panqueque con dulce de leche', esTarget: 'el panqueque con dulce de leche', example: { fr: 'Une crêpe au dulce de leche.', es: 'Un panqueque con dulce de leche.' } },
        { en: 'mineral water',     fr: "l'eau minérale",              es: 'el agua mineral',          esTarget: 'el agua mineral',         example: { fr: "Une bouteille d'eau minérale.",    es: 'Una botella de agua mineral.' } },
        { en: 'soda',              fr: 'le soda',                     es: 'la gaseosa',               esTarget: 'la gaseosa',              example: { fr: 'Un soda bien frais.',              es: 'Una gaseosa bien fría.' } },
        { en: 'red wine',          fr: 'le vin rouge',                es: 'el vino tinto',            esTarget: 'el vino tinto',           example: { fr: 'Un verre de vin rouge.',           es: 'Una copa de vino tinto.' } },
        { en: 'white wine',        fr: 'le vin blanc',                es: 'el vino blanco',           esTarget: 'el vino blanco',          example: { fr: 'Un vin blanc bien frais.',         es: 'Un vino blanco bien frío.' } },
        { en: 'a quarter (litre)', fr: 'un quart (de vin)',           es: 'un cuartito',              esTarget: 'un cuartito',             example: { fr: 'Un quart de vin de la maison.',    es: 'Un cuartito del vino de la casa.' } },
        { en: 'still (no gas)',    fr: 'plate (sans gaz)',            es: 'sin gas',                  esTarget: 'sin gas',                 example: { fr: 'Une eau plate, sans gaz.',         es: 'Un agua sin gas.' } },
        { en: 'grilled (plancha)', fr: 'grillé à la plancha',         es: 'a la plancha',             esTarget: 'a la plancha',            example: { fr: 'Le bife est grillé à la plancha.', es: 'El bife es a la plancha.' } },
        { en: 'squid',             fr: 'le calamar',                  es: 'el calamar',               esTarget: 'el calamar',              example: { fr: 'Des calamars frits.',              es: 'Calamares fritos.' } },
        { en: 'bottle',            fr: 'la bouteille',                es: 'la botella',               esTarget: 'la botella',              example: { fr: 'Une bouteille de vin.',            es: 'Una botella de vino.' } },
        { en: 'coming right up',   fr: 'ça arrive tout de suite',     es: 'enseguida sale',           esTarget: 'enseguida sale',          example: { fr: "— Ça arrive tout de suite !",      es: '— ¡Enseguida sale!' } },
        { en: 'tuna',              fr: 'le thon',                     es: 'el atún',                  esTarget: 'el atún',                 example: { fr: 'Une salade au thon.',              es: 'Una ensalada con atún.' } },
        { en: 'anchovies',         fr: 'les anchois',                 es: 'las anchoas',              esTarget: 'las anchoas',             example: { fr: "J'aime les anchois sur la pizza.", es: 'Me gustan las anchoas en la pizza.' } },
        { en: 'ham (raw/cooked)',  fr: 'le jambon (cru/cuit)',        es: 'el jamón (crudo/cocido)',  esTarget: 'el jamón (crudo/cocido)', example: { fr: 'Du jambon cru et du fromage.',     es: 'Jamón crudo y queso.' } },
        { en: 'longaniza sausage', fr: 'la saucisse longaniza',       es: 'la longaniza',             esTarget: 'la longaniza',            example: { fr: 'Une pizza à la longaniza.',        es: 'Una pizza con longaniza.' } },
        { en: 'bacon',             fr: 'le lard / le bacon',          es: 'la panceta',               esTarget: 'la panceta',              example: { fr: 'Des œufs avec du bacon.',          es: 'Huevos con panceta.' } },
        { en: 'pumpkin',           fr: 'la courge / le potiron',      es: 'la calabaza',              esTarget: 'la calabaza',             example: { fr: 'Une soupe à la courge.',           es: 'Una sopa de calabaza.' } },
        { en: 'bell pepper',       fr: 'le poivron',                  es: 'el morrón',                esTarget: 'el morrón',               example: { fr: 'Une pizza au poivron.',            es: 'Una pizza con morrón.' } },
        { en: 'arugula',           fr: 'la roquette',                 es: 'la rúcula',                esTarget: 'la rúcula',               example: { fr: 'Une pizza avec de la roquette.',   es: 'Una pizza con rúcula.' } },
        { en: 'onion',             fr: "l'oignon",                     es: 'la cebolla',               esTarget: 'la cebolla',              example: { fr: 'Une salade à la tomate et à l\'oignon.', es: 'Una ensalada de tomate y cebolla.' } },
        { en: 'mozzarella',        fr: 'la mozzarella',               es: 'la mozzarella',            esTarget: 'la mozzarella',           example: { fr: 'Une pizza à la mozzarella.',       es: 'Una pizza de mozzarella.' } },
        { en: 'oregano',           fr: "l'origan",                     es: 'el orégano',               esTarget: 'el orégano',              example: { fr: "De l'origan sur la pizza.",        es: 'Orégano en la pizza.' } },
        { en: 'basil',             fr: 'le basilic',                  es: 'la albahaca',              esTarget: 'la albahaca',             example: { fr: 'Du basilic frais.',                es: 'Albahaca fresca.' } },
        { en: 'hot sauce',         fr: 'la sauce piquante',           es: 'la salsa picante',         esTarget: 'la salsa picante',        example: { fr: 'Un peu de sauce piquante.',        es: 'Un poco de salsa picante.' } },
        { en: 'garlic',            fr: "l'ail",                        es: 'el ajo',                   esTarget: 'el ajo',                  example: { fr: "Une gousse d'ail.",                es: 'Un diente de ajo.' } },
        { en: 'parsley',           fr: 'le persil',                   es: 'el perejil',               esTarget: 'el perejil',              example: { fr: 'Une pincée de persil.',            es: 'Una pizca de perejil.' } },
        { en: 'palm hearts',       fr: 'les cœurs de palmier',        es: 'los palmitos',             esTarget: 'los palmitos',            example: { fr: 'Une salade aux cœurs de palmier.', es: 'Una ensalada con palmitos.' } },
        { en: 'olive',             fr: "l'olive",                      es: 'la aceituna',              esTarget: 'la aceituna',             example: { fr: 'Des olives noires.',               es: 'Aceitunas negras.' } },
        { en: 'ingredient',        fr: "l'ingrédient",                 es: 'el ingrediente',           esTarget: 'el ingrediente',          example: { fr: 'Quel est cet ingrédient ?',        es: '¿Cuál es este ingrediente?' } },
        { en: 'hake fillet',       fr: 'le filet de merlu',           es: 'el filet de merluza',      esTarget: 'el filet de merluza',     example: { fr: 'Un filet de merlu avec purée.',    es: 'Un filet de merluza con puré.' } },
        { en: 'steak',             fr: 'le steak',                    es: 'el bife',                  esTarget: 'el bife',                 example: { fr: 'Un steak avec de la salade.',      es: 'Un bife con ensalada.' } },
        { en: 'ravioli',           fr: 'les raviolis',                es: 'los ravioles',             esTarget: 'los ravioles',            example: { fr: 'Des raviolis à la courge.',        es: 'Ravioles de calabaza.' } },
        { en: 'empanada',          fr: "l'empanada",                   es: 'la empanada',              esTarget: 'la empanada',             example: { fr: 'Une empanada à la viande.',        es: 'Una empanada de carne.' } },
        { en: 'cheese', fr: 'le fromage', es: 'el queso', esTarget: 'el queso', example: { fr: 'Une pizza au fromage.', es: 'Una pizza de queso.' } },
        { en: 'egg', fr: "l'œuf", es: 'el huevo', esTarget: 'el huevo', example: { fr: 'Un œuf dur.', es: 'Un huevo duro.' } },
        { en: 'relative',              fr: 'le parent (famille élargie)', es: 'el pariente',      esTarget: 'el pariente',     example: { fr: "C'est un parent à moi.",       es: 'Es un pariente mío.' } },
      ],
    },
  ];

  window.VOCAB_REFS = REFS;

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
          ${!q ? `<div class="vc-refs-hd">${isFrEs ? '📚 Références' : '📚 Referencias'}</div>${REFS.map(r => _refSectionHtml(r, mode)).join('')}` : ''}
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
        if (window.VocabPractice) VocabPractice.startWithPicker(_el, mode);
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

    // Reference section play + practice buttons
    _el.querySelectorAll('.vc-ref-play, .vc-ref-practice').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const m   = Storage.getProfile().mode || 'fr-es';
        const ref = REFS.find(r => r.id === btn.dataset.ref);
        if (ref && window.VocabPractice) {
          VocabPractice.start(_el, { id: ref.id, words: ref.words, icon: ref.icon, name: m === 'fr-es' ? ref.name : ref.nameEs }, m);
        }
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

    const syns = w.synonymes || {};
    const synsTgt = isFrEs ? (syns.es || []) : (syns.fr || []);
    const synsSrc = isFrEs ? (syns.fr || []) : (syns.es || []);
    const tgtFlag = isFrEs ? '🇦🇷' : '🇫🇷';
    const srcFlag = isFrEs ? '🇫🇷' : '🇦🇷';
    const synBlock = (synsTgt.length || synsSrc.length) ? `
      <div class="vc-wsyns">
        ${synsTgt.length ? '<span class="vc-wsyn-lbl">' + tgtFlag + ' ≈</span> <span class="vc-wsyn-words">' + synsTgt.join(' · ') + '</span>' : ''}
        ${synsSrc.length ? '<span class="vc-wsyn-lbl vc-wsyn-lbl--src">' + srcFlag + ' ≈</span> <span class="vc-wsyn-words vc-wsyn-words--src">' + synsSrc.join(' · ') + '</span>' : ''}
      </div>` : '';

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
          ${hasTTS ? '<button class="vc-tts-btn" data-tts="' + esc(tgt) + '" data-lang="' + tgtLang + '" title="' + listenLbl + '">🔊 ' + esc(tgt) + '</button>' : ''}
          <div class="vc-wex-s">${esc(exSrc)}</div>
          <div class="vc-wex-t">${esc(exTgt)}</div>
          ${synBlock}
        </div>
      </details>`;
  }

  // ── Reference section (conjunctions / verbs) ─────────────────────────
  function _refSectionHtml(ref, mode) {
    const isFrEs = mode === 'fr-es';
    const isOpen = _openUnits.has(ref.id);
    const name   = isFrEs ? ref.name : ref.nameEs;
    const colA   = isFrEs ? '🇫🇷 Français' : '🇦🇷 Español';
    const colB   = isFrEs ? '🇦🇷 Español'  : '🇫🇷 Français';
    return `
      <div class="vc-unit vc-ref${isOpen ? ' vc-unit--open' : ''}" data-id="${ref.id}">
        <div class="vc-unit-hd">
          <button class="vc-toggle-btn" data-unit="${ref.id}">
            <span class="vc-ico">${ref.icon}</span>
            <div class="vc-meta">
              <div class="vc-name-row"><span class="vc-uname">${esc(name)}</span></div>
            </div>
            <span class="vc-cnt">${ref.words.length}<span class="vc-ctot"> ${isFrEs ? 'mots' : 'palabras'}</span></span>
            <span class="vc-arrow">${isOpen ? '▲' : '▼'}</span>
          </button>
          <button class="vc-ref-play" data-ref="${ref.id}" title="${isFrEs ? 'Pratiquer' : 'Practicar'}">▶</button>
        </div>
        <div class="vc-body"${isOpen ? '' : ' hidden'}>
          <div class="vc-practice-cta">
            <button class="vc-ref-practice" data-ref="${ref.id}">
              🃏 ${isFrEs ? 'Pratiquer' : 'Practicar'}
            </button>
          </div>
          <div class="vc-col-hd">
            <span>${colA}</span>
            <span>${colB}</span>
          </div>
          ${ref.words.map(w => _wordHtml({ ...w, isSeen: false, isMastered: false }, mode)).join('')}
        </div>
      </div>`;
  }

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return { render };
})();

window.Vocab = Vocab;
