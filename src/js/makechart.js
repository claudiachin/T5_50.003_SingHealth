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
  //generate();
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
let DATA = {
  January: [],
  February: [],
  March: [],
  April: [],
  May: [],
  June: [],
  July: [],
  August: [],
  September: [],
  October: [],
  November: [],
  December: []
};
let tempScores = [];

const myChart = document.querySelector("#myChart");

function displayTrends() {
  let myChart = document.getElementById('myChart').getContext('2d');

  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';

  lineChart = new Chart(myChart, {
    type: 'line',
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
      ]
    },
    options: {

      title: {
        display: true,
        text: 'Audit Scores'
      }
    }
  });
}

// function myFunction(item) {
//   addData(item, [88,88,88,90,92,96,97,95,95,95],generateRandomColor());
// }
function myFunction(item, listOfScores) {
  addData(item, listOfScores, generateRandomColor());
}

function getScoreData(item) {
  db.collection("tenants").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (item == doc.data().hospital) {
        let refs = doc.data().reports;
        for (i = 0; i < refs.length; i++) {
          refs[i].get().then(ref => {
            getScores(ref.id);
          });
        }
      }
    });
  }).then(() => {
    console.log(tempScores);
    myFunction(item, tempScores);
  }).catch(err => {
    console.log(err.message);
  });
};

function getScores(id) {
  db.collection("reports").doc(id).onSnapshot(doc => {
    // console.log(doc.data().overallScore);
    let score = doc.data().overallScore;
    // let reportDate = doc.data().dateCreated;
    // console.log(reportDate);
    tempScores.push(score);
    // console.log(tempScores);
  }), err => {
    console.log(err.message);
  };
}

function generate(selector) {
  console.log("customiconmulti: " + selector.value());
  var selected = selector.value();
  if (selected.length != 0) {
    displayTrends();
    myChart.style.display = "block";
    selected.forEach(item => {
      console.log(item);
      if (item == "CGH") {
        getScoreData("Changi General Hospital");
      } else if (item == "KKH") {
        getScoreData("KK Women's and Children's Hospital");
      } else if (item == "SGH") {
        getScoreData("Singapore General Hospital");
      } else if (item == "SKH") {
        getScoreData("SengKang General Hospital");
      } else if (item == "NCCS") {
        getScoreData("National Cancer Centre Singapore");
      } else if (item == "NHCS") {
        getScoreData("National Heart Centre Hospital");
      } else if (item == "BVH") {
        getScoreData("Bright Vision Hospital");
      } else if (item == "OCH") {
        getScoreData("Outram Community Hospital");
      } else {
        getScoreData("Academia");
      }
    });
  }
  else {
    console.log("None chosen. Please make a selection.");
  }
  /*var apples = customIconMulti.option;
  apples.forEach(anotherFunction);

  document.getElementById("hi").innerText=(customIconMulti.options);*/
}

document.getElementById("download").addEventListener('click', function () {
  /*Get image of canvas element*/
  var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
  /*get download button (tag: <a></a>) */
  var a = document.getElementById("download");
  /*insert chart image url to download button (tag: <a></a>) */
  a.href = url_base64jp;
});


//To add DataSet
function addData(label, data, color) {
  //lineChart.data.labels.push(label);
  lineChart.data.datasets.push(data);
  data.label = label;
  data.borderColor = color;
  //data.borderColor="#3cba9f";
  data.fill = false;
  data.data = data;
  console.log("updating chart...");
  lineChart.update();

}

//To edit-> but should remove all
function removeData() {
  lineChart.data.datasets.length = 0;
  lineChart.update();
}

function resetCustomMulti(selecting) {
  removeData();
  //lineChart.clear();
  //lineChart.reset();
  myChart.style.display = "none";
  selecting.reset();
};

function generateRandomColor() {
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}



/*
// Filter out and set back into chart.data.datasets
chart.data.datasets = chart.data.datasets.filter(function(obj) {
  return (obj.label != targetLabel); 
});
// Repaint
chart.update();*/


/*var refs = doc.data().reports
for (i=0;i<refs.length;i++) 
    refs[i].get().....*/


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

// Building the CSV from the Data two-dimensional array
// Each column is separated by ";" and new line "\n" for next row
var csvContent = '';
data.forEach(function (infoArray, index) {
  dataString = infoArray.join(' ');
  csvContent += index < data.length ? dataString + '\n' : dataString;
});

// The download function takes a CSV string, the filename and mimeType as parameters
// Scroll/look down at the bottom of this snippet to see how download is called
var download = function (content, fileName, mimeType) {
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



var arrayofScores = {};



function getid(selected) {
  db.collection('tenants').onSnapshot((snapshot) => {
    snapshot.docs.forEach(doc => {
      if (selected == doc.data().branch)
        localStorage.setItem("tenantID", doc.id);
    })
  })
}


//get array of scores (unfiltered by time period)
function getlist(selected) {
  getid(selected);
  console.log(localStorage.getItem("tenantID"));

  db.collection("reports").orderBy("dateCreated").get().then((querySnapshot) => {
    var count = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().associatedTenant == localStorage.getItem("tenantID")) {
        console.log(doc.data().overallScore);
        arrayofScores[count] = doc.data().overallScore;
        count += 1;
        console.log(count);
      }
    }); console.log(arrayofScores);
  });
  console.log(arrayofScores);
}


function average(array) {
  let a = new Array(12);
  if (array.length == 0) {
    for (let i = 0; i < 12; ++i) { a[i] = 0; }
    return a;
  }


  for (i = 0; i < 12; i++) {
    var ans = 0;
    for (j = 0; j < array.length; j++) {

      if (typeof array[j][i] === 'undefined') {
        ans += 0;
      }
      ans += array[j][i];
    }

    a[i] = ans / array.length;
  }


  return a;
}

