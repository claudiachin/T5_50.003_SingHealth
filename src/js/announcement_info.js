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


var url = window.location.href;
params = url.split('?')[1].split('&');
data = {};
for (i = 0; i < params.length; i++) {
    var tmp = params[i].split('=');
    data[tmp[0]] = decodeURIComponent(tmp[1]);
}

document.getElementById('announcement_title').innerHTML = data.name;
document.getElementById('announcement_image').src = "../resources/AddPictureOrange.jpg";

(function retrieveData(){ //self invoking function
    db.collection("announcements").onSnapshot(snapshot => {
        setupDetailsAnnouncement(snapshot.docs);
    }), err => {
    console.log(err.message);
    }
})();

// setup guides
const setupDetailsAnnouncement = (data) => {
    data.forEach(doc => {
        // console.log(doc.data().announcementId);
        if(doc.id==sessionStorage.getItem('announcementId')){
            displayDetailsAnnouncement(doc.data());
        }
        })
        
    };

function displayDetailsAnnouncement(details){
    const title =  details.title;

    const description = details.content;

    const imageLink=details.image;

    const datePosted="Date posted: "+ details.datePosted + " at " + details.timePosted + " SGT";

    const associatedAuditor=details.associatedAuditor;

    const announcementId=details.announcementId;
    setAnnouncementFields(title,imageLink, datePosted,description);
    console.log(title);
    console.log(description);
    console.log(imageLink);
    console.log(datePosted);
    console.log(associatedAuditor);
    console.log(announcementId);
    console.log("\n");
    
}

function setAnnouncementFields(title,imageLink,datePosted, description) {
    //checks that all the relevant fields have been filled
    document.getElementById("announcement_title").innerHTML = title;
    document.getElementById("announcement_image").src = imageLink;
    document.getElementById("date_posted").innerHTML = datePosted;
    document.getElementById("announcement_desc").innerHTML = description;
}