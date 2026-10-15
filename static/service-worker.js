// F. Frizzy Calculator service worker

const CACHE_NAME = "f-frizzy-calculator-v1";

const FILES_TO_CACHE = [
    "/",
    "/static/style.css",
    "/static/script.js",
    "/static/manifest.json",
    "/static/icon.svg"
];

// Install the service worker and cache essential files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activate the service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );

    self.clients.claim();
});

// Serve cached files when offline
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});