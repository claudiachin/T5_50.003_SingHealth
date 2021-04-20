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
        getNumOfAnnouncements(user.uid, role);
        getNumOfReplies(role);
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
                    name: doc.data().name,
                    branch: doc.data().branch
                };
                if(role=="tenants"){
                displayDetails(data.email, data.branch, data.name);}
                else{displayDetails(data.email, data.hospital, data.name);}
            }
        });
    }), err => {
    console.log(err.message);
    }
};

function getNumOfAnnouncements(uid, role){
    db.collection("announcements").onSnapshot(snapshot => {
        console.log(`Total Number of announcements: ${snapshot.size}`);
        let count = 0;
        snapshot.forEach(doc =>{
            if (doc.data().readby.includes(uid)){
                count++;
            }
        })
        console.log(`Total read announcements: ${count}`);
        displayAnnouncementNoti(snapshot.size - count, role);
        
    }), err => {
    console.log(err.message);
    }
};

function displayAnnouncementNoti(count, role){
    let display;
    if (count == 1){
        display = `<i class="fa gg-bell"></i>${count} New announcement<br>`;
    } else if (count == 0){
        display = `<i class="fa gg-bell"></i>No new announcements`;
    } else{
        display = `<i class="fa gg-bell"></i>${count} New announcements<br>`;
    }
    announcementNoti.innerHTML = display;

    if (role == "tenants"){
        announcementNoti.onclick = function() { window.location.href = "../html/tenant_announcements.html" };
    }else{
        announcementNoti.onclick = function() { window.location.href = "../html/announcements.html" };
    }
    
}

function getNumOfReplies(role){
    console.log(role);
    role == "tenants" ? roleDoc = sessionStorage.getItem("tenantID"): roleDoc = sessionStorage.getItem("auditorID")
    console.log(`getting documents of ${roleDoc}`);
    db.collection(role).doc(roleDoc).onSnapshot(snapshot =>{
        // console.log(snapshot.data().reports);
        let tenantReports = snapshot.data().reports;
    
        tenantReports.forEach(reportRef=>{
    
            reportRef.get().then(reportDoc =>{
                // console.log(reportDoc.id);
                // console.log(reportDoc.data());
                // console.log(reportDoc.ref);
                let count = 0;
                reportDoc.ref.collection("hygieneChat").onSnapshot(chats =>{
                    // console.log(chats.docs);

                    chats.docChanges().forEach(chat =>{
                        // console.log(chat.data());
                        let chatRemoved = document.getElementById(`${reportDoc.id}-chat`);
                        if (chat.type === "removed") {
                            count--;
                            chatRemoved.remove();
                            console.log("Removed");
                        }
                        else if (chat.doc.data().readByTenant == 0){
                            count++;
                        }
                        
                        if (chat.type === "added" && chatRemoved!=null) {
                            console.log(chat.type);
                            chatRemoved.remove();
                        }
                        
                        
                    })
                    console.log(`There are ${count} unread messages`);
                    if (count>0) displayrepliesNoti(role, count, reportDoc.id);
                    
                })
            });
        });
    });
}

function displayrepliesNoti(role, count, reportID){
    let display;
    var repliesList = document.getElementById("repliesList");
    let notibox = document.createElement("p");

    notibox.classList.add("notification-box")
    notibox.id = `${reportID}-chat`;
    
    if (role == "tenants"){
        display = `<i class="fa gg-file-document"></i>${count} replies from auditors<br>`;
    }else{
        display = `<i class="fa gg-file-document"></i>${count} replies from tenants<br>`;
    }
    
    notibox.innerHTML = display;
    repliesList.appendChild(notibox);
    
}

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
            else {window.location.href ="src/html/home.html";}
            login.reset();
            error.innerHTML= "";
        }).catch(err =>{
            console.log(err);
            login.reset();
            error.innerHTML= err.message;
        });
    });
}

// logout
function logout(){
    auth.signOut();
    sessionStorage.clear();
    window.location.href = "../../index.html";
};

function tenantTab(){
    tenantSelect.setAttribute("class","tab-active");
    auditorSelect.setAttribute("class","tab");
}

function auditorTab(){
    tenantSelect.setAttribute("class","tab");
    auditorSelect.setAttribute("class","tab-active");
}

// // Bypass login user an authenticated account
// function bypass(){
//     // get user info
//     const email = "test@mymail.sutd.edu.sg";
//     const password = "123456789";

//     auth.signInWithEmailAndPassword(email, password).then(cred =>{
//         // console.log(cred.user);
//         window.location.href = "src/html/home.html";
//     });
// };

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

// function signUpLink(){
//     signupF.style.display = "flex";
// }

// function closeSignUpForm(){
//     console.log("Closed signup form");
//     signupF.style.display = "none";
// }

// // signup
// signUpForm.addEventListener("input", ()=>{
//     const email = signupForm[`email`].value;
//     const password = signupForm[`pword`].value;
//     const name = signUpForm['name'].value;
//     const hospital = signUpForm['hospital'].value;
//     signUpError.innerHTML="";
//     if (email == "" || password == "" || name == "" || hospital == "") {
//         submitSignUp.setAttribute("disabled", "disabled");
//         submitSignUp.style.backgroundColor = "rgb(146, 146, 146)";
//     }
//     else{
//         console.log("here");
//         submitSignUp.removeAttribute("disabled");
//         submitSignUp.style.backgroundColor = "#F15A22";
//     }
// });


// function signup(){
//     const email = signupForm[`email`].value;
//     const password = signupForm[`pword`].value;
//     const name = signUpForm['name'].value;
//     const hospital = signUpForm['hospital'].value;

//     console.log(email, name, hospital);
//     auth.createUserWithEmailAndPassword(email,password).then(cred => {
//         return db.collection("auditors").doc(cred.user.uid).set({
//             email: email,
//             name: name,
//             hospital: hospital
//         });
//     }).then(()=>{
//         signupForm.reset();
//         window.location.href = "src/html/home.html";
//         signUpError.innerHTML="";
//     }).catch(err =>{
//         console.log(err);
//         signupForm.reset();
//         signUpError.innerHTML= err.message;
//         submitSignUp.style.backgroundColor = "rgb(146, 146, 146)";
//     });
// };

// // Add admin cloud function
// if (adminForm){
//     adminForm.addEventListener('submit', (e) =>{
//         e.preventDefault();
//         const adminEmail = document.querySelector("#admin-email").value;
//         const addAdminRole = functions.httpsCallable("addAdminRole"); // Makes reference to function
//         addAdminRole({email: adminEmail}).then(result =>{
//             console.log(result);
//         });
//     });
// }



