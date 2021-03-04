self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app')
      .then(function(cache) {
        cache.addAll([
          './',
          './index.html',
          './info.html',
          './directory.html',
          './announcements.html',
          './trends.html',
          './src/css/style.css',
          './src/css/index.css',
          './src/js/app.js',
          './src/resources/SingHealth_Logo.png',
          './pastreports.html',
          './announcements.html',
        ])
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        return res;
      })
  );
});