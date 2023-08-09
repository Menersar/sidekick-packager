// These will be replaced at build-time by generate-service-worker-plugin.js
const ASSETS = ["","js/download-project.307880fa10fd08800082.worker.js","assets/reset.1b7c2728718a119273c903df95ab4c2a.svg","assets/default-icon.290e09e569a1cab8e61ba93b0d23863f.png","js/vendors~icns~jszip~sha256.45d79f17e909e6d47b0e.js","js/icns.ddff1f925efd18aed929.js","js/jszip.41ecc138b10fe9350a55.js","js/p4.eb9de8d6b953daae66d9.js","js/packager-options-ui.d8badbd52948b5935482.js","js/sha256.65a53bbd4b259520122b.js"];
const CACHE_NAME = "p4-5518c37dd1f7d41c95f90a9cee041c221064ef7c2195de6df1c1000423cf7e8e";
const IS_PRODUCTION = true;

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
