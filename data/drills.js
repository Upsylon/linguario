/* ===== drills.js — Grammar production drills (SRS) =====

   Fondement scientifique :
   - DeKeyser (2007) Skill Acquisition Theory : la connaissance déclarative
     (lire un tableau) doit devenir procédurale (produire automatiquement)
     via des exercices de récupération forcée sous contrainte temporelle.
   - Rohrer & Taylor (2007) : l'interleaving grammaire + vocab améliore
     la rétention de 43 % vs pratique bloquée par type.
   - VanPatten (1996) Input Processing : sans production, les formes
     grammaticales ne s'automatisent pas.

   Format : { id, mode:'fr-es'|'es-fr', unit, kind:'grammar', l1, l2 }
   - mode 'fr-es' : l1 = prompt en français, l2 = réponse en espagnol argentin
   - mode 'es-fr' : l1 = prompt en español,  l2 = réponse en français
*/

(function () {
window.DRILLS = [

/* ══════════════════════════════════════════════════════════════════════
   FR → ES  (francophone apprenant l'espagnol argentin)
══════════════════════════════════════════════════════════════════════ */

/* ── A1-1 : Conjugaison vos (présent) ──────────────────────────────── */
{ id:'drfe001', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'hablar → vos présent', l2:'hablás' },
{ id:'drfe002', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'comer → vos présent',  l2:'comés' },
{ id:'drfe003', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'vivir → vos présent',  l2:'vivís' },
{ id:'drfe004', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'tener → vos présent',  l2:'tenés' },
{ id:'drfe005', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'ser → vos présent',    l2:'sos' },
{ id:'drfe006', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'estar → vos présent',  l2:'estás' },
{ id:'drfe007', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'ir → vos présent',     l2:'vas' },
{ id:'drfe008', mode:'fr-es', unit:'a1-1', kind:'grammar',
  l1:'llamarse → vos présent', l2:'te llamás' },

/* ── A1-2 : Négation ────────────────────────────────────────────────── */
{ id:'drfe009', mode:'fr-es', unit:'a1-2', kind:'grammar',
  l1:'Je ne comprends pas. →', l2:'No entiendo.' },
{ id:'drfe010', mode:'fr-es', unit:'a1-2', kind:'grammar',
  l1:'Je ne sais pas. →',      l2:'No sé.' },
{ id:'drfe011', mode:'fr-es', unit:'a1-2', kind:'grammar',
  l1:'Je n\'y vais jamais. →', l2:'Nunca voy.' },
{ id:'drfe012', mode:'fr-es', unit:'a1-2', kind:'grammar',
  l1:'Il n\'y a rien. →',      l2:'No hay nada.' },
{ id:'drfe013', mode:'fr-es', unit:'a1-2', kind:'grammar',
  l1:'Personne ne vient. →',   l2:'Nadie viene.' },

/* ── A1-3 : Verbes réfléchis (vos présent) ─────────────────────────── */
{ id:'drfe014', mode:'fr-es', unit:'a1-3', kind:'grammar',
  l1:'levantarse → vos présent',   l2:'te levantás' },
{ id:'drfe015', mode:'fr-es', unit:'a1-3', kind:'grammar',
  l1:'bañarse → vos présent',      l2:'te bañás' },
{ id:'drfe016', mode:'fr-es', unit:'a1-3', kind:'grammar',
  l1:'despertarse → vos présent',  l2:'te despertás' },
{ id:'drfe017', mode:'fr-es', unit:'a1-3', kind:'grammar',
  l1:'acostarse → vos présent',    l2:'te acostás' },
{ id:'drfe018', mode:'fr-es', unit:'a1-3', kind:'grammar',
  l1:'vestirse → vos présent',     l2:'te vestís' },
{ id:'drfe019', mode:'fr-es', unit:'a1-3', kind:'grammar',
  l1:'trabajar → vos présent',     l2:'trabajás' },

/* ── A1-4 : Pronoms objets directs ─────────────────────────────────── */
{ id:'drfe020', mode:'fr-es', unit:'a1-4', kind:'grammar',
  l1:'Il me donne la carte. →',   l2:'Me da la carta.' },
{ id:'drfe021', mode:'fr-es', unit:'a1-4', kind:'grammar',
  l1:'Je le veux. →',             l2:'Lo quiero.' },
{ id:'drfe022', mode:'fr-es', unit:'a1-4', kind:'grammar',
  l1:'Tu me comprends ? (vos) →', l2:'¿Me entendés?' },
{ id:'drfe023', mode:'fr-es', unit:'a1-4', kind:'grammar',
  l1:'Il nous aide. →',           l2:'Nos ayuda.' },
{ id:'drfe024', mode:'fr-es', unit:'a1-4', kind:'grammar',
  l1:'Donne-le-moi. →',           l2:'Dámelo.' },

/* ── A1-5 : Impératif vos ───────────────────────────────────────────── */
{ id:'drfe025', mode:'fr-es', unit:'a1-5', kind:'grammar',
  l1:'Parle ! (vos, hablar) →',      l2:'¡Hablá!' },
{ id:'drfe026', mode:'fr-es', unit:'a1-5', kind:'grammar',
  l1:'Mange ! (vos, comer) →',       l2:'¡Comé!' },
{ id:'drfe027', mode:'fr-es', unit:'a1-5', kind:'grammar',
  l1:'Tourne ! (vos, doblar) →',     l2:'¡Doblá!' },
{ id:'drfe028', mode:'fr-es', unit:'a1-5', kind:'grammar',
  l1:'Viens ! (vos, venir) →',       l2:'¡Vení!' },
{ id:'drfe029', mode:'fr-es', unit:'a1-5', kind:'grammar',
  l1:'Descends ! (vos, bajar) →',    l2:'¡Bajá!' },
{ id:'drfe030', mode:'fr-es', unit:'a1-5', kind:'grammar',
  l1:'Assieds-toi ! (vos, sentarse) →', l2:'¡Sentate!' },

/* ── A1-6 : RE- intensificateur (lunfardo) ──────────────────────────── */
{ id:'drfe031', mode:'fr-es', unit:'a1-6', kind:'grammar',
  l1:'très beau (RE-) →',       l2:'re-lindo' },
{ id:'drfe032', mode:'fr-es', unit:'a1-6', kind:'grammar',
  l1:'très difficile (RE-) →',  l2:'re-difícil' },
{ id:'drfe033', mode:'fr-es', unit:'a1-6', kind:'grammar',
  l1:'vraiment cool (RE-) →',   l2:'re-copado' },
{ id:'drfe034', mode:'fr-es', unit:'a1-6', kind:'grammar',
  l1:'super bien (RE-) →',      l2:'rebién' },

/* ── A2-1 : Futur proche (ir a + inf) ──────────────────────────────── */
{ id:'drfe035', mode:'fr-es', unit:'a2-1', kind:'grammar',
  l1:'Je vais manger. → esp.',          l2:'Voy a comer.' },
{ id:'drfe036', mode:'fr-es', unit:'a2-1', kind:'grammar',
  l1:'Tu vas travailler ? (vos) →',     l2:'¿Vas a trabajar?' },
{ id:'drfe037', mode:'fr-es', unit:'a2-1', kind:'grammar',
  l1:'Il va arriver. →',                l2:'Va a llegar.' },
{ id:'drfe038', mode:'fr-es', unit:'a2-1', kind:'grammar',
  l1:'On va partir ce soir. →',         l2:'Vamos a salir esta noche.' },

/* ── A2-2 : DOLER (verbe comme gustar) ─────────────────────────────── */
{ id:'drfe039', mode:'fr-es', unit:'a2-2', kind:'grammar',
  l1:'J\'ai mal au dos. (doler) →',        l2:'Me duele la espalda.' },
{ id:'drfe040', mode:'fr-es', unit:'a2-2', kind:'grammar',
  l1:'Tu as mal à la tête. (vos) →',       l2:'Te duele la cabeza.' },
{ id:'drfe041', mode:'fr-es', unit:'a2-2', kind:'grammar',
  l1:'J\'ai mal aux pieds. (doler plur) →', l2:'Me duelen los pies.' },
{ id:'drfe042', mode:'fr-es', unit:'a2-2', kind:'grammar',
  l1:'Il a mal aux dents. →',              l2:'Le duelen los dientes.' },
{ id:'drfe043', mode:'fr-es', unit:'a2-2', kind:'grammar',
  l1:'Nous avons mal à l\'estomac. →',     l2:'Nos duele el estómago.' },

/* ── A2-3 : SER vs ESTAR ───────────────────────────────────────────── */
{ id:'drfe044', mode:'fr-es', unit:'a2-3', kind:'grammar',
  l1:'Elle est belle. (permanent → SER) →', l2:'Ella es linda.' },
{ id:'drfe045', mode:'fr-es', unit:'a2-3', kind:'grammar',
  l1:'Je suis fatigué(e). (état → ESTAR) →', l2:'Estoy cansado/a.' },
{ id:'drfe046', mode:'fr-es', unit:'a2-3', kind:'grammar',
  l1:'Il est médecin. (profession → SER) →', l2:'Es médico.' },
{ id:'drfe047', mode:'fr-es', unit:'a2-3', kind:'grammar',
  l1:'Il est content. (émotion → ESTAR) →',  l2:'Está contento.' },
{ id:'drfe048', mode:'fr-es', unit:'a2-3', kind:'grammar',
  l1:'L\'eau est chaude. (état temp → ESTAR) →', l2:'El agua está caliente.' },

/* ── A2-4 : Modaux tener que / hay que / deber ─────────────────────── */
{ id:'drfe049', mode:'fr-es', unit:'a2-4', kind:'grammar',
  l1:'Je dois partir. (tener que) →',           l2:'Tengo que irme.' },
{ id:'drfe050', mode:'fr-es', unit:'a2-4', kind:'grammar',
  l1:'Il faut étudier. (hay que) →',            l2:'Hay que estudiar.' },
{ id:'drfe051', mode:'fr-es', unit:'a2-4', kind:'grammar',
  l1:'Tu dois appeler. (vos + tener que) →',    l2:'Tenés que llamar.' },
{ id:'drfe052', mode:'fr-es', unit:'a2-4', kind:'grammar',
  l1:'On doit réserver. (deber, nosotros) →',   l2:'Debemos reservar.' },

/* ── A2-5 : SER/ESTAR avancé — événements et position ─────────────── */
{ id:'drfe053', mode:'fr-es', unit:'a2-5', kind:'grammar',
  l1:'La réunion est à 10h. (événement → SER) →', l2:'La reunión es a las 10.' },
{ id:'drfe054', mode:'fr-es', unit:'a2-5', kind:'grammar',
  l1:'Le livre est sur la table. (position → ESTAR) →', l2:'El libro está en la mesa.' },
{ id:'drfe055', mode:'fr-es', unit:'a2-5', kind:'grammar',
  l1:'Il est mort. (résultat → ESTAR) →',           l2:'Está muerto.' },
{ id:'drfe056', mode:'fr-es', unit:'a2-5', kind:'grammar',
  l1:'La porte est ouverte. →',                     l2:'La puerta está abierta.' },

/* ── A2-6 : Connecteurs discursifs ─────────────────────────────────── */
{ id:'drfe057', mode:'fr-es', unit:'a2-6', kind:'grammar',
  l1:'mais → espagnol',          l2:'pero' },
{ id:'drfe058', mode:'fr-es', unit:'a2-6', kind:'grammar',
  l1:'parce que → espagnol',     l2:'porque' },
{ id:'drfe059', mode:'fr-es', unit:'a2-6', kind:'grammar',
  l1:'donc / alors → espagnol',  l2:'entonces / así que' },
{ id:'drfe060', mode:'fr-es', unit:'a2-6', kind:'grammar',
  l1:'de plus → espagnol',       l2:'además' },
{ id:'drfe061', mode:'fr-es', unit:'a2-6', kind:'grammar',
  l1:'cependant → espagnol',     l2:'sin embargo' },
{ id:'drfe062', mode:'fr-es', unit:'a2-6', kind:'grammar',
  l1:'c\'est-à-dire → argentin', l2:'o sea' },

/* ── B1-1 : Pretérito simple argentin (≠ he hablado) ───────────────── */
{ id:'drfe063', mode:'fr-es', unit:'b1-1', kind:'grammar',
  l1:'hablar → yo, passé simple argentin', l2:'hablé' },
{ id:'drfe064', mode:'fr-es', unit:'b1-1', kind:'grammar',
  l1:'comer → yo, passé simple argentin',  l2:'comí' },
{ id:'drfe065', mode:'fr-es', unit:'b1-1', kind:'grammar',
  l1:'ir/ser → yo, passé simple argentin', l2:'fui' },
{ id:'drfe066', mode:'fr-es', unit:'b1-1', kind:'grammar',
  l1:'J\'ai mangé hier. → esp. argentin',  l2:'Comí ayer.' },
{ id:'drfe067', mode:'fr-es', unit:'b1-1', kind:'grammar',
  l1:'Elle n\'est jamais venue. → esp. argentin', l2:'Nunca vino.' },

/* ── B1-2 : Subjonctif présent ─────────────────────────────────────── */
{ id:'drfe068', mode:'fr-es', unit:'b1-2', kind:'grammar',
  l1:'Je veux que tu viennes. (vos, subj.) →', l2:'Quiero que vengás.' },
{ id:'drfe069', mode:'fr-es', unit:'b1-2', kind:'grammar',
  l1:'Je doute qu\'il soit là. →',             l2:'Dudo que esté.' },
{ id:'drfe070', mode:'fr-es', unit:'b1-2', kind:'grammar',
  l1:'Il faut que tu étudies. (vos, subj.) →', l2:'Es necesario que estudiés.' },
{ id:'drfe071', mode:'fr-es', unit:'b1-2', kind:'grammar',
  l1:'Bien qu\'il soit tard... →',             l2:'Aunque sea tarde...' },
{ id:'drfe072', mode:'fr-es', unit:'b1-2', kind:'grammar',
  l1:'C\'est important que tu saches. (vos) →', l2:'Es importante que sepás.' },


/* ══════════════════════════════════════════════════════════════════════
   ES → FR  (hispanohablante aprendiendo francés)
══════════════════════════════════════════════════════════════════════ */

/* ── A1-1 : Conjugaison française (présent) ────────────────────────── */
{ id:'dref001', mode:'es-fr', unit:'a1-1', kind:'grammar',
  l1:'parler → je, présent',  l2:'je parle' },
{ id:'dref002', mode:'es-fr', unit:'a1-1', kind:'grammar',
  l1:'être → je, présent',    l2:'je suis' },
{ id:'dref003', mode:'es-fr', unit:'a1-1', kind:'grammar',
  l1:'avoir → je, présent',   l2:'j\'ai' },
{ id:'dref004', mode:'es-fr', unit:'a1-1', kind:'grammar',
  l1:'aller → je, présent',   l2:'je vais' },
{ id:'dref005', mode:'es-fr', unit:'a1-1', kind:'grammar',
  l1:'faire → je, présent',   l2:'je fais' },
{ id:'dref006', mode:'es-fr', unit:'a1-1', kind:'grammar',
  l1:'pouvoir → je, présent', l2:'je peux' },

/* ── A1-2 : Négation française (ne...pas) ──────────────────────────── */
{ id:'dref007', mode:'es-fr', unit:'a1-2', kind:'grammar',
  l1:'No entiendo. → francés',      l2:'Je ne comprends pas.' },
{ id:'dref008', mode:'es-fr', unit:'a1-2', kind:'grammar',
  l1:'Nunca voy. → francés',        l2:'Je n\'y vais jamais.' },
{ id:'dref009', mode:'es-fr', unit:'a1-2', kind:'grammar',
  l1:'No hay nada. → francés',      l2:'Il n\'y a rien.' },
{ id:'dref010', mode:'es-fr', unit:'a1-2', kind:'grammar',
  l1:'Nadie viene. → francés',      l2:'Personne ne vient.' },
{ id:'dref011', mode:'es-fr', unit:'a1-2', kind:'grammar',
  l1:'No lo entiendo. → francés',   l2:'Je ne le comprends pas.' },

/* ── A1-3 : Pronom sujet obligatoire en français ────────────────────── */
{ id:'dref012', mode:'es-fr', unit:'a1-3', kind:'grammar',
  l1:'Trabajo. → francés (sujet obligatoire)',   l2:'Je travaille.' },
{ id:'dref013', mode:'es-fr', unit:'a1-3', kind:'grammar',
  l1:'¿Dónde vivís? → francés',                 l2:'Où tu habites ?' },
{ id:'dref014', mode:'es-fr', unit:'a1-3', kind:'grammar',
  l1:'Come mucho. (ella) → francés',             l2:'Elle mange beaucoup.' },
{ id:'dref015', mode:'es-fr', unit:'a1-3', kind:'grammar',
  l1:'Trabajamos todos. → francés',              l2:'Nous travaillons tous.' },
{ id:'dref016', mode:'es-fr', unit:'a1-3', kind:'grammar',
  l1:'¿Qué hacés? (vos) → francés',             l2:'Qu\'est-ce que tu fais ?' },

/* ── A1-4 : Pronoms COD/COI français ───────────────────────────────── */
{ id:'dref017', mode:'es-fr', unit:'a1-4', kind:'grammar',
  l1:'Lo quiero. → francés (COD)',    l2:'Je le veux.' },
{ id:'dref018', mode:'es-fr', unit:'a1-4', kind:'grammar',
  l1:'Me da la carta. → francés',    l2:'Il me donne la carte.' },
{ id:'dref019', mode:'es-fr', unit:'a1-4', kind:'grammar',
  l1:'No lo entiendo. → francés',    l2:'Je ne le comprends pas.' },
{ id:'dref020', mode:'es-fr', unit:'a1-4', kind:'grammar',
  l1:'Nos ayuda. → francés',         l2:'Il nous aide.' },

/* ── A1-5 : Impératif tu (français) ────────────────────────────────── */
{ id:'dref021', mode:'es-fr', unit:'a1-5', kind:'grammar',
  l1:'¡Hablá! → francés (tu)',     l2:'Parle !' },
{ id:'dref022', mode:'es-fr', unit:'a1-5', kind:'grammar',
  l1:'¡Comé! → francés (tu)',      l2:'Mange !' },
{ id:'dref023', mode:'es-fr', unit:'a1-5', kind:'grammar',
  l1:'¡Vení! → francés (tu)',      l2:'Viens !' },
{ id:'dref024', mode:'es-fr', unit:'a1-5', kind:'grammar',
  l1:'¡Andá! → francés (tu)',      l2:'Va !' },
{ id:'dref025', mode:'es-fr', unit:'a1-5', kind:'grammar',
  l1:'¡Sentate! → francés (tu)',   l2:'Assieds-toi !' },

/* ── A2-1 : Aller + infinitif (futur proche français) ──────────────── */
{ id:'dref026', mode:'es-fr', unit:'a2-1', kind:'grammar',
  l1:'Voy a comer. → francés',          l2:'Je vais manger.' },
{ id:'dref027', mode:'es-fr', unit:'a2-1', kind:'grammar',
  l1:'¿Vas a trabajar? → francés (tu)', l2:'Tu vas travailler ?' },
{ id:'dref028', mode:'es-fr', unit:'a2-1', kind:'grammar',
  l1:'Va a llegar. (ella) → francés',   l2:'Elle va arriver.' },
{ id:'dref029', mode:'es-fr', unit:'a2-1', kind:'grammar',
  l1:'Vamos a salir esta noche. → fr.', l2:'On va sortir ce soir.' },

/* ── A2-2 : Avoir mal à ─────────────────────────────────────────────── */
{ id:'dref030', mode:'es-fr', unit:'a2-2', kind:'grammar',
  l1:'Me duele la espalda. → francés',   l2:'J\'ai mal au dos.' },
{ id:'dref031', mode:'es-fr', unit:'a2-2', kind:'grammar',
  l1:'Te duele la cabeza. → francés',    l2:'Tu as mal à la tête.' },
{ id:'dref032', mode:'es-fr', unit:'a2-2', kind:'grammar',
  l1:'Me duelen los pies. → francés',    l2:'J\'ai mal aux pieds.' },
{ id:'dref033', mode:'es-fr', unit:'a2-2', kind:'grammar',
  l1:'Nos duele el estómago. → francés', l2:'Nous avons mal à l\'estomac.' },

/* ── A2-3 : C'est vs Il est ─────────────────────────────────────────── */
{ id:'dref034', mode:'es-fr', unit:'a2-3', kind:'grammar',
  l1:'Es una buena idea. → francés',       l2:'C\'est une bonne idée.' },
{ id:'dref035', mode:'es-fr', unit:'a2-3', kind:'grammar',
  l1:'Es interesante. (atributo) → fr.',   l2:'C\'est intéressant.' },
{ id:'dref036', mode:'es-fr', unit:'a2-3', kind:'grammar',
  l1:'Es médico. (profesión) → francés',   l2:'Il est médecin.' },
{ id:'dref037', mode:'es-fr', unit:'a2-3', kind:'grammar',
  l1:'Está cansado. → francés',            l2:'Il est fatigué.' },
{ id:'dref038', mode:'es-fr', unit:'a2-3', kind:'grammar',
  l1:'Es la primera vez. → francés',       l2:'C\'est la première fois.' },

/* ── A2-4 : Devoir / Il faut ────────────────────────────────────────── */
{ id:'dref039', mode:'es-fr', unit:'a2-4', kind:'grammar',
  l1:'Tengo que irme. → francés',      l2:'Je dois partir.' },
{ id:'dref040', mode:'es-fr', unit:'a2-4', kind:'grammar',
  l1:'Hay que estudiar. → francés',    l2:'Il faut étudier.' },
{ id:'dref041', mode:'es-fr', unit:'a2-4', kind:'grammar',
  l1:'Tenés que llamar. → francés (tu)', l2:'Tu dois appeler.' },
{ id:'dref042', mode:'es-fr', unit:'a2-4', kind:'grammar',
  l1:'Debemos reservar. → francés',    l2:'Nous devons réserver.' },

/* ── A2-5 : C'est / Il est avancé ──────────────────────────────────── */
{ id:'dref043', mode:'es-fr', unit:'a2-5', kind:'grammar',
  l1:'Es un buen libro. → francés',       l2:'C\'est un bon livre.' },
{ id:'dref044', mode:'es-fr', unit:'a2-5', kind:'grammar',
  l1:'Es difícil. (sin nombre) → fr.',    l2:'C\'est difficile.' },
{ id:'dref045', mode:'es-fr', unit:'a2-5', kind:'grammar',
  l1:'Es abogado. (profesión) → fr.',     l2:'Il est avocat.' },
{ id:'dref046', mode:'es-fr', unit:'a2-5', kind:'grammar',
  l1:'¿Qué hora es? → francés',           l2:'Quelle heure est-il ?' },

/* ── A2-6 : Connecteurs français ───────────────────────────────────── */
{ id:'dref047', mode:'es-fr', unit:'a2-6', kind:'grammar',
  l1:'pero → francés',          l2:'mais' },
{ id:'dref048', mode:'es-fr', unit:'a2-6', kind:'grammar',
  l1:'porque → francés',        l2:'parce que' },
{ id:'dref049', mode:'es-fr', unit:'a2-6', kind:'grammar',
  l1:'entonces / así que → fr.', l2:'donc / alors' },
{ id:'dref050', mode:'es-fr', unit:'a2-6', kind:'grammar',
  l1:'además → francés',        l2:'de plus / en outre' },
{ id:'dref051', mode:'es-fr', unit:'a2-6', kind:'grammar',
  l1:'sin embargo → francés',   l2:'cependant / pourtant' },

/* ── B1-1 : Passé composé avec avoir / être ─────────────────────────── */
{ id:'dref052', mode:'es-fr', unit:'b1-1', kind:'grammar',
  l1:'Comí ayer. → francés (passé composé)',      l2:'J\'ai mangé hier.' },
{ id:'dref053', mode:'es-fr', unit:'b1-1', kind:'grammar',
  l1:'Fui al mercado. → francés',                 l2:'Je suis allé(e) au marché.' },
{ id:'dref054', mode:'es-fr', unit:'b1-1', kind:'grammar',
  l1:'Ella nunca vino. → francés',                l2:'Elle n\'est jamais venue.' },
{ id:'dref055', mode:'es-fr', unit:'b1-1', kind:'grammar',
  l1:'¿Ya comiste? → francés',                    l2:'Tu as déjà mangé ?' },
{ id:'dref056', mode:'es-fr', unit:'b1-1', kind:'grammar',
  l1:'hablar → passé composé (j\')',               l2:'j\'ai parlé' },

/* ── B1-2 : Subjonctif présent français ─────────────────────────────── */
{ id:'dref057', mode:'es-fr', unit:'b1-2', kind:'grammar',
  l1:'Quiero que vengás. → francés',          l2:'Je veux que tu viennes.' },
{ id:'dref058', mode:'es-fr', unit:'b1-2', kind:'grammar',
  l1:'Es necesario que estudies. → fr.',      l2:'Il faut que tu étudies.' },
{ id:'dref059', mode:'es-fr', unit:'b1-2', kind:'grammar',
  l1:'Aunque sea tarde. → francés',           l2:'Bien qu\'il soit tarde.' },
{ id:'dref060', mode:'es-fr', unit:'b1-2', kind:'grammar',
  l1:'Dudo que esté. → francés',              l2:'Je doute qu\'il soit là.' },

];
})();
