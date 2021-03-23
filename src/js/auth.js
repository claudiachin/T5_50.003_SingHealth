// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if (user){
        console.log("user is logged in");
        // get data
//         db.collection("").onSnapshot(snapshot => {
//             // console.log(snapshot.docs);
//             setupGuides(snapshot.docs); // run some function
// }, err => {
//     console.log(err.message);
// });

    }
    else{
        console.log("user is logged out");
    }
});

// //signup
// const signupForm = document.querySelector("#signup-form");

// signupForm.addEventListener("submit", (e) =>{
//     e.preventDefault();

//     // get user info
//     const email = signupForm[`email`].value;
//     const password = signupForm[`pword`].value;

//     console.log(email, password);

//     // sign up the user
//     auth.createUserWithEmailAndPassword(email,password).then(cred => {
//         console.log(cred.user);
//         signupForm.reset();
//     });

// });

// logout
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut();
})

// login
const login = document.querySelector("#login");
login.addEventListener('submit', (e) =>{
    e.preventDefault();

    // get user info
    const email = login[`email`].value;
    const password = login[`pword`].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        // console.log(cred.user);
        login.reset();
    });
})