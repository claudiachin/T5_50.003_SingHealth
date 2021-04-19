const announcementlist = document.querySelector('#announcementList');

db.collection('announcements').orderBy('timestamp').onSnapshot((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        // console.log(doc.data());
        // console.log(doc.id);
        renderAnnouncementList(doc.id, doc.data());
    })
})


function renderAnnouncementList(docID, doc){
    let auditorID = sessionStorage.getItem("auditorID");
    console.log(`auditorID: ${auditorID}`);
    doc.readby.includes(auditorID) ? readState=true:readState=false;
    console.log(readState);

    var unreadDot = document.createElement("span");
    unreadDot.classList.add("blue-dot");

    var announcement = document.createElement("p");
    var announcementText = document.createTextNode(doc.title);

    announcement.appendChild(announcementText);
    if (!readState) announcement.appendChild(unreadDot);
    announcement.classList.add("announcement-text");

    var inst = document.createElement("p");
    var instText = document.createTextNode(doc.content.substring(0,100) + "...");
    inst.appendChild(instText);

    var date = document.createElement("h6");
    var dateText = document.createTextNode(`Posted on ${doc.datePosted} at ${doc.timePosted}`);
    date.appendChild(dateText);

    /*var ids = document.createElement("h6");
    var idsText = document.createTextNode(`Doc Id: ${docID}`);
    ids.appendChild(idsText);
    ids.classList.add("ids-text");*/

    var sect = document.createElement("div");
    sect.appendChild(announcement);
    sect.appendChild(inst);
    sect.appendChild(date);
    //sect.appendChild(ids);
    sect.classList.add("sect")

    var icon = document.createElement("div");
    icon.innerHTML = '<i class="fas fa-chevron-right"></i>'
    
    var card = document.createElement("div");
    card.appendChild(sect)
    card.appendChild(icon);
    card.classList.add("card");
    // card.id = "card-"+i;
    card.id = docID;
    card.onclick = function() { selectAnnouncement(this, auditorID) };

    var split = document.createElement("hr");

    var list = document.getElementById("list");
    list.appendChild(card);
    list.appendChild(split);

}

function selectAnnouncement(ele, auditorID) {
    url = 'announcement_info.html?name=' + encodeURIComponent(ele.firstChild.firstChild.innerHTML);
    sessionStorage.setItem('announcementId', ele.id);

    db.collection('announcements').doc(ele.id).update({
        "readby": firebase.firestore.FieldValue.arrayUnion(auditorID)
    }).then(()=>{
        window.location.href = url;
    })  
    
}