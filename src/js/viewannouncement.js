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
            displayDetailsAnnouncement(doc.data());
        })
        
    };

function displayDetailsAnnouncement(details){
    const title = `The title is: ${details.title}`;

    const description = `The description is: ${details.content}`;

    const imageLink=`The image URL is: ${details.image}`;

    const datePosted=`The date posted is: ${details.datePosted}`;

    const associatedAuditor=`The associated auditor is: ${details.associatedAuditor}`;
    console.log(title);
    console.log(description);
    console.log(imageLink);
    console.log(datePosted);
    console.log(associatedAuditor);
    console.log("\n");
    
}