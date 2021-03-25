const announcementForm = document.querySelector("#announcementForm");
const title;
const image;
const description;

//retrieve values
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

function bypass(){
    // get user info
    const title = "Some Title Here";
    const description = "This is a test text this is spartan";

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        // console.log(cred.user);
        window.location.href = "src/html/home.html";
    });
};