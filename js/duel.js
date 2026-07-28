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
      id: 'verbs', icon: '⚡', label: 'Verbes essentiels', labelEs: 'Verbos esenciales',
      words: [
        // Auxiliaires & modaux
        { en: 'to be (identity)',    fr: 'être',                      es: 'ser'                  },
        { en: 'to be (state)',       fr: 'être (état)',               es: 'estar'                },
        { en: 'to have',             fr: 'avoir',                     es: 'tener'                },
        { en: 'can / to be able to', fr: 'pouvoir',                   es: 'poder'                },
        { en: 'to want',             fr: 'vouloir',                   es: 'querer'               },
        { en: 'must / to have to',   fr: 'devoir',                    es: 'tener que'            },
        { en: 'to know (fact)',      fr: 'savoir',                    es: 'saber'                },
        { en: 'to know (person)',    fr: 'connaître',                 es: 'conocer'              },
        // Mouvement
        { en: 'to go',               fr: 'aller',                     es: 'ir'                   },
        { en: 'to come',             fr: 'venir',                     es: 'venir'                },
        { en: 'to leave / go out',   fr: 'partir / sortir',           es: 'irse / salir'         },
        { en: 'to arrive',           fr: 'arriver',                   es: 'llegar'               },
        { en: 'to return',           fr: 'rentrer / revenir',         es: 'volver'               },
        { en: 'to stay / remain',    fr: 'rester',                    es: 'quedarse'             },
        // Action
        { en: 'to do / make',        fr: 'faire',                     es: 'hacer'                },
        { en: 'to take',             fr: 'prendre',                   es: 'tomar'                },
        { en: 'to give',             fr: 'donner',                    es: 'dar'                  },
        { en: 'to put',              fr: 'mettre',                    es: 'poner'                },
        { en: 'to look for',         fr: 'chercher',                  es: 'buscar'               },
        { en: 'to find',             fr: 'trouver',                   es: 'encontrar'            },
        { en: 'to use',              fr: 'utiliser',                  es: 'usar'                 },
        { en: 'to open',             fr: 'ouvrir',                    es: 'abrir'                },
        { en: 'to close',            fr: 'fermer',                    es: 'cerrar'               },
        // Communication
        { en: 'to speak',            fr: 'parler',                    es: 'hablar'               },
        { en: 'to say / tell',       fr: 'dire',                      es: 'decir'                },
        { en: 'to ask',              fr: 'demander',                  es: 'pedir / preguntar'    },
        { en: 'to answer',           fr: 'répondre',                  es: 'contestar'            },
        { en: 'to understand',       fr: 'comprendre',                es: 'entender'             },
        { en: 'to explain',          fr: 'expliquer',                 es: 'explicar'             },
        { en: 'to hear',             fr: 'entendre',                  es: 'escuchar'             },
        { en: 'to see',              fr: 'voir',                      es: 'ver'                  },
        // Intellect / émotions
        { en: 'to think / believe',  fr: 'penser / croire',           es: 'pensar / creer'       },
        { en: 'to like / love',      fr: 'aimer',                     es: 'querer / gustar'      },
        { en: 'to prefer',           fr: 'préférer',                  es: 'preferir'             },
        { en: 'to feel',             fr: 'se sentir',                 es: 'sentirse'             },
        { en: 'to hope',             fr: 'espérer',                   es: 'esperar'              },
        { en: 'to learn',            fr: 'apprendre',                 es: 'aprender'             },
        { en: 'to forget',           fr: 'oublier',                   es: 'olvidar'              },
        { en: 'to remember',         fr: 'se souvenir de',            es: 'acordarse de'         },
        // Décision / progression
        { en: 'to start',            fr: 'commencer',                 es: 'empezar'              },
        { en: 'to finish',           fr: 'finir / terminer',          es: 'terminar'             },
        { en: 'to continue',         fr: 'continuer',                 es: 'seguir'               },
        { en: 'to stop (doing)',      fr: 'arrêter de',                es: 'dejar de'             },
        { en: 'to choose',           fr: 'choisir',                   es: 'elegir'               },
        { en: 'to decide',           fr: 'décider',                   es: 'decidir'              },
        { en: 'to try',              fr: 'essayer',                   es: 'intentar'             },
        { en: 'to succeed',          fr: 'réussir',                   es: 'lograr'               },
        { en: 'to become',           fr: 'devenir',                   es: 'volverse'             },
        { en: 'to allow / let',      fr: 'permettre',                 es: 'dejar / permitir'     },
        // Vie quotidienne
        { en: 'to write',            fr: 'écrire',                    es: 'escribir'             },
        { en: 'to read',             fr: 'lire',                      es: 'leer'                 },
        { en: 'to eat',              fr: 'manger',                    es: 'comer'                },
        { en: 'to drink',            fr: 'boire',                     es: 'tomar / beber'        },
        { en: 'to buy',              fr: 'acheter',                   es: 'comprar'              },
        { en: 'to pay',              fr: 'payer',                     es: 'pagar'                },
        { en: 'to work',             fr: 'travailler',                es: 'trabajar'             },
        { en: 'to live / reside',    fr: 'habiter / vivre',           es: 'vivir'                },
        { en: 'to wait',             fr: 'attendre',                  es: 'esperar'              },
        { en: 'to follow',           fr: 'suivre',                    es: 'seguir'               },
        { en: 'to need',             fr: 'avoir besoin de',           es: 'necesitar'            },
      ],
    },
    {
      id: 'conj', icon: '🔗', label: 'Conjonctions', labelEs: 'Conjunciones',
      words: [
        // Opposition / concession
        { en: 'but',                 fr: 'mais',                      es: 'pero'                 },
        { en: 'however',             fr: 'pourtant / cependant',      es: 'sin embargo'          },
        { en: 'nevertheless',        fr: 'néanmoins / toutefois',     es: 'no obstante / aun así'},
        { en: 'while / whereas',     fr: 'tandis que / alors que',    es: 'mientras que'         },
        { en: 'although',            fr: 'bien que + subj.',          es: 'aunque'               },
        { en: 'even if',             fr: 'même si',                   es: 'aunque / incluso si'  },
        { en: 'despite',             fr: 'malgré',                    es: 'a pesar de'           },
        { en: 'anyway',              fr: 'quand même',                es: 'igual / de todas formas'},
        { en: 'on the other hand',   fr: 'en revanche',               es: 'en cambio'            },
        // Cause
        { en: 'because',             fr: 'parce que / car',           es: 'porque'               },
        { en: 'since (given that)',  fr: 'puisque',                   es: 'ya que'               },
        { en: 'given that',          fr: 'étant donné que',           es: 'dado que'             },
        { en: 'thanks to',           fr: 'grâce à',                   es: 'gracias a'            },
        { en: 'because of',          fr: 'à cause de',                es: 'a causa de'           },
        // Conséquence
        { en: 'so / therefore',      fr: 'donc / alors',              es: 'entonces / por eso'   },
        { en: 'consequently',        fr: 'par conséquent',            es: 'por consiguiente'     },
        // But / objectif
        { en: 'in order to',         fr: 'afin de',                   es: 'para + inf.'          },
        { en: 'so that',             fr: 'pour que + subj.',          es: 'para que + subj.'     },
        // Condition
        { en: 'if',                  fr: 'si',                        es: 'si'                   },
        { en: 'unless',              fr: 'à moins que',               es: 'a menos que'          },
        { en: 'provided that',       fr: 'à condition que',           es: 'siempre y cuando'     },
        // Temps
        { en: 'when',                fr: 'quand / lorsque',           es: 'cuando'               },
        { en: 'while',               fr: 'pendant que',               es: 'mientras (que)'       },
        { en: 'as soon as',          fr: 'dès que',                   es: 'en cuanto / ni bien'  },
        { en: 'since (time)',         fr: 'depuis que',                es: 'desde que'            },
        { en: 'until',               fr: "jusqu'à ce que",          es: 'hasta que'            },
        { en: 'before',              fr: 'avant de',                  es: 'antes de'             },
        { en: 'after',               fr: 'après',                     es: 'después de'           },
        { en: 'as long as',          fr: 'tant que',                  es: 'mientras'             },
        // Ordre
        { en: 'first',               fr: "d'abord",                  es: 'primero'              },
        { en: 'then / next',         fr: 'puis / ensuite',            es: 'luego / después'      },
        { en: 'finally',             fr: 'enfin / finalement',        es: 'finalmente'           },
        // Ajout / illustration
        { en: 'moreover',            fr: 'de plus / en outre',        es: 'además'               },
        { en: 'for example',         fr: 'par exemple',               es: 'por ejemplo'          },
        { en: 'that is to say',      fr: "c'est-à-dire",           es: 'o sea / es decir'     },
        { en: 'according to',        fr: "selon / d'après",         es: 'según'                },
        { en: 'in any case',         fr: 'en tout cas',               es: 'de todos modos'       },
        { en: 'not only...but also', fr: 'non seulement...mais aussi',es: 'no solo...sino también'},
      ],
    },
