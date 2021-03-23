const guideList = document.querySelector(".guides");

// setup guides
const setupGuides = (data) => {
    let html = "";
    data.forEach(doc => {
        const guide = doc.data();
        console.log(guide);
    })
}