var firebaseConfig = {
  apiKey: "AIzaSyBl1hU_vW6IbzkF0XTqvnBlWyLrTmgybns",
  authDomain: "singhealth-221e6.firebaseapp.com",
  projectId: "singhealth-221e6",
  storageBucket: "singhealth-221e6.appspot.com",
  messagingSenderId: "684333425325",
  appId: "1:684333425325:web:59bbff097942477f599c24",
  measurementId: "G-SYJWNBX65P"
};firebase.initializeApp(config);

var firestore=firebase.firestore();
const docRef=firestore.doc("samples/test");

const inputTextField=document.querySelector("#latest");
const outputHeader=document.querySelector("#outputheader");
const saveButton= document.querySelector("#saveButton")
const loadButton= document.querySelector("#loadButton")


saveButton.addEventListener("click", function(){
    const textToSave=inputTextField.value;
    console.log("I am going to save"+ textToSave+ "toFirestore");
    docRef.set({
        name: textToSave}).then(function(){
        console.log("Status save!");}).catch(function(error){
            console.log("Got an error:", error);
        });});




loadButton.addEventListener("click",function(){
    docRef.get().then(function(doc){
        if(doc && doc.exists){
            const myData=doc.data();
            outputheader.innerText="Get Data "+ myData.name;
        }
    }).catch(function(error){
        console.log("got an error: ", error);
    });});