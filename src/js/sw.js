self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('first-app')
      .then(function (cache) {
        cache.addAll([
          '../../index.html',
          '../html/info.html',
          '../html/home.html',
          '../html/directory.html',
          '../html/announcements.html',
          '../html/announcement_view.html',
          '../html/announcement_editor.html',
          '../html/pastreports.html',
          '../html/trends.html',
          '../html/create_report/start.html',

          '../css/style.css',
          '../css/index.css',
          '../css/bell.css',
          '../css/file-document.css',
          '../css/create_report.css',

          '../js/app.js',
          '../js/create_report_start.js',
          '../js/create_report.js',
          '../js/makechart.js',
          '../js/index.js',
          '../js/multiselect.js',

          '../resources/SingHealth_Logo.png',
          '../resources/AddPicture.JPG',
          '../resources/AddPictureOrange.jpg',
          '../resources/profile.png',
          '../resources/undraw_Working_oh83.svg',
          'https://kit.fontawesome.com/215800797e.js',
        ])
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }

      return fetch(event.request).then(
        function (response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          var responseToCache = response.clone();

          caches.open('first-app')
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
    })
  );
});
