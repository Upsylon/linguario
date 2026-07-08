/* ===== verbs.js — Tables de conjugaison + exercices entrelacés =====
   ES_VERBS: 40 verbes espagnols argentin avec tables de conjugaison
   FR_VERBS: 40 verbes français avec tables de conjugaison
   Conjugaison ES: [yo, vos, él/ella, nosotros, ustedes, ellos]
   Argentine: pas de vosotros! vos au lieu de tú.
*/
(function() {

// ── VERBES ESPAGNOLS ────────────────────────────────────────────────
// Clés tense: pInd=présentIndicatif, pret=prétéritoIndéfini, imp=imparfait,
//             fut=futurSimple, cond=conditionnel, sub=subjPresent,
//             impVos=impératif vos, pp=participéPassé, aux=auxiliaire être/avoir
const ES_VERBS = {
  hablar: {
    fr:"parler", type:"ar-reg", level:"A1",
    pInd: ["hablo","hablás","habla","hablamos","hablan","hablan"],
    pret: ["hablé","hablaste","habló","hablamos","hablaron","hablaron"],
    imp:  ["hablaba","hablabas","hablaba","hablábamos","hablaban","hablaban"],
    fut:  ["hablaré","hablarás","hablará","hablaremos","hablarán","hablarán"],
    cond: ["hablaría","hablarías","hablaría","hablaríamos","hablarían","hablarían"],
    sub:  ["hable","hables","hable","hablemos","hablen","hablen"],
    impVos:"hablá", pp:"hablado"
  },
  comer: {
    fr:"manger", type:"er-reg", level:"A1",
    pInd: ["como","comés","come","comemos","comen","comen"],
    pret: ["comí","comiste","comió","comimos","comieron","comieron"],
    imp:  ["comía","comías","comía","comíamos","comían","comían"],
    fut:  ["comeré","comerás","comerá","comeremos","comerán","comerán"],
    cond: ["comería","comerías","comería","comeríamos","comerían","comerían"],
    sub:  ["coma","comas","coma","comamos","coman","coman"],
    impVos:"comé", pp:"comido"
  },
  vivir: {
    fr:"vivre", type:"ir-reg", level:"A1",
    pInd: ["vivo","vivís","vive","vivimos","viven","viven"],
    pret: ["viví","viviste","vivió","vivimos","vivieron","vivieron"],
    imp:  ["vivía","vivías","vivía","vivíamos","vivían","vivían"],
    fut:  ["viviré","vivirás","vivirá","viviremos","vivirán","vivirán"],
    cond: ["viviría","vivirías","viviría","viviríamos","vivirían","vivirían"],
    sub:  ["viva","vivas","viva","vivamos","vivan","vivan"],
    impVos:"viví", pp:"vivido"
  },
  ser: {
    fr:"être (permanent)", type:"irreg", level:"A1",
    pInd: ["soy","sos","es","somos","son","son"],
    pret: ["fui","fuiste","fue","fuimos","fueron","fueron"],
    imp:  ["era","eras","era","éramos","eran","eran"],
    fut:  ["seré","serás","será","seremos","serán","serán"],
    cond: ["sería","serías","sería","seríamos","serían","serían"],
    sub:  ["sea","seas","sea","seamos","sean","sean"],
    impVos:"sé", pp:"sido"
  },
  estar: {
    fr:"être (temporaire/lieu)", type:"irreg", level:"A1",
    pInd: ["estoy","estás","está","estamos","están","están"],
    pret: ["estuve","estuviste","estuvo","estuvimos","estuvieron","estuvieron"],
    imp:  ["estaba","estabas","estaba","estábamos","estaban","estaban"],
    fut:  ["estaré","estarás","estará","estaremos","estarán","estarán"],
    cond: ["estaría","estarías","estaría","estaríamos","estarían","estarían"],
    sub:  ["esté","estés","esté","estemos","estén","estén"],
    impVos:"está", pp:"estado"
  },
  tener: {
    fr:"avoir", type:"irreg", level:"A1",
    pInd: ["tengo","tenés","tiene","tenemos","tienen","tienen"],
    pret: ["tuve","tuviste","tuvo","tuvimos","tuvieron","tuvieron"],
    imp:  ["tenía","tenías","tenía","teníamos","tenían","tenían"],
    fut:  ["tendré","tendrás","tendrá","tendremos","tendrán","tendrán"],
    cond: ["tendría","tendrías","tendría","tendríamos","tendrían","tendrían"],
    sub:  ["tenga","tengas","tenga","tengamos","tengan","tengan"],
    impVos:"tené", pp:"tenido"
  },
  hacer: {
    fr:"faire", type:"irreg", level:"A1",
    pInd: ["hago","hacés","hace","hacemos","hacen","hacen"],
    pret: ["hice","hiciste","hizo","hicimos","hicieron","hicieron"],
    imp:  ["hacía","hacías","hacía","hacíamos","hacían","hacían"],
    fut:  ["haré","harás","hará","haremos","harán","harán"],
    cond: ["haría","harías","haría","haríamos","harían","harían"],
    sub:  ["haga","hagas","haga","hagamos","hagan","hagan"],
    impVos:"hacé", pp:"hecho"
  },
  ir: {
    fr:"aller", type:"irreg", level:"A1",
    pInd: ["voy","vas","va","vamos","van","van"],
    pret: ["fui","fuiste","fue","fuimos","fueron","fueron"],
    imp:  ["iba","ibas","iba","íbamos","iban","iban"],
    fut:  ["iré","irás","irá","iremos","irán","irán"],
    cond: ["iría","irías","iría","iríamos","irían","irían"],
    sub:  ["vaya","vayas","vaya","vayamos","vayan","vayan"],
    impVos:"andá", pp:"ido"
  },
  venir: {
    fr:"venir", type:"irreg", level:"A1",
    pInd: ["vengo","venís","viene","venimos","vienen","vienen"],
    pret: ["vine","viniste","vino","vinimos","vinieron","vinieron"],
    imp:  ["venía","venías","venía","veníamos","venían","venían"],
    fut:  ["vendré","vendrás","vendrá","vendremos","vendrán","vendrán"],
    cond: ["vendría","vendrías","vendría","vendríamos","vendrían","vendrían"],
    sub:  ["venga","vengas","venga","vengamos","vengan","vengan"],
    impVos:"vení", pp:"venido"
  },
  poder: {
    fr:"pouvoir", type:"irreg", level:"A1",
    pInd: ["puedo","podés","puede","podemos","pueden","pueden"],
    pret: ["pude","pudiste","pudo","pudimos","pudieron","pudieron"],
    imp:  ["podía","podías","podía","podíamos","podían","podían"],
    fut:  ["podré","podrás","podrá","podremos","podrán","podrán"],
    cond: ["podría","podrías","podría","podríamos","podrían","podrían"],
    sub:  ["pueda","puedas","pueda","podamos","puedan","puedan"],
    impVos:"podé", pp:"podido"
  },
  querer: {
    fr:"vouloir / aimer", type:"irreg", level:"A1",
    pInd: ["quiero","querés","quiere","queremos","quieren","quieren"],
    pret: ["quise","quisiste","quiso","quisimos","quisieron","quisieron"],
    imp:  ["quería","querías","quería","queríamos","querían","querían"],
    fut:  ["querré","querrás","querrá","querremos","querrán","querrán"],
    cond: ["querría","querrías","querría","querríamos","querrían","querrían"],
    sub:  ["quiera","quieras","quiera","queramos","quieran","quieran"],
    impVos:"quérete", pp:"querido"
  },
  saber: {
    fr:"savoir", type:"irreg", level:"A1",
    pInd: ["sé","sabés","sabe","sabemos","saben","saben"],
    pret: ["supe","supiste","supo","supimos","supieron","supieron"],
    imp:  ["sabía","sabías","sabía","sabíamos","sabían","sabían"],
    fut:  ["sabré","sabrás","sabrá","sabremos","sabrán","sabrán"],
    cond: ["sabría","sabrías","sabría","sabríamos","sabrían","sabrían"],
    sub:  ["sepa","sepas","sepa","sepamos","sepan","sepan"],
    impVos:"sabé", pp:"sabido"
  },
  decir: {
    fr:"dire", type:"irreg", level:"A1",
    pInd: ["digo","decís","dice","decimos","dicen","dicen"],
    pret: ["dije","dijiste","dijo","dijimos","dijeron","dijeron"],
    imp:  ["decía","decías","decía","decíamos","decían","decían"],
    fut:  ["diré","dirás","dirá","diremos","dirán","dirán"],
    cond: ["diría","dirías","diría","diríamos","dirían","dirían"],
    sub:  ["diga","digas","diga","digamos","digan","digan"],
    impVos:"decí", pp:"dicho"
  },
  ver: {
    fr:"voir", type:"irreg", level:"A1",
    pInd: ["veo","ves","ve","vemos","ven","ven"],
    pret: ["vi","viste","vio","vimos","vieron","vieron"],
    imp:  ["veía","veías","veía","veíamos","veían","veían"],
    fut:  ["veré","verás","verá","veremos","verán","verán"],
    cond: ["vería","verías","vería","veríamos","verían","verían"],
    sub:  ["vea","veas","vea","veamos","vean","vean"],
    impVos:"mirá", pp:"visto"
  },
  dar: {
    fr:"donner", type:"irreg", level:"A2",
    pInd: ["doy","das","da","damos","dan","dan"],
    pret: ["di","diste","dio","dimos","dieron","dieron"],
    imp:  ["daba","dabas","daba","dábamos","daban","daban"],
    fut:  ["daré","darás","dará","daremos","darán","darán"],
    cond: ["daría","darías","daría","daríamos","darían","darían"],
    sub:  ["dé","des","dé","demos","den","den"],
    impVos:"da", pp:"dado"
  },
  poner: {
    fr:"mettre", type:"irreg", level:"A2",
    pInd: ["pongo","ponés","pone","ponemos","ponen","ponen"],
    pret: ["puse","pusiste","puso","pusimos","pusieron","pusieron"],
    imp:  ["ponía","ponías","ponía","poníamos","ponían","ponían"],
    fut:  ["pondré","pondrás","pondrá","pondremos","pondrán","pondrán"],
    cond: ["pondría","pondrías","pondría","pondríamos","pondrían","pondrían"],
    sub:  ["ponga","pongas","ponga","pongamos","pongan","pongan"],
    impVos:"poné", pp:"puesto"
  },
  salir: {
    fr:"sortir / partir", type:"irreg", level:"A2",
    pInd: ["salgo","salís","sale","salimos","salen","salen"],
    pret: ["salí","saliste","salió","salimos","salieron","salieron"],
    imp:  ["salía","salías","salía","salíamos","salían","salían"],
    fut:  ["saldré","saldrás","saldrá","saldremos","saldrán","saldrán"],
    cond: ["saldría","saldrías","saldría","saldríamos","saldrían","saldrían"],
    sub:  ["salga","salgas","salga","salgamos","salgan","salgan"],
    impVos:"salí", pp:"salido"
  },
  llegar: {
    fr:"arriver", type:"ar-reg", level:"A1",
    pInd: ["llego","llegás","llega","llegamos","llegan","llegan"],
    pret: ["llegué","llegaste","llegó","llegamos","llegaron","llegaron"],
    imp:  ["llegaba","llegabas","llegaba","llegábamos","llegaban","llegaban"],
    fut:  ["llegaré","llegarás","llegará","llegaremos","llegarán","llegarán"],
    cond: ["llegaría","llegarías","llegaría","llegaríamos","llegarían","llegarían"],
    sub:  ["llegue","llegues","llegue","lleguemos","lleguen","lleguen"],
    impVos:"llegá", pp:"llegado"
  },
  trabajar: {
    fr:"travailler", type:"ar-reg", level:"A1",
    pInd: ["trabajo","trabajás","trabaja","trabajamos","trabajan","trabajan"],
    pret: ["trabajé","trabajaste","trabajó","trabajamos","trabajaron","trabajaron"],
    imp:  ["trabajaba","trabajabas","trabajaba","trabajábamos","trabajaban","trabajaban"],
    fut:  ["trabajaré","trabajarás","trabajará","trabajaremos","trabajarán","trabajarán"],
    cond: ["trabajaría","trabajarías","trabajaría","trabajaríamos","trabajarían","trabajarían"],
    sub:  ["trabaje","trabajes","trabaje","trabajemos","trabajen","trabajen"],
    impVos:"trabajá", pp:"trabajado"
  },
  estudiar: {
    fr:"étudier", type:"ar-reg", level:"A1",
    pInd: ["estudio","estudiás","estudia","estudiamos","estudian","estudian"],
    pret: ["estudié","estudiaste","estudió","estudiamos","estudiaron","estudiaron"],
    imp:  ["estudiaba","estudiabas","estudiaba","estudiábamos","estudiaban","estudiaban"],
    fut:  ["estudiaré","estudiarás","estudiará","estudiaremos","estudiarán","estudiarán"],
    cond: ["estudiaría","estudiarías","estudiaría","estudiaríamos","estudiarían","estudiarían"],
    sub:  ["estudie","estudies","estudie","estudiemos","estudien","estudien"],
    impVos:"estudiá", pp:"estudiado"
  },
  comprar: {
    fr:"acheter", type:"ar-reg", level:"A2",
    pInd: ["compro","comprás","compra","compramos","compran","compran"],
    pret: ["compré","compraste","compró","compramos","compraron","compraron"],
    imp:  ["compraba","comprabas","compraba","comprábamos","compraban","compraban"],
    fut:  ["compraré","comprarás","comprará","compraremos","comprarán","comprarán"],
    cond: ["compraría","comprarías","compraría","compraríamos","comprarían","comprarían"],
    sub:  ["compre","compres","compre","compremos","compren","compren"],
    impVos:"comprá", pp:"comprado"
  },
  escribir: {
    fr:"écrire", type:"ir-reg", level:"A2",
    pInd: ["escribo","escribís","escribe","escribimos","escriben","escriben"],
    pret: ["escribí","escribiste","escribió","escribimos","escribieron","escribieron"],
    imp:  ["escribía","escribías","escribía","escribíamos","escribían","escribían"],
    fut:  ["escribiré","escribirás","escribirá","escribiremos","escribirán","escribirán"],
    cond: ["escribiría","escribirías","escribiría","escribiríamos","escribirían","escribirían"],
    sub:  ["escriba","escribas","escriba","escribamos","escriban","escriban"],
    impVos:"escribí", pp:"escrito"
  },
  leer: {
    fr:"lire", type:"er-reg", level:"A2",
    pInd: ["leo","leés","lee","leemos","leen","leen"],
    pret: ["leí","leíste","leyó","leímos","leyeron","leyeron"],
    imp:  ["leía","leías","leía","leíamos","leían","leían"],
    fut:  ["leeré","leerás","leerá","leeremos","leerán","leerán"],
    cond: ["leería","leerías","leería","leeríamos","leerían","leerían"],
    sub:  ["lea","leas","lea","leamos","lean","lean"],
    impVos:"leé", pp:"leído"
  },
  pensar: {
    fr:"penser", type:"ar-irr-e-ie", level:"A2",
    pInd: ["pienso","pensás","piensa","pensamos","piensan","piensan"],
    pret: ["pensé","pensaste","pensó","pensamos","pensaron","pensaron"],
    imp:  ["pensaba","pensabas","pensaba","pensábamos","pensaban","pensaban"],
    fut:  ["pensaré","pensarás","pensará","pensaremos","pensarán","pensarán"],
    cond: ["pensaría","pensarías","pensaría","pensaríamos","pensarían","pensarían"],
    sub:  ["piense","pienses","piense","pensemos","piensen","piensen"],
    impVos:"pensá", pp:"pensado"
  },
  dormir: {
    fr:"dormir", type:"ir-irr", level:"A2",
    pInd: ["duermo","dormís","duerme","dormimos","duermen","duermen"],
    pret: ["dormí","dormiste","durmió","dormimos","durmieron","durmieron"],
    imp:  ["dormía","dormías","dormía","dormíamos","dormían","dormían"],
    fut:  ["dormiré","dormirás","dormirá","dormiremos","dormirán","dormirán"],
    cond: ["dormiría","dormirías","dormiría","dormiríamos","dormirían","dormirían"],
    sub:  ["duerma","duermas","duerma","durmamos","duerman","duerman"],
    impVos:"dormí", pp:"dormido"
  },
  volver: {
    fr:"revenir / rentrer", type:"er-irr-o-ue", level:"A2",
    pInd: ["vuelvo","volvés","vuelve","volvemos","vuelven","vuelven"],
    pret: ["volví","volviste","volvió","volvimos","volvieron","volvieron"],
    imp:  ["volvía","volvías","volvía","volvíamos","volvían","volvían"],
    fut:  ["volveré","volverás","volverá","volveremos","volverán","volverán"],
    cond: ["volvería","volverías","volvería","volveríamos","volverían","volverían"],
    sub:  ["vuelva","vuelvas","vuelva","volvamos","vuelvan","vuelvan"],
    impVos:"volvé", pp:"vuelto"
  },
  encontrar: {
    fr:"trouver / rencontrer", type:"ar-irr-o-ue", level:"A2",
    pInd: ["encuentro","encontrás","encuentra","encontramos","encuentran","encuentran"],
    pret: ["encontré","encontraste","encontró","encontramos","encontraron","encontraron"],
    imp:  ["encontraba","encontrabas","encontraba","encontrábamos","encontraban","encontraban"],
    fut:  ["encontraré","encontrarás","encontrará","encontraremos","encontrarán","encontrarán"],
    cond: ["encontraría","encontrarías","encontraría","encontraríamos","encontrarían","encontrarían"],
    sub:  ["encuentre","encuentres","encuentre","encontremos","encuentren","encuentren"],
    impVos:"encontrá", pp:"encontrado"
  },
  conocer: {
    fr:"connaître", type:"er-go", level:"A2",
    pInd: ["conozco","conocés","conoce","conocemos","conocen","conocen"],
    pret: ["conocí","conociste","conoció","conocimos","conocieron","conocieron"],
    imp:  ["conocía","conocías","conocía","conocíamos","conocían","conocían"],
    fut:  ["conoceré","conocerás","conocerá","conoceremos","conocerán","conocerán"],
    cond: ["conocería","conocerías","conocería","conoceríamos","conocerían","conocerían"],
    sub:  ["conozca","conozcas","conozca","conozcamos","conozcan","conozcan"],
    impVos:"conocé", pp:"conocido"
  },
  sentir: {
    fr:"sentir / ressentir", type:"ir-irr", level:"A2",
    pInd: ["siento","sentís","siente","sentimos","sienten","sienten"],
    pret: ["sentí","sentiste","sintió","sentimos","sintieron","sintieron"],
    imp:  ["sentía","sentías","sentía","sentíamos","sentían","sentían"],
    fut:  ["sentiré","sentirás","sentirá","sentiremos","sentirán","sentirán"],
    cond: ["sentiría","sentirías","sentiría","sentiríamos","sentirían","sentirían"],
    sub:  ["sienta","sientas","sienta","sintamos","sientan","sientan"],
    impVos:"sentí", pp:"sentido"
  },
  seguir: {
    fr:"suivre / continuer", type:"ir-irr-e-i", level:"A2",
    pInd: ["sigo","seguís","sigue","seguimos","siguen","siguen"],
    pret: ["seguí","seguiste","siguió","seguimos","siguieron","siguieron"],
    imp:  ["seguía","seguías","seguía","seguíamos","seguían","seguían"],
    fut:  ["seguiré","seguirás","seguirá","seguiremos","seguirán","seguirán"],
    cond: ["seguiría","seguirías","seguiría","seguiríamos","seguirían","seguirían"],
    sub:  ["siga","sigas","siga","sigamos","sigan","sigan"],
    impVos:"seguí", pp:"seguido"
  },
};

// ── VERBES FRANÇAIS ─────────────────────────────────────────────────
// Clés: pres=présent, pcAux=auxiliaire passé composé (avoir/être),
//       pc=participe passé, imp=imparfait, fut=futur, cond=conditionnel,
//       subj=subjonctif présent, imper=impératif tu
// Personnes: [je, tu, il/elle, nous, vous, ils/elles]
const FR_VERBS = {
  être: {
    es:"ser/estar", type:"irreg", level:"A1",
    pres: ["suis","es","est","sommes","êtes","sont"],
    pcAux:"avoir", pc:"été",
    imp:  ["étais","étais","était","étions","étiez","étaient"],
    fut:  ["serai","seras","sera","serons","serez","seront"],
    cond: ["serais","serais","serait","serions","seriez","seraient"],
    subj: ["sois","sois","soit","soyons","soyez","soient"],
    imper:"sois"
  },
  avoir: {
    es:"tener", type:"irreg", level:"A1",
    pres: ["ai","as","a","avons","avez","ont"],
    pcAux:"avoir", pc:"eu",
    imp:  ["avais","avais","avait","avions","aviez","avaient"],
    fut:  ["aurai","auras","aura","aurons","aurez","auront"],
    cond: ["aurais","aurais","aurait","aurions","auriez","auraient"],
    subj: ["aie","aies","ait","ayons","ayez","aient"],
    imper:"aie"
  },
  aller: {
    es:"ir", type:"irreg", level:"A1",
    pres: ["vais","vas","va","allons","allez","vont"],
    pcAux:"être", pc:"allé",
    imp:  ["allais","allais","allait","allions","alliez","allaient"],
    fut:  ["irai","iras","ira","irons","irez","iront"],
    cond: ["irais","irais","irait","irions","iriez","iraient"],
    subj: ["aille","ailles","aille","allions","alliez","aillent"],
    imper:"va"
  },
  faire: {
    es:"hacer", type:"irreg", level:"A1",
    pres: ["fais","fais","fait","faisons","faites","font"],
    pcAux:"avoir", pc:"fait",
    imp:  ["faisais","faisais","faisait","faisions","faisiez","faisaient"],
    fut:  ["ferai","feras","fera","ferons","ferez","feront"],
    cond: ["ferais","ferais","ferait","ferions","feriez","feraient"],
    subj: ["fasse","fasses","fasse","fassions","fassiez","fassent"],
    imper:"fais"
  },
  venir: {
    es:"venir", type:"irreg", level:"A1",
    pres: ["viens","viens","vient","venons","venez","viennent"],
    pcAux:"être", pc:"venu",
    imp:  ["venais","venais","venait","venions","veniez","venaient"],
    fut:  ["viendrai","viendras","viendra","viendrons","viendrez","viendront"],
    cond: ["viendrais","viendrais","viendrait","viendrions","viendriez","viendraient"],
    subj: ["vienne","viennes","vienne","venions","veniez","viennent"],
    imper:"viens"
  },
  pouvoir: {
    es:"poder", type:"irreg", level:"A1",
    pres: ["peux","peux","peut","pouvons","pouvez","peuvent"],
    pcAux:"avoir", pc:"pu",
    imp:  ["pouvais","pouvais","pouvait","pouvions","pouviez","pouvaient"],
    fut:  ["pourrai","pourras","pourra","pourrons","pourrez","pourront"],
    cond: ["pourrais","pourrais","pourrait","pourrions","pourriez","pourraient"],
    subj: ["puisse","puisses","puisse","puissions","puissiez","puissent"],
    imper:"—"
  },
  vouloir: {
    es:"querer", type:"irreg", level:"A1",
    pres: ["veux","veux","veut","voulons","voulez","veulent"],
    pcAux:"avoir", pc:"voulu",
    imp:  ["voulais","voulais","voulait","voulions","vouliez","voulaient"],
    fut:  ["voudrai","voudras","voudra","voudrons","voudrez","voudront"],
    cond: ["voudrais","voudrais","voudrait","voudrions","voudriez","voudraient"],
    subj: ["veuille","veuilles","veuille","voulions","vouliez","veuillent"],
    imper:"veuille"
  },
  savoir: {
    es:"saber", type:"irreg", level:"A1",
    pres: ["sais","sais","sait","savons","savez","savent"],
    pcAux:"avoir", pc:"su",
    imp:  ["savais","savais","savait","savions","saviez","savaient"],
    fut:  ["saurai","sauras","saura","saurons","saurez","sauront"],
    cond: ["saurais","saurais","saurait","saurions","sauriez","sauraient"],
    subj: ["sache","saches","sache","sachions","sachiez","sachent"],
    imper:"sache"
  },
  dire: {
    es:"decir", type:"irreg", level:"A1",
    pres: ["dis","dis","dit","disons","dites","disent"],
    pcAux:"avoir", pc:"dit",
    imp:  ["disais","disais","disait","disions","disiez","disaient"],
    fut:  ["dirai","diras","dira","dirons","direz","diront"],
    cond: ["dirais","dirais","dirait","dirions","diriez","diraient"],
    subj: ["dise","dises","dise","disions","disiez","disent"],
    imper:"dis"
  },
  voir: {
    es:"ver", type:"irreg", level:"A1",
    pres: ["vois","vois","voit","voyons","voyez","voient"],
    pcAux:"avoir", pc:"vu",
    imp:  ["voyais","voyais","voyait","voyions","voyiez","voyaient"],
    fut:  ["verrai","verras","verra","verrons","verrez","verront"],
    cond: ["verrais","verrais","verrait","verrions","verriez","verraient"],
    subj: ["voie","voies","voie","voyions","voyiez","voient"],
    imper:"vois"
  },
  parler: {
    es:"hablar", type:"er-reg", level:"A1",
    pres: ["parle","parles","parle","parlons","parlez","parlent"],
    pcAux:"avoir", pc:"parlé",
    imp:  ["parlais","parlais","parlait","parlions","parliez","parlaient"],
    fut:  ["parlerai","parleras","parlera","parlerons","parlerez","parleront"],
    cond: ["parlerais","parlerais","parlerait","parlerions","parleriez","parleraient"],
    subj: ["parle","parles","parle","parlions","parliez","parlent"],
    imper:"parle"
  },
  manger: {
    es:"comer", type:"er-reg", level:"A1",
    pres: ["mange","manges","mange","mangeons","mangez","mangent"],
    pcAux:"avoir", pc:"mangé",
    imp:  ["mangeais","mangeais","mangeait","mangions","mangiez","mangeaient"],
    fut:  ["mangerai","mangeras","mangera","mangerons","mangerez","mangeront"],
    cond: ["mangerais","mangerais","mangerait","mangerions","mangeriez","mangeraient"],
    subj: ["mange","manges","mange","mangions","mangiez","mangent"],
    imper:"mange"
  },
  travailler: {
    es:"trabajar", type:"er-reg", level:"A1",
    pres: ["travaille","travailles","travaille","travaillons","travaillez","travaillent"],
    pcAux:"avoir", pc:"travaillé",
    imp:  ["travaillais","travaillais","travaillait","travaillions","travailliez","travaillaient"],
    fut:  ["travaillerai","travailleras","travaillera","travaillerons","travaillerez","travailleront"],
    cond: ["travaillerais","travaillerais","travaillerait","travaillerions","travailleriez","travailleraient"],
    subj: ["travaille","travailles","travaille","travaillions","travailliez","travaillent"],
    imper:"travaille"
  },
  partir: {
    es:"partir / irse", type:"ir-group3", level:"A2",
    pres: ["pars","pars","part","partons","partez","partent"],
    pcAux:"être", pc:"parti",
    imp:  ["partais","partais","partait","partions","partiez","partaient"],
    fut:  ["partirai","partiras","partira","partirons","partirez","partiront"],
    cond: ["partirais","partirais","partirait","partirions","partiriez","partiraient"],
    subj: ["parte","partes","parte","partions","partiez","partent"],
    imper:"pars"
  },
  prendre: {
    es:"tomar / agarrar", type:"irreg", level:"A2",
    pres: ["prends","prends","prend","prenons","prenez","prennent"],
    pcAux:"avoir", pc:"pris",
    imp:  ["prenais","prenais","prenait","prenions","preniez","prenaient"],
    fut:  ["prendrai","prendras","prendra","prendrons","prendrez","prendront"],
    cond: ["prendrais","prendrais","prendrait","prendrions","prendriez","prendraient"],
    subj: ["prenne","prennes","prenne","prenions","preniez","prennent"],
    imper:"prends"
  },
  finir: {
    es:"terminar", type:"ir-reg", level:"A2",
    pres: ["finis","finis","finit","finissons","finissez","finissent"],
    pcAux:"avoir", pc:"fini",
    imp:  ["finissais","finissais","finissait","finissions","finissiez","finissaient"],
    fut:  ["finirai","finiras","finira","finirons","finirez","finiront"],
    cond: ["finirais","finirais","finirait","finirions","finiriez","finiraient"],
    subj: ["finisse","finisses","finisse","finissions","finissiez","finissent"],
    imper:"finis"
  },
  vendre: {
    es:"vender", type:"re-reg", level:"A2",
    pres: ["vends","vends","vend","vendons","vendez","vendent"],
    pcAux:"avoir", pc:"vendu",
    imp:  ["vendais","vendais","vendait","vendions","vendiez","vendaient"],
    fut:  ["vendrai","vendras","vendra","vendrons","vendrez","vendront"],
    cond: ["vendrais","vendrais","vendrait","vendrions","vendriez","vendraient"],
    subj: ["vende","vendes","vende","vendions","vendiez","vendent"],
    imper:"vends"
  },
  dormir: {
    es:"dormir", type:"ir-group3", level:"A2",
    pres: ["dors","dors","dort","dormons","dormez","dorment"],
    pcAux:"avoir", pc:"dormi",
    imp:  ["dormais","dormais","dormait","dormions","dormiez","dormaient"],
    fut:  ["dormirai","dormiras","dormira","dormirons","dormirez","dormiront"],
    cond: ["dormirais","dormirais","dormirait","dormirions","dormiriez","dormiraient"],
    subj: ["dorme","dormes","dorme","dormions","dormiez","dorment"],
    imper:"dors"
  },
  écrire: {
    es:"escribir", type:"irreg", level:"A2",
    pres: ["écris","écris","écrit","écrivons","écrivez","écrivent"],
    pcAux:"avoir", pc:"écrit",
    imp:  ["écrivais","écrivais","écrivait","écrivions","écriviez","écrivaient"],
    fut:  ["écrirai","écriras","écrira","écrirons","écrirez","écriront"],
    cond: ["écrirais","écrirais","écrirait","écririons","écririez","écriraient"],
    subj: ["écrive","écrives","écrive","écrivions","écriviez","écrivent"],
    imper:"écris"
  },
  lire: {
    es:"leer", type:"irreg", level:"A2",
    pres: ["lis","lis","lit","lisons","lisez","lisent"],
    pcAux:"avoir", pc:"lu",
    imp:  ["lisais","lisais","lisait","lisions","lisiez","lisaient"],
    fut:  ["lirai","liras","lira","lirons","lirez","liront"],
    cond: ["lirais","lirais","lirait","lirions","liriez","liraient"],
    subj: ["lise","lises","lise","lisions","lisiez","lisent"],
    imper:"lis"
  },
};

// ── GÉNÉRATEUR D'EXERCICES ───────────────────────────────────────────
const SUBJECTS_ES = ["yo","vos","él/ella","nosotros","ustedes","ellos"];
const SUBJECTS_ES_LABELS = ["Yo","Vos","Él/Ella","Nosotros","Ustedes","Ellos"];
const SUBJECTS_FR = ["je","tu","il/elle","nous","vous","ils/elles"];
const SUBJECTS_FR_LABELS = ["Je","Tu","Il/Elle","Nous","Vous","Ils/Elles"];

const TENSE_LABELS_ES = {
  pInd:"présent de l'indicatif",
  pret:"prétérit (passé simple)",
  imp:"imparfait",
  fut:"futur simple",
  cond:"conditionnel",
  sub:"subjonctif présent",
  impVos:"impératif (vos)"
};

const TENSE_LABELS_FR = {
  pres:"présent de l'indicatif",
  pc:"passé composé",
  imp:"imparfait",
  fut:"futur simple",
  cond:"conditionnel présent",
  subj:"subjonctif présent"
};

function buildESExercises() {
  const exs = [];
  let idx = 0;
  Object.entries(ES_VERBS).forEach(([verb, data]) => {
    // Exercices pour chaque temps
    ['pInd','pret','imp','fut','cond','sub'].forEach(tense => {
      if (!data[tense]) return;
      data[tense].forEach((form, i) => {
        if (tense === 'pInd' && i === 0) return; // skip 'yo' du présent (moins utile AR)
        const subj = SUBJECTS_ES_LABELS[i];
        exs.push({
          id: `es_${verb}_${tense}_${i}_${idx++}`,
          lang: 'es',
          verb,
          verbFr: data.fr,
          tense,
          tenseLabel: TENSE_LABELS_ES[tense],
          subject: subj,
          prompt: `${subj} ___ (${verb} — ${TENSE_LABELS_ES[tense]})`,
          answer: form,
          level: data.level || 'A2',
          hint: `${verb} → ${data.type}`
        });
      });
      // Impératif vos
      if (tense === 'pInd' && data.impVos) {
        exs.push({
          id: `es_${verb}_impVos_${idx++}`,
          lang: 'es',
          verb,
          verbFr: data.fr,
          tense: 'impVos',
          tenseLabel: TENSE_LABELS_ES.impVos,
          subject: '¡Vos!',
          prompt: `¡Vos! ___ (${verb} — impératif)`,
          answer: data.impVos,
          level: data.level || 'A2',
          hint: `-ar→-á, -er→-é, -ir→-í (accent obligatoire)`
        });
      }
    });
  });
  return exs;
}

function buildFRExercises() {
  const exs = [];
  let idx = 0;
  Object.entries(FR_VERBS).forEach(([verb, data]) => {
    ['pres','imp','fut','cond','subj'].forEach(tense => {
      if (!data[tense]) return;
      data[tense].forEach((form, i) => {
        const subj = SUBJECTS_FR_LABELS[i];
        exs.push({
          id: `fr_${verb}_${tense}_${i}_${idx++}`,
          lang: 'fr',
          verb,
          verbEs: data.es,
          tense,
          tenseLabel: TENSE_LABELS_FR[tense],
          subject: subj,
          prompt: `${subj} ___ (${verb} — ${TENSE_LABELS_FR[tense]})`,
          answer: form,
          level: data.level || 'A2',
          hint: `${verb} → ${data.type}`
        });
      });
      // Passé composé
      if (tense === 'pres' && data.pc) {
        ['ai','as','a','avons','avez','ont'].forEach((aux, i) => {
          const realAux = data.pcAux === 'être'
            ? ['suis','es','est','sommes','êtes','sont'][i]
            : aux;
          exs.push({
            id: `fr_${verb}_pc_${i}_${idx++}`,
            lang: 'fr',
            verb,
            verbEs: data.es,
            tense: 'pc',
            tenseLabel: 'passé composé',
            subject: SUBJECTS_FR_LABELS[i],
            prompt: `${SUBJECTS_FR_LABELS[i]} ___ (${verb} — passé composé)`,
            answer: `${realAux} ${data.pc}`,
            level: data.level || 'A2',
            hint: `aux. ${data.pcAux} + ${data.pc}`
          });
        });
      }
    });
  });
  return exs;
}

window.ES_VERBS = ES_VERBS;
window.FR_VERBS = FR_VERBS;
window.ES_EXERCISES = buildESExercises();
window.FR_EXERCISES = buildFRExercises();

// Groupes de temps pour l'entrelacement (A1 d'abord, A2 après)
window.ES_TENSE_GROUPS = {
  A1: ['pInd','impVos'],
  A2: ['pret','imp','fut'],
  B1: ['cond','sub']
};
window.FR_TENSE_GROUPS = {
  A1: ['pres','pc'],
  A2: ['imp','fut'],
  B1: ['cond','subj']
};

})();
