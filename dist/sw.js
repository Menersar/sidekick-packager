// These will be replaced at build-time by generate-service-worker-plugin.js
const ASSETS = ["","js/download-project.worker.js","assets/reset.1b7c2728718a119273c903df95ab4c2a.svg","assets/default-icon.290e09e569a1cab8e61ba93b0d23863f.png","js/icns.js","js/jszip.js","js/p4.js","js/packager-options-ui.js","js/sha256.js","js/vendors~icns~jszip.js","js/vendors~icns~jszip~sha256.js"];
const CACHE_NAME = "p4-8f0ced6a4393e901c36f19fe079ea2437ba709bdd92e765e22ea2cc0fb736cfe";
const IS_PRODUCTION = false;

const base = location.pathname.substr(0, location.pathname.indexOf('sw.js'));

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS.map(i => i === '' ? base : i))));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(i => i !== CACHE_NAME).map(i => caches.delete(i))))
  );
});

const fetchWithTimeout = (req) => new Promise((resolve, reject) => {
  const timeout = setTimeout(reject, 5000);
  fetch(req)
    .then((res) => {
      clearTimeout(timeout);
      resolve(res);
    })
    .catch((err) => {
      clearTimeout(timeout);
      reject(err);
    });
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  const relativePathname = url.pathname.substr(base.length);
  if (IS_PRODUCTION && ASSETS.includes(relativePathname)) {
    url.search = '';
    const immutable = !!relativePathname;
    if (immutable) {
      event.respondWith(
        caches.match(new Request(url)).then((res) => res || fetch(event.request))
      );
    } else {
      event.respondWith(
        fetchWithTimeout(event.request).catch(() => caches.match(new Request(url)))
      );
    }
  }
});
