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