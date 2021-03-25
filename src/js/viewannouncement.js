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
        if(doc.data().announcementId=="1616687630703"){
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

function setAnnouncementFields(title,imageLink,datePosted, description) {
    //checks that all the relevant fields have been filled
    document.getElementById("announcement_title").innerHTML = title;
    document.getElementById("announcement_image").src = "../resources/AddPictureOrange.jpg";
    document.getElementById("date_posted").innerHTML = datePosted;
    document.getElementById("announcement_desc").innerHTML = description;
}