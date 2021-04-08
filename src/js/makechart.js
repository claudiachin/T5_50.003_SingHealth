let lineChart;
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

function myFunction(item) {
  addData(item, [88,88,88,90,92,96,97,95,95,95],generateRandomColor());
}

function generate(selector){
  console.log("customiconmulti: " + selector.value()); 
  var selected = selector.value();
  if(selected.length!=0){
    myChart.style.display="block";
    displayTrends();
    removeData();
  }
  else{
    console.log("None chosen. Please make a selection.");
  }
  
  selected.forEach(item =>{
      console.log(item);
      myFunction(item);
  });

  /*var apples = customIconMulti.option;
  apples.forEach(anotherFunction);

  document.getElementById("hi").innerText=(customIconMulti.options);*/
}

//To add DataSet
function addData( label, data,color) {
  //lineChart.data.labels.push(label);
  lineChart.data.datasets.push(data);
  data.label=label;
  data.borderColor=color;
  //data.borderColor="#3cba9f";
  data.fill=false;
  data.data=data;
 
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
