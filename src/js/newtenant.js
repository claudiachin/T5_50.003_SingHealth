// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


function newtenant(){
    //document.getElementById("newformtenant").submit();
    var hospital = document.getElementById("hospital").value;
    var branch = document.getElementById("branch").value;
    var nname = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var newtype = document.getElementById("newtype").value;
    //document.getElementById("nexxt").style.display = 'none';
// Add a new document with a generated id.
db.collection("tenants").add({
    hospital: hospital,
    branch: branch,
    name: nname,
    email: email,
    type: newtype
})
.then((docRef) => {
    console.log("Tenant document written with ID: ", docRef.id);
    //sessionStorage.setItem("tenantID", docRef.id);
    //sessionStorage.setItem("type", newtype);
    console.log(newtype);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

document.getElementById("aha").style.display = "block";

//window.location.href='directory.html';

}

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
  
