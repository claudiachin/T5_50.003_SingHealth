const announcementForm = document.querySelector("#announcementForm");
const title;
const image;
const description;

function mock() {
    db.collection("announcements").doc("new").set({
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

//function to upload announcement to the web
function postannouncement() {
    db.collection("announcements").add({
        title: document.getElementById("count_value_title").value,
        content: document.getElementById("count_value").value,
        datePosted:new Date().getTime(),
        image:"imageURL",
        associatedAuditor: "user"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    }

