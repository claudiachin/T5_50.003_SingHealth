
// to change to reading from firebase
var names = ["New Tenancy Info", "New Rules and Regulations", "Happy Easter to All!", "Merry Christmas dear All", "Rules and Regulations V.1.0", "Chinese New Year Event"];
//var ids = [Ag4cToniR044TVOP6dXk,LFAGLNYXc1SKLdVIo4ZP,]

for (i = 0; i < names.length; i++) {
    var tenant = document.createElement("p");
    var tenantText = document.createTextNode(names[i]);
    tenant.appendChild(tenantText);
    tenant.classList.add("tenant-text");

    var inst = document.createElement("p");
    var instText = document.createTextNode("[SingHealth Instiution] [Announcement]");
    inst.appendChild(instText);

    var date = document.createElement("h6");
    var dateText = document.createTextNode("Latest announcement made on 14/2/2020");
    date.appendChild(dateText);

    var sect = document.createElement("div");
    sect.appendChild(tenant);
    sect.appendChild(inst);
    sect.appendChild(date);
    sect.classList.add("sect")

    var icon = document.createElement("div");
    icon.innerHTML = '<i class="fas fa-chevron-right"></i>'

    var card = document.createElement("div");
    card.appendChild(sect)
    card.appendChild(icon);
    card.classList.add("card");
    card.id = "card-" + i;
    card.onclick = function () { selectAnnouncement(this) };

    var split = document.createElement("hr");

    var list = document.getElementById("list");
    list.appendChild(card);
    list.appendChild(split);
}

function selectAnnouncement(ele) {
    console.log(ele.id);
    url = 'announcement_info.html?name=' + encodeURIComponent(ele.firstChild.firstChild.innerHTML);
    window.location.href = url;
}