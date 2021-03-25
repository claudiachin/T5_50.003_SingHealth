const announcementForm = document.querySelector("#announcementForm");
const title;
const image;
const description;

function displayInformation(details){
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