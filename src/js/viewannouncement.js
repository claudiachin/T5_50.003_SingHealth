const announcementlist = document.querySelector('#announcementList');

db.collection('announcements').orderBy('timestamp').onSnapshot((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        // console.log(doc.data());
        // console.log(doc.id);
        renderAnnouncementList(doc.id, doc.data());
    })
})


function renderAnnouncementList(docID, doc){
    var tenant = document.createElement("p");
    var tenantText = document.createTextNode(doc.title);
    tenant.appendChild(tenantText);
    tenant.classList.add("tenant-text");

    var inst = document.createElement("p");
    var instText = document.createTextNode(doc.content.substring(0,30) + "...");
    inst.appendChild(instText);

    var date = document.createElement("h6");
    var dateText = document.createTextNode(`Posted on ${doc.datePosted} at ${doc.timePosted}`);
    date.appendChild(dateText);

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
    // card.id = "card-"+i;
    card.id = docID;
    card.onclick = function() { selectAnnouncement(this) };

    var split = document.createElement("hr");

    var list = document.getElementById("list");
    list.appendChild(card);
    list.appendChild(split);

}

// getting announcement from firebase
function getAnnouncementDetails(){
    db.collection("announcements").onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            // console.log(doc.data().announcementId);
            if(doc.data().announcementId=="1616687630703"){
                displayDetailsAnnouncement(doc.data());
            }
        })
    }), err => {
    console.log(err.message);
    }
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

function selectAnnouncement(ele) {
    console.log(ele.id);
    url = 'announcement_info.html?name=' + encodeURIComponent(ele.firstChild.firstChild.innerHTML);
    window.location.href = url;
}