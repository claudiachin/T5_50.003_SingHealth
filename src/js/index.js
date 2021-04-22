const login = document.querySelector("#login");
const resetForm = document.querySelector("#resetForm");
const accountDetails = document.querySelector(".accountDetails");
const auditorName = document.querySelector(".auditorName");
const adminForm = document.querySelector(".admin-actions");
const adminItems = document.querySelectorAll(".admin");
const error = document.querySelector(".error");
const resetError = document.querySelector(".resetError");
const submitReset = document.querySelector("#submitReset");
const tenantSelect = document.querySelector(".tab");
const auditorSelect = document.querySelector(".tab-active");
const resetF = document.querySelector(".bg-modal");
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
        if (role == "auditors") sessionStorage.setItem("auditorID", user.uid);
        else sessionStorage.setItem("tenantID", user.uid);
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
    console.log(">>> " + sessionStorage.getItem("tenantID"));
    console.log(">>> " + sessionStorage.getItem("auditorID"));
    role == "tenants" ? roleDoc = sessionStorage.getItem("tenantID"): roleDoc = sessionStorage.getItem("auditorID")
    console.log(`getting documents of ${roleDoc}`);
    db.collection(role).doc(roleDoc).onSnapshot(snapshot =>{
        // console.log(snapshot.data().reports);
        let roleReports = snapshot.data().reports;
    
        roleReports.forEach(reportRef=>{
    
            reportRef.get().then(reportDoc =>{
                console.log(reportDoc.id);
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
                        else if (role == "tenants" && chat.doc.data().readByTenant == 0){
                            count++;
                        }

                        else if (role == "auditors" && chat.doc.data().readByAuditor == 0){
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
        if (count == 1){
            display = `<i class="fa gg-file-document"></i>${count} reply from an auditor<br>`;
        }else{
            display = `<i class="fa gg-file-document"></i>${count} replies from auditors<br>`;
        }
        
    }else{
        if (count == 1){
            display = `<i class="fa gg-file-document"></i>${count} reply from a tenant<br>`;
        }else{
            display = `<i class="fa gg-file-document"></i>${count} replies from tenants<br>`;
        }
    }
    
    notibox.innerHTML = display;
    repliesList.appendChild(notibox);

    repliesList.onclick = function() { window.location.href = "../html/view_report/fnb/professionalism_staff_hygiene.html" };
    
    
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
        
        let tempRole = tabBar.firstElementChild.getAttribute("class");
        console.log(tempRole);
        let actualRole = "";
        if (tempRole === "tab-active"){
            actualRole = "auditors";
        }
        else{
            actualRole = "tenants";
        }
        console.log(actualRole);

        // get user info
        const email = login[`email`].value;
        const password = login[`pword`].value;
        console.log(email);
        let count = 0;

        db.collection(actualRole).get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                if (doc.data().email === email){
                    console.log("Has an account!");
                    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(() => {
                        return auth.signInWithEmailAndPassword(email, password).then(cred =>{
                            // console.log(cred.user);        
                            error.innerHTML= ""; 
                            sessionStorage.setItem("role", actualRole);
                
                            if(sessionStorage.getItem("role")==="tenants"){
                                window.location.href = "src/html/tenant_home.html";}
                            else {window.location.href ="src/html/home.html";}
                            login.reset();
                            }).catch(err =>{
                                console.log(err);
                                login.reset();
                                error.innerHTML= err.message;
                            });
                        })
                    .catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });

                }else{
                    count++;
                    // console.log(count);
                    // console.log("The account does not exist! Please try again.");
                    if (count == snapshot.size){
                        count = 0;
                        error.innerHTML = "The account does not exist! Please try again.";
                    }
                    
                }
            });
        }), err => {
        console.log(err.message);
        }
    
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

function resetLink(){
    resetF.style.display = "flex";
}

function closeResetForm(){
    console.log("Closed reset password form");
    resetF.style.display = "none";
    submitReset.style.backgroundColor = "rgb(146, 146, 146)";
    resetForm.reset();
}

// reset password
resetForm.addEventListener("input", ()=>{
    const emailAddress = resetForm[`email`].value;
    resetError.innerHTML="";
    if (emailAddress == "") {
        submitReset.setAttribute("disabled", "disabled");
        submitReset.style.backgroundColor = "rgb(146, 146, 146)";
    }
    else{
        console.log("here");
        submitReset.removeAttribute("disabled");
        submitReset.style.backgroundColor = "#F15A22";
        submitReset.onclick = function() {
            console.log("clicked");
            auth.sendPasswordResetEmail(emailAddress).then(function() {
                // Email sent.
                console.log("Email sent");
                closeResetForm();
            }).catch(function(error) {
                // An error happened.
                console.log(error.message);
                resetError.innerHTML = error.message;
            });
        };
    }
});


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



