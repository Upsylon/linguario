/* ===== sw.js — Service Worker LinguaRío ===== */
const CACHE = 'linguario-v92';
const URLS  = [
  './', './index.html', './css/app.css',
  './js/storage.js', './js/srs.js', './js/i18n.js', './js/audio.js',
  './js/duel.js', './js/xp.js',
  './js/lesson-engine.js', './js/vocab.js',
  './js/vocab-practice.js', './js/app.js', './js/sync.js',
  './data/verbs.js', './data/curriculum-b1.js',
  './manifest.json', './icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
