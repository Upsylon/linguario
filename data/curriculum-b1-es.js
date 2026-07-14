/* ===== curriculum-b1-es.js — Surcharges pour le mode es-fr ===== */
/* Remplace dialogueNote, grammarNote, question et options pour les apprenants hispanophones */
/* Chaque entrée est indexée par l'id de l'unité de curriculum-b1.js */
/* IMPORTANT : options[answer] doit correspondre à l'index g.answer du curriculum principal */

const CURRICULUM_B1_ES = {

  u01: {
    dialogueNote:'En francés hay dos palabras para "hola": "bonjour" (de día) y "bonsoir" (de noche). "S\'il vous plaît" (formal) / "s\'il te plaît" (informal) = por favor. "Enchanté" se dice al presentarse, equivale a "mucho gusto". Una diferencia importante: los franceses suelen darse la mano o hacer "la bise" (beso en la mejilla) al saludarse.',
    grammarNote:'En francés no existe el voseo. Solo hay "tu" (informal) y "vous" (formal o plural). La segunda persona del presente: tu parles, tu veux, tu es. La "s" final nunca se pronuncia. Para preguntas formales: "comment allez-vous ?" Para informales: "comment vas-tu ?" o simplemente "ça va ?".',
    question:'¿Cómo se dice "¿Cómo estás?" en francés informal?',
    options:['Comment vous allez ?', 'Comment vas-tu ?', 'Comment tu aller ?'],
    answer:1,
  },

  u02: {
    dialogueNote:'Los números en francés tienen particularidades únicas. Del 70 al 99 son compuestos: 70 = soixante-dix (60+10), 80 = quatre-vingts (4×20), 90 = quatre-vingt-dix (4×20+10). Este sistema vigesimal viene de los galos, no de los romanos. En Bélgica y Suiza se usan "septante" y "nonante" en lugar de soixante-dix y quatre-vingt-dix.',
    grammarNote:'En francés "un" y "une" concuerdan con el género del sustantivo: un livre (m), une table (f). El artículo indefinido plural es "des" (unos/unas): des livres, des tables. Para las fechas: "le premier" (1°) es irregular, del 2 en adelante se usan cardinales: le deux, le trois. "Zéro" se usa en teléfonos y scores.',
    question:'¿Cómo se escribe 80 en francés?',
    options:['huitante', 'octante', 'quatre-vingts'],
    answer:2,
  },

  u03: {
    dialogueNote:'En francés los días y los meses se escriben con minúscula, a diferencia del español en Argentina que también los escribe en minúscula. Para decir "el lunes" (específico) se usa "le lundi". Para "los lunes" (habitual) también se usa "le lundi" — el artículo no cambia. La semana oficial empieza en lunes en Francia.',
    grammarNote:'Los meses en francés son masculinos: en janvier, en février. Para las fechas: le 14 juillet (sin artículo repetido). Los días no llevan preposición: "lundi je travaille" (el lunes trabajo). Para expresar "en + mes": en janvier, en mars. Para expresar "en + año": en 2024. Para estaciones: au printemps, en été, en automne, en hiver.',
    question:'¿Cómo se dice "el lunes trabajo" en francés?',
    options:['En lundi je travaille', 'Le lundi je travaille', 'Du lundi je travaille'],
    answer:1,
  },

  u04: {
    dialogueNote:'En francés los adjetivos posesivos concuerdan con el género del objeto poseído, no del poseedor. "Su madre" (de él o de ella) siempre es "sa mère" porque "mère" es femenino. Esto puede ser confuso para hispanohablantes. Además, delante de vocal, ma/ta/sa se convierten en mon/ton/son: mon amie (mi amiga, aunque sea femenino).',
    grammarNote:'Los posesivos franceses: mon/ma/mes (mi/mis), ton/ta/tes (tu/tus), son/sa/ses (su/sus), notre/nos (nuestro/nuestros), votre/vos (vuestro), leur/leurs (su de ellos). Delante de vocal o h muda: ma/ta/sa → mon/ton/son aunque el sustantivo sea femenino: mon école (mi escuela, femenino).',
    question:'¿Cómo se dice "mi madre" en francés?',
    options:['mia mère', 'mon mère', 'ma mère'],
    answer:2,
  },

  u05: {
    dialogueNote:'En francés "il y a" (equivalente a "hay") es completamente invariable: il y a un livre / il y a des livres. La negación: il n\'y a pas de… (no hay…). Una diferencia clave: "il y a" para existencia, "c\'est" para identidad, "il est" para descripción. En Argentina decimos "hay" para todo, pero el francés distingue estos casos.',
    grammarNote:'"Il y a" expresa existencia; "c\'est" expresa identidad; "il est/elle est" describe. En preguntas: "est-ce qu\'il y a…?" (¿hay…?). En negación: "il n\'y a pas de pain" (no hay pan) — el artículo desaparece después de "pas de". Comparar: il y a du pain (hay pan) → il n\'y a pas de pain (no hay pan).',
    question:'¿Cómo se dice "hay tres habitaciones"?',
    options:['C\'est trois chambres', 'Il est trois chambres', 'Il y a trois chambres'],
    answer:2,
  },

  u06: {
    dialogueNote:'La gastronomía francesa es Patrimonio de la Humanidad (UNESCO). El francés usa artículos partitivos para cantidades indefinidas: du pain (algo de pan), de la viande, de l\'eau. En los mercados franceses se dice "je voudrais du fromage" (quisiera queso). Las comidas son: petit-déjeuner (desayuno), déjeuner (almuerzo), dîner (cena).',
    grammarNote:'Los artículos partitivos franceses: du (masc.), de la (fem.), de l\' (vocal/h muda). En negación siempre "de/d\'": je mange du fromage → je ne mange pas de fromage. Este artículo no existe en español — es uno de los aspectos más difíciles. Contraste: "le pain" (el pan en general) vs "du pain" (algo de pan, cantidad indefinida).',
    question:'¿Cómo se dice "como carne" en francés?',
    options:['Je mange de la carne', 'Je mange de la viande', 'Je mange la viande'],
    answer:1,
  },

  u07: {
    dialogueNote:'En francés los adjetivos van generalmente DESPUÉS del sustantivo: une robe rouge, un livre intéressant. Pero algunos adjetivos comunes van ANTES: grand, petit, beau, bon, mauvais, vieux, jeune, nouveau. La regla mnemotécnica BAGS: Beauty (beau/joli), Age (vieux/jeune/nouveau), Goodness (bon/mauvais), Size (grand/petit).',
    grammarNote:'Los adjetivos de color concuerdan en género y número: rouge/rouge/rouges, blanc/blanche/blancs/blanches, noir/noire/noirs/noires. Invariables cuando son sustantivos usados como adjetivos: orange, marron, beige. Irregulares notables: beau → belle (fem.) → bel (delante de vocal masc.): un beau garçon / un bel homme.',
    question:'¿Cómo se dice "una mesa blanca" en francés?',
    options:['une table blanc', 'une table blanche', 'une table blanches'],
    answer:1,
  },

  u08: {
    dialogueNote:'En francés para expresar dolor se usa "avoir mal à" + artículo + parte del cuerpo. J\'ai mal à la tête, j\'ai mal au dos (au = à + le), j\'ai mal aux pieds (aux = à + les). Nunca se usa el posesivo: "j\'ai mal à ma tête" es incorrecto. A diferencia de "me duele la cabeza", en francés el sujeto es "yo" (j\'ai) y se usa "avoir".',
    grammarNote:'"Avoir mal à" + article contracté: à la tête, au ventre (à + le = au), aux pieds (à + les = aux). Para síntomas sin dolor: "avoir de la fièvre" (tener fiebre), "avoir de la toux/la toux" o directamente "tousser" (toser). Para describir un estado: "je suis malade, fatigué, enrhumé". "Éternuer" = estornudar, "avoir des vertiges" = tener mareos.',
    question:'¿Cómo se dice "tengo dolor de cabeza" en francés?',
    options:['J\'ai mal à ma tête', 'J\'ai mal à la tête', 'J\'ai le mal de tête'],
    answer:1,
  },

  u09: {
    dialogueNote:'Los verbos más importantes en francés tienen conjugaciones irregulares esenciales. "Être" (ser/estar) y "avoir" (tener/haber) son la base de todos los tiempos compuestos. En francés no hay distinción entre ser y estar — ambos son "être". "Faire" cubre más significados que "hacer": faire du sport, faire la cuisine, il fait chaud.',
    grammarNote:'En francés no hay distinción ser/estar — ambos se traducen con "être": je suis français (soy), je suis fatigué (estoy). Para obligación: "devoir + infinitif": je dois partir (tengo que irme). "Il faut + infinitif" = hay que + infinitivo. "Pouvoir" = poder: je peux, tu peux, il peut. "Vouloir" = querer: je veux, tu veux.',
    question:'¿Cómo se dice "tú puedes venir" en francés (informal)?',
    options:['Tu peux pas venir', 'Tu peux venir', 'Vous pouvez venir'],
    answer:1,
  },

  u10: {
    dialogueNote:'Para pedir direcciones en francés: "Excusez-moi, où est la banque ?" o "Pour aller à la banque, s\'il vous plaît ?". Las preposiciones de lugar: en face de (enfrente de), à côté de (al lado de), près de (cerca de), loin de (lejos de). En las ciudades francesas, el "centre-ville" (centro) suele estar bien señalizado.',
    grammarNote:'Las contracciones obligatorias: à + le = au (je vais au parc), à + les = aux (je vais aux États-Unis), de + le = du (en face du parc), de + les = des (près des arbres). Con "la" y "l\'" no hay contracción: je vais à la banque, près de l\'école. Error frecuente: *"à le" o *"de le" — siempre deben contraerse.',
    question:'¿Cuál es la contracción de "à + le" en francés?',
    options:['al', 'au', 'du'],
    answer:1,
  },

  u11: {
    dialogueNote:'En Francia "prendre" es el verbo para tomar el transporte: je prends le bus, le métro, le train. Para decir el medio de transporte: "en" + vehículo (sin artículo): en voiture, en avion, en train. "À pied" (a pie), "à vélo" (en bici). Importante para argentinos: "coger" en Francia puede significar tomar el transporte, pero también tiene significado vulgar — ¡mejor usar "prendre"!',
    grammarNote:'Transportes: "prendre" + artículo definido: je prends le bus, l\'avion. "Aller en/à": je vais en voiture, à pied, à vélo. Para comprar pasajes: "un aller simple" (ida), "un aller-retour" (ida y vuelta). "Valider" = validar el boleto. En el metro parisino se dice "valider son titre de transport".',
    question:'¿Cómo se dice "tomo el metro" en francés?',
    options:['Je vais dans le métro', 'Je prends le métro', 'Je fais le métro'],
    answer:1,
  },

  u12: {
    dialogueNote:'En las tiendas francesas se usa "vous" por defecto. Los vendedores dicen "Je vous aide ?" (¿le ayudo?) o "Bonjour, vous cherchez quelque chose ?" Para pagar: "Je paye par carte" (tarjeta), "Je paye en espèces" (efectivo). "Les soldes" (las rebajas) ocurren en enero y julio — son períodos muy esperados. "Les fripes" = ropa de segunda mano, muy de moda.',
    grammarNote:'Los pronombres de objeto directo: le (lo, masc.), la (la, fem.), les (los/las). Posición: antes del verbo conjugado: "Je le prends" (me lo llevo). Delante de vocal: l\' (= le o la): je l\'achète. Con infinitivo: "je veux l\'essayer" (quiero probármelo). En imperativo afirmativo, van después con guión: "Prends-le !".',
    question:'¿Cómo se dice "lo compro" (objeto masc. que empieza por vocal)?',
    options:['Je la achète', 'Je le achète', 'Je l\'achète'],
    answer:2,
  },

  u13: {
    dialogueNote:'En Francia las entrevistas de trabajo son formales — "vous" obligatoriamente. El CV francés puede incluir foto y estado civil (aunque está cambiando). "Stage" = pasantía o práctica. "CDI" (contrat à durée indéterminée) = contrato indefinido; "CDD" = temporal. "La fac" = la universidad (familiar). Los sindicatos ("syndicats") tienen mucha presencia en la cultura laboral francesa.',
    grammarNote:'El gérondif en francés: "en + participe présent" (-ant): en travaillant (trabajando). Para "estar + gerundio": "être en train de + infinitif": je suis en train de travailler (estoy trabajando ahora mismo). El presente simple también puede indicar acción en curso: "je travaille" puede ser "trabajo" (hábito) o "estoy trabajando" (ahora) según contexto.',
    question:'¿Cómo se expresa mejor "ella está comiendo" (en este momento) en francés?',
    options:['Elle mange', 'Elle est en train de manger', 'Les deux sont correctes'],
    answer:2,
  },

  u14: {
    dialogueNote:'En Francia para ver al médico se pide "un rendez-vous" (cita). El médecin généraliste es el médico de familia. Urgencias: "les urgences" o llamar al SAMU (número 15). "Ordonnance" = receta médica. Los medicamentos bajo prescripción no se venden sin receta. La Sécurité Sociale cubre gran parte de los gastos médicos.',
    grammarNote:'Para los síntomas: "avoir mal à" + parte del cuerpo para dolores. Para síntomas: "avoir de la fièvre/toux/nausée". Para estados: "être + adjectif": je suis malade, enrhumé, épuisé. "Tousser" (toser), "éternuer" (estornudar) son verbos. "Avoir des vertiges" = tener mareos. "Se sentir mal/bien" = sentirse mal/bien (verbo pronominal).',
    question:'¿Cómo se dice "tengo tos" en francés?',
    options:['J\'ai la toux', 'Je tousse', 'Les deux sont correctes'],
    answer:2,
  },

  u15: {
    dialogueNote:'En francés las emociones se expresan principalmente con "être": je suis triste, content, surpris. No hay distinción ser/estar — el contexto indica si es temporal o permanente. "Avoir" se usa para algunas emociones que en español usamos "tener": avoir peur (tener miedo), avoir honte (tener vergüenza), avoir envie (tener ganas). Los franceses son conocidos por expresar sus emociones de forma directa.',
    grammarNote:'En francés: "avoir" para avoir peur (miedo), avoir honte (vergüenza), avoir envie (ganas), avoir confiance (confianza). "Être" para: être content/triste/en colère/amoureux. Para "aburrirse": "s\'ennuyer" es un verbo pronominal: je m\'ennuie. Para "irritarse": "s\'énerver": je m\'énerve. La forma no pronominal describe a la cosa: c\'est ennuyeux (es aburrido).',
    question:'"Me aburro" (acción, no descripción de carácter) en francés se dice…',
    options:['Je suis ennuyeux', 'Je m\'ennuie', 'Je suis ennuyé'],
    answer:1,
  },

  u16: {
    dialogueNote:'En Francia la météo (meteorología) es el tema de conversación favorito. El clima varía mucho: el norte lluvioso y gris, el sur soleado, la montaña con nieve. "Il fait beau/mauvais" (hace buen/mal tiempo). "Quel temps fait-il ?" = ¿qué tiempo hace? Las cuatro estaciones: printemps (primavera), été (verano), automne (otoño), hiver (invierno).',
    grammarNote:'El futur proche: aller + infinitif. Il va pleuvoir (va a llover). "Pleuvoir" es impersonal — siempre sujeto "il": il pleut, il a plu, il va pleuvoir. Para describir el tiempo: "il fait" + adjectif: il fait chaud/froid/beau. "Il y a" + sustantivo: il y a du vent/du brouillard/des nuages. "Il neige" = nieva (impersonal).',
    question:'¿Cómo se dice "va a llover" en francés?',
    options:['Il va pleuvoir', 'Il ira pleuvoir', 'Il fait pleuvoir'],
    answer:0,
  },

  u17: {
    dialogueNote:'En Francia el fútbol se llama "le foot". Los grandes clubs: PSG (Paris), OM (Marseille), OL (Lyon). El rugby es muy popular en el suroeste (Toulouse, Bordeaux). "Supporter" (anglicismo) = hincha. El Tour de France (ciclismo) es el evento deportivo más transmitido en el mundo. "Faire du sport" = hacer deporte (en general), "jouer au foot/tennis" = jugar al fútbol/tenis.',
    grammarNote:'El passé composé: auxiliar (avoir/être) + participe passé. La mayoría usa "avoir": j\'ai joué, j\'ai couru, j\'ai gagné. Los verbos de movimiento y cambio de estado usan "être": je suis allé(e), je suis arrivé(e), je suis tombé(e). Con "être", el participio concuerda con el sujeto: elle est venue, ils sont partis.',
    question:'¿Cómo se dice "jugué al fútbol" en francés?',
    options:['J\'allais jouer au foot', 'J\'ai joué au foot', 'Je jouais au foot'],
    answer:1,
  },

  u18: {
    dialogueNote:'Para viajar desde Argentina a Francia no se necesita visado (turismo, 90 días Schengen). El aeropuerto principal de París es Charles de Gaulle (CDG). El TGV (tren de alta velocidad) conecta las ciudades a hasta 320 km/h. "Gare" = estación de tren. "Gare du Nord" en París es la estación más concurrida de Europa. "Billet" = pasaje/boleto.',
    grammarNote:'El subjonctif aparece después de: querer (vouloir que), necesitar (falloir que), dudar (douter que), emociones (être content que). Formación regular: radical de ils/elles + -e, -es, -e, -ions, -iez, -ent. Irregulares clave: être → soit, avoir → ait, aller → aille, faire → fasse, pouvoir → puisse. Muy común en el habla cotidiana.',
    question:'Después de "je veux que", ¿qué modo verbal se usa en francés?',
    options:['l\'indicatif', 'le subjonctif', 'l\'infinitif'],
    answer:1,
  },

  u19: {
    dialogueNote:'Francia es una república presidencial. La política se divide entre gauche (izquierda) y droite (derecha). El presidente es elegido por 5 años. El 14 de julio es la Fête Nationale (toma de la Bastilla, 1789). "Liberté, Égalité, Fraternité" es el lema republicano. "Les impôts" (los impuestos) son un tema muy presente — Francia tiene una de las tasas impositivas más altas del mundo.',
    grammarNote:'L\'imparfait para pasado habitual o descriptivo: radical + -ais, -ais, -ait, -ions, -iez, -aient. Único irregular en la raíz: "être" → ét-: j\'étais, tu étais, il était. Contraste clave: passé composé = acción puntual terminada ("j\'ai mangé"); imparfait = descripción, hábito o fondo ("je mangeais" = comía/solía comer).',
    question:'¿Cuál es la forma correcta de "parler" en imparfait (je)?',
    options:['je parlai', 'je parlais', 'je parlerai'],
    answer:1,
  },

  u20: {
    dialogueNote:'El lunfardo tiene palabras de origen italiano y francés. "Laburo" viene del italiano "lavoro". El "vesre" es el lunfardo al revés (como el verlan francés): "telo" = hotel, "gotán" = tango, "jermu" = mujer. El francés también tiene el "verlan": "l\'envers" → verlan, "cimer" = merci, "ouf" = fou (loco), "relou" = lourd (pesado). ¡Dos culturas conectadas por el ingenio lingüístico!',
    grammarNote:'Los conectores del discurso B1 son esenciales para el DELF B1: "cependant/pourtant/néanmoins" (sin embargo), "donc/par conséquent/ainsi" (por lo tanto), "bien que + subjonctif" (aunque), "malgré + nom" (a pesar de), "c\'est-à-dire" (es decir), "en effet" (en efecto), "d\'ailleurs" (además/por otro lado). Usarlos correctamente marca la diferencia entre A2 y B1.',
    question:'¿Qué significa "cependant" en español?',
    options:['por lo tanto', 'sin embargo', 'es decir'],
    answer:1,
  },

};

window.CURRICULUM_B1_ES = CURRICULUM_B1_ES;