,
    {
      id: 'nature', icon: '🌿', label: 'Nature',                  labelEs: 'Naturaleza',
      words: [
        { en: 'sun',       fr: 'soleil',      es: 'sol'       },
        { en: 'moon',      fr: 'lune',        es: 'luna'      },
        { en: 'star',      fr: 'étoile',       es: 'estrella'  },
        { en: 'sky',       fr: 'ciel',        es: 'cielo'     },
        { en: 'cloud',     fr: 'nuage',       es: 'nube'      },
        { en: 'rain',      fr: 'pluie',       es: 'lluvia'    },
        { en: 'snow',      fr: 'neige',       es: 'nieve'     },
        { en: 'wind',      fr: 'vent',        es: 'viento'    },
        { en: 'fire',      fr: 'feu',         es: 'fuego'     },
        { en: 'sea',       fr: 'mer',         es: 'mar'       },
        { en: 'river',     fr: 'rivière',      es: 'río'         },
        { en: 'mountain',  fr: 'montagne',    es: 'montaña'    },
        { en: 'tree',      fr: 'arbre',       es: 'árbol'       },
        { en: 'flower',    fr: 'fleur',       es: 'flor'      },
        { en: 'stone',     fr: 'pierre',      es: 'piedra'    },
        { en: 'ice',       fr: 'glace',       es: 'hielo'     },
        { en: 'earth',     fr: 'terre',       es: 'tierra'    },
        { en: 'forest',    fr: 'forêt',        es: 'bosque'    },
        { en: 'island',    fr: 'île',          es: 'isla'      },
        { en: 'desert',    fr: 'désert',       es: 'desierto'  },
      ],
    },
    {
      id: 'adjectives', icon: '🎨', label: 'Couleurs & adjectifs',    labelEs: 'Colores & adjetivos',
      words: [
        { en: 'red',       fr: 'rouge',       es: 'rojo'      },
        { en: 'blue',      fr: 'bleu',        es: 'azul'      },
        { en: 'green',     fr: 'vert',        es: 'verde'     },
        { en: 'white',     fr: 'blanc',       es: 'blanco'    },
        { en: 'black',     fr: 'noir',        es: 'negro'     },
        { en: 'yellow',    fr: 'jaune',       es: 'amarillo'  },
        { en: 'big',       fr: 'grand',       es: 'grande'    },
        { en: 'small',     fr: 'petit',       es: 'pequeño'    },
        { en: 'good',      fr: 'bon',         es: 'bueno'     },
        { en: 'bad',       fr: 'mauvais',     es: 'malo'      },
        { en: 'beautiful', fr: 'beau',        es: 'hermoso'   },
        { en: 'fast',      fr: 'rapide',      es: 'rápido'     },
        { en: 'slow',      fr: 'lent',        es: 'lento'     },
        { en: 'happy',     fr: 'heureux',     es: 'feliz'     },
        { en: 'sad',       fr: 'triste',      es: 'triste'    },
        { en: 'hot',       fr: 'chaud',       es: 'caliente'  },
        { en: 'cold',      fr: 'froid',       es: 'frío'        },
        { en: 'new',       fr: 'nouveau',     es: 'nuevo'     },
        { en: 'old',       fr: 'vieux',       es: 'viejo'     },
        { en: 'strong',    fr: 'fort',        es: 'fuerte'    },
      ],
    },
    {
      id: 'argentina', icon: '🧉', label: 'Argentine',              labelEs: 'Argentina',
      words: [
        { en: 'work (lunf.)',    fr: 'boulot',          es: 'laburo'      },
        { en: 'mate (drink)',    fr: 'maté',            es: 'mate'        },
        { en: 'barbecue',       fr: 'barbecue',        es: 'asado'       },
        { en: 'hey! / buddy',   fr: 'eh ! / mec',      es: 'che'         },
        { en: 'cool (lunf.)',   fr: 'cool / sympa',    es: 'copado'      },
        { en: 'to eat (lunf.)', fr: 'manger (fam.)',   es: 'morfar'      },
        { en: 'chaos (lunf.)',  fr: 'bordel',          es: 'quilombo'    },
        { en: 'guy (lunf.)',    fr: 'mec / gars',      es: 'chabón'     },
        { en: 'girl (lunf.)',   fr: 'fille / nana',    es: 'mina'        },
        { en: 'kid',            fr: 'gamin',           es: 'pibe'        },
        { en: 'bus',            fr: 'bus',             es: 'colectivo'   },
        { en: 'subway',         fr: 'métro',           es: 'subte'       },
        { en: 'flat/apartment', fr: 'appartement',    es: 'departamento'},
        { en: 'neighbourhood',  fr: 'quartier',        es: 'barrio'      },
        { en: 'corner shop',    fr: 'épicerie',         es: 'kiosco'      },
        { en: 'tip / bonus',    fr: 'pourboire',       es: 'propina'     },
        { en: 'voseo (you)',    fr: 'toi (voséo)',    es: 'vos'         },
        { en: 'cool / nice',    fr: 'bien / super',    es: 'bárbaro'    },
        { en: 'straw (mate)',   fr: 'paille (maté)',  es: 'bombilla'    },
      ],
    }
  ];
    {
      id: 'expr', icon: '💬', label: "S'exprimer", labelEs: 'Expresarse',
      words: [
        { en: 'Good morning!',                    fr: 'Bonjour !',                              es: '¡Buen día!' },
        { en: 'How are you?',                     fr: 'Comment ça va ?',                        es: '¿Cómo estás?' },
        { en: "I'm fine, thanks.",                fr: 'Ça va bien, merci.',                     es: 'Bien, gracias.' },
        { en: 'See you soon!',                    fr: 'À bientôt !',                            es: '¡Hasta pronto!' },
        { en: 'Have a good day!',                 fr: 'Bonne journée !',                        es: '¡Que tengas un buen día!' },
        { en: 'Good luck!',                       fr: 'Bonne chance !',                         es: '¡Buena suerte!' },
        { en: 'Enjoy your meal!',                 fr: 'Bon appétit !',                          es: '¡Buen provecho!' },
        { en: "I'd like a coffee.",               fr: "J'aimerais un café.",                    es: 'Me gustaría un café.' },
        { en: "I'd like to go to the cinema.",    fr: 'Je voudrais aller au cinéma.',           es: 'Quisiera ir al cine.' },
        { en: 'I feel like sleeping.',            fr: "J'ai envie de dormir.",                  es: 'Tengo ganas de dormir.' },
        { en: 'That would be great!',             fr: 'Ce serait super !',                      es: '¡Sería genial!' },
        { en: "I'd rather stay here.",            fr: 'Je préférerais rester ici.',             es: 'Preferiría quedarme acá.' },
        { en: "I'll go to the beach.",            fr: "J'irai à la plage.",                     es: 'Voy a ir a la playa.' },
        { en: 'Shall we eat together tonight?',   fr: 'On va manger ensemble ce soir ?',        es: '¿Comemos juntos esta noche?' },
        { en: 'We could visit the museum.',       fr: 'On pourrait visiter le musée.',          es: 'Podríamos visitar el museo.' },
        { en: 'Where shall we meet?',             fr: 'On se retrouve où ?',                    es: '¿Dónde nos encontramos?' },
        { en: 'What are you doing tomorrow?',     fr: 'Tu fais quoi demain ?',                  es: '¿Qué hacés mañana?' },
        { en: "I'll call you later.",             fr: "Je t'appellerai plus tard.",             es: 'Te llamo más tarde.' },
        { en: 'I went to the supermarket.',       fr: 'Je suis allé au supermarché.',           es: 'Fui al supermercado.' },
        { en: 'It went very well.',               fr: "Ça s'est très bien passé.",              es: 'Salió muy bien.' },
        { en: 'I was so tired.',                  fr: "J'étais tellement fatigué.",             es: 'Estaba tan cansado.' },
        { en: 'I had a great evening.',           fr: "J'ai passé une excellente soirée.",      es: 'Pasé una noche excelente.' },
        { en: 'Are you happy?',                   fr: 'Est-ce que tu es content(e) ?',          es: '¿Estás contento/a?' },
        { en: 'Do you need help?',                fr: "Tu as besoin d'aide ?",                   es: '¿Necesitás ayuda?' },
        { en: 'How much does it cost?',           fr: "C'est combien ?",                         es: '¿Cuánto cuesta?' },
        { en: 'Where is the station?',            fr: 'Où se trouve la gare ?',                  es: '¿Dónde queda la estación?' },
        { en: 'What time does it close?',         fr: 'À quelle heure ça ferme ?',               es: '¿A qué hora cierra?' },
        { en: 'Are you coming with us?',          fr: 'Tu viens avec nous ?',                    es: '¿Venís con nosotros?' },
        { en: "Is that OK with you?",             fr: 'Ça te va ?',                              es: '¿Te parece bien?' },
        { en: "I think it's a good idea.",        fr: "Je pense que c'est une bonne idée.",      es: 'Me parece que es una buena idea.' },
        { en: 'I find that very interesting.',    fr: 'Je trouve ça très intéressant.',          es: 'Lo encuentro muy interesante.' },
        { en: 'I love this place!',               fr: "J'adore cet endroit !",                   es: '¡Me encanta este lugar!' },
        { en: "That's a shame.",                  fr: "C'est dommage.",                           es: 'Qué lástima.' },
        { en: "I'm really sorry.",                fr: 'Je suis vraiment désolé(e).',             es: 'Lo siento mucho.' },
        { en: "That's great news!",               fr: "C'est une excellente nouvelle !",          es: '¡Qué buena noticia!' },
        { en: 'Can you repeat, please?',          fr: "Tu peux répéter, s'il te plaît ?",        es: '¿Podés repetir, por favor?' },
        { en: "I don't understand very well.",    fr: 'Je ne comprends pas très bien.',          es: 'No entiendo muy bien.' },
        { en: 'Could you speak more slowly?',     fr: 'Tu pourrais parler plus lentement ?',     es: '¿Podrías hablar más despacio?' },
        { en: 'What does that mean?',             fr: "Qu'est-ce que ça veut dire ?",             es: '¿Qué significa eso?' },
        { en: 'Let me explain.',                  fr: "Laisse-moi t'expliquer.",                 es: 'Dejame explicarte.' },
      ],
    },


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
  let _theme  = null;
  let _mode   = null;  // 'duel' | 'sprint'
  let _timer  = null;

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
    if (!_theme)                        { renderThemePicker(container); return; }
    if (!_mode)                         { renderModePicker(container); return; }
    if (_mode === 'sprint') { _st?.done ? renderSprintEnd(container) : renderSprintRound(container); return; }
    if (!_st)                           { renderDuelStart(container); return; }
    if (_st.done)                       { renderEnd(container); return; }
    renderRound(container);
  }

  function reset(container) { _clearTimer(); _st = null; _theme = null; _mode = null; render(container); }

  function _clearTimer() { if (_timer) { clearInterval(_timer); _timer = null; } }

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
        renderModePicker(container);
      });
    });
  }

  /* ── Mode picker ────────────────────────────────────────────────────── */

  function renderModePicker(container) {
    const mode = _getMode();
    const themeLabel = mode === 'es-fr' ? (_theme.labelEs || _theme.label) : _theme.label;
    container.innerHTML = `
      <div class="du-modepick">
        <button class="du-back-btn" id="du-back">‹ ${_ui('Thèmes', 'Temas', mode)}</button>
        <div class="du-modepick-badge">${_theme.icon} ${themeLabel}</div>
        <div class="du-modepick-title">${_ui('Quel mode ?', '¿Qué modo?', mode)}</div>
        <div class="du-modepick-cards">
          <button class="du-modecard" id="du-pick-duel">
            <div class="du-modecard-ic">⚔️</div>
            <div class="du-modecard-name">${_ui('Duel', 'Duelo', mode)}</div>
            <div class="du-modecard-sub">${_ui('2 joueurs · côte à côte', '2 jugadores · lado a lado', mode)}</div>
          </button>
          <button class="du-modecard" id="du-pick-sprint">
            <div class="du-modecard-ic">⚡</div>
            <div class="du-modecard-name">Sprint</div>
            <div class="du-modecard-sub">${_ui('Solo · 60 secondes', 'Solo · 60 segundos', mode)}</div>
          </button>
        </div>
      </div>`;
    container.querySelector('#du-back').addEventListener('click', () => { _theme = null; renderThemePicker(container); });
    container.querySelector('#du-pick-duel').addEventListener('click', () => { _mode = 'duel'; renderDuelStart(container); });
    container.querySelector('#du-pick-sprint').addEventListener('click', () => {
      _mode = 'sprint';
      const words = shuffle(_theme.words);
      _st = { words, idx: 0, correct: 0, total: 0, timeLeft: 60, done: false };
      renderSprintRound(container);
      _startSprintTimer(container);
    });
  }

  /* ── Duel start screen ──────────────────────────────────────────────── */

  function renderDuelStart(container) {
    const mode = _getMode();
    const themeLabel = mode === 'es-fr' ? (_theme.labelEs || _theme.label) : _theme.label;
    container.innerHTML = `
      <div class="du-start">
        <div class="du-start-top">
          <button class="du-back-btn" id="du-back">‹ ${_ui('Mode', 'Modo', mode)}</button>
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
      _mode = null; renderModePicker(container);
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
      _st = null; renderDuelStart(container);
    });
    container.querySelector('#du-newtheme').addEventListener('click', () => {
      _st = null; _theme = null; renderThemePicker(container);
    });
  }

  /* ── Sprint mode ────────────────────────────────────────────────────── */

  function _startSprintTimer(container) {
    _clearTimer();
    _timer = setInterval(() => {
      _st.timeLeft--;
      const timerEl = container.querySelector('.du-sp-timer');
      if (timerEl) {
        timerEl.textContent = `${_st.timeLeft}s`;
        if (_st.timeLeft <= 10) timerEl.classList.add('du-sp-timer--urgent');
      }
      if (_st.timeLeft <= 0) {
        _clearTimer();
        _st.done = true;
        renderSprintEnd(container);
      }
    }, 1000);
  }

  function renderSprintRound(container) {
    const mode  = _getMode();
    const word  = _st.words[_st.idx % _st.words.length];
    const native = (mode === 'es-fr') ? word.es : word.fr;
    const target = (mode === 'es-fr') ? word.fr : word.es;
    const nFlag  = (mode === 'es-fr') ? '🇦🇷' : '🇫🇷';
    const tFlag  = (mode === 'es-fr') ? '🇫🇷' : '🇦🇷';
    const pct    = (_st.timeLeft / 60) * 100;

    container.innerHTML = `
      <div class="du-sprint">
        <div class="du-sprint-hd">
          <button class="du-back-btn" id="sp-stop">✕ ${_ui('Stop', 'Parar', mode)}</button>
          <div class="du-sp-timer${_st.timeLeft <= 10 ? ' du-sp-timer--urgent' : ''}">${_st.timeLeft}s</div>
          <div class="du-sp-score">${_st.correct}/${_st.total}</div>
        </div>
        <div class="du-sp-bar"><div class="du-sp-fill" style="width:${pct}%"></div></div>
        <div class="du-sprint-card" id="sp-card">
          <div class="du-sp-flag">${nFlag}</div>
          <div class="du-sp-word">${native}</div>
          <button class="du-reveal-btn" id="sp-reveal">${_ui('Voir →', 'Ver →', mode)}</button>
        </div>
      </div>`;

    if (window.TTS) TTS.speak(native, mode === 'es-fr' ? 'es' : 'fr');

    document.getElementById('sp-stop').addEventListener('click', () => {
      _clearTimer(); _st.done = true; renderSprintEnd(container);
    });

    document.getElementById('sp-reveal').addEventListener('click', () => {
      const card = document.getElementById('sp-card');
      if (!card) return;
      card.innerHTML = `
        <div class="du-sp-pair">
          <span class="du-sp-flag">${nFlag}</span><span class="du-sp-word du-sp-word--sm">${native}</span>
        </div>
        <div class="du-sp-pair du-sp-pair--target">
          <span class="du-sp-flag">${tFlag}</span><span class="du-sp-target">${target}</span>
        </div>
        <div class="du-sp-assess">
          <button class="du-sp-btn du-sp-btn--wrong" id="sp-no">✗ ${_ui('Pas su', 'No sabía', mode)}</button>
          <button class="du-sp-btn du-sp-btn--right" id="sp-yes">✓ ${_ui('Su !', '¡Sabía!', mode)}</button>
        </div>`;
      if (window.TTS) TTS.speak(target, mode === 'es-fr' ? 'fr' : 'es');
      document.getElementById('sp-no').addEventListener('click',  () => _nextSprint(false, container));
      document.getElementById('sp-yes').addEventListener('click', () => _nextSprint(true,  container));
    });
  }

  function _nextSprint(correct, container) {
    _st.total++;
    if (correct) _st.correct++;
    _st.idx++;
    if (_st.timeLeft <= 0) { _clearTimer(); _st.done = true; renderSprintEnd(container); return; }
    renderSprintRound(container);
  }

  function renderSprintEnd(container) {
    const mode = _getMode();
    const pct  = _st.total > 0 ? Math.round((_st.correct / _st.total) * 100) : 0;
    const medal = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🎯';
    const msg = pct >= 80
      ? _ui('Excellent !', '¡Excelente!', mode)
      : pct >= 50
      ? _ui('Bien joué !', '¡Bien jugado!', mode)
      : _ui('Continue à t\'entraîner !', '¡Seguí entrenando!', mode);

    container.innerHTML = `
      <div class="du-sprint-end">
        <div class="du-sprint-end-medal">${medal}</div>
        <div class="du-sprint-end-msg">${msg}</div>
        <div class="du-sprint-end-score">
          <span class="du-sprint-end-n">${_st.correct}</span>
          <span class="du-sprint-end-sep">/ ${_st.total}</span>
        </div>
        <div class="du-sprint-end-pct">${pct}% ${_ui('corrects', 'correctos', mode)}</div>
        <div class="du-end-btns">
          <button class="du-replay-btn" id="sp-replay">⚡ ${_ui('Rejouer', 'Repetir', mode)}</button>
          <button class="du-theme-btn" id="sp-theme">🎲 ${_ui('Autre thème', 'Otro tema', mode)}</button>
        </div>
      </div>`;

    container.querySelector('#sp-replay').addEventListener('click', () => {
      const words = shuffle(_theme.words);
      _st = { words, idx: 0, correct: 0, total: 0, timeLeft: 60, done: false };
      renderSprintRound(container);
      _startSprintTimer(container);
    });
    container.querySelector('#sp-theme').addEventListener('click', () => {
      _st = null; _mode = null; _theme = null; renderThemePicker(container);
    });
  }

  return { render, reset };
})();

window.DUEL = DUEL;
