const V = 'gita-v1';
const CORE = ['/', '/manifest.webmanifest', '/icon.svg',
  '/data/index.json',
  ...Array.from({length:18},(_,i)=>`/data/chapter-${String(i+1).padStart(2,'0')}.json`),
  '/fonts/tiro-devanagari-sanskrit-devanagari-400-normal.woff2',
  '/fonts/tiro-devanagari-sanskrit-latin-400-normal.woff2',
  '/fonts/tiro-devanagari-sanskrit-latin-ext-400-normal.woff2'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(V).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('/')))
  );
});
