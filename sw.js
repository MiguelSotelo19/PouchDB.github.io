const CACHE_NAME = 'app-shell-v1';

const APP_SHELLS_ASSETS = [
    '/',
    '/index.html',
    '/main.js',
    '/app.js',
    '/style.css',
    '/img/192.png',
    '/img/512.png',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js'
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Archivos almacenados en caché");
            return cache.addAll(APP_SHELLS_ASSETS);
        })
    );
}); 