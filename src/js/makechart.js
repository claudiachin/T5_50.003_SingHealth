let lineChart;
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

function displayTrends(){
  let myChart = document.getElementById('myChart').getContext('2d');

  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';
  
  lineChart = new Chart(myChart, {
    type: 'line',
    data: {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12],
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
  addData(item,listOfScores,generateRandomColor());
}

function getScoreData(item){
  db.collection("tenants").get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (item == doc.data().hospital){
          // console.log(doc.data().reports);
          let refs = doc.data().reports;
          for (i=0; i<refs.length; i++){
            refs[i].get().then(ref =>{
              // console.log(ref.id);
              getScores(ref.id);
            });
          }
        }
      });
    }).then(()=>{
      console.log(tempScores);
      myFunction(item, tempScores);
    }).catch(err => {
    console.log(err.message);
    });
};

function getScores(id){
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

function generate(selector){
  console.log("customiconmulti: " + selector.value()); 
  var selected = selector.value();
  if(selected.length!=0){
    displayTrends();
    myChart.style.display="block";
    selected.forEach(item =>{
        console.log(item);
        if (item == "CGH"){
          getScoreData("Changi General Hospital");
        }else if (item == "KKH"){
          getScoreData("KK Women's and Children's Hospital");
        }else if (item == "SGH"){
          getScoreData("Singapore General Hospital");
        }else if (item == "SKH"){
          getScoreData("SengKang General Hospital");
        }else if (item == "NCCS"){
          getScoreData("National Cancer Centre Singapore");
        }else if (item == "NHCS"){
          getScoreData("National Heart Centre Hospital");
        }else if (item == "BVH"){
          getScoreData("Bright Vision Hospital");
        }else if (item == "OCH"){
          getScoreData("Outram Community Hospital");
        }else{
          getScoreData("Academia");
        }
    });
  }
  else{
    console.log("None chosen. Please make a selection.");
  }
  /*var apples = customIconMulti.option;
  apples.forEach(anotherFunction);

  document.getElementById("hi").innerText=(customIconMulti.options);*/
}

document.getElementById("download").addEventListener('click', function(){
  /*Get image of canvas element*/
  var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
  /*get download button (tag: <a></a>) */
  var a =  document.getElementById("download");
  /*insert chart image url to download button (tag: <a></a>) */
  a.href = url_base64jp;
});


//To add DataSet
function addData(label, data, color) {
  //lineChart.data.labels.push(label);
  lineChart.data.datasets.push(data);
  data.label=label;
  data.borderColor=color;
  //data.borderColor="#3cba9f";
  data.fill=false;
  data.data=data;
  console.log("updating chart...");
  lineChart.update();

}

//To edit-> but should remove all
function removeData() {
  lineChart.data.datasets.length=0;
  lineChart.update();
}

function resetCustomMulti(selecting) {
  removeData();
  myChart.style.display="none";
  selecting.reset();
};

function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    //random color will be freshly served
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