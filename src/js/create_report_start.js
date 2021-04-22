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

db.collection("tenants").orderBy("branch").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var tenant = document.createElement("p");
    var tenantText = document.createTextNode(doc.data().branch);
    tenant.appendChild(tenantText);
    tenant.classList.add("tenant-text");

    var inst = document.createElement("p");
    var instText = document.createTextNode("[" + doc.data().hospital + "] [" + doc.data().type + " Store]");
    inst.appendChild(instText);

    var date = document.createElement("h6");
    var dateText = document.createTextNode("Latest report made on 14/2/2020");
    date.appendChild(dateText);

    var sect = document.createElement("div");
    sect.appendChild(tenant);
    sect.appendChild(inst);
    sect.appendChild(date);
    sect.classList.add("sect");
    sect.id = doc.id;
    sect.onclick = function () { select(this) };

    var split = document.createElement("hr");

    var list = document.getElementById("list");
    list.appendChild(sect);
    list.appendChild(split);
  });
});

function filter() {
  // Declare variables
  var filter = document.getElementById('search').value.toUpperCase();
  var tenantInfo = document.getElementById("list").getElementsByTagName('div');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < tenantInfo.length; i++) {
    var tenantName = tenantInfo[i].firstChild;
    var txtValue = tenantName.textContent || tenantName.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      tenantInfo[i].style.display = "";
      tenantInfo[i].nextElementSibling.style.display = "";
    } else {
      tenantInfo[i].style.display = "none";
      tenantInfo[i].nextElementSibling.style.display = "none";
    }
  }
}

var prev = '';

function select(ele) {
  if (prev != '') {
    prev.firstChild.style.color = "#444444";
  }
  ele.firstChild.style.color = "#F15A22";
  document.getElementsByClassName("next-button")[0].classList.remove("hide");
  prev = ele;
}

function goNext() {
  db.collection("reports").add({
    associatedTenant: prev.id,
    associatedAuditor: sessionStorage.getItem("auditorID"),
    dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      sessionStorage.setItem("reportID", docRef.id);
      sessionStorage.setItem("tenantID", prev.id);
      if (prev != '') {
        console.log(prev.childNodes[1].innerText);
        if (prev.childNodes[1].innerText.includes("Non-F&B")) {
          sessionStorage.setItem("type", "Non-F&B");
          window.location.href = 'non-fnb/professionalism_staff_hygiene.html';
        } else {
          sessionStorage.setItem("type", "F&B");
          window.location.href = 'fnb/professionalism_staff_hygiene.html';
        }
      }
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

if (sessionStorage.getItem("reportID") != null) {
  reportID = sessionStorage.getItem("reportID");
  sessionStorage.removeItem("reportID");
  db.collection("reports").doc(reportID).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}