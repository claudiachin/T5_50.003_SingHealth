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

//function to upload announcement to the Firebase
function postannouncement() {
    db.collection("announcements").add({
        title: document.getElementById("count_value_title").value,
        content: document.getElementById("count_value").value,
        datePosted:new Date().getTime(),
        image:document.getElementById("addPicture").src,
        associatedAuditor: "tester"
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
        var titleTextfield = document.getElementById("count_value_title").value;
        var descriptionTextfield = document.getElementById("count_value").value;
    
        var titleFilled = false;
        var descriptionFilled = false;
        if (titleTextfield !=""){
            titleFilled = true;
        }
        if (descriptionTextfield !=""){
            descriptionFilled = true;
        }
        if (titleFilled && descriptionFilled) {
            console.log("All relevant fields have been filled");
        }else{
            console.log("Not all relevant fields have been filled");
        }
    }