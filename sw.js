const CACHE_NAME = 'my-cache-v1';

const URLS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './img/192.png',
    './img/512.png',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js', 
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(URLS);
            })
    );
});

self.addEventListener('fetch', (event) => {
    if(event.request.mode === 'navigate'){
        event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

