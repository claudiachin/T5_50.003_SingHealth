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

function checkFieldsFilled() {
        //checks that all the relevant fields have been filled
        var titleTextfield = document.getElementsByClassName("input-field")[0].getElementsByTagName("i");
    
        var i = 0;
        var allFilled = true;
        while (i<checkboxes.length && allFilled) {
            if (checkboxes[i].classList.length < 3) {
                allFilled = false;
            }
            i += 1
        }
        if (allFilled) {
            document.getElementsByClassName("primary-button")[0].classList.remove("hide");
        }
    }