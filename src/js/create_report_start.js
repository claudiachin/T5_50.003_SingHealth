// to change to reading from firebase
var names = ["Heavenly Wang- Wang Cafe", "O' Coffee Club", "O Chang Kee", "Noel Gifts International", "Mr Bean", "K-Cuts"];

for (i=0; i<names.length; i++) {
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
  sect.classList.add("sect");
  sect.id = "sect-"+i;
  sect.onmousedown = function(){ select(this) };

  var split = document.createElement("hr");

  var list = document.getElementById("list");
  list.appendChild(sect);
  list.appendChild(split);
}

function filter() {
  // Declare variables
  var filter = document.getElementById('search').value.toUpperCase();
  var tenantInfo = document.getElementById("list").getElementsByTagName('div');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < tenantInfo.length; i++) {
    var tenantName = tenantInfo[i].firstChild;
    var txtValue = tenantName.textContent || tenantName.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      tenantInfo[i].style.display = "";
      tenantInfo[i].nextElementSibling.style.display = "";
    } else {
      tenantInfo[i].style.display = "none";
      tenantInfo[i].nextElementSibling.style.display = "none";
    }
  }
}

var prev = '';
var curr = ''

function select(ele) {
  if (prev != '') {
    prev.firstChild.style.color = "#444444";
  }
  ele.firstChild.style.color = "#F15A22";
  document.getElementsByClassName("next-button")[0].classList.remove("hide");
  prev = ele;
}

function goNext() {
  console.log(prev.id);
  if (prev != '') {
    console.log(prev.childNodes[1].innerText);
    if (prev.childNodes[1].innerText.includes("non-F&B")) {
      window.location.href='non-fnb/professionalism_staff_hygiene.html';
    } else {
      window.location.href='fnb/professionalism_staff_hygiene.html';
    }
  }
}