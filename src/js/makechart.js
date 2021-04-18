// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBl1hU_vW6IbzkF0XTqvnBlWyLrTmgybns",
  authDomain: "singhealth-221e6.firebaseapp.com",
  projectId: "singhealth-221e6",
  appId: "1:684333425325:web:59bbff097942477f599c24",
  measurementId: "G-SYJWNBX65P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

db.settings({ timestampsInSnapshots: true });

const btn = document.querySelector('#radiobuttons');
// handle click button
btn.onchange = function () {
  const rbs = document.querySelectorAll('input[name="choice"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      break;
    }
  }
  document.getElementById("toggle").innerHTML = "Choose " + selectedValue;
  if (selectedValue === "Institution") {
    document.querySelector('#inst').style.display = "block";
    document.querySelector('#multi').style.display = "none";
    document.querySelector('#instreset-button').style.display = "block";
    document.querySelector('#reset-button').style.display = "none";
    document.querySelector('#instgenerate').style.display = "block";
    document.querySelector('#generate').style.display = "none";
  }
  if (selectedValue === "Tenants") {
    document.querySelector('#multi').style.display = "block";
    document.querySelector('#inst').style.display = "none";
    document.querySelector('#reset-button').style.display = "block";
    document.querySelector('#instreset-button').style.display = "none"
    document.querySelector('#generate').style.display = "block";
    document.querySelector('#instgenerate').style.display = "none";
  }
};

var lineChart;
let monthData = []
let tempScores = [];

const myChart = document.querySelector("#myChart");

function displayTrends() {
  if (lineChart != undefined) {
    lineChart.destroy();
  }

  let myChart = document.getElementById('myChart').getContext('2d');

  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';

  lineChart = new Chart(myChart, {
    type: 'line',
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: []
    },
    options: {
      title: {
        display: true,
        text: 'Audit Scores',
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

function generate(selector) {
  var selected = selector.value();
  if (selected.length != 0) {

    displayTrends();
    myChart.parentNode.style.display = "";
    document.querySelector(".download-csv-jpeg").style.display = "";

    var count = 0;
    selected.forEach(item => {
      var itemName;
      console.log(item);
      if (item == "CGH") {
        itemName = "Changi General Hospital";
      } else if (item == "KKH") {
        itemName = "KK Women's and Children's Hospital";
      } else if (item == "SGH") {
        itemName = "Singapore General Hospital";
      } else if (item == "SKH") {
        itemName = "SengKang General Hospital";
      } else if (item == "NCCS") {
        itemName = "National Cancer Centre Singapore";
      } else if (item == "NHCS") {
        itemName = "National Heart Centre Hospital";
      } else if (item == "BVH") {
        itemName = "Bright Vision Hospital";
      } else if (item == "OCH") {
        itemName = "Outram Community Hospital";
      } else {
        itemName = "Academia";
      }

      var newDataset = {
        label: item,
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: generateRandomColor(),
        fill: false,
      }
      lineChart.data.datasets.push(newDataset);
      lineChart.update();

      monthData.push([[],[],[],[],[],[],[],[],[],[],[],[]]);

      getScore(itemName, count);
      count += 1;

    });
  }
  else {
    console.log("None chosen. Please make a selection.");
  }
}

function getScore(itemName, count) {
  db.collection("tenants").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (itemName == doc.data().hospital) {
        let refs = doc.data().reports;
        for (i = 0; i < refs.length; i++) {
          refs[i].get().then(ref => {
            console.log(itemName + " " + ref.id + " " + ref.data().overallScore);
            dateData = new Date(ref.data().dateCreated.seconds * 1000);
            
            lineChart.data.datasets[count].data[dateData.getMonth()] = average(ref.data().overallScore, count, dateData.getMonth())
            lineChart.update();
          });
        }
      }
    });
  }).catch(err => {
    console.log(err.message);
  });
}

function average(refScore, count, month) {
  monthData[count][month].push(refScore);
  sum = monthData[count][month].reduce((a,b) => a + b, 0);
  return sum/monthData[count][month].length;
}

function generateRandomColor() {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

document.getElementById("download").addEventListener('click', function () {
  /*Get image of canvas element*/
  var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
  /*get download button (tag: <a></a>) */
  var a = document.getElementById("download");
  /*insert chart image url to download button (tag: <a></a>) */
  a.href = url_base64jp;
  download(csvContent, 'statistic.csv', 'text/csv;encoding:utf-8');
});


// Example data given in question text
var data = [
  ['CGH', 'Average Score: 98'],
  ['KKH', 'Average Score: 56'],
  ['SGH', 'Average Score: 88'],
  ['SKH', 'Average Score: 98'], ,
  ['NCCS', 'Average Score: 55'],
  ['NHCS', 'Average Score: 97.5'],
  ['BVH', 'Average Score: 78'],
  ['OCH', 'Average Score: 75'],
  ['Acadmia', 'Average Score: 86'],
];

// // Build data to enter into CSV
// var data = [];
// for (i=0; i<lineChart.data.datasets.length; i++) {
//   d = [];
//   d.push(lineChart.data.datasets[i].label);
//   lineChart.data.datasets[i].data
// }

// Building the CSV from the Data two-dimensional array
// Each column is separated by ";" and new line "\n" for next row
var csvContent = '';
data.forEach(function (infoArray, index) {
  dataString = infoArray.join(' ');
  csvContent += index < data.length ? dataString + '\n' : dataString;
});

// The download function takes a CSV string, the filename and mimeType as parameters
function download(content, fileName, mimeType) {
  var a = document.createElement('a');
  mimeType = mimeType || 'application/octet-stream';

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName);
  } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }));
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
  }
}


