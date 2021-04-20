
const trend = document.querySelector("#trends");
const report = document.querySelector("#new-report");
const list = document.querySelector("#tenantreportlist");
const tendirectory = document.querySelector("#directorybutton");
//const auditornav = document.querySelector("#navbarauditors");

var Boo = function () {
    window.location.href = 'directory_tenant.html';
}

if (sessionStorage.getItem("role") === "tenants") {
    trend.style.display = "none";
    report.style.display = "none";
    list.style.display = "block";
    tendirectory.setAttribute("onClick", "javascript: Boo();");
    //tendirectory.onclick="window.location.href='directory_tenant.html';";
}

//check if localhost or not
var isLocal = false;
if (window.location.hostname.includes("github")) {
    console.log(window.location.hostname);
    isLocal = false;
} else {
    console.log(window.location.hostname);
    isLocal = true;
}

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