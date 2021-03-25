const announcementForm = document.querySelector("#announcementForm");
const title;
const image;
const description;

function displayInformation(details){
    const title= `
        The title <br><span>${details.title}</span>
    `;

    return db.collection("auditors").doc(cred.user.uid).set({
        email: email,
        name: name,
        hospital: hospital
    });
}