urlsToCache = [
  './',
  './index.html',
  './src/html/info.html',
  './src/html/home.html',
  './src/html/directory.html',
  './src/html/announcements.html',
  './src/html/announcement_view.html',
  './src/html/announcement_editor.html',
  './src/html/pastreports.html',
  './src/html/trends.html',

  './src/css/style.css',
  './src/css/index.css',
  './src/css/bell.css',
  './src/css/file-document.css',
  './src/css/create_report.css',

  './src/js/app.js',
  './src/js/create_report_start.js',
  './src/js/create_report.js',
  './src/js/makechart.js',
  './src/js/index.js',
  './src/js/multiselect.js',

  './src/resources/SingHealth_Logo.png',
  '/src/resources/AddPicture.JPG',
  './src/resources/AddPictureOrange.jpg',
  './src/resources/profile.png',
  'src/resources/singhealth_icon_144.png',
  'src/resources/singhealth_icon_192.png',
  'src/resources/singhealth_icon_512.png',
  './src/resources/undraw_Working_oh83.svg',

  'https://kit.fontawesome.com/215800797e.js',
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('singhealth')
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
  );
  //return self.clients.claim();
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

          caches.open('singhealth')
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
    })
  );
});