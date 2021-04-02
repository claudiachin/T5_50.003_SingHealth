
// to change to reading from firebase
var names = ["Heavenly Wang- Wang Cafe", "O' Coffee Club", "O Chang Kee", "Noel Gifts International", "Mr Bean", "K-Cuts"];

for (i = 0; i < names.length; i++) {
    var tenant = document.createElement("p");
    var tenantText = document.createTextNode(names[i]);
    tenant.appendChild(tenantText);
    tenant.classList.add("tenant-text");

    var inst = document.createElement("p");
    var instText = document.createTextNode("[SingHealth Instiution] [F&B Store]");
    inst.appendChild(instText);

    var date = document.createElement("h6");
    var dateText = document.createTextNode("Latest report made on 14/2/2020");
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
    card.onclick = function () { selectTenant(this) };

    var split = document.createElement("hr");

    var list = document.getElementById("list");
    list.appendChild(card);
    list.appendChild(split);
}

function filter() {
    // Declare variables
    var filter = document.getElementById('search').value.toUpperCase();
    var cards = document.getElementById("list").getElementsByClassName('card');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < cards.length; i++) {
        var tenantName = cards[i].firstChild.firstChild;
        var txtValue = tenantName.textContent || tenantName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
            cards[i].nextElementSibling.style.display = "";
        } else {
            cards[i].style.display = "none";
            cards[i].nextElementSibling.style.display = "none";
        }
    }
}

function selectTenant(ele) {
    console.log(ele.id);
    url = 'tenant_info.html?name=' + encodeURIComponent(ele.firstChild.firstChild.innerHTML);
    window.location.href = url;
}