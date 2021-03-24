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
    } else if (qn.classList.contains("fa-times")) {
        qn.classList.remove("fa-times");
        qn.classList.add("fa-window-minimize");
        outOfSubtract();
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
    while (i<checkboxes.length && allFilled) {
        if (checkboxes[i].classList.length < 3) {
            allFilled = false;
        }
        i += 1
    }
    if (allFilled) {
        document.getElementsByClassName("next-button")[0].classList.remove("hide");
    }
}

function scoreAdd() {
    var currScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerHTML = currScore+1;
}

function scoreSubtract() {
    var currScore = parseInt(document.getElementById("score").innerHTML);
    document.getElementById("score").innerHTML = currScore-1;
}

function outOfAdd() {
    var currOutOf = parseInt(document.getElementById("out-of").innerHTML);
    document.getElementById("out-of").innerHTML = currOutOf+1;
}

function outOfSubtract() {
    var currOutOf = parseInt(document.getElementById("out-of").innerHTML);
    document.getElementById("out-of").innerHTML = currOutOf-1;
}