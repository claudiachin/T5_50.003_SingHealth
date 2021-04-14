var url = window.location.href;
params = url.split('?')[1].split('&');
data = {};
for (i = 0; i < params.length; i++) {
    var tmp = params[i].split('=');
    data[tmp[0]] = decodeURIComponent(tmp[1]);
}
document.getElementById('tenant-name').innerHTML = data.name;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBl1hU_vW6IbzkF0XTqvnBlWyLrTmgybns",
    authDomain: "singhealth-221e6.firebaseapp.com",
    projectId: "singhealth-221e6",
    appId: "1:684333425325:web:59bbff097942477f599c24",
    measurementId: "G-SYJWNBX65P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

db.settings({ timestampsInSnapshots: true });

var tenantID = localStorage.getItem("tenantID");

db.collection("tenants").doc(tenantID).get().then((doc) => {
    document.getElementById("location").innerHTML = doc.data().hospital + ", " + doc.data().location;
    document.getElementById("type").innerHTML = doc.data().type;
    var owners = doc.data().owners;
    var ownersString = '';
    for (i = 0; i < owners.length; i++) {
        ownersString += owners[i] + "\n"
    }
    document.getElementById("owners").innerHTML = ownersString;
    //var expiry = new Date(doc.data().expiry.seconds * 1000);
    //document.getElementById("expiry").innerHTML = expiry.toDateString();
}).catch((error) => {
    console.log("Error getting document:", error);
});



function openContract() {
    console.log("open contract");
}

function selectReport(report) {
    localStorage.setItem("reportID", report.id);
    localStorage.setItem("prevUrl", window.location.href);
    localStorage.setItem("reportName", report.firstChild.firstChild.innerHTML);
    localStorage.setItem("reportDate", report.firstChild.lastChild.innerHTML);
    window.location.href = 'view_report/start.html';
}
