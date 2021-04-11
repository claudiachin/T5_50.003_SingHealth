// add the serviceWorker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./T5_50.003_SingHealth/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}