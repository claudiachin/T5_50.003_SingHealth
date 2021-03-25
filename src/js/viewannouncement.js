function retrieveData(){
    db.collection("announcements").onSnapshot(snapshot => {
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
    const title = `
        Welcome,<br><span>${details.title}</span>
    `;

    const html = `
        <h2><b>Hospital</b><br></h3> 
        <p>${details.content}<br></p>
        <br>

        <h2><b>Email</b><br></h3> 
        <p>${details.imageURL}<br></p>
    `;
    
}