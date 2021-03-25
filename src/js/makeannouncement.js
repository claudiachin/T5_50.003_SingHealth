//function to upload announcement to the Firebase
function postannouncement() {
    if (checkFieldsFilled()==true){
    db.collection("announcements").add({
        title: document.getElementById("count_value_title").value,
        content: document.getElementById("count_value").value,
        datePosted: perfectDate(),
        image:document.getElementById("addPicture").src,
        associatedAuditor: "tester",
        announcementId: String(Date.now())
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}
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
            return true;
        }else{
            console.log("Not all relevant fields have been filled");
            return false;
        }
    }

const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
});

function perfectDate(){
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    return dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
}