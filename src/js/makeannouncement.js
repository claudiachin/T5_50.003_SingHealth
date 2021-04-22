var imageURL = "https://firebasestorage.googleapis.com/v0/b/singhealth-221e6.appspot.com/o/transparent_ver2.fw.png?alt=media&token=454dbf3e-c994-45ad-b543-a6855cf59ae7";

//function to upload announcement to the Firebase
function postannouncement() {

    if (checkFieldsFilled()==true){
        db.collection("announcements").add({
            title: document.getElementById("count_value_title").value,
            content: document.getElementById("count_value").value,
            datePosted: perfectDate(),
            timePosted: perfectTime(), 
            image: imageURL,
            associatedAuditor: "tester",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            readby: [sessionStorage.getItem("auditorID")]
        })
        .then(() => {
            let role = sessionStorage.getItem("role");
            if (role == "tenants"){
                window.location.href = "../html/tenant_announcements.html";
            }else{
                window.location.href = "../html/announcements.html";
            }
            // console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}

function checkFieldsFilled() {
        //checks that all the relevant fields have been filled
        var titleTextfield = document.getElementById("count_value_title").value;
        var descriptionTextfield = document.getElementById("count_value").value.replace(/\n/g, '<br>');
    
        var titleFilled = false;
        var descriptionFilled = false;
        if (titleTextfield !=""){
            titleFilled = true;
        }
        if (descriptionTextfield !=""){
            descriptionFilled = true;
        }
        if (titleFilled && descriptionFilled) {
            console.log("All relevant fields have been filled");
            return true;
        }else{
            console.log("Not all relevant fields have been filled");
            return false;
        }
    }

const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
});

function perfectDate(){
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = `${currentDayOfMonth}/${currentMonth + 1}/${currentYear}`;
    return dateString;
}

function perfectTime(){
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    let timeString;
    timeString = `${currentHours}:${currentMinutes}:${currentSeconds}`;
    console.log(`${currentHours} ${currentMinutes} ${currentSeconds}`);
    console.log(currentHours < 10);
    console.log(currentMinutes < 10);
    console.log(currentSeconds < 10);
    if (currentHours < 10){
        timeString = `0${currentHours}:${currentMinutes}:${currentSeconds} `;
    }
    if (currentMinutes < 10){
        timeString = `${currentHours}:0${currentMinutes}:${currentSeconds} `;
    }
    if (currentSeconds < 10){
        timeString = `${currentHours}:${currentMinutes}:0${currentSeconds} `;
    }

    let ampm = "AM";
    if (currentHours >= 12){
        ampm = "PM"
    }

    return timeString + ampm;
}

function uploadImageAsPromise(imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref(imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot) {
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
            function error(err) {

            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    imageURL = downloadURL;
                });
            }
        );
    });
}

//For Testing Purposes
function titleFieldLength(){
    var titleTextfieldCount = document.getElementById("count_no_title").innerHTML;
    console.log(titleTextfieldCount);
    return titleTextfieldCount;
}

function descFieldLength(){
    var descTextfieldCount = document.getElementById("count_no").innerHTML;
    console.log(descTextfieldCount);
    return descTextfieldCount;
}

function imageType(){
    var imageType = imageURL;
    var imageExtension = imageType.split('.').pop();
    imageExtension = imageExtension.substring(0, imageExtension.indexOf('?'));
    console.log(imageExtension);
    return imageExtension;
}