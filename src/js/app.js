//check if localhost or not
var isLocal = (window.location.hostname.includes("github")) ? false : true;

// check if current page is index.html
if (!window.location.href.includes("index.html")) {
    redirect();
}

// add the serviceWorker
var path = '';
if (isLocal) {
    path = "/sw.js";
} else {
    path = "/T5_50.003_SingHealth/sw.js";
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register(path).then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function redirect() {
    //check if logged in
    if (sessionStorage.getItem("role") != null) {
        console.log("User is signed in.");
    } else {
        console.log("No user is signed in.");
        if (isLocal) {
            window.location.href = "/index.html";
        } else {
            window.location.href = "/T5_50.003_SingHealth/index.html";
        }
    }
}