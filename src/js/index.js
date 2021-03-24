const login = document.querySelector("#login");
const logout = document.querySelector("#logout");
// const signupForm = document.querySelector("#login");
const accountDetails = document.querySelector(".accountDetails");
const auditorName = document.querySelector(".auditorName");
const adminForm = document.querySelector(".admin-actions");

// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if (user){
        console.log("User logged in");
        // get data
        db.collection("auditors").onSnapshot(snapshot => {
            setupDetails(snapshot.docs, user.uid);
        }), err => {
        console.log(err.message);
        }
    }  
    else{
        console.log("user is logged out");
    }
});

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
    const name = `
        Welcome,<br><span>${details.name}</span>
    `;

    const html = `
        <h2><b>Hospital</b><br></h3> 
        <p>${details.hospital}<br></p>
        <br>

        <h2><b>Email</b><br></h3> 
        <p>${details.email}<br></p>
    `;
    auditorName.innerHTML = name;
    accountDetails.innerHTML = html;
}

// login
if (login){
    login.addEventListener('submit', (e) =>{
        e.preventDefault();
    
        // get user info
        const email = login[`email`].value;
        const password = login[`pword`].value;
    
        auth.signInWithEmailAndPassword(email, password).then(cred =>{
            // console.log(cred.user);
            window.location.href = "src/html/home.html";
        });
    });
}


// logout
if (logout){
    logout.addEventListener('click', (e) =>{
        e.preventDefault();
        auth.signOut();
    });
}


// //signup
// login.addEventListener("submit", (e) =>{
//     e.preventDefault();
//     console.log("-----");
//     // get user info
//     const email = login[`email`].value;
//     const password = login[`pword`].value;

//     console.log(email, password);

//     // sign up the user
//     auth.createUserWithEmailAndPassword(email,password).then(cred => {
//         return db.collection("auditors").doc(cred.user.uid).set({
//             email: email
//         });
       
//     }).then(()=>{
//         login.reset();
//     });

// });

// Add admin cloud function
if (adminForm){
    adminForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        const adminEmail = document.querySelector("#admin-email").value;
        const addAdminRole = functions.httpsCallable("addAdminRole"); // Makes reference to function
        addAdminRole({email: adminEmail}).then(result =>{
            console.log(result);
        });
    });
}
