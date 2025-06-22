// service-worker.js
// Cache essential assets for offline support
const CACHE_NAME = 'adarsh-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/Adarsh-pandey-portfolio-final.html',
  '/style.css',
  '/main.js',
  '/me.png'
  // Add more assets if needed (e.g., other images)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
