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

db.collection("tenants").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id);

        var tenant = document.createElement("p");
        var tenantText = document.createTextNode(doc.data().branch);
        tenant.appendChild(tenantText);
        tenant.classList.add("tenant-text");

        var inst = document.createElement("p");
        var instText = document.createTextNode("[" + doc.data().hospital + "] [" + doc.data().type + " Store]");
        inst.appendChild(instText);

        var date = document.createElement("h6");
        var dateText = document.createTextNode("Latest report made on 14/2/2020");
        //date.appendChild(dateText);

        var sect = document.createElement("div");
        sect.appendChild(tenant);
        sect.appendChild(inst);
        sect.appendChild(date);
        sect.classList.add("sect")

        var icon = document.createElement("div");
        icon.innerHTML = '<i class="fas fa-chevron-right"></i>'

        var card = document.createElement("div");
        card.appendChild(sect)
        card.appendChild(icon);
        card.classList.add("card");
        card.id = doc.id;
        card.onclick = function () { selectTenant(this) };

        var split = document.createElement("hr");

        var list = document.getElementById("list");
        list.appendChild(card);
        list.appendChild(split);
    });
});

function filter() {
    // Declare variables
    var filter = document.getElementById('search').value.toUpperCase();
    var cards = document.getElementById("list").getElementsByClassName('card');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < cards.length; i++) {
        var tenantName = cards[i].firstChild.firstChild;
        var txtValue = tenantName.textContent || tenantName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
            cards[i].nextElementSibling.style.display = "";
        } else {
            cards[i].style.display = "none";
            cards[i].nextElementSibling.style.display = "none";
        }
    }
}

function selectTenant(ele) {
    console.log(ele.id);
    url = 'tenant_directory_info.html?name=' + encodeURIComponent(ele.firstChild.firstChild.innerHTML);
    sessionStorage.setItem("tenantID", ele.id);
    if (ele.firstChild.childNodes[1].innerText.includes("Non-F&B")) {
        sessionStorage.setItem("type", "Non-F&B"); 
    } else {
        sessionStorage.setItem("type", "F&B"); 
    }
    window.location.href = url;
}