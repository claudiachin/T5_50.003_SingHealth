var url = window.location.href;
params = url.split('?')[1].split('&');
data = {};
for (i = 0; i < params.length; i++) {
    var tmp = params[i].split('=');
    data[tmp[0]] = decodeURIComponent(tmp[1]);
}
document.getElementById('announcement-name').innerHTML = data.name;


// to change to reading from firebase
var reports = ["Report 1", "Report 2", "Report 3", "Report 4", "Report 5"];

for (i = 0; i < reports.length; i++) {
    var report = document.createElement("p");
    var reportText = document.createTextNode(reports[i]);
    report.appendChild(reportText);

    var date = document.createElement("h6");
    var dateText = document.createTextNode("14/2/2020");
    date.appendChild(dateText);

    var sect = document.createElement("div");
    sect.appendChild(report);
    sect.appendChild(date);

    var icon = document.createElement("div");
    icon.innerHTML = '<i class="fas fa-chevron-right"></i>'

    var card = document.createElement("div");
    card.appendChild(sect)
    card.appendChild(icon);
    card.classList.add("card");
    card.id = "report-" + i;
    card.onclick = function () { selectReport(this) };

    var split = document.createElement("hr");

    var list = document.getElementById("list");
    list.appendChild(card);
    list.appendChild(split);
}

function selectReport(report){
    console.log(report.id);
    localStorage.setItem("prevUrl", window.location.href);
    localStorage.setItem("type", document.getElementById("type").innerHTML);
    localStorage.setItem("reportName", report.firstChild.firstChild.innerHTML);
    localStorage.setItem("reportDate", report.firstChild.lastChild.innerHTML);
    window.location.href = 'view_report/start.html';
}
