var url = window.location.href;
params = url.split('?')[1].split('&');
data = {};
for (i = 0; i < params.length; i++) {
    var tmp = params[i].split('=');
    data[tmp[0]] = decodeURIComponent(tmp[1]);
}

document.getElementById('announcement_title').innerHTML = data.name;
document.getElementById('announcement_image').src = "../resources/AddPictureOrange.jpg";
document.getElementById('date_posted').innerHTML = string(docId);
document.getElementById('announcement_desc').innerHTML = "asdjahdakhdakdad";

function retrieveData(){
    db.collection("announcements").onSnapshot(snapshot => {
        setupDetailsAnnouncement(snapshot.docs);
    }), err => {
    console.log(err.message);
    }
}

// setup guides
const setupDetailsAnnouncement = (data) => {
    data.forEach(doc => {
        // console.log(doc.data().announcementId);
        if(doc.data().docId==docId){
            displayDetailsAnnouncement(doc.data());
        }
        })
        
    };

function displayDetailsAnnouncement(details){
    const title =  details.title;

    const description = details.content;

    const imageLink=details.image;

    const datePosted=details.datePosted;

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