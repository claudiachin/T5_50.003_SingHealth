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