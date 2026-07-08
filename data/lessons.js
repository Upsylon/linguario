/* ===== lessons.js — Contenu pédagogique enrichi des 14 unités ===== */
window.LESSONS = {

  /* ── A1-1 : Salutations ─────────────────────────────────────────────── */
  'a1-1': {
    sections: [
      {
        type: 'note', icon: '🇦🇷',
        title: { fr: 'Le vos argentin', es: 'El tuteo francés' },
        body: {
          fr: 'En Argentine, on utilise <b>vos</b> à la place de <b>tú</b>. Ce n\'est pas un dialecte régional : c\'est la norme nationale, à la radio, à la télé, partout. Les formes verbales changent : <b>hablás, comés, vivís</b> (accent sur la dernière syllabe). Tu n\'entendras jamais "tú" à Buenos Aires.',
          es: 'En francés solo hay <b>tu</b> (informal) y <b>vous</b> (formal o plural). No existe "vos". Para saludar a alguien de tu edad se usa <b>tu</b>: "Comment tu vas ?" (¿Cómo estás?). <b>Vous</b> se usa con desconocidos adultos o en contexto profesional.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Expressions essentielles', es: 'Expresiones esenciales' },
        items: [
          { es: '¡Hola! ¿Cómo estás?',          fr: 'Bonjour ! Comment tu vas ?' },
          { es: 'Estoy bien, gracias.',            fr: 'Je vais bien, merci.' },
          { es: '¿Y vos?',                         fr: 'Et toi ?' },
          { es: 'Me llamo...',                     fr: 'Je m\'appelle...' },
          { es: '¿Cómo te llamás?',               fr: 'Comment tu t\'appelles ?' },
          { es: 'Mucho gusto.',                    fr: 'Enchanté(e).' },
          { es: '¡Hasta luego!',                  fr: 'À bientôt !' },
          { es: '¡Hasta mañana!',                 fr: 'À demain !' },
          { es: '¡Buenas noches!',                fr: 'Bonne nuit !' },
          { es: '¡Buenos días!',                  fr: 'Bonjour ! (le matin)' },
          { es: '¡Buenas tardes!',                fr: 'Bonjour ! / Bonsoir ! (l\'après-midi)' },
          { es: 'Igualmente.',                    fr: 'De même. / Pareillement.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Conjugaison vos au présent', es: 'Conjugación con vos (presente)' },
        headers: {
          fr: ['Infinitif', 'Vos (Argentine)', 'Tú (standard)', 'Français'],
          es: ['Infinitivo', 'Vos (Argentina)', 'Tú (estándar)', 'Francés']
        },
        rows: [
          ['hablar', '<b>hablás</b>', 'hablas', 'tu parles'],
          ['comer',  '<b>comés</b>',  'comes',  'tu manges'],
          ['vivir',  '<b>vivís</b>',  'vives',  'tu vis'],
          ['tener',  '<b>tenés</b>',  'tienes', 'tu as'],
          ['ser',    '<b>sos</b>',    'eres',   'tu es'],
          ['estar',  '<b>estás</b>',  'estás',  'tu es (état)'],
          ['ir',     '<b>vas</b>',    'vas',    'tu vas'],
          ['llamarse','<b>te llamás</b>','te llamas','tu t\'appelles']
        ],
        note: {
          fr: '💡 Règle : -ás pour les verbes en -ar, -és pour -er, -ís pour -ir. L\'accent est toujours sur la dernière syllabe.',
          es: '💡 Regla: -ás para verbos en -ar, -és para -er, -ís para -ir. El acento siempre en la última sílaba.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Première rencontre', es: 'Diálogo — Primer encuentro' },
        lines: [
          { speaker: 'A', es: '¡Hola! ¿Cómo estás?',              fr: 'Salut ! Comment tu vas ?' },
          { speaker: 'B', es: 'Bien, gracias. ¿Y vos?',            fr: 'Bien, merci. Et toi ?' },
          { speaker: 'A', es: 'También bien. Soy Carlos. ¿Y vos?', fr: 'Bien aussi. Je suis Carlos. Et toi ?' },
          { speaker: 'B', es: 'Mucho gusto, Carlos. Soy María.',   fr: 'Enchanté, Carlos. Je suis María.' },
          { speaker: 'A', es: 'Igualmente. ¿De dónde sos?',       fr: 'De même. Tu viens d\'où ?' },
          { speaker: 'B', es: 'Soy de Buenos Aires. ¿Y vos?',     fr: 'Je suis de Buenos Aires. Et toi ?' },
          { speaker: 'A', es: 'Soy de Córdoba. ¡Bueno, hasta luego!', fr: 'Je suis de Córdoba. Bon, à bientôt !' },
          { speaker: 'B', es: '¡Hasta luego! ¡Mucho gusto!',      fr: 'À bientôt ! Enchanté !' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>¿Cómo te llamás?</b> — remarque le <b>-ás</b> final : c\'est la marque du <b>vos</b> au présent. En espagnol "standard" ce serait "¿Cómo te llamas?" (avec -as). En Argentine, toujours <b>-ás</b>. Le bisou sur la joue (<b>un beso</b>) remplace la poignée de main entre amis.',
          es: '<b>Comment tu t\'appelles ?</b> — en francés, el pronombre sujeto (<b>tu</b>) es casi siempre obligatorio. No se puede omitir. Une bise (un bisou sur la joue) est la salutation normale entre amis — même entre hommes en contexte décontracté.'
        }
      }
    ]
  },

  /* ── A1-2 : Communication de base ───────────────────────────────────── */
  'a1-2': {
    sections: [
      {
        type: 'note', icon: '🗣',
        title: { fr: 'Oser parler', es: 'Animarse a hablar' },
        body: {
          fr: 'Les Argentins sont très accueillants avec ceux qui essaient de parler espagnol. N\'aie pas peur de faire des erreurs ! Deux phrases à retenir absolument : <b>¿Podés hablar más despacio?</b> (Tu peux parler plus lentement ?) et <b>¡Dale!</b> (D\'accord / OK). Ces deux phrases te sortiront de presque toutes les situations.',
          es: 'Los franceses aprecian el esfuerzo de hablar su idioma. Las dos frases más útiles: <b>Pouvez-vous parler plus lentement ?</b> (¿Puede hablar más despacio?) y <b>Je ne comprends pas</b> (No entiendo). Decirlas con una sonrisa funciona siempre.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Phrases de survie', es: 'Frases de supervivencia' },
        items: [
          { es: 'No entiendo.',                   fr: 'Je ne comprends pas.' },
          { es: '¿Podés repetir?',                fr: 'Tu peux répéter ?' },
          { es: 'Más despacio, por favor.',       fr: 'Plus lentement, s\'il te plaît.' },
          { es: '¿Cómo se dice... en español?',  fr: 'Comment dit-on... en espagnol ?' },
          { es: '¿Qué significa esto?',           fr: 'Qu\'est-ce que ça veut dire ?' },
          { es: '¡Dale! / ¡Está bien!',           fr: 'D\'accord ! / OK !' },
          { es: '¡Claro! / ¡Obvio!',             fr: 'Bien sûr !' },
          { es: 'No hay problema.',               fr: 'Pas de problème.' },
          { es: 'Disculpá.',                      fr: 'Excuse-moi.' },
          { es: 'Perdón.',                        fr: 'Pardon.' },
          { es: '¿Me podés ayudar?',             fr: 'Tu peux m\'aider ?' },
          { es: 'Soy principiante.',              fr: 'Je suis débutant(e).' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'La négation', es: 'La negación' },
        headers: {
          fr: ['Affirmatif', 'Négatif (espagnol)', 'Négatif (français)'],
          es: ['Afirmativo', 'Negativo (español)', 'Negativo (francés)']
        },
        rows: [
          ['Entiendo.', '<b>No</b> entiendo.', 'Je <b>ne</b> comprends <b>pas</b>.'],
          ['Hablo español.', '<b>No</b> hablo español.', 'Je <b>ne</b> parle <b>pas</b> espagnol.'],
          ['Hay problema.', '<b>No</b> hay problema.', 'Il <b>n\'</b>y a <b>pas</b> de problème.'],
          ['Sé nada.', '<b>No</b> sé nada.', 'Je <b>ne</b> sais <b>rien</b>.'],
          ['Voy nunca.', '<b>Nunca</b> voy. / No voy nunca.', 'Je <b>n\'</b>y vais <b>jamais</b>.']
        ],
        note: {
          fr: '💡 En espagnol : toujours <b>No + verbe</b>. En français : <b>ne...pas</b> encadre le verbe. À l\'oral français familier, le "ne" disparaît souvent : "Je comprends pas."',
          es: '💡 En español: siempre <b>No + verbo</b>, muy simple. En francés: <b>ne...pas</b> rodea el verbo. En el habla coloquial, el "ne" suele desaparecer: "Je comprends pas."'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: 'Disculpá, ¿cómo se dice "merci" en español?', fr: 'Excuse-moi, comment dit-on "merci" en espagnol ?' },
          { speaker: 'B', es: 'Se dice "gracias".',                           fr: 'On dit "gracias".' },
          { speaker: 'A', es: '¿Podés repetir más despacio?',                fr: 'Tu peux répéter plus lentement ?' },
          { speaker: 'B', es: 'Gra-cias. ¿Entendés?',                        fr: 'Gra-cias. Tu comprends ?' },
          { speaker: 'A', es: '¡Sí! ¡Gracias! No hay problema.',             fr: 'Oui ! Merci ! Pas de problème.' },
          { speaker: 'B', es: '¿Sos principiante en español?',               fr: 'Tu es débutant(e) en espagnol ?' },
          { speaker: 'A', es: 'Sí, estoy aprendiendo. ¿Me podés ayudar?',   fr: 'Oui, j\'apprends. Tu peux m\'aider ?' },
          { speaker: 'B', es: '¡Claro! Con mucho gusto.',                    fr: 'Bien sûr ! Avec plaisir.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>¡Dale!</b> est l\'expression la plus argentino que tu puisses utiliser. Elle remplace "OK", "d\'accord", "vas-y", "bien sûr", "allez"... Utilise-la à tout moment. <b>Disculpá</b> (excuse-moi) s\'utilise pour interpeller quelqu\'un dans la rue — plus poli que "Che!".',
          es: '<b>D\'accord</b> [daˈkɔʁ] est la réponse universelle. <b>Voilà</b> exprime l\'achèvement : "Et voilà !" (¡Listo!). À l\'oral familier, le "ne" de négation disparaît souvent : "Je comprends pas" au lieu de "Je ne comprends pas".'
        }
      }
    ]
  },

  /* ── A1-3 : Vie quotidienne ─────────────────────────────────────────── */
  'a1-3': {
    sections: [
      {
        type: 'note', icon: '🏠',
        title: { fr: 'La vie à Buenos Aires', es: 'La vida en París' },
        body: {
          fr: 'La vie quotidienne en Argentine tourne autour de quelques rituels : le <b>mate</b> (boisson à base d\'herbe yerba, partagée entre amis), l\'<b>asado</b> (barbecue du dimanche en famille), et les repas tardifs (déjeuner 13-15h, dîner 21-23h). Le logement s\'appelle <b>departamento</b> (jamais "apartamento").',
          es: 'La vida cotidiana en Francia gira en torno a rituales específicos: el <b>café</b> (se toma corto, en barra), el <b>déjeuner</b> (almuerzo sagrado, 12h-14h), y la <b>baguette</b> comprada fresca cada día. El horario es más temprano que en Argentina: se cena a las 19-20h.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Vie de tous les jours', es: 'Vida cotidiana' },
        items: [
          { es: 'Vivo en un departamento.',         fr: 'J\'habite dans un appartement.' },
          { es: 'Tengo una familia grande.',        fr: 'J\'ai une grande famille.' },
          { es: 'Como a las dos.',                  fr: 'Je mange à deux heures.' },
          { es: '¿A qué hora te levantás?',        fr: 'À quelle heure tu te lèves ?' },
          { es: 'Tomo mate todos los días.',        fr: 'Je bois du maté tous les jours.' },
          { es: 'Los domingos hago el asado.',      fr: 'Le dimanche, je fais le barbecue.' },
          { es: 'Trabajo de nueve a seis.',         fr: 'Je travaille de neuf heures à six heures.' },
          { es: '¿Qué hacés después del trabajo?', fr: 'Qu\'est-ce que tu fais après le travail ?' },
          { es: 'Me ducho por la mañana.',          fr: 'Je me douche le matin.' },
          { es: 'Salgo a las ocho.',                fr: 'Je sors à huit heures.' },
          { es: 'Vuelvo a casa a las siete.',       fr: 'Je rentre à la maison à sept heures.' },
          { es: 'Los fines de semana descanso.',    fr: 'Le week-end je me repose.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Verbes réguliers au présent (vos)', es: 'Verbos regulares en presente (vos)' },
        headers: {
          fr: ['Terminaison', 'Exemples vos (AR)', 'Français'],
          es: ['Terminación', 'Ejemplos vos (AR)', 'Francés']
        },
        rows: [
          ['<b>-ar</b>', 'trabaj<b>ás</b>, habl<b>ás</b>, tom<b>ás</b>', 'tu travailles, tu parles, tu prends'],
          ['<b>-er</b>', 'com<b>és</b>, beb<b>és</b>, vol<b>vés</b>', 'tu manges, tu bois, tu reviens'],
          ['<b>-ir</b>', 'viv<b>ís</b>, sal<b>ís</b>, dorm<b>ís</b>', 'tu vis, tu sors, tu dors'],
          ['irrégulier', '<b>sos</b> (ser), <b>estás</b> (estar)', 'tu es, tu es (état)'],
          ['irrégulier', '<b>vas</b> (ir), <b>tenés</b> (tener)', 'tu vas, tu as']
        ],
        note: {
          fr: '💡 La majorité des verbes sont réguliers. Retiens d\'abord les irréguliers les plus fréquents : sos, estás, vas, tenés.',
          es: '💡 La mayoría de los verbos son regulares. Aprende primero los irregulares más frecuentes: sos, estás, vas, tenés.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Une journée typique', es: 'Diálogo — Un día típico' },
        lines: [
          { speaker: 'A', es: '¿Dónde vivís?',                              fr: 'Où tu habites ?' },
          { speaker: 'B', es: 'Vivo en Palermo, en un departamento.',        fr: 'J\'habite à Palermo, dans un appartement.' },
          { speaker: 'A', es: '¿Con tu familia?',                            fr: 'Avec ta famille ?' },
          { speaker: 'B', es: 'Sí, con mis padres y mi hermana menor.',     fr: 'Oui, avec mes parents et ma petite sœur.' },
          { speaker: 'A', es: '¿A qué hora salís para el trabajo?',         fr: 'Tu pars au travail à quelle heure ?' },
          { speaker: 'B', es: 'Salgo a las ocho. Tomo el subte.',           fr: 'Je pars à huit heures. Je prends le métro.' },
          { speaker: 'A', es: '¿Y qué hacés los domingos?',                 fr: 'Et qu\'est-ce que tu fais le dimanche ?' },
          { speaker: 'B', es: 'El asado con la familia, siempre.',          fr: 'Le barbecue en famille, toujours.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Palermo</b> est le quartier branché de Buenos Aires — comme le Marais à Paris. <b>Departamento</b> et jamais "apartamento" : ce mot n\'est pas utilisé en Argentine. <b>Cuadra</b> = pâté de maisons ≈ 100m. Les Argentins dînent entre 21h et 23h — ne te présente pas à 19h chez des amis !',
          es: '<b>Appartement</b> et <b>immeuble</b> — deux mots à ne pas confondre. Appartement = el departamento ; immeuble = el edificio. En París, los edificios haussmanianos tienen 5-6 pisos. La <b>baguette</b> se compra fresca cada día — es una institución cultural.'
        }
      }
    ]
  },

  /* ── A1-4 : Au restaurant ───────────────────────────────────────────── */
  'a1-4': {
    sections: [
      {
        type: 'note', icon: '🍽',
        title: { fr: 'Manger en Argentine', es: 'Comer en Francia' },
        body: {
          fr: 'La gastronomie argentine est centrée sur la <b>viande</b> — le <b>bife de chorizo</b> est une entrecôte (rien à voir avec la saucisse !). On demande l\'addition avec <b>"¿Nos traés la cuenta?"</b> — remarque le <b>traés</b> (forme vos). Le pourboire (<b>propina</b>) est d\'environ 10%, non inclus.',
          es: 'En Francia, el restaurante es casi sagrado: se come despacio, la <b>carte</b> es extensa y el <b>plat du jour</b> (plato del día) es la mejor opción calidad-precio. La cuenta: <b>"L\'addition, s\'il vous plaît"</b>. El servicio suele estar incluido (<b>service compris</b>).'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Au restaurant', es: 'En el restaurante' },
        items: [
          { es: 'Una mesa para dos, por favor.',     fr: 'Une table pour deux, s\'il vous plaît.' },
          { es: '¿Qué me recomendás?',              fr: 'Qu\'est-ce que vous me conseillez ?' },
          { es: 'Quiero el bife de chorizo.',        fr: 'Je voudrais l\'entrecôte.' },
          { es: '¿Nos traés la cuenta?',            fr: 'Vous nous apportez l\'addition ?' },
          { es: 'Está buenísimo.',                  fr: 'C\'est délicieux.' },
          { es: '¿Está incluido el servicio?',      fr: 'Le service est inclus ?' },
          { es: 'Sin sal, por favor.',              fr: 'Sans sel, s\'il vous plaît.' },
          { es: '¡Buen provecho!',                  fr: 'Bon appétit !' },
          { es: '¿Tienen menú del día?',            fr: 'Vous avez un plat du jour ?' },
          { es: 'Para mí, lo mismo.',               fr: 'Pour moi, la même chose.' },
          { es: 'Quiero pedir.',                    fr: 'Je voudrais commander.' },
          { es: '¿Tienen opciones vegetarianas?',   fr: 'Vous avez des options végétariennes ?' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Pronoms objets (me, te, lo/la)', es: 'Pronombres de objeto (me, te, lo/la)' },
        headers: {
          fr: ['Pronom', 'Exemple espagnol', 'Traduction'],
          es: ['Pronombre', 'Ejemplo español', 'Traducción']
        },
        rows: [
          ['<b>me</b>', '¿Me traés la carta?', 'Tu m\'apportes le menu ?'],
          ['<b>te</b>', 'Te recomiendo el bife.', 'Je te recommande l\'entrecôte.'],
          ['<b>lo/la</b>', '¿Lo pedimos?', 'On le commande ?'],
          ['<b>nos</b>', '¿Nos traés la cuenta?', 'Tu nous apportes l\'addition ?'],
          ['<b>me + lo</b>', 'Me lo traés, por favor.', 'Tu me l\'apportes, s\'il te plaît.']
        ],
        note: {
          fr: '💡 En espagnol, les pronoms objets se placent AVANT le verbe conjugué : "¿Me traés...?" En français aussi : "Tu m\'apportes...?" L\'ordre diffère avec l\'infinitif.',
          es: '💡 En español, los pronombres van ANTES del verbo conjugado: "¿Me traés...?" En francés igual: "Tu m\'apportes...?" Con infinitivo, el orden puede variar.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Au resto', es: 'Diálogo — En el restaurante' },
        lines: [
          { speaker: 'A', es: '¡Buen día! ¿Tienen mesa para dos?',         fr: 'Bonjour ! Vous avez une table pour deux ?' },
          { speaker: 'B', es: 'Sí, claro. Por acá, por favor.',            fr: 'Oui, bien sûr. Par ici, s\'il vous plaît.' },
          { speaker: 'A', es: 'Gracias. ¿Qué nos recomendás hoy?',        fr: 'Merci. Qu\'est-ce que vous nous conseillez aujourd\'hui ?' },
          { speaker: 'B', es: 'El bife de chorizo está muy bueno.',        fr: 'L\'entrecôte est très bonne.' },
          { speaker: 'A', es: 'Perfecto. Dos bifes, por favor.',           fr: 'Parfait. Deux entrecôtes, s\'il vous plaît.' },
          { speaker: 'B', es: '¿Les traigo algo para tomar?',             fr: 'Je vous apporte quelque chose à boire ?' },
          { speaker: 'A', es: 'Sí, una botella de agua y vino tinto.',    fr: 'Oui, une bouteille d\'eau et du vin rouge.' },
          { speaker: 'A', es: '...¿Nos traés la cuenta cuando puedas?',   fr: 'L\'addition quand vous pouvez ?' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Bife de chorizo</b> ≠ saucisse. C\'est une épaisse tranche d\'entrecôte. <b>Medialunas</b> = croissants argentins (plus sucrés). <b>Propina</b> = pourboire, non inclus en Argentine — entre 10 et 15%. En France, le service est presque toujours inclus.',
          es: '<b>Carafe d\'eau</b> — en France, l\'eau du robinet est gratuite dans les restaurants : "Une carafe d\'eau, s\'il vous plaît". <b>Menu</b> en français = menú del día. <b>Carte</b> = la carta à la carte. Le pourboire est facultatif en France (service compris).'
        }
      }
    ]
  },

  /* ── A1-5 : Transport & mobilité ────────────────────────────────────── */
  'a1-5': {
    sections: [
      {
        type: 'note', icon: '🚌',
        title: { fr: 'Se déplacer à Buenos Aires', es: 'Moverse en París' },
        body: {
          fr: 'À Buenos Aires, le <b>subte</b> (métro) a 6 lignes. Le transport emblématique est le <b>colectivo</b> (bus) — il faut une carte <b>SUBE</b> rechargeable. Ne jamais dire "autobús" : en Argentine, c\'est toujours <b>colectivo</b>. Les distances se comptent en <b>cuadras</b> (pâtés de maisons ≈ 100m).',
          es: 'En París, el <b>métro</b> tiene 16 líneas y es la forma más rápida de desplazarse. El billete se llama <b>ticket</b> (o <b>titre de transport</b>). El <b>RER</b> conecta los suburbios. Para orientarse: memorizar el nombre del <b>terminus</b> de cada línea es clave.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Transport & directions', es: 'Transporte y direcciones' },
        items: [
          { es: '¿Cómo llego a...?',             fr: 'Comment j\'arrive à... ? / Comment aller à... ?' },
          { es: '¿Dónde está la estación?',      fr: 'Où est la station ?' },
          { es: 'Tomá el colectivo 60.',          fr: 'Prends le bus 60.' },
          { es: 'Bajate en la próxima.',          fr: 'Descends au prochain arrêt.' },
          { es: 'Está a dos cuadras.',           fr: 'C\'est à deux pâtés de maisons.' },
          { es: 'Doblá a la derecha.',           fr: 'Tourne à droite.' },
          { es: 'Doblá a la izquierda.',         fr: 'Tourne à gauche.' },
          { es: '¿Cuánto tarda?',               fr: 'Combien de temps ça prend ?' },
          { es: 'A pie son diez minutos.',       fr: 'À pied c\'est dix minutes.' },
          { es: 'Seguí derecho.',               fr: 'Continue tout droit.' },
          { es: '¿Cuántas paradas son?',        fr: 'C\'est combien d\'arrêts ?' },
          { es: 'Me perdí.',                    fr: 'Je me suis perdu(e).' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'L\'impératif avec vos', es: 'El imperativo con vos' },
        headers: {
          fr: ['Infinitif', 'Impératif vos', 'Impératif tú (std)', 'Signification'],
          es: ['Infinitivo', 'Imperativo vos', 'Imperativo tú (std)', 'Significado']
        },
        rows: [
          ['hablar', '<b>Hablá</b>', 'Habla', 'Parle !'],
          ['comer',  '<b>Comé</b>',  'Come',  'Mange !'],
          ['seguir', '<b>Seguí</b>', 'Sigue', 'Continue !'],
          ['doblar', '<b>Doblá</b>', 'Dobla', 'Tourne !'],
          ['bajar',  '<b>Bajate</b>','Bájate','Descends !'],
          ['venir',  '<b>Vení</b>',  'Ven',   'Viens !'],
          ['ir',     '<b>Andá</b>',  'Ve',    'Va ! / Vas-y !']
        ],
        note: {
          fr: '💡 L\'impératif vos = infinitif sans -r + accent : habla<b>r</b> → <b>hablá</b>. Exception notable : ir → <b>andá</b> (pas "irá"). En français, l\'impératif du "tu" perd le -s final : tu parles → Parle !',
          es: '💡 El imperativo vos = infinitivo sin -r + acento: habla<b>r</b> → <b>hablá</b>. Excepción: ir → <b>andá</b>. En francés, el imperativo de "tu" pierde la -s: tu parles → Parle !'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Demander son chemin', es: 'Diálogo — Pedir indicaciones' },
        lines: [
          { speaker: 'A', es: 'Disculpá, ¿cómo llego al Obelisco?',       fr: 'Excuse-moi, comment j\'arrive à l\'Obélisque ?' },
          { speaker: 'B', es: 'Tomá el subte línea B hasta Pellegrini.',   fr: 'Prends le métro ligne B jusqu\'à Pellegrini.' },
          { speaker: 'A', es: '¿Cuántas paradas son?',                     fr: 'C\'est combien d\'arrêts ?' },
          { speaker: 'B', es: 'Tres paradas. Son como diez minutos.',      fr: 'Trois arrêts. C\'est environ dix minutes.' },
          { speaker: 'A', es: '¿Y después, a pie?',                        fr: 'Et ensuite, à pied ?' },
          { speaker: 'B', es: 'Sí, salís y doblás a la derecha.',          fr: 'Oui, tu sors et tu tournes à droite.' },
          { speaker: 'A', es: '¿Está lejos de ahí?',                       fr: 'C\'est loin de là ?' },
          { speaker: 'B', es: 'No, está a dos cuadras de la estación.',   fr: 'Non, c\'est à deux pâtés de maisons de la station.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Cuadra</b> = pâté de maisons ≈ 100m. C\'est l\'unité de mesure de distance à pied en Argentine. "A tres cuadras" = à 300m environ. <b>Subte</b> = abréviation de "subterráneo" (métro). <b>Bajate</b> = descends (réfléchi : "te" parce que tu descends toi-même).',
          es: 'En París: <b>"Excusez-moi, où est le métro ?"</b>. Les Français indiquent distances en mètres/minutes. Phrase utile: <b>"C\'est loin ?"</b> — réponse typique: <b>"Non, c\'est à deux minutes à pied."</b> Le métro parisien a des tourniquets — il faut avoir son ticket !'
        }
      }
    ]
  },

  /* ── A1-6 : Argentin essentiel ──────────────────────────────────────── */
  'a1-6': {
    sections: [
      {
        type: 'note', icon: '🇦🇷',
        title: { fr: 'Le lunfardo', es: 'El argot francés (verlan)' },
        body: {
          fr: 'Le <b>lunfardo</b> est l\'argot de Buenos Aires, né au XIXe siècle du mélange de l\'espagnol avec l\'italien, l\'hébreu et d\'autres langues des immigrants. Aujourd\'hui, des mots lunfardo sont utilisés dans toute l\'Argentine — à la télé, dans les chansons, entre amis. Quelques mots lunfardo te donneront une crédibilité immédiate.',
          es: 'El argot juvenil francés se llama <b>verlan</b> — invierte las sílabas: <b>l\'envers</b> (al revés) → <b>verlan</b>. Ejemplos: <b>meuf</b> = femme, <b>ouf</b> = fou, <b>chelou</b> = louche. También existe el argot clásico: <b>bouffe</b> = nourriture, <b>boulot</b> = travail, <b>fric</b> = argent.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Argentin authentique', es: 'Francés auténtico (argot)' },
        items: [
          { es: '¡Qué copado!',         fr: 'C\'est trop bien ! / Génial !' },
          { es: '¡Che!',               fr: 'Hé ! / Dis donc !' },
          { es: 'Tener fiaca.',        fr: 'Avoir la flemme.' },
          { es: 'Pibe / Mina.',        fr: 'Mec / Meuf.' },
          { es: 'Boliche.',            fr: 'Boîte de nuit.' },
          { es: '¡Qué quilombo!',      fr: 'Quel bordel !' },
          { es: 'Re-lindo / Re-feo.',  fr: 'Super beau / Super moche.' },
          { es: 'Laburo.',             fr: 'Le boulot (travail).' },
          { es: 'La guita / la plata.',fr: 'Le fric / l\'argent.' },
          { es: '¡Qué boludo!',        fr: 'Espèce d\'idiot ! (très familier)' },
          { es: 'Morfar.',             fr: 'Bouffer (manger).' },
          { es: 'Estar al pedo.',      fr: 'Ne rien faire / glander.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'L\'intensificateur RE- (argentin)', es: 'El intensificador RE- (argentino)' },
        headers: {
          fr: ['Adjectif / verbe', 'Avec RE-', 'Équivalent français'],
          es: ['Adjetivo / verbo', 'Con RE-', 'Equivalente en francés']
        },
        rows: [
          ['lindo (beau)', '<b>re-lindo</b>', 'trop beau / super beau'],
          ['difícil (difficile)', '<b>re-difícil</b>', 'trop difficile / vraiment difficile'],
          ['copado (sympa)', '<b>re-copado</b>', 'trop sympa / vraiment sympa'],
          ['cansado (fatigué)', '<b>re-cansado</b>', 'épuisé / vraiment fatigué'],
          ['bueno (bon)', '<b>re-bueno</b>', 'vraiment bon / excellent'],
          ['me gustó', '<b>re me gustó</b>', 'j\'ai vraiment adoré']
        ],
        note: {
          fr: '💡 <b>Re-</b> est l\'équivalent argentin du "trop" français familier. Il se place AVANT l\'adjectif ou le verbe. C\'est la marque de fabrique de l\'espagnol argentin.',
          es: '💡 <b>Re-</b> equivale al "trop" (demasiado/muy) del francés coloquial. Va ANTES del adjetivo o verbo. Es una marca del español argentino — usarlo te hace sonar como un local.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Entre amis', es: 'Diálogo — Entre amigos' },
        lines: [
          { speaker: 'A', es: '¡Che, pibe! ¿Vas al boliche esta noche?',  fr: 'Eh mec ! Tu vas en boîte ce soir ?' },
          { speaker: 'B', es: 'No sé, tengo re-fiaca del laburo.',         fr: 'Je sais pas, j\'ai trop la flemme du boulot.' },
          { speaker: 'A', es: '¡Vamos! Va a ser re-copado.',               fr: 'Allez ! Ça va être trop bien.' },
          { speaker: 'B', es: '¿Quién va?',                                fr: 'Qui y va ?' },
          { speaker: 'A', es: 'Los pibes del barrio. ¡Dale!',              fr: 'Les mecs du quartier. Allez !' },
          { speaker: 'B', es: '¿Y hay guita para morfar antes?',           fr: 'Et t\'as du fric pour bouffer avant ?' },
          { speaker: 'A', es: 'Re que sí. Conozco un lugar re-bueno.',    fr: 'Carrément. Je connais un endroit trop bien.' },
          { speaker: 'B', es: 'Bueno, dale. ¡Qué copado!',                fr: 'OK, allez. Trop bien !' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>¡Che!</b> — Ernesto "Che" Guevara a reçu ce surnom car il utilisait constamment cette interjection. <b>Quilombo</b> vient du portugais (désignait les villages d\'esclaves fugitifs au Brésil) — aujourd\'hui = bordel/chaos. <b>Boludo</b> est très vulgaire entre étrangers mais peut être affectueux entre amis proches.',
          es: '<b>Le verlan</b> est compris par tous les Français. <b>Chelou</b>, <b>ouf</b>, <b>meuf</b> sont passés dans le langage courant. <b>Boulot</b> = travail (très utilisé à l\'oral). <b>Fric</b> = argent (familier). Évite ces mots dans un contexte formel ou professionnel.'
        }
      }
    ]
  },

  /* ── A2-1 : Travail & bureau ────────────────────────────────────────── */
  'a2-1': {
    sections: [
      {
        type: 'note', icon: '💼',
        title: { fr: 'Le travail en Argentine', es: 'El trabajo en Francia' },
        body: {
          fr: 'En Argentine, le <b>mate</b> circule au bureau — le refuser peut sembler impoli. Les réunions commencent souvent 15 à 30 minutes après l\'heure prévue : c\'est la <b>"hora argentina"</b>. Le tutoiement (<b>vos</b>) est la norme même dans les contextes semi-professionnels.',
          es: 'En Francia, la puntualidad es importante (margen de 10 minutos). El trato es más formal: se usa <b>vous</b> con colegas hasta que se establece confianza. El email profesional empieza con <b>"Bonjour,"</b> et se termine con <b>"Cordialement,"</b>.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Vocabulaire professionnel', es: 'Vocabulario profesional' },
        items: [
          { es: 'Trabajo en una empresa de tecnología.',  fr: 'Je travaille dans une entreprise tech.' },
          { es: 'Tengo una reunión a las diez.',          fr: 'J\'ai une réunion à dix heures.' },
          { es: '¿Me podés enviar el archivo?',           fr: 'Tu peux m\'envoyer le fichier ?' },
          { es: 'Estoy muy ocupado/a hoy.',               fr: 'Je suis très occupé(e) aujourd\'hui.' },
          { es: '¿Cuándo es la fecha límite?',           fr: 'Quelle est la date limite ?' },
          { es: 'Lo termino para el viernes.',            fr: 'Je le finis pour vendredi.' },
          { es: 'Necesitamos juntarnos.',                 fr: 'On doit se retrouver.' },
          { es: '¿Podés hacer una llamada?',             fr: 'Tu peux passer un appel ?' },
          { es: 'Estoy de vacaciones la semana que viene.', fr: 'Je suis en vacances la semaine prochaine.' },
          { es: 'Mandame un mail.',                      fr: 'Envoie-moi un mail.' },
          { es: '¿Podemos juntarnos mañana?',           fr: 'On peut se retrouver demain ?' },
          { es: 'Trabajo desde casa hoy.',               fr: 'Je travaille de chez moi aujourd\'hui.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Futur proche : IR + infinitif', es: 'Futuro próximo: IR + infinitivo' },
        headers: {
          fr: ['Sujet', 'IR + infinitif (espagnol)', 'Aller + infinitif (français)'],
          es: ['Sujeto', 'IR + infinitivo (español)', 'Aller + infinitif (francés)']
        },
        rows: [
          ['yo', 'voy a terminar (lo voy a terminar)', 'je vais finir'],
          ['vos', 'vas a mandar', 'tu vas envoyer'],
          ['él/ella', 'va a llegar', 'il/elle va arriver'],
          ['nosotros', 'vamos a juntarnos', 'on va se retrouver'],
          ['ellos', 'van a presentar', 'ils vont présenter']
        ],
        note: {
          fr: '💡 Le futur proche domine à l\'oral en espagnol ET en français. "Je vais finir ça demain" (voy a terminar eso mañana). Le futur simple (je finirai) est plus formel et moins courant à l\'oral.',
          es: '💡 El futuro próximo domina en el habla oral tanto en español como en francés. "Voy a terminar eso mañana" = "Je vais finir ça demain". El futuro simple (terminaré) es más formal.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Au bureau', es: 'Diálogo — En la oficina' },
        lines: [
          { speaker: 'A', es: 'Buen día. ¿Tenés un momento?',              fr: 'Bonjour. Tu as une minute ?' },
          { speaker: 'B', es: 'Sí, claro. ¿Qué necesitás?',               fr: 'Bien sûr. Qu\'est-ce que tu as besoin ?' },
          { speaker: 'A', es: 'Necesito el informe para el martes.',       fr: 'J\'ai besoin du rapport pour mardi.' },
          { speaker: 'B', es: 'Estoy muy ocupado hoy. ¿El miércoles?',    fr: 'Je suis très occupé aujourd\'hui. Mercredi ?' },
          { speaker: 'A', es: 'Está bien. ¿Me lo mandás por mail?',       fr: 'D\'accord. Tu me l\'envoies par mail ?' },
          { speaker: 'B', es: 'Dale, te lo mando el martes a la noche.',   fr: 'OK, je te l\'envoie mardi soir.' },
          { speaker: 'A', es: '¿Vas a poder terminarlo a tiempo?',         fr: 'Tu vas pouvoir le finir à temps ?' },
          { speaker: 'B', es: 'Sí, voy a trabajar desde casa el martes.', fr: 'Oui, je vais travailler de chez moi mardi.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>¿Me lo mandás?</b> — le double pronom "me + lo" est très courant. "Me" = à moi (COI), "lo" = le/ça (COD). Ordre toujours : COI avant COD. En Argentine on dit <b>mandar un mail</b>, pas "enviar un correo". <b>Juntarse</b> = se retrouver / se réunir (très utilisé).',
          es: 'Email professionnel en France : commence par <b>"Bonjour [Prénom],"</b> (informel) ou <b>"Madame / Monsieur,"</b> (formel). Termine avec <b>"Cordialement,"</b>. Jamais "Bisous" dans un email pro ! <b>Réunion</b> [ʁeynjɔ̃] = junta/reunión.'
        }
      }
    ]
  },

  /* ── A2-2 : Santé & bien-être ───────────────────────────────────────── */
  'a2-2': {
    sections: [
      {
        type: 'note', icon: '❤️',
        title: { fr: 'Santé en Argentine', es: 'Salud en Francia' },
        body: {
          fr: 'Buenos Aires a plus de <b>psychanalystes par habitant</b> que n\'importe quelle ville au monde — la culture du "ir al analista" (aller chez le psy) est normale et répandue. Pour les urgences : le <b>SAME</b> (service d\'urgences de la ville) est gratuit. La pharmacie (<b>farmacia</b>) peut conseiller sans ordonnance.',
          es: 'En Francia, la <b>Sécurité Sociale</b> rembourse une grande partie des soins. Le médecin de référence s\'appelle <b>médecin généraliste</b>. En urgences : appeler le <b>15</b> (SAMU) ou aller aux <b>urgences</b>. Les pharmacies (croix verte) sont très accessibles.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Santé & corps', es: 'Salud y cuerpo' },
        items: [
          { es: 'Me duele la cabeza.',               fr: 'J\'ai mal à la tête.' },
          { es: 'Me duele la garganta.',             fr: 'J\'ai mal à la gorge.' },
          { es: 'Tengo fiebre.',                      fr: 'J\'ai de la fièvre.' },
          { es: 'Me siento mal.',                    fr: 'Je me sens mal.' },
          { es: 'Necesito ver a un médico.',         fr: 'J\'ai besoin de voir un médecin.' },
          { es: '¿Dónde queda la farmacia?',        fr: 'Où est la pharmacie ?' },
          { es: 'Soy alérgico/a a...',              fr: 'Je suis allergique à...' },
          { es: 'Tomo este medicamento.',           fr: 'Je prends ce médicament.' },
          { es: '¿Tiene algo para el dolor?',      fr: 'Vous avez quelque chose contre la douleur ?' },
          { es: 'Me duelen los pies.',             fr: 'J\'ai mal aux pieds.' },
          { es: 'Estoy muy cansado/a.',            fr: 'Je suis très fatigué(e).' },
          { es: 'No puedo dormir.',               fr: 'Je n\'arrive pas à dormir.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'DOLER : verbe comme gustar', es: 'DOLER : verbo como gustar' },
        headers: {
          fr: ['Ce qui fait mal', 'Espagnol', 'Français'],
          es: ['Lo que duele', 'Español', 'Francés']
        },
        rows: [
          ['une partie du corps', 'Me <b>duele</b> la cabeza.', 'J\'ai mal <b>à la</b> tête.'],
          ['plusieurs parties', 'Me <b>duelen</b> los pies.', 'J\'ai mal <b>aux</b> pieds.'],
          ['le dos', 'Me <b>duele</b> la espalda.', 'J\'ai mal <b>au</b> dos.'],
          ['comparaison', 'Te <b>duele</b> la garganta?', 'Tu as mal <b>à la</b> gorge ?'],
          ['intensité', 'Me duele <b>mucho</b>. / un poco.', 'J\'ai <b>très</b> mal. / un peu mal.']
        ],
        note: {
          fr: '💡 <b>Doler</b> = "gustar" inversé. Le sujet grammatical est la PARTIE DU CORPS : "la cabeza me duele" → "me duele la cabeza". Singulier ou pluriel selon la partie du corps.',
          es: '💡 <b>Doler</b> funciona como "gustar": el sujeto gramatical es la PARTE DEL CUERPO. En francés: "J\'ai mal à la tête" — notar las contracciones: à+la=à la, à+le=<b>au</b>, à+les=<b>aux</b>.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: '¿Qué te pasa? Tenés mala cara.',              fr: 'Qu\'est-ce que tu as ? Tu as mauvaise mine.' },
          { speaker: 'B', es: 'Me siento mal. Me duele la cabeza y tengo fiebre.', fr: 'Je me sens mal. J\'ai mal à la tête et de la fièvre.' },
          { speaker: 'A', es: '¿Fuiste al médico?',                           fr: 'Tu es allé(e) chez le médecin ?' },
          { speaker: 'B', es: 'Todavía no. Voy a ir mañana.',                fr: 'Pas encore. J\'irai demain.' },
          { speaker: 'A', es: '¿Tomaste algo?',                              fr: 'Tu as pris quelque chose ?' },
          { speaker: 'B', es: 'Sí, un ibuprofeno. Pero sigo sintiéndome mal.', fr: 'Oui, un ibuprofène. Mais je me sens encore mal.' },
          { speaker: 'A', es: 'También te duele la garganta?',               fr: 'Tu as aussi mal à la gorge ?' },
          { speaker: 'B', es: 'Sí, y no pude dormir esta noche.',            fr: 'Oui, et je n\'ai pas pu dormir cette nuit.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Sigo + gérondif</b> = continuer à faire qqch : "sigo sintiéndome mal" (je continue à me sentir mal). <b>Todavía no</b> = pas encore. <b>¿Tenés mala cara?</b> = litt. "tu as mauvaise tête" — expression très courante pour dire que quelqu\'un n\'a pas l\'air bien.',
          es: '<b>Avoir mal à</b> — construction essentielle. <b>À + la</b> = à la tête, <b>à + le</b> = <b>au</b> dos, <b>à + les</b> = <b>aux</b> pieds. <b>Avoir de la fièvre</b> (tener fiebre) — pas "avoir une fièvre". <b>Se sentir mal</b> [səsɑ̃tiʁmal] = sentirse mal.'
        }
      }
    ]
  },

  /* ── A2-3 : Émotions & sentiments ──────────────────────────────────── */
  'a2-3': {
    sections: [
      {
        type: 'note', icon: '😊',
        title: { fr: 'Exprimer ses émotions', es: 'Expresar emociones' },
        body: {
          fr: 'En espagnol argentin, les émotions s\'expriment avec intensité. Le préfixe <b>re-</b> intensifie n\'importe quel adjectif : <b>re-lindo</b>, <b>re-cansado</b>. La construction <b>me pone + adjectif</b> = "ça me rend" : "me pone nervioso" (ça me rend nerveux). Les Argentins expriment leurs émotions ouvertement.',
          es: 'En francés, las emociones se expresan con matices. <b>Ça me + verbe</b> est très courant: "ça me fait plaisir" (me da gusto), "ça m\'énerve" (me irrita). Le genre grammatical affecte les adjectifs : content / content<b>e</b>, heureux / heureu<b>se</b>.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Émotions & réactions', es: 'Emociones y reacciones' },
        items: [
          { es: 'Estoy muy feliz.',              fr: 'Je suis très heureux/heureuse.' },
          { es: 'Estoy triste.',                 fr: 'Je suis triste.' },
          { es: 'Me pone nervioso/a.',           fr: 'Ça me rend nerveux/nerveuse.' },
          { es: '¡Qué bronca!',                 fr: 'Quelle frustration ! / Quel énervement !' },
          { es: 'Estoy re-emocionado/a.',        fr: 'Je suis très ému(e).' },
          { es: 'Me alegra mucho.',              fr: 'Ça me fait très plaisir.' },
          { es: 'Tengo miedo de...',            fr: 'J\'ai peur de...' },
          { es: 'Me sorprendió mucho.',         fr: 'Ça m\'a beaucoup surpris(e).' },
          { es: 'Estoy harto/a de...',          fr: 'J\'en ai marre de...' },
          { es: 'Me encanta.',                  fr: 'J\'adore ça.' },
          { es: 'No me cae bien.',             fr: 'Je ne l\'aime pas (personnalité).' },
          { es: 'Me cae re-bien.',             fr: 'Je l\'aime vraiment bien.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'SER vs ESTAR — deux façons d\'être', es: 'SER vs ESTAR — dos maneras de ser' },
        headers: {
          fr: ['SER (identité permanente)', 'ESTAR (état temporaire/lieu)', 'Différence clé'],
          es: ['SER (identidad permanente)', 'ESTAR (estado temporal/lugar)', 'Diferencia clave']
        },
        rows: [
          ['Soy argentino. (nationalité)', 'Estoy en Argentina. (lieu)', 'identité vs lieu'],
          ['Soy médico. (profession)', 'Estoy cansado. (état)', 'identité vs état'],
          ['Soy alto. (caractéristique)', 'Estoy triste. (émotion)', 'permanent vs temporaire'],
          ['Es lunes. (jour fixe)', 'Está nublado. (météo)', 'fixe vs changeant'],
          ['La casa es grande. (taille)', 'La casa está limpia. (résultat)', 'propriété vs résultat']
        ],
        note: {
          fr: '💡 Règle générale : SER = permanent, essentiel, identitaire. ESTAR = temporaire, changeant, résultat d\'un changement. En français, un seul verbe "être" fait tout le travail.',
          es: '💡 Regla general: SER = permanente, identitario. ESTAR = temporal, cambiante. En francés, <b>être</b> hace todo. Pero hay matices: "c\'est" vs "il est" — une distinction subtile mais importante.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: '¿Cómo te sentís después del examen?',         fr: 'Comment tu te sens après l\'examen ?' },
          { speaker: 'B', es: 'Re-aliviado. Estaba muy nervioso antes.',     fr: 'Très soulagé. J\'étais très nerveux avant.' },
          { speaker: 'A', es: 'Me alegra mucho. ¿Cómo te fue?',             fr: 'Je suis très content pour toi. Comment ça s\'est passé ?' },
          { speaker: 'B', es: 'Creo que bien. Aunque me puse nervioso al principio.', fr: 'Je crois que bien. Même si j\'ai eu le trac au début.' },
          { speaker: 'A', es: '¿Lo celebramos?',                             fr: 'On fête ça ?' },
          { speaker: 'B', es: '¡Dale! Tengo re-ganas.',                      fr: 'Allez ! J\'en ai vraiment envie.' },
          { speaker: 'A', es: 'Me encanta la idea. ¿A dónde vamos?',        fr: 'J\'adore l\'idée. On va où ?' },
          { speaker: 'B', es: 'Al boliche de siempre. Estoy re-contento.',  fr: 'En boîte comme d\'hab. Je suis trop content.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>¡Qué bronca!</b> vient de "bronce" (bronze) — expression de frustration ou colère. <b>Me cae bien / mal</b> = je l\'aime bien / pas — littéralement "il/elle tombe bien/mal sur moi". Construction intéressante ! <b>Estar harto</b> = en avoir marre (état, pas identité → estar et pas ser).',
          es: '<b>L\'accord de l\'adjectif</b> en français : heureux / heureu<b>se</b>, fatigué / fatigué<b>e</b>, content / content<b>e</b>. Beaucoup ne changent qu\'à l\'écrit. Mais certains changent à l\'oral : heureux [ørø] / heureuse [ørøz].'
        }
      }
    ]
  },

  /* ── A2-4 : Collocations Tener & Hacer ─────────────────────────────── */
  'a2-4': {
    sections: [
      {
        type: 'note', icon: '🤲',
        title: { fr: 'Tener et Hacer', es: 'Avoir et Faire' },
        body: {
          fr: 'En espagnol, beaucoup d\'états physiques qui utilisent <b>avoir</b> en français utilisent <b>tener</b> : "avoir faim" → <b>tener hambre</b>. Et là où le français dit "faire", l\'espagnol dit souvent <b>hacer</b> : "faire une question" → <b>hacer una pregunta</b>. Ces verbes forment des centaines d\'expressions figées.',
          es: 'En francés, <b>avoir</b> (tener) et <b>faire</b> (hacer) forment cientos de expressions fijas. Ej.: <b>avoir faim</b> (tener hambre), <b>faire attention</b> (tener cuidado). Estas colocaciones no se traducen literalmente — hay que aprenderlas como unidades.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Collocations : tener / hacer', es: 'Colocaciones: avoir / faire' },
        items: [
          { es: 'tener hambre / tener sed',           fr: 'avoir faim / avoir soif' },
          { es: 'tener sueño / tener frío',           fr: 'avoir sommeil / avoir froid' },
          { es: 'tener calor / tener miedo',          fr: 'avoir chaud / avoir peur' },
          { es: 'tener ganas de + inf.',             fr: 'avoir envie de + inf.' },
          { es: 'tener que + inf.',                  fr: 'devoir + inf. (obligation)' },
          { es: 'tener razón / no tener razón',      fr: 'avoir raison / avoir tort' },
          { es: 'hacer una pregunta',                fr: 'poser une question' },
          { es: 'hacer caso',                        fr: 'faire attention / obéir' },
          { es: 'hacer falta',                       fr: 'manquer / être nécessaire' },
          { es: 'hacer deporte',                     fr: 'faire du sport' },
          { es: 'hacer la cama',                     fr: 'faire le lit' },
          { es: 'hacer de cuenta',                   fr: 'faire semblant' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'TENER QUE vs HAY QUE vs DEVOIR', es: 'TENER QUE vs HAY QUE vs DEVOIR' },
        headers: {
          fr: ['Structure', 'Exemple espagnol', 'Exemple français', 'Sens'],
          es: ['Estructura', 'Ejemplo español', 'Ejemplo francés', 'Sentido']
        },
        rows: [
          ['<b>tener que</b> + inf.', 'Tengo que estudiar.', 'Je <b>dois</b> étudier.', 'obligation personnelle'],
          ['<b>hay que</b> + inf.', 'Hay que estudiar.', 'Il <b>faut</b> étudier.', 'obligation générale'],
          ['<b>necesitar</b> + inf.', 'Necesito dormir.', 'J\'<b>ai besoin de</b> dormir.', 'besoin'],
          ['<b>poder</b> + inf.', 'Podés venir?', 'Tu <b>peux</b> venir ?', 'possibilité'],
          ['<b>querer</b> + inf.', 'Quiero comer.', 'Je <b>veux</b> manger.', 'volonté']
        ],
        note: {
          fr: '💡 <b>Tener que</b> = obligation personnelle (je dois). <b>Hay que</b> = obligation générale (il faut). Cette distinction n\'existe pas en français avec "devoir" — il faut utiliser "il faut" pour le sens impersonnel.',
          es: '💡 <b>Tener que</b> = obligación personal (yo debo). <b>Hay que</b> = obligación general (il faut). En francés: <b>devoir</b> para personal, <b>il faut</b> para general. <b>Avoir besoin de</b> = necesitar.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: 'Tengo mucha hambre. ¿Hacemos algo de comer?', fr: 'J\'ai très faim. On prépare quelque chose à manger ?' },
          { speaker: 'B', es: 'Yo también tengo ganas de comer. ¿Qué tenés?', fr: 'Moi aussi j\'ai envie de manger. Qu\'est-ce que tu as ?' },
          { speaker: 'A', es: 'Tengo pasta. Pero tengo que ir al súper primero.', fr: 'J\'ai des pâtes. Mais je dois d\'abord aller au supermarché.' },
          { speaker: 'B', es: 'Hacé vos la pasta, yo hago la ensalada.',    fr: 'Toi tu fais les pâtes, moi je fais la salade.' },
          { speaker: 'A', es: '¡Dale! ¿Tenés ganas de tomar vino también?', fr: 'OK ! Tu as aussi envie de boire du vin ?' },
          { speaker: 'B', es: 'Siempre tengo ganas de vino. ¡No hace falta preguntar!', fr: 'J\'ai toujours envie de vin. Pas besoin de demander !' },
          { speaker: 'A', es: 'Hay que comprar también agua mineral.',      fr: 'Il faut aussi acheter de l\'eau minérale.' },
          { speaker: 'B', es: 'Tenés razón. Yo tengo sed además.',          fr: 'Tu as raison. J\'ai soif en plus.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Tener que + infinitif</b> = devoir : "Tengo que estudiar" (je dois étudier). <b>Haber que / Hay que + infinitif</b> = il faut : "Hay que comer" (il faut manger). Différence : "tengo que" = obligation personnelle ; "hay que" = obligation générale impersonnelle.',
          es: '<b>Il faut</b> = impersonnel, très utilisé. "Il faut manger" (hay que comer). Différent de <b>devoir</b> (tengo que). <b>Avoir besoin de</b> = necesitar. <b>Avoir envie de</b> = tener ganas de. Ces expressions s\'apprennent par cœur — pas de traduction directe possible.'
        }
      }
    ]
  },

  /* ── A2-5 : Collocations Estar & Ir ────────────────────────────────── */
  'a2-5': {
    sections: [
      {
        type: 'note', icon: '🗺',
        title: { fr: 'Ser vs Estar — le grand défi', es: 'Être : une seule forme' },
        body: {
          fr: 'L\'espagnol a deux façons de dire "être" : <b>ser</b> (identité permanente) et <b>estar</b> (état temporaire ou lieu). Exemples : "Soy médico" (je suis médecin) vs "Estoy cansado" (je suis fatigué). <b>Estar</b> sert aussi pour le lieu : "¿Dónde estás?" (où es-tu ?).',
          es: 'En francés, hay solo un verbo <b>être</b> para todo. Pero hay matices: <b>être en train de</b> + inf. expresa el progresivo: "Je suis en train de manger" (estoy comiendo). <b>C\'est</b> vs <b>il est</b> — une distinction subtile mais importante en français.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Collocations : estar / ir', es: 'Colocaciones: être / aller' },
        items: [
          { es: 'estar de acuerdo',          fr: 'être d\'accord' },
          { es: 'estar de vacaciones',       fr: 'être en vacances' },
          { es: 'estar al tanto',            fr: 'être au courant' },
          { es: 'estar a punto de + inf.',   fr: 'être sur le point de + inf.' },
          { es: 'ir de compras',             fr: 'aller faire les courses / le shopping' },
          { es: 'ir al grano',              fr: 'aller droit au but' },
          { es: 'ir bien / ir mal',         fr: 'aller bien / aller mal' },
          { es: 'ir a + inf. (futur)',      fr: 'aller + inf. (futur proche)' },
          { es: 'estar de moda',            fr: 'être à la mode' },
          { es: 'estar listo/a',            fr: 'être prêt(e)' },
          { es: 'ir a parar',              fr: 'finir par... / atterrir quelque part' },
          { es: 'estar de paso',           fr: 'être de passage' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'C\'est vs Il est (français)', es: 'C\'est vs Il est (francés)' },
        headers: {
          fr: ['C\'est...', 'Il/Elle est...', 'Contexte'],
          es: ['C\'est...', 'Il/Elle est...', 'Contexto']
        },
        rows: [
          ['C\'est un médecin.', 'Il est médecin.', 'avec/sans article selon contexte'],
          ['C\'est sympa !', 'Il est sympa.', 'jugement général / qualité d\'une personne'],
          ['C\'est en France.', 'Il est à Paris.', 'lieu général / lieu précis'],
          ['C\'est compliqué.', 'C\'est compliqué. (idem)', 'souvent interchangeable'],
          ['Qui est-ce ? C\'est Marie.', 'Elle est française.', 'identification / qualité']
        ],
        note: {
          fr: '💡 Règle pratique : <b>C\'est</b> + article + nom (un médecin). <b>Il est</b> + profession sans article (médecin). À l\'oral familier, "c\'est" domine souvent les deux cas.',
          es: '💡 Regla práctica : <b>C\'est</b> + artículo + sustantivo (un médecin). <b>Il est</b> + profesión sin artículo (médecin). En el habla coloquial, "c\'est" domina en la mayoría de contextos.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: '¿Estás de acuerdo con la propuesta?',         fr: 'Tu es d\'accord avec la proposition ?' },
          { speaker: 'B', es: 'Más o menos. Estoy a punto de mandar mis comentarios.', fr: 'Plus ou moins. Je suis sur le point d\'envoyer mes commentaires.' },
          { speaker: 'A', es: '¿Vas a ir a la reunión del martes?',          fr: 'Tu vas aller à la réunion de mardi ?' },
          { speaker: 'B', es: 'Sí, voy. ¿Estás al tanto de los cambios?',   fr: 'Oui, j\'y vais. Tu es au courant des changements ?' },
          { speaker: 'A', es: 'Más o menos. Vamos al grano: ¿estamos bien?', fr: 'Plus ou moins. Allons droit au but : on est OK ?' },
          { speaker: 'B', es: 'Sí, todo va bien. No hay problema.',          fr: 'Oui, tout va bien. Pas de problème.' },
          { speaker: 'A', es: '¿Estás listo para la presentación?',         fr: 'Tu es prêt pour la présentation ?' },
          { speaker: 'B', es: 'Casi. Estoy a punto de terminarla.',         fr: 'Presque. Je suis sur le point de la finir.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>¿Cómo estás?</b> (avec *estar*) demande l\'état actuel. <b>¿Cómo sos?</b> (avec *ser*) demanderait "quel genre de personne tu es?" — très différent ! Astuce : <b>estar</b> = temporaire (état, lieu). <b>Ser</b> = permanent (identité, caractéristique).',
          es: '<b>Aller + infinitif</b> est le futur proche en français, très utilisé à l\'oral. "Je vais manger" (voy a comer) = dans peu de temps. Le vrai futur (<b>je mangerai</b>) est plus écrit. À l\'oral, le futur proche domine.'
        }
      }
    ]
  },

  /* ── A2-6 : Opinions & argumentation ───────────────────────────────── */
  'a2-6': {
    sections: [
      {
        type: 'note', icon: '💭',
        title: { fr: 'Débattre comme un Argentin', es: 'Argumenter en français' },
        body: {
          fr: 'Les Argentins adorent débattre — politique, football, économie, tout est sujet à discussion animée. Les connecteurs logiques (<b>sin embargo, por otro lado, aunque</b>) sont essentiels pour construire un argument. <b>Me parece que</b> (il me semble que) est plus poli que <b>creo que</b> dans les débats formels.',
          es: 'Los franceses argumentan con estructura lógica: <b>d\'abord</b> (primero), <b>ensuite</b> (luego), <b>enfin</b> (por último). Para dar una opinión: <b>à mon avis</b> (en mi opinión), <b>il me semble que</b> (me parece que). El debate es apreciado en la cultura francesa.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Opinions & connecteurs', es: 'Opiniones y conectores' },
        items: [
          { es: 'Creo que... / Me parece que...', fr: 'Je crois que... / Il me semble que...' },
          { es: 'En mi opinión...',               fr: 'À mon avis...' },
          { es: 'Sin embargo...',                fr: 'Cependant... / Néanmoins...' },
          { es: 'Por otro lado...',              fr: 'D\'un autre côté...' },
          { es: 'Además...',                     fr: 'De plus... / En plus...' },
          { es: 'Estoy de acuerdo contigo.',     fr: 'Je suis d\'accord avec toi.' },
          { es: 'No estoy de acuerdo.',          fr: 'Je ne suis pas d\'accord.' },
          { es: 'Tenés razón.',                  fr: 'Tu as raison.' },
          { es: 'No creo que sea así.',          fr: 'Je ne crois pas que ce soit le cas.' },
          { es: 'Por supuesto.',                 fr: 'Bien entendu. / Évidemment.' },
          { es: 'A pesar de eso...',            fr: 'Malgré ça...' },
          { es: 'En resumen...',               fr: 'En résumé... / Bref...' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Connecteurs logiques — comparaison', es: 'Conectores lógicos — comparación' },
        headers: {
          fr: ['Fonction', 'Espagnol (argentin)', 'Français'],
          es: ['Función', 'Español (argentino)', 'Francés']
        },
        rows: [
          ['addition', 'además / también', 'de plus / aussi / en outre'],
          ['opposition', 'sin embargo / pero / aunque', 'cependant / mais / bien que'],
          ['cause', 'porque / ya que / dado que', 'parce que / car / puisque'],
          ['conséquence', 'entonces / por eso / así que', 'donc / c\'est pourquoi / alors'],
          ['concession', 'aunque / a pesar de que', 'bien que + subj. / malgré'],
          ['ordre', 'primero, después, por último', 'd\'abord, ensuite, enfin']
        ],
        note: {
          fr: '💡 En Argentine, les connecteurs familiers oraux : <b>igual</b> (quand même), <b>encima</b> (en plus), <b>obvio que</b> (évidemment que). En français à l\'oral : <b>du coup</b> (donc/alors) est très utilisé.',
          es: '💡 En el habla argentina: <b>igual</b> (quand même/de todas formas), <b>encima</b> (de plus/encima), <b>obvio</b> (évidemment). En francés oral: <b>du coup</b> (donc/entonces) est omniprésent.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: '¿Qué pensás del nuevo proyecto?',                 fr: 'Qu\'est-ce que tu penses du nouveau projet ?' },
          { speaker: 'B', es: 'Me parece una buena idea. Sin embargo, el presupuesto es bajo.', fr: 'Il me semble que c\'est une bonne idée. Cependant, le budget est bas.' },
          { speaker: 'A', es: 'Entiendo tu punto. Por otro lado, tenemos que intentarlo.', fr: 'Je comprends ton point de vue. D\'un autre côté, on doit essayer.' },
          { speaker: 'B', es: 'Además, no tenemos otra opción.',                fr: 'De plus, on n\'a pas d\'autre option.' },
          { speaker: 'A', es: 'Tenés razón. Estoy de acuerdo.',                 fr: 'Tu as raison. Je suis d\'accord.' },
          { speaker: 'B', es: '¡Dale! Vamos para adelante entonces.',           fr: 'OK ! On y va alors.' },
          { speaker: 'A', es: 'Aunque igual habría que hablar con el jefe primero.', fr: 'Même si on devrait quand même parler au chef d\'abord.' },
          { speaker: 'B', es: 'Por supuesto. En resumen, estamos de acuerdo.', fr: 'Bien sûr. Bref, on est d\'accord.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Tenés razón</b> (tu as raison) — forme vos. En castillan standard : "tienes razón". <b>Me parece que</b> + indicatif (opinion positive) vs <b>no me parece que</b> + subjonctif (négation). Le subjonctif après la négation est une règle clé de l\'espagnol.',
          es: '<b>D\'accord</b> [daˈkɔʁ]. <b>Du coup</b> est le connecteur oral roi du français : "J\'avais faim, du coup j\'ai mangé" (tenía hambre, así que comí). <b>Quand même</b> = igual / de todas formas. <b>En fait</b> = en realidad / en fait.'
        }
      }
    ]
  },

  /* ── B1-1 : Social & culture ────────────────────────────────────────── */
  'b1-1': {
    sections: [
      {
        type: 'note', icon: '🌟',
        title: { fr: 'Identité culturelle argentine', es: 'Identité culturelle française' },
        body: {
          fr: 'L\'identité argentine est profondément liée à quatre piliers : le <b>fútbol</b> (passion nationale), le <b>tango</b> (né dans les faubourgs de Buenos Aires), le <b>mate</b> (rituel social quotidien) et la <b>psychanalyse</b> (Buenos Aires = capitale mondiale du psy). Connaître ces références ouvre les conversations profondes.',
          es: 'La identidad francesa se construye alrededor de: la <b>gastronomía</b> (patrimonio UNESCO), la <b>laïcité</b> (separación iglesia-estado), la <b>philosophie</b> (Descartes, Sartre, Camus), y el <b>cinéma</b> (la Nouvelle Vague). Estos temas abren conversaciones profundas.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Situations sociales', es: 'Situaciones sociales' },
        items: [
          { es: '¿Mirás el fútbol?',               fr: 'Tu regardes le foot ?' },
          { es: 'Soy de Boca / de River.',          fr: 'Je suis fan de Boca / de River.' },
          { es: 'Juntarse a tomar algo.',           fr: 'Se retrouver pour boire un verre.' },
          { es: 'Me re-copé con...',               fr: 'J\'ai adoré... (argentin)' },
          { es: 'Está de moda.',                   fr: 'C\'est à la mode.' },
          { es: '¿Viste la última película de...?', fr: 'Tu as vu le dernier film de... ?' },
          { es: 'Es un clásico.',                  fr: 'C\'est un classique.' },
          { es: 'Me da igual.',                    fr: 'Ça m\'est égal. / Peu importe.' },
          { es: '¿Salimos este fin de semana?',    fr: 'On sort ce week-end ?' },
          { es: 'Hacemos una previa.',             fr: 'On fait un pré-soirée.' },
          { es: 'El ambiente está re-bueno.',      fr: 'L\'ambiance est super bonne.' },
          { es: '¿Qué onda con...?',              fr: 'Quoi de neuf avec... ? / C\'est quoi le deal avec...?' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Passé composé vs Pretérito perfecto', es: 'Passé composé vs Pretérito perfecto' },
        headers: {
          fr: ['Temps', 'Formation', 'Usage principal', 'Exemple'],
          es: ['Tiempo', 'Formación', 'Uso principal', 'Ejemplo']
        },
        rows: [
          ['<b>Passé composé</b> (fr)', 'avoir/être + participe', 'passé récent ou lié au présent', '"J\'ai vu le film."'],
          ['<b>Pretérito perf.</b> (es)', 'haber + participio', 'action passée liée au présent', '"He visto la película."'],
          ['<b>Pretérito indef.</b> (es)', 'terminaisons -é/-aste', 'passé coupé du présent', '"Vi la película." (AR: commun)'],
          ['Usage argentin', 'pretérito indef. domine', 'même pour le passé récent', '"¿Viste? / Vi eso ayer."'],
          ['Usage français', 'passé composé domine', 'à l\'oral pour tout passé', '"J\'ai vu ça hier."']
        ],
        note: {
          fr: '💡 En Argentine, le pretérito indefinido (vi, fui, hablé) est utilisé même pour des actions récentes, là où l\'Espagne utiliserait le pretérito perfecto (he visto, he ido). En français, le passé composé domine à l\'oral pour TOUS les passés.',
          es: '💡 En Argentina, el pretérito indefinido (vi, fui, hablé) se usa incluso para acciones recientes. En Francia, el passé composé domina en el habla oral para TODOS los pasados. El passé simple (je vis, j\'allai) es solo literario.'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue — Cultura', es: 'Diálogo — Cultura' },
        lines: [
          { speaker: 'A', es: '¿Viste el partido de anoche?',               fr: 'Tu as vu le match d\'hier soir ?' },
          { speaker: 'B', es: '¡Claro! Fue increíble. ¿Sos de Boca?',      fr: 'Bien sûr ! C\'était incroyable. Tu es fan de Boca ?' },
          { speaker: 'A', es: 'No, soy de River. Pero fue un buen partido.', fr: 'Non, je suis de River. Mais c\'était un bon match.' },
          { speaker: 'B', es: 'Para mí el Superclásico es lo más emocionante.', fr: 'Pour moi le Superclásico est le plus émouvant.' },
          { speaker: 'A', es: 'Sí, no hay nada igual. ¿Juntamos a ver el próximo?', fr: 'Oui, rien ne vaut ça. On se retrouve pour voir le prochain ?' },
          { speaker: 'B', es: '¡Dale! Me re-copó la idea.',                fr: 'Allez ! J\'adore l\'idée.' },
          { speaker: 'A', es: '¿Y qué más mirás? ¿Series, cine?',          fr: 'Et tu regardes quoi d\'autre ? Des séries, du ciné ?' },
          { speaker: 'B', es: 'Re que sí. Vi una película francesa la semana pasada.',fr: 'Carrément. J\'ai vu un film français la semaine dernière.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>River Plate</b> et <b>Boca Juniors</b> sont les deux clubs du même quartier de Buenos Aires (La Boca). Le <b>Superclásico</b> est le match le plus regardé d\'Amérique du Sud. <b>Previa</b> = pré-soirée (se retrouver chez quelqu\'un avant de sortir) — rituel social argentin incontournable.',
          es: '<b>Le Superclásico</b> argentin a son équivalent : <b>PSG vs OM</b> (le Classique). <b>La Nouvelle Vague</b> = mouvement cinématographique des années 60 (Godard, Truffaut). <b>La laïcité</b> est un principe constitutionnel en France — la religion est strictement séparée de l\'État.'
        }
      }
    ]
  },

  /* ── B1-2 : Structures grammaticales ───────────────────────────────── */
  'b1-2': {
    sections: [
      {
        type: 'note', icon: '🧠',
        title: { fr: 'Le subjonctif — mode de la nuance', es: 'El subjuntivo — modo de la duda' },
        body: {
          fr: 'Le <b>subjonctif présent</b> (subjuntivo presente) s\'utilise après des expressions de volonté, doute ou émotion : "quiero que <b>vengas</b>" (je veux que tu viennes). En argentin, la forme vos est particulière : <b>que vos vengás</b> (accent final). C\'est le niveau où ta maîtrise de l\'espagnol devient vraiment fluide.',
          es: 'En francés, el <b>subjonctif</b> se usa en contextos similares: duda, voluntad, emoción. "Je veux que tu <b>viennes</b>" (quiero que vengas). Se forma de manera irregular en muchos verbos. Comparado con el español, el subjonctif francés se usa mucho en el habla cotidiana.'
        }
      },
      {
        type: 'expressions',
        title: { fr: 'Structures B1', es: 'Estructuras B1' },
        items: [
          { es: 'Quiero que vos vengás.',        fr: 'Je veux que tu viennes.' },
          { es: 'Es importante que estudies.',   fr: 'Il est important que tu étudies.' },
          { es: 'Si tuviera tiempo...',          fr: 'Si j\'avais le temps...' },
          { es: 'Habría que + inf.',             fr: 'Il faudrait + inf.' },
          { es: 'Lo que pasa es que...',         fr: 'Ce qui se passe c\'est que...' },
          { es: 'Aunque + subj. (doute)',        fr: 'Bien que + subj. (concession)' },
          { es: 'A medida que...',               fr: 'Au fur et à mesure que...' },
          { es: 'No es que..., sino que...',    fr: 'Ce n\'est pas que..., c\'est que...' },
          { es: 'Ojalá que...',                 fr: 'J\'espère que... / Pourvu que...' },
          { es: 'Que yo sepa...',              fr: 'Pour autant que je sache...' },
          { es: 'Por más que...',             fr: 'Même si... / Bien que...' },
          { es: 'A menos que + subj.',        fr: 'À moins que + subj.' }
        ]
      },
      {
        type: 'grammar',
        title: { fr: 'Subjonctif présent — déclencheurs', es: 'Subjuntivo presente — desencadenantes' },
        headers: {
          fr: ['Catégorie', 'Déclencheurs espagnol', 'Déclencheurs français'],
          es: ['Categoría', 'Desencadenantes español', 'Desencadenantes francés']
        },
        rows: [
          ['volonté', 'querer que, desear que, pedir que', 'vouloir que, souhaiter que, demander que'],
          ['émotion', 'alegrarse de que, temer que', 'être content que, avoir peur que'],
          ['doute/négation', 'no creer que, dudar que', 'ne pas croire que, douter que'],
          ['nécessité', 'es necesario que, hace falta que', 'il faut que, il est nécessaire que'],
          ['concession', 'aunque (doute), por más que', 'bien que, quoique, à moins que'],
          ['condition', 'para que, a fin de que', 'pour que, afin que']
        ],
        note: {
          fr: '💡 Règle d\'or : si le sujet de la principale ≠ sujet de la subordonnée → subjonctif. "Quiero IR" (même sujet, infinitif) vs "Quiero que VOS VAYAS" (sujets différents, subjonctif).',
          es: '💡 Regla de oro: si el sujeto de la frase principal ≠ sujeto de la subordinada → subjuntivo. "Je veux ALLER" (même sujet, infinitif) vs "Je veux que TU VIENNES" (sujets différents, subjonctif).'
        }
      },
      {
        type: 'dialogue',
        title: { fr: 'Dialogue', es: 'Diálogo' },
        lines: [
          { speaker: 'A', es: 'Es importante que llegués temprano mañana.',   fr: 'Il est important que tu arrives tôt demain.' },
          { speaker: 'B', es: 'Lo sé. Si pudiera, vendría antes.',            fr: 'Je sais. Si je pouvais, je viendrais plus tôt.' },
          { speaker: 'A', es: 'Lo que pasa es que el jefe quiere que todos estén.', fr: 'Ce qui se passe, c\'est que le patron veut que tout le monde soit là.' },
          { speaker: 'B', es: 'Entiendo. Aunque llueva, voy a ir.',           fr: 'Je comprends. Même s\'il pleut, j\'irai.' },
          { speaker: 'A', es: 'Bien. Habría que avisar al resto del equipo.', fr: 'Bien. Il faudrait prévenir le reste de l\'équipe.' },
          { speaker: 'B', es: 'No es que no quiera ir, sino que el transporte es un problema.', fr: 'Ce n\'est pas que je ne veuille pas y aller, c\'est que le transport est un problème.' },
          { speaker: 'A', es: 'Ojalá que todo salga bien mañana.',           fr: 'J\'espère que tout se passe bien demain.' },
          { speaker: 'B', es: 'Por más que sea difícil, vamos a lograrlo.', fr: 'Même si c\'est difficile, on va y arriver.' }
        ]
      },
      {
        type: 'tip', icon: '💡',
        body: {
          fr: '<b>Subjonctif vos</b> en argentin : "que vos <b>vengás</b>" (accent final). En castillan standard : "que vengas". C\'est une subtilité que peu d\'étrangers maîtrisent. <b>Ojalá</b> vient de l\'arabe "inshallah" — toujours suivi du subjonctif. <b>Habría que</b> = il faudrait (conditionnel d\'obligation).',
          es: '<b>Le subjonctif français</b> se forme à partir de la 3e personne du pluriel du présent : ils vien<b>nent</b> → que je vien<b>ne</b>. Irréguliers importants : être → que je <b>sois</b>, avoir → que j\'<b>aie</b>, aller → que j\'<b>aille</b>. Ces 3 sont essentiels à mémoriser.'
        }
      }
    ]
  }

}; // fin window.LESSONS
