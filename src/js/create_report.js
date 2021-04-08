function change(qn) {
    if (qn.classList.contains("fa-window-minimize")) {
        qn.classList.remove("fa-window-minimize");
        qn.classList.add("fa-check");
        scoreAdd();
        outOfAdd();
    } else if (qn.classList.contains("fa-check")) {
        qn.classList.remove("fa-check");
        qn.classList.add("fa-times");
        scoreSubtract();
        togglePhotoFunction(qn, "on");
    } else if (qn.classList.contains("fa-times")) {
        qn.classList.remove("fa-times");
        qn.classList.add("fa-window-minimize");
        outOfSubtract();
        togglePhotoFunction(qn, "off");
    } else {
        qn.classList.add("fa-check");
        scoreAdd();
    }
    checkFilled();
}

function checkFilled() {
    //checks that all the checkboxes so that next button can be shown
    var checkboxes = document.getElementsByClassName("main-content-report")[0].getElementsByTagName("i");

    var i = 0;
    var allFilled = true;
    while (i < checkboxes.length && allFilled) {
        if (checkboxes[i].classList.length < 3) {
            allFilled = false;
        }
        i += 1
    }
    if (allFilled) {
        var saveButton = document.getElementById("save-button");
        saveButton.style.display = "";
    }
}

function scoreAdd() {
    var currScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerHTML = currScore + 1;
}

function scoreSubtract() {
    var currScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerHTML = currScore - 1;
}

function outOfAdd() {
    var currOutOf = parseInt(document.getElementById("out-of").innerHTML);
    document.getElementById("out-of").innerHTML = currOutOf + 1;
}

function outOfSubtract() {
    var currOutOf = parseInt(document.getElementById("out-of").innerHTML);
    document.getElementById("out-of").innerHTML = currOutOf - 1;
}

function togglePhotoFunction(qn, status) {
    console.log(status);

    //get index of question
    var index = getIndex(qn.parentNode.parentNode);

    if (status == "on") {
        //create photos text
        var flapTitle = document.createElement("h2");
        var flapTitleText = document.createTextNode("Photos");
        flapTitle.appendChild(flapTitleText);

        //create down arrow + function to toggle display of viewing photo section
        var flapIcon = document.createElement("div");
        flapIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';
        flapIcon.onclick = function () { toggleViewPhotos(this) };

        //create flap
        var flap = document.createElement("div");
        flap.appendChild(flapTitle);
        flap.appendChild(flapIcon);
        flap.classList.add("photo-flap");

        //create list of photos
        var imgList = document.createElement("div");

        //create add photo button + function to display photo
        var imgPicker = document.createElement("div");
        var label = document.createElement("label");
        label.htmlFor = "imgPicker" + index;
        label.innerHTML = '<i class="fas fa-upload"></i>';
        var input = document.createElement("input");
        input.type = "file";
        input.id = "imgPicker" + index;
        input.accept = "image/*";
        input.multiple = "true";
        input.style.display = "none";
        input.onchange = function () { displayFileNames(this) };
        imgPicker.appendChild(label);
        imgPicker.appendChild(input);

        //create photo upload section
        var upload = document.createElement("div");
        upload.appendChild(imgList);
        upload.appendChild(imgPicker);
        upload.classList.add("upload-div");

        //create deadline text
        var deadlineText = document.createElement("p");
        var deadlineTextText = document.createTextNode("Deadline:");
        deadlineText.appendChild(deadlineTextText);

        //create date picker
        var datePicker = document.createElement("div");
        datePicker.innerHTML = '<input type="date" id="deadline" name="deadline">';

        //create deadline section
        var deadline = document.createElement("div");
        deadline.appendChild(deadlineText);
        deadline.appendChild(datePicker);
        deadline.classList.add("deadline-div");

        //create entire section
        var sect = document.createElement("div");
        sect.appendChild(flap);
        sect.appendChild(upload);
        sect.appendChild(deadline);
        sect.id = "test" + index;
        sect.style.marginBottom = "8px";

        //add to the space after the question
        var parent = document.getElementsByClassName("main-content-report")[0];
        parent.insertBefore(sect, qn.parentNode.parentNode.nextSibling);

    } else {
        document.getElementById("test" + index).remove();
    }

}

function getIndex(node) {
    var questions = document.getElementsByClassName("main-content-report")[0].getElementsByClassName("question");
    var index = 0;
    var found = false;

    while (found == false && index < questions.length) {
        if (questions[index] == node) {
            found = true;
        } else {
            index += 1
        }
    }

    return index;
}

function displayFileNames(fileUploadBtn) {
    currFiles = fileUploadBtn.parentNode.previousSibling.children;
    console.log(currFiles.length);
    for (i = currFiles.length - 1; i >= 0; i--) {
        console.log(currFiles[i]);
        currFiles[i].remove();
    }

    for (i = 0; i < fileUploadBtn.files.length; i++) {
        var file = document.createElement("p");
        var fileName = document.createTextNode(fileUploadBtn.files[i].name);
        file.appendChild(fileName);
        fileUploadBtn.parentNode.previousSibling.appendChild(file);
    }
}

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

function upload() {
    //TO DO: upload qnsData and photos
    var inputDivs = document.getElementsByTagName("input");
    for (i = 0; i < inputDivs.length; i++) {
        if (inputDivs[i].getAttribute("type") == "file") {
            photos = inputDivs[i].files;
            for (j = 0; j < photos.length; j++) {
                var storageRef = firebase.storage().ref();
                var uploadTask = storageRef.child(photos[j].name).put(photos[j]);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                        });
                    }
                );

            }
        }
    }
    
    var checkboxes = document.getElementsByClassName("main-content-report")[0].getElementsByTagName("i");
    var data = []
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].classList.contains("fa-window-minimize")) { //invalid
            data.push(-1);
        } else if (checkboxes[i].classList.contains("fa-check")) { //yes
            data.push(1);
        } else if (checkboxes[i].classList.contains("fa-times")) { //no
            data.push(0);
        }
    }

    document.getElementsByClassName("next-button")[0].classList.remove("hide");

}