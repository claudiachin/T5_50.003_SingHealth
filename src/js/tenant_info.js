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

var tenantID = sessionStorage.getItem("tenantID");

db.collection("tenants").doc(tenantID).get().then((doc) => {
    document.getElementById("location").innerHTML = doc.data().hospital + ", " + doc.data().location;
    document.getElementById("type").innerHTML = doc.data().type;
    document.getElementById("store").innerHTML = doc.data().branch;
    document.getElementById("owners").innerHTML = doc.data().name;
    var expiry = new Date(doc.data().tenancyExpiry.seconds * 1000);
    document.getElementById("expiry").innerHTML = expiry.toDateString();

}).catch((error) => {
    console.log("Error getting document:", error);
});

db.collection("reports").orderBy("dateCreated").get().then((querySnapshot) => {
    var count = 1;
    querySnapshot.forEach((doc) => {
        if (doc.data().associatedTenant == tenantID) {
            var report = document.createElement("p");
            var reportText = document.createTextNode("Report #" + count);
            report.appendChild(reportText);

            var toRectify = document.createElement("p");
            var toRectifyCount = 0;
            toRectifyCount += doc.data().professionalism_staff_hygiene_resolved.filter((v) => (v === false)).length;
            toRectifyCount += doc.data().housekeeping_general_cleanliness_resolved.filter((v) => (v === false)).length;
            toRectifyCount += doc.data().workplace_safety_health_resolved.filter((v) => (v === false)).length;
            if (doc.data().type == "F&B") {
                toRectifyCount += doc.data().food_hygiene_resolved.filter((v) => (v === false)).length;
                toRectifyCount += doc.data().healthier_choice_resolved.filter((v) => (v === false)).length;
            }
            toRectifyCount += doc.data().covid_resolved.filter((v) => (v === false)).length;
            var toRectifyText = document.createTextNode("No. of items left to rectify: " + toRectifyCount);
            toRectify.appendChild(toRectifyText);

            var date = document.createElement("h6");
            var dateData = new Date(doc.data().dateCreated.seconds * 1000);
            var dateText = document.createTextNode(dateData.toDateString());
            date.appendChild(dateText);

            var sect = document.createElement("div");
            sect.appendChild(report);
            sect.appendChild(toRectify);
            sect.appendChild(date);

            var icon = document.createElement("div");
            icon.innerHTML = '<i class="fas fa-chevron-right"></i>'

            var card = document.createElement("div");
            card.appendChild(sect)
            card.appendChild(icon);
            card.classList.add("card");
            card.id = doc.id;
            card.onclick = function () { selectReport(this) };
            if (sessionStorage.getItem("role") == "tenants") {
                sessionStorage.setItem("auditorID", doc.data().associatedAuditor);
            } else {
                sessionStorage.setItem("tenantID", doc.data().associatedTenant);
            }

            var split = document.createElement("hr");

            var list = document.getElementById("list");
            list.insertBefore(split, list.firstChild);
            list.insertBefore(card, list.firstChild);

            count += 1;
        }
    })
});

function openContract() {
    console.log("open contract");
}

function selectReport(report) {
    sessionStorage.setItem("reportID", report.id);
    sessionStorage.setItem("prevUrl", window.location.href);
    sessionStorage.setItem("reportName", report.firstChild.firstChild.innerHTML);
    sessionStorage.setItem("reportDate", report.firstChild.lastChild.innerHTML);
    window.location.href = 'view_report/start.html';
}