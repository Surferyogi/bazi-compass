/* BaZi Compass service worker — offline cache. Bump CACHE when files change. */
const CACHE = 'bazi-compass-v2026-06-15c';
const ASSETS = [
  './', './index.html', './manifest.json', './lunar.js',
  './icon-192.png', './icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      // cache same-origin successful responses + the CDN engine
      const url = e.request.url;
      if (res.ok && (url.startsWith(self.location.origin) || url.includes('lunar-javascript'))) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
