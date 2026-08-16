/* BaZi Compass service worker.
   Strategy:
     • the page (index.html) is NETWORK-FIRST — so a newly deployed version appears on the
       next open when you're online, with no cache-clearing. Falls back to cache when offline.
     • static assets (engine, icons, manifest) are cache-first with a quiet background refresh.
   Full offline capability is preserved. Bump CACHE when the bundled assets change. */
const CACHE = 'bazi-compass-v2026-06-15f';
const ASSETS = [
  './', './index.html', './manifest.json', './lunar.js',
  './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isPageRequest(req){
  if (req.mode === 'navigate') return true;
  const accept = req.headers.get('accept') || '';
  return accept.includes('text/html');
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // NETWORK-FIRST for the app page: always try the latest, fall back to cache offline.
  if (isPageRequest(req)) {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() =>
        caches.match(req)
          .then(hit => hit || caches.match('./index.html'))
          .then(hit => hit || caches.match('./'))
      )
    );
    return;
  }

  // CACHE-FIRST (with background refresh) for assets + the CDN engine.
  e.respondWith(
    caches.match(req).then(hit => {
      const network = fetch(req).then(res => {
        const url = req.url;
        if (res && res.ok && (url.startsWith(self.location.origin) || url.includes('lunar-javascript'))) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});
