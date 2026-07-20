const CACHE_NAME = 'nihongo-v2';
const BASE = self.location.pathname.replace(/sw\.js$/, '');
const ASSETS = [
  '',
  'index.html',
  'css/style.css',
  'js/i18n.js',
  'js/data.js',
  'js/storage.js',
  'js/kana.js',
  'js/kanji.js',
  'js/grammar.js',
  'js/vocab.js',
  'js/reading.js',
  'js/exam.js',
  'js/admin.js',
  'js/app.js',
  'icon.svg',
  'manifest.json'
].map(a => BASE + a);

// Install: cache all static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
