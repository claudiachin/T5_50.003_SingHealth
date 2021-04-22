// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBl1hU_vW6IbzkF0XTqvnBlWyLrTmgybns",
    authDomain: "singhealth-221e6.firebaseapp.com",
    projectId: "singhealth-221e6",
    appId: "1:684333425325:web:59bbff097942477f599c24",
    measurementId: "G-SYJWNBX65P",
    storageBucket: "gs://singhealth-221e6.appspot.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

db.settings({ timestampsInSnapshots: true });

//get data from firebase
var checkboxes = document.getElementsByClassName("main-content-view-report")[0].getElementsByTagName("i");

var reportID = sessionStorage.getItem("reportID");
var role = sessionStorage.getItem("role");
var auditorID = sessionStorage.getItem("auditorID");
var tenantID = sessionStorage.getItem("tenantID");
var category = window.location.href.split("/").pop().slice(0, -5);

db.collection("reports").doc(reportID).get().then((doc) => {
    // scores
    var scores = doc.data()[category + "_scores"];
    var score = 0;
    var outOf = scores.length;
    for (i = 0; i < scores.length; i++) {
        if (scores[i] == 1) { // yes
            score += 1;
            checkboxes[i].classList.add("fa-check");
        } else if (scores[i] == -1) { // invalid
            outOf -= 1;
            checkboxes[i].classList.add("fa-window-minimize");
        } else { // no
            checkboxes[i].classList.add("fa-times");
        }
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("out-of").innerHTML = outOf;

    // rectified button
    if (role == "auditor") {
        var resolved = doc.data()[category + "_resolved"];
        for (i = 0; i < resolved.length; i++) {
            if (resolved[i] == false) { //add rectified button after the question
                rectBtnLocation = checkboxes[i].parentNode.parentNode.nextSibling;

                rectBtn = document.createElement("button");
                rectBtn.classList.add("rect-btn");
                rectBtn.innerHTML = "Rectified?";
                rectBtn.onclick = function () { rectified(this) };
                console.log(rectBtn.classList);

                rectBtnDiv = document.createElement("div");
                rectBtnDiv.classList.add("rect-btn-div");
                rectBtnDiv.appendChild(rectBtn);

                rectBtnLocation.parentNode.insertBefore(rectBtnDiv, rectBtnLocation)
            }
        }
    }

    // photos
    var photoURLs = doc.data()[category + "_photoURLs"];
    var photoRow = document.getElementsByClassName("photos-row")[0];
    var galleryContent = document.getElementsByClassName("gallery-content")[0];

    for (i = 0; i < photoURLs.length; i++) {
        imgDiv = document.createElement("div");
        imgDiv.innerHTML = "<img src='" + photoURLs[i] + "'>";
        imgDiv.onclick = function () { openModal(this) };
        imgDiv.classList.add("hover-shadow");

        photoColumn = document.createElement("div");
        photoColumn.classList.add("photos-column");
        photoColumn.appendChild(imgDiv);

        photoRow.appendChild(photoColumn);

        slideImg = document.createElement("img");
        slideImg.src = photoURLs[i];
        slideImg.style.width = "100%";

        numberText = document.createElement("div");
        numberText.innerHTML = i + 1 + " / " + photoURLs.length;
        numberText.classList.add("numbertext");

        gallerySlide = document.createElement("div");
        gallerySlide.classList.add("gallery-slide");
        gallerySlide.appendChild(slideImg);
        gallerySlide.appendChild(numberText);

        galleryContent.appendChild(gallerySlide);
    }
})

// chat
let hygieneChat = db.collection("reports").doc(reportID).collection("hygieneChat");

hygieneChat.orderBy("timestamp").onSnapshot(snapshot => {
    console.log(snapshot.size);
    snapshot.docChanges().forEach((change, ind) => {
        let data = change.doc.data();

        if (change.type === "added") {
            console.log("New added");
            getMsgFromFirebase(data, change.doc.id);
            var chatArea = document.getElementById("chat-bubbles");
            chatArea.scrollTop = chatArea.scrollHeight;

        }
        if (change.type === "modified") {
            console.log("Modified");

        }
        if (change.type === "removed") {
            let msgRemoved = document.getElementById(`${change.doc.id}-msg`);
            msgRemoved.remove();
            console.log("Removed");
        }
    });

});


function togglePhotos(icon) {
    var photoArea = document.getElementById("photos");
    if (photoArea.style.display == "none") {
        photoArea.style.display = "";
    } else {
        photoArea.style.display = "none";
    }
    toggleArrow(icon);
}

var chatArea = document.getElementById("chat-bubbles");
var sendMsgArea = document.getElementById("send-msg-area");
function toggleChat(icon) {
    if (chatArea.style.display == "none") {
        chatArea.style.display = "";
        sendMsgArea.style.display = "";
        var role = sessionStorage.getItem("role");
        console.log(role);
        hygieneChat.get().then(snapshot => {
            snapshot.forEach(doc => {
                if (role == "tenants") {
                    doc.ref.update({
                        readByTenant: 1
                    })
                } else {
                    doc.ref.update({
                        readByAuditor: 1
                    })
                }
            })
        })

    } else {
        chatArea.style.display = "none";
        sendMsgArea.style.display = "none";
    }
    toggleArrow(icon);
    chatArea.scrollTop = chatArea.scrollHeight;

}

hygieneChat.onSnapshot(snapshot => {
    var role = sessionStorage.getItem("role");
    console.log(role);
    console.log(`Chat Area opened: ${chatArea.style.display}`);
    if (chatArea.style.display == "") {
        snapshot.forEach(doc => {
            if (role == "tenants") {
                doc.ref.update({
                    readByTenant: 1
                })
            } else {
                doc.ref.update({
                    readByAuditor: 1
                })
            }

        })
    }

})

function toggleArrow(icon) {
    if (icon.classList.contains("fa-chevron-down")) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    } else {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
}

function getIndex(image) {
    var photoColumn = document.getElementsByClassName("photos-column");
    var index = 0;
    while (index < photoColumn.length) {
        if (photoColumn[index].firstChild == image) {
            return index + 1;
        } else {
            index += 1;
        }
    }
    return 1;
}

// Open the Modal
function openModal(image) {
    var n = getIndex(image);
    console.log(n);
    currentSlide(n);
    document.getElementById("gallery").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("gallery").style.display = "none";
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    if (document.getElementsByClassName("gallery-content")[0].hasChildNodes) {
        var slides = document.getElementsByClassName("gallery-slide");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }
}

function getMsgFromFirebase(data, msgID) {
    //get msgs from firebase
    chatBubblesArea = document.getElementById("bubbles");
    var message = document.createElement("p");
    messageText = document.createTextNode(data.content);
    message.appendChild(messageText);

    // let timeHeader = document.createElement("h5");
    // let time = data.timestamp.toDate().toString().split(" ")[4].slice(0,5);
    // console.log(time);
    // let timeText = document.createTextNode(time);
    // timeHeader.appendChild(timeText);

    var messageBox = document.createElement("div");
    messageBox.appendChild(message);
    // messageBox.appendChild(timeHeader);
    messageBox.classList.add("message-box");

    var profile = document.createElement("img");
    profile.src = "../../../resources/profile.png";

    var bubble = document.createElement("div");
    if ((data.from == tenantID && role == "tenants") || (data.from == auditorID && role == "auditors")) {
        bubble.append(profile);
        bubble.append(messageBox);
        bubble.classList.add("left");
    } else {
        bubble.append(messageBox);
        bubble.append(profile);
        bubble.classList.add("right");
    }
    bubble.classList.add("bubble");
    bubble.setAttribute("id", `${msgID}-msg`);

    chatBubblesArea.append(bubble);
}


function sendMessage(object) {
    // console.log(object)
    hygieneChat.add(object).then(added => {
        console.log("message sent ", added)
    }).catch(err => {
        console.err("Error occured", err)
    })

}

// function deleteMessage(doc_id){
//     var flag = window.confirm("Are you sure to want delete ?")

//     if(flag){

//         db.collection("chats").doc(doc_id).delete();
//         console.log("Deleted");

//     }
// }

// on click function
function sendMsg() {

    var message = document.getElementById("textMsg").value;
    console.log(message);
    if (message) {
        if (role == "tenants") {
            // insert message 
            sendMessage({
                from: tenantID,
                content: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                to: auditorID,
                readByTenant: 1,
                readByAuditor: 0
            })
        }
        else {
            // insert message 
            sendMessage({
                from: auditorID,
                content: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                to: tenantID,
                readByTenant: 0,
                readByAuditor: 1
            })
        }

        document.getElementById("textMsg").value = "";
    }
}

// Send message when user enter key
document.getElementById("textMsg").addEventListener("keyup", function (event) {

    // get key code of enter
    if (event.keyCode == 13) { // enter
        sendMsg();
    }

})

function rectified(rectBtn) {
    console.log(rectBtn.parentNode.previousSibling);
    var questions = document.getElementsByClassName("question");
    for (i = 0; i < questions.length; i++) {
        if (questions[i] == rectBtn.parentNode.previousSibling) {
            changeResolvedDB(i);

            rectBtn.innerHTML = "Rectified";
            rectBtn.classList.remove("rect-btn");
            rectBtn.classList.add("rect-btn-resolved");
            rectBtn.onclick = '';
        }
    }
}

function changeResolvedDB(index) {
    db.collection("reports").doc(reportID).get().then((doc) => {
        var resolved = doc.data()[category + "_resolved"];
        resolved[index] = true;
        db.collection("reports").doc(reportID).update({
            [category + "_resolved"]: resolved,
        })
    })
}