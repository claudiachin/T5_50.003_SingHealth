const announcementForm = document.querySelector("#announcementForm");
const title;
const image;
const description;

function mock() {
    db.collection("annoucements").doc("new").set({
        title: "New announcement",
        message: "Testing run.",
        author: "me"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function postAnnouncement(){
    const title = announcementForm[`titlefield`].value;
    const image = announcementForm[`imagefield`].value;
    const description = announcementForm['descriptionfield'].value;
    console.log(title,image,description);//debugging
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        return db.collection("auditors").doc(cred.user.uid).set({
            email: email,
            name: name,
            hospital: hospital
        });
    }).then(()=>{
        signupForm.reset();
        window.location.href = "src/html/home.html";
        signUpError.innerHTML="";
    }).catch(err =>{
        console.log(err);
        signUpError.innerHTML= err.message;
    });
};

