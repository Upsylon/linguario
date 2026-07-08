/* ===== sync.js — Firebase Auth + Firestore sync ===== */
const Sync = (() => {

  const PREFIXES = ['langapp:', 'lrio:', 'qs:'];
  let _auth = null;
  let _db   = null;
  let _user = null;

  /* ── Init ────────────────────────────────────────────────────────── */
  function init(config) {
    if (!window.firebase) return;
    try {
      const app = firebase.initializeApp(config);
      _auth = firebase.auth(app);
      _db   = firebase.firestore(app);
    } catch { return; }

    _auth.onAuthStateChanged(user => {
      _user = user;
      _updateBtn();
      if (user) _pull();
    });
  }

  /* ── Sign in / out ───────────────────────────────────────────────── */
  function signIn() {
    if (!_auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    _auth.signInWithPopup(provider).catch(() => {
      if (window.App) App.toast('Connexion annulée');
    });
  }

  function signOut() {
    if (!_auth) return;
    const mode = (() => { try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; } })();
    const msg  = mode === 'es-fr' ? '¿Desconectarse?' : 'Se déconnecter ?';
    if (!confirm(msg)) return;
    push().then(() => _auth.signOut());
  }

  /* ── Push / pull ─────────────────────────────────────────────────── */
  async function push() {
    if (!_user || !_db) return;
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && PREFIXES.some(p => k.startsWith(p))) data[k] = localStorage.getItem(k);
    }
    try { await _db.doc(`users/${_user.uid}`).set({ data, updatedAt: Date.now() }); }
    catch { /* offline — silent */ }
  }

  async function _pull() {
    if (!_user || !_db) return;
    try {
      const snap = await _db.doc(`users/${_user.uid}`).get();
      if (snap.exists) {
        const { data } = snap.data();
        if (data) Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
      }
      if (window.App) {
        const first = _user.displayName ? _user.displayName.split(' ')[0] : '';
        const mode  = (() => { try { return Storage.getProfile().mode || 'fr-es'; } catch { return 'fr-es'; } })();
        const msg   = snap.exists
          ? (mode === 'es-fr' ? `¡Bienvenido ${first}! Progreso restaurado.` : `Bienvenue ${first} ! Progression restaurée.`)
          : (mode === 'es-fr' ? `¡Hola ${first}! Progreso guardado en la nube.` : `Bonjour ${first} ! Progression sauvegardée.`);
        App.showHome();
        App.toast(msg);
      }
    } catch { /* offline */ }
  }

  /* ── Header button ───────────────────────────────────────────────── */
  function _updateBtn() {
    const btn = document.getElementById('sync-btn');
    if (!btn) return;
    if (_user) {
      const name = _user.displayName ? _user.displayName.split(' ')[0].slice(0, 9) : '●';
      btn.textContent = name;
      btn.title = 'Déconnecter / Sauvegarder';
      btn.classList.add('sync-signed-in');
    } else {
      btn.textContent = '☁';
      btn.title = 'Se connecter avec Google pour sauvegarder';
      btn.classList.remove('sync-signed-in');
    }
  }

  /* ── Public ──────────────────────────────────────────────────────── */
  function getUser()  { return _user; }
  function isReady()  { return !!_db; }

  return { init, signIn, signOut, push, getUser, isReady };
})();

window.Sync = Sync;
