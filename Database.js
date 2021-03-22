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
const outputHeader=document.querySelector("#outputheader");
const loadButton= document.querySelector("#loadButton")

loadButton.addEventListener("click",function(){
    docRef.get().then(function(doc){
        if(doc && doc.exists){
            const myData=doc.data();
            outputHeader.innerText="Get Data "+ myData.name;
        }
    }).catch(function(error){
        console.log("got and error: ", error);
    });})