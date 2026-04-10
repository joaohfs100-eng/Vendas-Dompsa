// ─── Vendas Dompsa - Service Worker ──────────────────────────────────────────
const CACHE_NAME = 'vendas-dompsa-v1';
const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// ─── INSTALL: pré-cacheia os assets essenciais ────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando assets essenciais...');
      return cache.addAll(CACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })))
        .catch(err => {
          console.warn('[SW] Falha ao cachear alguns assets:', err);
        });
    })
  );
  self.skipWaiting();
});

// ─── ACTIVATE: limpa caches antigos ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// ─── FETCH: estratégia Cache First com fallback para rede ────────────────────
self.addEventListener('fetch', event => {
  // Ignorar requisições não-GET e extensões de browser
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;
  if (event.request.url.includes('whatsapp') || event.request.url.includes('api.whatsapp')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Retorna do cache e atualiza em background (stale-while-revalidate)
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cached);

        return cached;
      }

      // Não está no cache: busca na rede e cacheia
      return fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback: retorna o index.html cacheado
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});

// ─── BACKGROUND SYNC (para futuras melhorias) ─────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-vendas') {
    console.log('[SW] Background sync: vendas');
  }
});

// ─── PUSH NOTIFICATIONS (base para futuras melhorias) ────────────────────────
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title || 'Vendas Dompsa', {
      body: data.body || '',
      icon: './icons/icon-192x192.png',
      badge: './icons/apple-touch-icon-72x72.png',
      vibrate: [100, 50, 100],
    });
  }
});
