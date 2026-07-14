/* ===== curriculum-b1-es.js — Surcharges pour le mode es-fr ===== */
/* Remplace dialogueNote, grammarNote, question et options pour les apprenants hispanophones */
/* Chaque entrée correspond à une unité de curriculum-b1.js par son id */
/* IMPORTANT : options[answer] doit correspondre à l'index g.answer du curriculum principal */

const CURRICULUM_B1_ES = [

  {
    id:'u01',
    dialogueNote:'En francés hay dos palabras para "hola": "bonjour" (de día) y "bonsoir" (de noche). "S\'il vous plaît" (formal) / "s\'il te plaît" (informal) = por favor. "Enchanté" se dice al presentarse, equivale a "mucho gusto".',
    grammarNote:'En francés no existe el voseo. Solo hay "tu" (informal) y "vous" (formal o plural). La segunda persona del presente: tu parles, tu veux, tu es. La "s" final nunca se pronuncia. Para preguntas formales: "comment allez-vous ?" Para informales: "comment vas-tu ?" o simplemente "ça va ?".',
    question:'¿Cómo se dice "¿Cómo estás?" en francés informal?',
    options:['Comment vous allez ?','Comment vas-tu ?','Comment tu aller ?'],
    answer:1,
  },

  {
    id:'u02',
    dialogueNote:'Los números en francés tienen particularidades. Del 70 al 99 son compuestos: 70 = soixante-dix (60+10), 80 = quatre-vingts (4×20), 90 = quatre-vingt-dix (4×20+10). Esto sorprende a los hispanohablantes pero viene de un sistema vigesimal (base 20) de los galos.',
    grammarNote:'En francés "un" y "une" se acuerdan con el género del sustantivo: un livre (m), une table (f). El artículo indefinido plural es "des" (unos/unas): des livres, des tables. No hay forma "uno" separada del artículo — solo "un" masculino y "une" femenino.',
    question:'¿Cómo se escribe 80 en francés?',
    options:['huitante','octante','quatre-vingts'],
    answer:2,
  },

  {
    id:'u03',
    dialogueNote:'En francés los días y los meses se escriben con minúscula. Para decir "el lunes" (específico) se usa "le lundi". Para "los lunes" (habitual) también se usa "le lundi" — el artículo no cambia, el contexto indica si es puntual o habitual.',
    grammarNote:'Los meses en francés son masculinos: en janvier, en février. Para las fechas: le 14 juillet (sin repetir el artículo). Los días no llevan preposición: "lundi je travaille" (el lunes trabajo). La semana empieza en lunes en el calendario francés.',
    question:'¿Cómo se dice "el lunes trabajo" en francés?',
    options:['En lundi je travaille','Le lundi je travaille','Du lundi je travaille'],
    answer:1,
  },

  {
    id:'u04',
    dialogueNote:'En francés los adjetivos posesivos concuerdan con el género del objeto poseído, no con el del poseedor. "Su madre" (de él o de ella) siempre es "sa mère" porque "mère" es femenino. Delante de vocal, ma/ta/sa se convierten en mon/ton/son: mon amie (mi amiga).',
    grammarNote:'Los posesivos franceses: mon/ma/mes, ton/ta/tes, son/sa/ses. Delante de vocal o h muda, ma/ta/sa se convierten en mon/ton/son aunque el sustantivo sea femenino: mon amie (mi amiga). Esto es para evitar el hiato de pronunciación.',
    question:'¿Cómo se dice "mi madre" en francés?',
    options:['mia mère','mon mère','ma mère'],
    answer:2,
  },

  {
    id:'u05',
    dialogueNote:'En francés "il y a" (equivalente a "hay") es invariable: il y a un livre / il y a des livres. La negación: il n\'y a pas de… (no hay…). No confundir con "c\'est" (es) o "il est/elle est" (está). "Il y a une table" = hay una mesa. "C\'est une table" = es una mesa.',
    grammarNote:'"Il y a" expresa existencia; "c\'est" expresa identidad; "il est/elle est" describe. En preguntas: "est-ce qu\'il y a…?" (¿hay…?). En negación: "il n\'y a pas de pain" (no hay pan) — el artículo desaparece después de "pas de".',
    question:'¿Cómo se dice "hay tres habitaciones"?',
    options:['C\'est trois chambres','Il est trois chambres','Il y a trois chambres'],
    answer:2,
  },

  {
    id:'u06',
    dialogueNote:'El francés usa artículos partitivos para cantidades indefinidas: du (de + le), de la, de l\'. "Je mange du pain" (como pan), "je bois de l\'eau" (bebo agua). En negación se usa "de/d\'" sin artículo: "je ne mange pas de pain" (no como pan).',
    grammarNote:'Los artículos partitivos franceses: du (masculino), de la (femenino), de l\' (vocal/h muda). En negación siempre "de/d\'": je mange du fromage → je ne mange pas de fromage. El artículo partitivo no tiene equivalente directo en español — es uno de los aspectos más difíciles para hispanohablantes.',
    question:'¿Cómo se dice "como carne" en francés?',
    options:['Je mange de la carne','Je mange de la viande','Je mange la viande'],
    answer:1,
  },

  {
    id:'u07',
    dialogueNote:'En francés los adjetivos van generalmente DESPUÉS del sustantivo: une robe rouge, un livre intéressant. Pero algunos adjetivos comunes van ANTES: grand, petit, beau, bon, mauvais, vieux, jeune, nouveau. Regla mnemotécnica BAGS: Beauty, Age, Goodness, Size → van antes.',
    grammarNote:'Los adjetivos de color concuerdan en género y número: rouge/rouge/rouges, blanc/blanche/blancs/blanches. Invariables: orange, marron, beige (son sustantivos usados como adjetivos). Irregulares: beau → bel (delante de vocal), vieux → vieil, nouveau → nouvel.',
    question:'¿Cómo se dice "una mesa blanca" en francés?',
    options:['une table blanc','une table blanche','une table blanches'],
    answer:1,
  },

  {
    id:'u08',
    dialogueNote:'En francés para expresar dolor: "avoir mal à" + artículo + parte del cuerpo. J\'ai mal à la tête, j\'ai mal au dos (au = à + le), j\'ai mal aux pieds (aux = à + les). A diferencia de "me duele", en francés el sujeto es "yo" y se usa el verbo "avoir" (tener).',
    grammarNote:'"Avoir mal à" + article contracté: mal à la tête, mal au ventre (à + le = au), mal aux pieds (à + les = aux). Nunca se usa el posesivo: "j\'ai mal à ma tête" es incorrecto. También: "j\'ai de la fièvre" (tengo fiebre), "je tousse" (tengo tos — verbo, no sustantivo).',
    question:'¿Cómo se dice "tengo dolor de cabeza" en francés?',
    options:['J\'ai mal à ma tête','J\'ai mal à la tête','J\'ai le mal de tête'],
    answer:1,
  },

  {
    id:'u09',
    dialogueNote:'Los verbos más importantes en francés tienen conjugaciones irregulares esenciales. "Être" (ser/estar) y "avoir" (tener/haber) son la base de todos los tiempos compuestos. "Aller" usa formas del latín "vadere": je vais, tu vas. "Faire" es irregular: je fais, tu fais, il fait.',
    grammarNote:'En francés no hay distinción entre ser y estar — ambos se traducen con "être": je suis français (soy francés), je suis fatigué (estoy cansado). Para obligación: "devoir + infinitif": je dois partir (tengo que irme). "Il faut + infinitif" = hay que. "Avoir à + infinitif" = tener que.',
    question:'¿Cómo se dice "tú puedes venir" en francés (informal)?',
    options:['Tu peux pas venir','Tu peux venir','Vous pouvez venir'],
    answer:1,
  },

  {
    id:'u10',
    dialogueNote:'Para pedir direcciones en francés: "Excusez-moi, où est la banque ?" o "Pour aller à la banque, s\'il vous plaît ?". Las preposiciones de lugar: en face de (enfrente de), à côté de (al lado de), près de (cerca de), loin de (lejos de), au fond de (al fondo de).',
    grammarNote:'Las contracciones obligatorias: à + le = au (je vais au parc), à + les = aux (je vais aux États-Unis), de + le = du (en face du parc), de + les = des (près des arbres). Con "la" y "l\'" no hay contracción: je vais à la banque, près de l\'école.',
    question:'¿Cuál es la contracción de "à + le" en francés?',
    options:['al','au','du'],
    answer:1,
  },

  {
    id:'u11',
    dialogueNote:'En Francia "prendre" es el verbo para tomar el transporte: je prends le bus, le métro, le train. Para decir el medio de transporte: "en" + vehicule sin artículo para medios en los que uno entra: en voiture, en avion, en train. "À" + pied/vélo: je vais à pied, à vélo.',
    grammarNote:'Para los transportes: "prendre" + artículo defini: je prends le bus, l\'avion. "Aller en/à": je vais en voiture, à pied, à vélo. Pregunta de dirección: "Pour aller à la gare ?" o "Comment on va à… ?" Importante: en Argentina "tomar" = en Francia "prendre" (nunca "coger").',
    question:'¿Cómo se dice "tomo el metro" en francés?',
    options:['Je vais dans le métro','Je prends le métro','Je fais le métro'],
    answer:1,
  },

  {
    id:'u12',
    dialogueNote:'En las tiendas francesas se usa "vous" por defecto. Para preguntar el precio: "C\'est combien ?" o "Ça coûte combien ?". Los vendedores dicen "Je vous aide ?" (¿le ayudo?). Para pagar: "Je paye par carte" (tarjeta), "Je paye en espèces" (efectivo). "Les soldes" = las rebajas (enero y julio).',
    grammarNote:'Los pronombres de objeto directo: le (lo/masculino), la (la/femenino), les (los/las). Posición: antes del verbo conjugado. "Je le prends" (me lo llevo). Delante de vocal: l\'achète (l\' = le o la). Con infinitivo: "je veux l\'essayer". En imperativo afirmativo: "Prends-le !".',
    question:'¿Cómo se dice "lo compro" (objeto masculino, empieza por vocal)?',
    options:['Je la achète','Je le achète','Je l\'achète'],
    answer:2,
  },

  {
    id:'u13',
    dialogueNote:'En Francia las entrevistas de trabajo son formales — "vous" obligatoriamente. El CV francés puede incluir foto. "Stage" = pasantía o práctica. "CDI" (contrat à durée indéterminée) = contrato indefinido; "CDD" = temporal. "La fac" = la universidad (familier). "Un poste" = un puesto de trabajo.',
    grammarNote:'El gérondif en francés: "en + participe présent" (-ant): en travaillant (trabajando). Para "estar + gerundio" en francés: "être en train de + infinitif": je suis en train de travailler (estoy trabajando). El presente simple también puede expresar acción en curso: je travaille puede ser "trabajo" o "estoy trabajando".',
    question:'¿Cómo se expresa mejor "ella está comiendo" en francés?',
    options:['Elle mange','Elle est en train de manger','Les deux sont correctes'],
    answer:2,
  },

  {
    id:'u14',
    dialogueNote:'En Francia para consultar al médico se pide "un rendez-vous" (cita). El médecin généraliste es el médico de familia. Urgencias: "les urgences" o "le SAMU" (número 15). "Ordonnance" = receta médica. Los medicamentos bajo prescripción necesitan ordonnance — no se venden libremente.',
    grammarNote:'Para los síntomas: "avoir mal à" para dolores, "avoir de la fièvre/toux/nausée" para síntomas, "être + adjectif" para estados: je suis fatigué, malade. "Tousser" (toser) es un verbo: je tousse. "Éternuer" = estornudar. "Avoir des vertiges" = tener mareos. "Se sentir mal" = sentirse mal.',
    question:'¿Cómo se dice "tengo tos" en francés?',
    options:['J\'ai la toux','Je tousse','Les deux sont correctes'],
    answer:2,
  },

  {
    id:'u15',
    dialogueNote:'En francés "être" se usa para las emociones: je suis triste, content, surpris. No hay distinción ser/estar para los adjectivos — el contexto marca si es temporal o permanente. "Se sentir" añade matiz: "je me sens bien" (me siento bien). "Avoir" para algunas emociones: avoir peur, avoir honte.',
    grammarNote:'En francés "avoir" se usa para: avoir peur (tener miedo), avoir honte (tener vergüenza), avoir envie (tener ganas). "Être" para: être content/triste/en colère. Para expresar que algo te aburre: "c\'est ennuyeux". Para decir que te aburres: "je m\'ennuie" (verbo reflexivo).',
    question:'"Me aburro" (acción, no carácter) en francés se dice…',
    options:['Je suis ennuyeux','Je m\'ennuie','Je suis ennuyé'],
    answer:1,
  },

  {
    id:'u16',
    dialogueNote:'En Francia la météo es un tema de conversación social. "Il fait beau/mauvais" (hace buen/mal tiempo), "il fait chaud/froid" (hace calor/frío). "Le temps" en francés significa tanto "el tiempo meteorológico" como "el tiempo (duración)". Expresión útil: "quel temps fait-il ?" (¿qué tiempo hace?).',
    grammarNote:'El futur proche: aller + infinitif. Il va pleuvoir (va a llover). "Pleuvoir" es impersonal — siempre con "il": il pleut, il a plu, il va pleuvoir. Para probabilidad: "il devrait faire beau" (debería hacer buen tiempo), "il risque de pleuvoir" (puede que llueva). "Geler" = helar: il gèle.',
    question:'¿Cómo se dice "va a llover" en francés?',
    options:['Il va pleuvoir','Il ira pleuvoir','Il fait pleuvoir'],
    answer:0,
  },

  {
    id:'u17',
    dialogueNote:'En Francia el fútbol se llama "le foot". Los grandes clubs: PSG (Paris), OM (Marseille), OL (Lyon). El rugby es muy popular en el suroeste. "Supporter" (anglicismo) = hincha. "Match" = partido. "Terrain" = cancha. El Tour de France (ciclismo) es el evento deportivo más visto en Francia.',
    grammarNote:'El passé composé francés: auxiliar (avoir o être) + participe passé. La mayoría usa "avoir": j\'ai mangé, j\'ai joué. Los verbos de movimiento y reflexivos usan "être": je suis allé(e), je suis venu(e). Con "être" el participio concuerda con el sujeto: elle est allée (fue/ha ido).',
    question:'¿Cómo se dice "jugué al fútbol" en francés?',
    options:['J\'allais jouer au foot','J\'ai joué au foot','Je jouais au foot'],
    answer:1,
  },

  {
    id:'u18',
    dialogueNote:'Para viajar desde Argentina a Francia no se necesita visado (turismo, 90 días Schengen). El aeropuerto principal de París es Charles de Gaulle (CDG). El TGV conecta las ciudades. "Gare" = estación de tren. "Gare du Nord" es la estación más concurrida de Europa. "Billet" = pasaje/boleto.',
    grammarNote:'El subjonctif francés aparece después de: querer, necesitar, dudar, emociones. Formación: radical de ils/elles + -e, -es, -e, -ions, -iez, -ent. Irregulares clave: être → soit, avoir → ait, aller → aille, faire → fasse. Expresiones frecuentes: il faut que, je veux que, je doute que.',
    question:'Después de "je veux que", ¿qué modo se usa en francés?',
    options:['l\'indicatif','le subjonctif','l\'infinitif'],
    answer:1,
  },

  {
    id:'u19',
    dialogueNote:'Francia es una república. La política se divide entre gauche (izquierda) y droite (derecha). El presidente es elegido por 5 años. El 14 de julio es la fiesta nacional (Fête Nationale). "Liberté, Égalité, Fraternité" es el lema de la República. "Les impôts" = los impuestos, tema muy presente en la vida cotidiana francesa.',
    grammarNote:'L\'imparfait para el pasado habitual o descriptivo: -ais, -ais, -ait, -ions, -iez, -aient. Solo "être" es irregular en la raíz: ét-. "Quand j\'étais petit…" (cuando era pequeño). Contraste: passé composé = acción terminada puntual; imparfait = descripción, habitual o acción de fondo.',
    question:'¿Cuál es la terminación de "parler" en imparfait (je)?',
    options:['je parlai','je parlais','je parlerai'],
    answer:1,
  },

  {
    id:'u20',
    dialogueNote:'El lunfardo tiene muchas palabras de origen italiano y francés. "Laburo" del italiano "lavoro". "Morfar" del italiano "morfea". El "vesre" es el lunfardo al revés (como el verlan francés): "telo" = hotel, "gotán" = tango. El francés también tiene el "verlan": "l\'envers" → verlan, "les keufs" = les flics (la policía).',
    grammarNote:'Los conectores del discurso B1 son esenciales para argumentar en francés: "cependant" / "pourtant" / "néanmoins" (sin embargo), "donc" / "par conséquent" (por lo tanto), "bien que + subjonctif" (aunque), "malgré" + nom (a pesar de), "c\'est-à-dire" (es decir). En el examen DELF B1 estos conectores son indispensables.',
    question:'¿Qué significa "cependant" en español?',
    options:['por lo tanto','sin embargo','es decir'],
    answer:1,
  },

];
