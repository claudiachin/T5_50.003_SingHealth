//get data from firebase
var checkboxes = document.getElementsByClassName("main-content-view-report")[0].getElementsByTagName("i");
var data = [];
for (i = 0; i < checkboxes.length; i++) {
    data.push(1);
}
data[1] = 0;
data[2] = -1;

var score = 0;
var outOf = data.length;
for (i = 0; i < data.length; i++) {
    if (data[i] == 1) { // yes
        score += 1;
        checkboxes[i].classList.add("fa-check");
    } else if (data[i] == -1) { // invalid
        outOf -= 1;
        checkboxes[i].classList.add("fa-window-minimize");
    } else { // no
        checkboxes[i].classList.add("fa-times");
    }
}
document.getElementById("score").innerHTML = score;
document.getElementById("out-of").innerHTML = outOf;

function togglePhotos(icon) {
    var photoArea = document.getElementById("photos");
    if (photoArea.style.display == "none") {
        photoArea.style.display = "";
    } else {
        photoArea.style.display = "none";
    }
    toggleArrow(icon);
}

function toggleChat(icon) {
    var chatArea = document.getElementById("chat-bubbles");
    if (chatArea.style.display == "none") {
        chatArea.style.display = "";
    } else {
        chatArea.style.display = "none";
    }
    toggleArrow(icon);
}

function toggleArrow(icon) {
    if (icon.classList.contains("fa-chevron-down")) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    } else {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
}

//get photos from firebase
photos = [];
for (i = 0; i < 9; i++) {
    photos.push('../../../resources/AddPicture.JPG');
}

var photoRow = document.getElementsByClassName("photos-row")[0];
var galleryContent = document.getElementsByClassName("gallery-content")[0];

for (i = 0; i < photos.length; i++) {
    imgDiv = document.createElement("div");
    imgDiv.style.background = "url(" + photos[i] + ") 50% 50% no-repeat";
    imgDiv.onclick = function () { openModal(this) };
    imgDiv.classList.add("hover-shadow");

    photoColumn = document.createElement("div");
    photoColumn.classList.add("photos-column");
    photoColumn.appendChild(imgDiv);

    photoRow.appendChild(photoColumn);

    slideImg = document.createElement("img");
    slideImg.src = photos[i];
    slideImg.style.width = "100%";

    numberText = document.createElement("div");
    numberText.innerHTML = i+1 + " / " + photos.length;
    numberText.classList.add("numbertext");

    gallerySlide = document.createElement("div");
    gallerySlide.classList.add("gallery-slide");
    gallerySlide.appendChild(slideImg);
    gallerySlide.appendChild(numberText);

    galleryContent.appendChild(gallerySlide);
}

function getIndex(image) {
    var photoColumn = document.getElementsByClassName("photos-column");
    var index = 0;
    while (index < photoColumn.length) {
        if (photoColumn[index].firstChild == image) {
            return index+1;
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
    if (galleryContent.hasChildNodes) {
        var slides = document.getElementsByClassName("gallery-slide");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }
}