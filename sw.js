const CACHE_NAME = 'dg-shop-v1';
const assetsToCache = [
  './index.html',
  './manifest.json',
  './Logo.jpg'
];

// Installation du Service Worker et mise en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Stratégie de chargement (Réseau d'abord, sinon cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Gestion des notifications push pour les nouveaux produits
self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : 'Nouvelle pièce disponible chez Djerianne Business !';
  const options = {
    body: data,
    icon: './Logo.jpg',
    badge: './Logo.jpg',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(
    self.registration.showNotification('DJERIANNE BUSINESS (DG)', options)
  );
});
