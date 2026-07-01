const CACHE_VERSION = "hridaya-v3"; // Build chesinappudu v1, v2 ani marchu
const STATIC_CACHE = `hridaya-static-${CACHE_VERSION}`;

// Nee daggara unna files anni ikkada pettu
const urlsToCache = [
  "/", // root
  "index.html",
  "manifest.json",
  "icon-192.png",  // nee icon peru pettu
  "icon-512.png",
  // nee css/js bundle peru - vite aithe /assets/index-abc123.js la untadi
  // Exact peru teliyakapothe DevTools > Network lo chudu
];

// Install: App shell cache chey
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log("Caching core files");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Kottha SW vaste direct activate
});

// Activate: Paatha cache antha lepeyyi
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-While-Revalidate strategy
// Ante: Cache nunchi fast ga ichi, background lo net nunchi update chesukovadam
self.addEventListener("fetch", event => {
  // POST requests ni cache cheyoddu
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        // Background lo fetch chey
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Kottha response vaste cache update chey
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {}); // Offline aithe error vaddu

        // Cache unte adhe ivvu, lekapothe network wait chey
        return cachedResponse || fetchPromise;
      });
    })
  );
});
