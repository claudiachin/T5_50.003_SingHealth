const login = document.querySelector("#login");
const signupForm = document.querySelector("#signUpForm");
const accountDetails = document.querySelector(".accountDetails");
const auditorName = document.querySelector(".auditorName");
const adminForm = document.querySelector(".admin-actions");
const adminItems = document.querySelectorAll(".admin");
const error = document.querySelector(".error");
const signUpError = document.querySelector(".signUpError");
const submitSignUp = document.querySelector("#submitSignUp");
const tenantSelect = document.querySelector(".tab");
const auditorSelect = document.querySelector(".tab-active");
const signupF = document.querySelector(".bg-modal");

// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if (user){
        // Check admin status
        user.getIdTokenResult().then(idTokenResult =>{
            console.log(`admin: ${idTokenResult.claims.admin}`);
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
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

// setup UI
const setupUI = (user) =>{
    if (user){
        if (user.admin){
            adminItems.forEach(item => item.style.display = "block");
        }
    }else{
        adminItems.forEach(item => item.style.display = "none");
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
    if (auditorName && accountDetails){
        auditorName.innerHTML = name;
        accountDetails.innerHTML = html;
    }
    
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
            login.reset();
            error.innerHTML= "";
        }).catch(err =>{
            console.log(err);
            login.reset();
            error.innerHTML= err.message;
        });
    });
}

// Bypass login user an authenticated account
function bypass(){
    // get user info
    const email = "test@mymail.sutd.edu.sg";
    const password = "123456789";

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        // console.log(cred.user);
        window.location.href = "src/html/home.html";
    });
};

// logout
function logout(){
    auth.signOut();
    window.location.href = "../../index.html";
};

// signup
signUpForm.addEventListener("input", ()=>{
    const email = signupForm[`email`].value;
    const password = signupForm[`pword`].value;
    const name = signUpForm['name'].value;
    const hospital = signUpForm['hospital'].value;
    if (email == "" || password == "" || name == "" || hospital == "") {
        submitSignUp.setAttribute("disabled", "disabled");
    }
    else{
        console.log("here");
        submitSignUp.removeAttribute("disabled");
    }
});


function signup(){
    const email = signupForm[`email`].value;
    const password = signupForm[`pword`].value;
    const name = signUpForm['name'].value;
    const hospital = signUpForm['hospital'].value;

    console.log(email, name, hospital);
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
        signupForm.reset();
        signUpError.innerHTML= err.message;
    });
};

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

function tenantTab(){
    tenantSelect.setAttribute("class","tab-active");
    auditorSelect.setAttribute("class","tab");
}

function auditorTab(){
    tenantSelect.setAttribute("class","tab");
    auditorSelect.setAttribute("class","tab-active");
}

function signUpLink(){
    signupF.style.display = "flex";
}

function closeSignUpForm(){
    console.log("Closed signup form");
    signupF.style.display = "none";
}