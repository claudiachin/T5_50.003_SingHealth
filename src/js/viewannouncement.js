const announcementForm = document.querySelector("#announcementForm");
const title;
const image;
const description;

function retrieveData(){
db.collection("auditors").onSnapshot(snapshot => {
    setupDetails(snapshot.docs, user.uid);
}), err => {
console.log(err.message);
}
}

// setup guides
const setupDetails = (data, id) => {
    data.forEach(doc => {
        if (doc.id == id){
            // console.log(doc.data());
            displayDetails(doc.data());
        }
        
    });
};

function displayDetails(details){
    const name = `
        Welcome,<br><span>${details.name}</span>
    `;

    const html = `
        <h2><b>Hospital</b><br></h3> 
        <p>${details.hospital}<br></p>
        <br>

        <h2><b>Email</b><br></h3> 
        <p>${details.email}<br></p>
    `;
    if (auditorName && accountDetails){
        auditorName.innerHTML = name;
        accountDetails.innerHTML = html;
    }
    
}