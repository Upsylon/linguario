/* ===== chunks.js — 200 groupes de mots / collocations FR ↔ Espagnol Argentin =====

   Fondement scientifique :
   - Lewis (1993) "Lexical Approach" : les chunks sont mémorisés comme unités
   - Nation (2001) : les collocations améliorent la fluidité et la précision
   - Wray (2002) : les expressions formulaïques sont traitées plus vite par le cerveau
   - Ellis (2001) : l'apprentissage par chunks > mots isolés pour la production authentique

   Format : [id, l1_fr, l2_es_ar, level, category]
   Les chunks sont appris comme des unités, pas décomposés mot à mot.
*/
(function() {
const RAW_CHUNKS = [

// ══ CATÉGORIE: SALUTATIONS & INTERACTIONS DE BASE (A1) ════════════════
["ch001","Bonjour, comment tu vas ?","¡Hola! ¿Cómo estás?","A1","salutations"],
["ch002","Je vais bien, merci. Et toi ?","Estoy bien, gracias. ¿Y vos?","A1","salutations"],
["ch003","Je m'appelle...","Me llamo...","A1","salutations"],
["ch004","Comment tu t'appelles ?","¿Cómo te llamás?","A1","salutations"],
["ch005","Enchanté(e) de te rencontrer.","Mucho gusto en conocerte.","A1","salutations"],
["ch006","Tu viens d'où ?","¿De dónde sos?","A1","salutations"],
["ch007","Je suis de France / d'Argentine.","Soy de Francia / de Argentina.","A1","salutations"],
["ch008","Tu as quel âge ?","¿Cuántos años tenés?","A1","salutations"],
["ch009","J'ai ... ans.","Tengo ... años.","A1","salutations"],
["ch010","À tout à l'heure !","¡Hasta ahora!","A1","salutations"],
["ch011","À demain !","¡Hasta mañana!","A1","salutations"],
["ch012","Bonne nuit !","¡Buenas noches!","A1","salutations"],
["ch013","Bonne chance !","¡Buena suerte! / ¡Éxitos!","A1","salutations"],
["ch014","Bon appétit !","¡Buen provecho!","A1","salutations"],
["ch015","Santé ! (toast)","¡Salud!","A1","salutations"],

// ══ CATÉGORIE: DEMANDER / RÉPONDRE (A1) ══════════════════════════════
["ch016","Je ne comprends pas.","No entiendo.","A1","communication"],
["ch017","Pouvez-vous répéter, s'il vous plaît ?","¿Podés repetir, por favor?","A1","communication"],
["ch018","Plus lentement, s'il vous plaît.","Más despacio, por favor.","A1","communication"],
["ch019","Comment dit-on ... en espagnol ?","¿Cómo se dice ... en español?","A1","communication"],
["ch020","Qu'est-ce que ça veut dire ?","¿Qué significa esto?","A1","communication"],
["ch021","Je ne sais pas.","No sé.","A1","communication"],
["ch022","D'accord ! / OK !","¡Dale! / ¡Está bien!","A1","communication"],
["ch023","Bien sûr !","¡Claro! / ¡Obvio!","A1","communication"],
["ch024","Pas de problème.","No hay problema.","A1","communication"],
["ch025","Excusez-moi / Pardon.","Disculpá / Perdón.","A1","communication"],

// ══ CATÉGORIE: COLLOCATIONS AVEC « TENER » (A1) ══════════════════════
["ch026","avoir faim","tener hambre","A1","collocation-tener"],
["ch027","avoir soif","tener sed","A1","collocation-tener"],
["ch028","avoir sommeil","tener sueño","A1","collocation-tener"],
["ch029","avoir froid","tener frío","A1","collocation-tener"],
["ch030","avoir chaud","tener calor","A1","collocation-tener"],
["ch031","avoir peur de quelque chose","tener miedo de algo","A1","collocation-tener"],
["ch032","avoir envie de + infinitif","tener ganas de + infinitivo","A1","collocation-tener"],
["ch033","avoir ... ans","tener ... años","A1","collocation-tener"],
["ch034","avoir raison","tener razón","A1","collocation-tener"],
["ch035","avoir tort","no tener razón / estar equivocado/a","A1","collocation-tener"],
["ch036","devoir faire quelque chose","tener que + infinitivo","A1","collocation-tener"],
["ch037","avoir lieu / se passer","tener lugar","A2","collocation-tener"],
["ch038","prendre soin de","tener cuidado con / cuidar de","A2","collocation-tener"],
["ch039","avoir de la patience","tener paciencia","A2","collocation-tener"],
["ch040","avoir confiance en","tener confianza en","A2","collocation-tener"],

// ══ CATÉGORIE: COLLOCATIONS AVEC « HACER » (A1) ══════════════════════
["ch041","faire une question","hacer una pregunta","A1","collocation-hacer"],
["ch042","faire du sport","hacer deporte","A1","collocation-hacer"],
["ch043","faire un voyage","hacer un viaje","A1","collocation-hacer"],
["ch044","faire les courses","hacer las compras","A1","collocation-hacer"],
["ch045","faire chaud / froid (météo)","hacer calor / frío","A1","collocation-hacer"],
["ch046","faire beau","hacer lindo (AR) / hacer buen tiempo","A1","collocation-hacer"],
["ch047","faire attention","tener cuidado / prestar atención","A1","collocation-hacer"],
["ch048","faire une pause","hacer una pausa / tomar un descanso","A2","collocation-hacer"],
["ch049","faire la sieste","hacer la siesta","A2","collocation-hacer"],
["ch050","faire confiance à","confiar en / hacer confianza en","A2","collocation-hacer"],

// ══ CATÉGORIE: COLLOCATIONS AVEC « IR » (A1) ═════════════════════════
["ch051","aller au travail","ir al trabajo / ir a laburar (AR)","A1","collocation-ir"],
["ch052","aller à l'école","ir al colegio / ir a la escuela","A1","collocation-ir"],
["ch053","aller faire du shopping","ir de compras","A1","collocation-ir"],
["ch054","aller chez quelqu'un","ir a lo de alguien (AR) / ir a casa de alguien","A1","collocation-ir"],
["ch055","aller mieux","estar mejor / mejorar","A1","collocation-ir"],
["ch056","aller au lit","irse a dormir / acostarse","A1","collocation-ir"],
["ch057","aller + infinitif (futur proche)","ir a + infinitivo","A1","collocation-ir"],
["ch058","comment ça va ?","¿cómo te va? / ¿qué onda? (AR)","A1","collocation-ir"],

// ══ CATÉGORIE: COLLOCATIONS AVEC « ESTAR » (A1) ══════════════════════
["ch059","être d'accord","estar de acuerdo","A1","collocation-estar"],
["ch060","être en train de + inf","estar + gerundio","A1","collocation-estar"],
["ch061","être en vacances","estar de vacaciones","A1","collocation-estar"],
["ch062","être fatigué(e)","estar cansado/a","A1","collocation-estar"],
["ch063","être occupé(e)","estar ocupado/a","A1","collocation-estar"],
["ch064","être en retard","estar tarde / llegar tarde","A1","collocation-estar"],
["ch065","être à la maison","estar en casa","A1","collocation-estar"],
["ch066","être debout / levé(e)","estar despierto/a","A1","collocation-estar"],
["ch067","être malade","estar enfermo/a","A1","collocation-estar"],
["ch068","être amoureux de","estar enamorado/a de","A2","collocation-estar"],

// ══ CATÉGORIE: VIE QUOTIDIENNE (A1-A2) ═══════════════════════════════
["ch069","prendre le bus / métro","tomar el colectivo / el subte (AR)","A1","vie-quotidienne"],
["ch070","prendre un café","tomar un café","A1","vie-quotidienne"],
["ch071","écouter de la musique","escuchar música","A1","vie-quotidienne"],
["ch072","regarder un film","ver una película","A1","vie-quotidienne"],
["ch073","lire un livre","leer un libro","A1","vie-quotidienne"],
["ch074","envoyer un message","mandar un mensaje (AR) / enviar un mensaje","A1","vie-quotidienne"],
["ch075","appeler quelqu'un","llamar a alguien / darle un llamado a alguien (AR)","A1","vie-quotidienne"],
["ch076","se lever tôt","levantarse temprano","A1","vie-quotidienne"],
["ch077","aller se coucher","irse a dormir / acostarse","A1","vie-quotidienne"],
["ch078","prendre une douche","darse una ducha / ducharse","A1","vie-quotidienne"],
["ch079","faire à manger / cuisiner","cocinar / preparar la comida","A1","vie-quotidienne"],
["ch080","payer l'addition","pagar la cuenta","A1","vie-quotidienne"],
["ch081","demander l'addition","pedir la cuenta","A1","vie-quotidienne"],
["ch082","réserver une table","reservar una mesa","A2","vie-quotidienne"],
["ch083","commander un plat","pedir un plato","A1","vie-quotidienne"],
["ch084","je voudrais...","quisiera... / me gustaría...","A1","vie-quotidienne"],
["ch085","pour moi, ce sera...","para mí, ...","A1","vie-quotidienne"],

// ══ CATÉGORIE: AU RESTAURANT / CAFÉ (A1-A2) ══════════════════════════
["ch086","l'addition, s'il vous plaît","¿me traés la cuenta? (AR) / la cuenta, por favor","A1","restaurant"],
["ch087","combien ça coûte ?","¿cuánto cuesta? / ¿cuánto sale? (AR)","A1","restaurant"],
["ch088","C'est délicieux !","¡Está muy rico! (AR) / ¡Está delicioso!","A1","restaurant"],
["ch089","Je suis végétarien(ne).","Soy vegetariano/a.","A1","restaurant"],
["ch090","Vous avez quelque chose sans...?","¿Tienen algo sin...?","A2","restaurant"],
["ch091","Je suis allergique à...","Soy alérgico/a a...","A2","restaurant"],
["ch092","Un verre d'eau, s'il vous plaît.","Un vaso de agua, por favor.","A1","restaurant"],
["ch093","Je mange ici / Je prends à emporter.","Como acá / Lo pido para llevar.","A1","restaurant"],

// ══ CATÉGORIE: DANS LA RUE / TRANSPORT (A1-A2) ════════════════════════
["ch094","Où est la station de métro ?","¿Dónde está la estación de subte? (AR)","A1","transport"],
["ch095","Comment est-ce que j'arrive à... ?","¿Cómo llego a...?","A1","transport"],
["ch096","Tournez à gauche / droite.","Doblá a la izquierda / derecha. (AR)","A1","transport"],
["ch097","Continuez tout droit.","Seguí derecho. (AR)","A1","transport"],
["ch098","C'est à combien de temps à pied ?","¿Cuánto tarda a pie?","A1","transport"],
["ch099","Je suis perdu(e).","Estoy perdido/a.","A1","transport"],
["ch100","À quelle heure part le prochain bus ?","¿A qué hora sale el próximo colectivo? (AR)","A2","transport"],

// ══ CATÉGORIE: EXPRESSIONS ARGENTINES ESSENTIELLES (A2) ══════════════
["ch101","Quoi de neuf ? / Ça va ?","¿Qué onda?","A2","argentin"],
["ch102","Tout va bien.","Todo bien / Todo joya.","A2","argentin"],
["ch103","Trop cool ! / Super !","¡Qué copado/a!","A2","argentin"],
["ch104","Hé ! (interpeller)","¡Che!","A2","argentin"],
["ch105","Mon pote / Mon ami (amical)","Che boludo / loco (entre amis)","A2","argentin"],
["ch106","Laisse tomber / T'en fais pas.","No le des bola.","A2","argentin"],
["ch107","Je tiens bon / Je gère.","Me la banco.","A2","argentin"],
["ch108","Travailler dur / Galérer.","Remar / Remarla.","A2","argentin"],
["ch109","Boire du maté.","Tomar mate.","A2","argentin"],
["ch110","Aller à un barbecue argentin.","Ir a un asado.","A2","argentin"],
["ch111","On se retrouve samedi.","Quedamos para el sábado.","A2","argentin"],
["ch112","Je t'envoie un message.","Te mando un mensaje.","A2","argentin"],
["ch113","Tu me préviens quand tu arrives.","Me avisás cuando llegás.","A2","argentin"],
["ch114","J'arrive dans un moment.","Vengo en un rato.","A2","argentin"],
["ch115","Vraiment ? / Sans blague ?","¿En serio? / ¿De verdad?","A2","argentin"],
["ch116","C'est-à-dire... / En fait...","O sea... (AR)","A2","argentin"],
["ch117","J'ai vraiment aimé.","Me re gustó. (AR: 're' = intensificateur)","A2","argentin"],
["ch118","Tiens donc ! / Pas possible !","¡Mirá vos!","A2","argentin"],
["ch119","Pas question ! / Jamais de la vie !","¡Ni en pedo! (AR)","A2","argentin"],
["ch120","Bon... / Ben... (résignation)","Y bueno...","A2","argentin"],
["ch121","Profite du fait que...","Aprovechá que... (AR)","A2","argentin"],
["ch122","N'oublie pas de...","Acordate de... (AR: reflexif de 'vos')","A2","argentin"],
["ch123","Fais comme tu veux.","Hacé lo que quieras. (AR)","A2","argentin"],
["ch124","Ne t'inquiète pas.","No te preocupés. (AR: vos)","A2","argentin"],
["ch125","Il me semble que...","A mí me parece que... (AR)","A2","argentin"],

// ══ CATÉGORIE: TRAVAIL / ÉTUDES (A2) ═════════════════════════════════
["ch126","chercher du travail","buscar trabajo / buscar laburo (AR)","A2","travail"],
["ch127","trouver un emploi","conseguir trabajo","A2","travail"],
["ch128","demander une augmentation","pedir un aumento","A2","travail"],
["ch129","avoir une réunion","tener una reunión","A2","travail"],
["ch130","envoyer un e-mail","mandar un correo (AR) / enviar un email","A2","travail"],
["ch131","prendre un rendez-vous","sacar un turno (AR) / tomar una cita","A2","travail"],
["ch132","passer un examen","rendir un examen (AR) / hacer un examen","A2","travail"],
["ch133","réussir un examen","aprobar un examen","A2","travail"],
["ch134","rater un examen","desaprobar / reprobar un examen","A2","travail"],
["ch135","faire des heures supplémentaires","hacer horas extra","A2","travail"],
["ch136","prendre des vacances","tomar vacaciones / salir de vacaciones","A2","travail"],
["ch137","être au chômage","estar desempleado/a / estar sin laburo (AR)","A2","travail"],

// ══ CATÉGORIE: SANTÉ (A2) ════════════════════════════════════════════
["ch138","j'ai mal à la tête","me duele la cabeza","A1","santé"],
["ch139","j'ai de la fièvre","tengo fiebre","A1","santé"],
["ch140","je me sens mal","me siento mal","A1","santé"],
["ch141","j'ai besoin d'un médecin","necesito un médico","A1","santé"],
["ch142","aller chez le médecin","ir al médico / ir al doctor","A1","santé"],
["ch143","prendre un médicament","tomar un remedio (AR) / tomar un medicamento","A1","santé"],
["ch144","se remettre d'une maladie","recuperarse de una enfermedad","A2","santé"],
["ch145","être en bonne santé","estar bien de salud / tener buena salud","A2","santé"],

// ══ CATÉGORIE: STRUCTURES GRAMMATICALES CLÉS (A2) ════════════════════
["ch146","je suis en train de + infinitif","estoy + gerundio","A2","grammaire"],
["ch147","je viens de + infinitif","acabo de + infinitivo","A2","grammaire"],
["ch148","je vais + infinitif (futur proche)","voy a + infinitivo","A1","grammaire"],
["ch149","il faut + infinitif","hay que + infinitivo","A1","grammaire"],
["ch150","je dois + infinitif","tengo que + infinitivo","A1","grammaire"],
["ch151","j'aimerais + infinitif","me gustaría + infinitivo","A2","grammaire"],
["ch152","j'espère que + indicatif","espero que + subjuntivo","A2","grammaire"],
["ch153","je crois que + indicatif","creo que + indicativo","A2","grammaire"],
["ch154","même si + indicatif","aunque + indicativo/subjuntivo","A2","grammaire"],
["ch155","depuis + durée","hace + tiempo + que / desde hace + tiempo","A2","grammaire"],
["ch156","j'aime + nom/infinitif","me gusta/gustan + sustantivo/infinitivo","A1","grammaire"],
["ch157","j'adore + nom/infinitif","me encanta/encantan + sustantivo/infinitivo","A1","grammaire"],
["ch158","ça ne me plaît pas","no me gusta","A1","grammaire"],
["ch159","ça m'est égal","me da igual / me da lo mismo","A2","grammaire"],
["ch160","si + présent, + futur","si + presente, + futuro","A2","grammaire"],
["ch161","avant de + infinitif","antes de + infinitivo","A2","grammaire"],
["ch162","après avoir + participe passé","después de + infinitivo","A2","grammaire"],
["ch163","pour que + subjonctif","para que + subjuntivo","A2","grammaire"],
["ch164","peut-être + indicatif","a lo mejor + indicativo / quizás + indicativo","A2","grammaire"],
["ch165","ce serait bien de...","sería bueno + infinitivo","A2","grammaire"],

// ══ CATÉGORIE: ÉMOTIONS & OPINIONS (A2) ══════════════════════════════
["ch166","Quelle dommage !","¡Qué lástima!","A1","émotions"],
["ch167","Quel soulagement !","¡Qué alivio!","A2","émotions"],
["ch168","Je suis content(e) que...","Me alegra que... / Estoy contento/a de que...","A2","émotions"],
["ch169","Je suis désolé(e) que...","Lamento que... / Me da pena que...","A2","émotions"],
["ch170","Ça me fait plaisir.","Me alegra. / Me da alegría.","A2","émotions"],
["ch171","Ça m'énerve.","Me molesta. / Me carga. (AR)","A2","émotions"],
["ch172","Je suis fier/fière de toi.","Estoy orgulloso/a de vos. (AR)","A2","émotions"],
["ch173","J'en ai assez !","¡Estoy harto/a! / ¡Ya fue! (AR)","A2","émotions"],
["ch174","À mon avis...","En mi opinión... / A mi parecer...","A2","opinions"],
["ch175","Je suis d'accord.","Estoy de acuerdo.","A1","opinions"],
["ch176","Je ne suis pas d'accord.","No estoy de acuerdo.","A1","opinions"],
["ch177","Ça dépend.","Depende.","A1","opinions"],
["ch178","C'est possible.","Es posible.","A1","opinions"],
["ch179","C'est une bonne idée.","Es una buena idea.","A1","opinions"],
["ch180","Qu'est-ce que tu en penses ?","¿Qué pensás? / ¿Qué te parece? (AR)","A2","opinions"],

// ══ CATÉGORIE: CONNECTEURS DISCURSIFS (A2) ═══════════════════════════
["ch181","Tout d'abord...","En primer lugar... / Primero...","A2","connecteurs"],
["ch182","Ensuite...","Después... / Luego...","A2","connecteurs"],
["ch183","Finalement...","Por fin... / Finalmente...","A2","connecteurs"],
["ch184","Par contre / En revanche","En cambio / Por otro lado","A2","connecteurs"],
["ch185","Cependant / Pourtant","Sin embargo / A pesar de eso","A2","connecteurs"],
["ch186","C'est pourquoi...","Por eso... / Es por eso que...","A2","connecteurs"],
["ch187","De plus...","Además...","A2","connecteurs"],
["ch188","En fait...","En realidad... / De hecho...","A2","connecteurs"],
["ch189","Par exemple...","Por ejemplo...","A1","connecteurs"],
["ch190","C'est-à-dire...","Es decir... / O sea... (AR)","A2","connecteurs"],

// ══ CATÉGORIE: INVITATIONS / SUGGESTIONS (A2) ════════════════════════
["ch191","On se voit quand ?","¿Cuándo nos vemos?","A2","social"],
["ch192","Tu veux aller... ?","¿Querés ir a...? (AR)","A2","social"],
["ch193","Ça t'intéresse de... ?","¿Te copa... ? (AR) / ¿Te interesa...?","A2","social"],
["ch194","Ce soir, tu es libre ?","¿Esta noche estás libre?","A2","social"],
["ch195","Avec plaisir !","¡Con mucho gusto! / ¡Dale, vamos!","A2","social"],
["ch196","Malheureusement, je ne peux pas.","Lamentablemente, no puedo.","A2","social"],
["ch197","Une autre fois, peut-être.","Otra vez, quizás.","A2","social"],
["ch198","Ça dépend de l'heure.","Depende de la hora.","A2","social"],
["ch199","Je vais voir si je suis libre.","Voy a ver si estoy libre.","A2","social"],
["ch200","Disons qu'on se retrouve à...","Quedemos a las... en... (AR)","A2","social"],
];

// Convertit en objets exploitables
window.CHUNKS_FR_ES = RAW_CHUNKS.map(([id, l1, l2, level, cat]) => ({
  id,
  kind: 'chunk',      // distincts des cartes vocab
  l1,                  // en français
  l2,                  // en espagnol argentin
  pos: 'expr',
  level,
  category: cat,
  tags: [level, cat, 'chunk'],
  note: null
}));

// Direction inverse ES→FR (même chunks, l1/l2 inversés)
window.CHUNKS_ES_FR = RAW_CHUNKS.map(([id, l1, l2, level, cat]) => ({
  id: id + '_r',
  kind: 'chunk',
  l1: l2,              // en espagnol argentin
  l2: l1,              // en français
  pos: 'expr',
  level,
  category: cat,
  tags: [level, cat, 'chunk'],
  note: null
}));

})();
