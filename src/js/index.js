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
const loading = document.querySelector("#wrapper");
const tabBar = document.querySelector(".tab-bar");
const role = document.querySelector(".tab-active");
const announcementNoti = document.querySelector("#announcementNoti");

// loading
// window.addEventListener("load", function() {
//     loading.parentElement.removeChild(loading);
// });

// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if (user){
        // Check admin status
        // user.getIdTokenResult().then(idTokenResult =>{
        //     console.log(`admin: ${idTokenResult.claims.admin}`);
        //     user.admin = idTokenResult.claims.admin;
        //     // setupUI(user);
        // });
        console.log("User logged in");
        // get data
        let role = sessionStorage.getItem("role");
        getRoleDetails(role,user.uid);
        getNumOfAnnouncements();
    }  
    else{
        console.log("User is logged out");
    }
});

function getRoleDetails(role, userUID){
    console.log(userUID);
    console.log(role);
    db.collection(role).onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            if (role == "auditors") sessionStorage.setItem("auditorID", userUID);
            else sessionStorage.setItem("tenantID", userUID);
            
            if (doc.id == userUID){
                const data = {
                    email: doc.data().email,
                    hospital: doc.data().hospital,
                    name: doc.data().name
                };
                displayDetails(data.email, data.hospital, data.name);
            }
        });
    }), err => {
    console.log(err.message);
    }
};

function getNumOfAnnouncements(){
    db.collection("announcements").onSnapshot(snapshot => {
        console.log(snapshot.size);
        displayAnnouncementNoti(snapshot.size);
        
    }), err => {
    console.log(err.message);
    }
};

function displayAnnouncementNoti(count){
    let display;
    if (count == 1){
        display = `<i class="fa gg-bell"></i>${count} New announcement<br>`;
    } else if (count == 0){
        display = `<i class="fa gg-bell"></i>No new announcements`;
    } else{
        display = `<i class="fa gg-bell"></i>${count} New announcements<br>`;
    }
    announcementNoti.innerHTML = display;
}

// setup UI
// const setupUI = (user) =>{
//     if (user){
//         if (user.admin){
//             adminItems.forEach(item => item.style.display = "block");
//         }
//     }else{
//         adminItems.forEach(item => item.style.display = "none");
//     }
// }

function displayDetails(fetchedEmail, fetchedHospital, fetchedName){
    const name = `
        Welcome,<br><span>${fetchedName}</span>
    `;

    const html = `
        <h2><b>Hospital</b><br></h3> 
        <p>${fetchedHospital}<br></p>
        <br>

        <h2><b>Email</b><br></h3> 
        <p>${fetchedEmail}<br></p>
    `;
    if (auditorName && accountDetails){
        auditorName.innerHTML = name;
        accountDetails.innerHTML = html;
    }
    
}

// tabBar.addEventListener("click", (e) =>{
//     e.preventDefault();
//     actor = tabBar.firstElementChild.getAttribute("class");
//     console.log(actor);
// });

// login
if (login){
    login.addEventListener('submit', (e) =>{
        e.preventDefault();
    
        // get user info
        const email = login[`email`].value;
        const password = login[`pword`].value;
    
        auth.signInWithEmailAndPassword(email, password).then(cred =>{
            // console.log(cred.user);
            let tempRole = tabBar.firstElementChild.getAttribute("class");
            console.log(tempRole);
            let actualRole = "";
            if (tempRole === "tab-active"){
                actualRole = "auditors";
            }
            else{
                actualRole = "tenants";
            }
            sessionStorage.setItem("role", actualRole);

            if(sessionStorage.getItem("role")==="tenants"){
            window.location.href = "src/html/tenant_home.html";}
            else{window.location.href ="src/html/home.html";}
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
    sessionStorage.clear();
    window.location.href = "../../index.html";
};

// signup
signUpForm.addEventListener("input", ()=>{
    const email = signupForm[`email`].value;
    const password = signupForm[`pword`].value;
    const name = signUpForm['name'].value;
    const hospital = signUpForm['hospital'].value;
    signUpError.innerHTML="";
    if (email == "" || password == "" || name == "" || hospital == "") {
        submitSignUp.setAttribute("disabled", "disabled");
        submitSignUp.style.backgroundColor = "rgb(146, 146, 146)";
    }
    else{
        console.log("here");
        submitSignUp.removeAttribute("disabled");
        submitSignUp.style.backgroundColor = "#F15A22";
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
        submitSignUp.style.backgroundColor = "rgb(146, 146, 146)";
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

