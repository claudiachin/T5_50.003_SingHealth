// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var newtenantform = document.querySelector("#newformtenant");
var newtenanterror = document.querySelector(".newtenanterror");
const addtenant = document.querySelector("#addtenant");

newtenantform.addEventListener("input", ()=>{
    //document.getElementById("newformtenant").submit();
    
    var hospital = document.getElementById("hospital").value;
    var branch = document.getElementById("branch").value;
    var nname = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var newtype = document.getElementById("newtype").value;
    //document.getElementById("nexxt").style.display = 'none';
    // Add a new document with a generated id.

    if (email == "" || nname == "" || hospital == "" || branch == "" || newtype == "") {
        addtenant.setAttribute("disabled", "disabled");
    }else{
        addtenant.removeAttribute("disabled");
    }
});

function passwordGen(){
    var password = Math.random().toString(36).substr(2, 12);
    // console.log(password);
    var newpassword = "";
    for (i=0; i<password.length; i++){
        var set = Math.round(Math.random());
        if (set == 1){
            newpassword +=password[i].toUpperCase();
        }else{
            newpassword +=password[i];
        }
    }
    return newpassword;
}

function newtenant(){
    var hospital = document.getElementById("hospital").value;
    var brnh = document.getElementById("branch").value;
    var nname = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var newtype = document.getElementById("newtype").value;
    var password = passwordGen();
    console.log(hospital);
    var branch = hospital.slice(hospital.indexOf("(")+1,hospital.indexOf(")")) + " - " + brnh;
    console.log(hospital.slice(hospital.indexOf("(")+1,hospital.indexOf(")")));
    console.log(branch);

    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        return db.collection("tenants").doc(cred.user.uid).set({
            hospital: hospital.slice(0,hospital.indexOf("(")),
            branch: branch,
            name: nname,
            email: email,
            type: newtype,
            password : password
        });

    }).then(()=>{
        newtenantform.reset();
        newtenanterror.innerHTML= "";
        addtenant.setAttribute("disabled", "disabled");
        window.location.href='directory.html';
    }).catch(err =>{
        console.log("Error: ",err);
        newtenanterror.innerHTML= err.message;
    });

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
  
