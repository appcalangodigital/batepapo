// Service worker mínimo: permite instalar o chat no celular e mostrar avisos.
// Não guarda nada em cache.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

// Aviso com o app fechado (Web Push). O aviso chega sem texto: a frase é fixa.
self.addEventListener('push', (e) => {
  e.waitUntil(
    self.registration.showNotification('Chat Efêmero', {
      body: 'Alguém quer falar com você',
      tag: 'chat-aviso',
      renotify: true,
      vibrate: [200, 100, 200],
      icon: 'icon-192.png',
      badge: 'icon-192.png'
    })
  );
});

// Ao tocar na notificação, volta para o chat
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
