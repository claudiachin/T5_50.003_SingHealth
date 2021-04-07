
    let myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let lineChart = new Chart(myChart, {
    type: 'line',
    data: {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12],
    datasets: [{ 
        data: [86,75,80,89,90,90,90,88,88,90],
        label: "O Chang Kee",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [76,77,77,80,85,85,89,90,90,88],
        label: "Mr Bean",
        borderColor: "#8e5ea2",
        fill: false
      },
    ]
  },
  options: {
    
    title: {
      display: true,
      text: 'Audit Scores'
    }
  }
});

//To add DataSet
function addData( label, data) {
  //lineChart.data.labels.push(label);
  lineChart.data.datasets.push(data);
  data.label=label;
  data.borderColor="#3cba9f";
  data.fill=false;
  data.data=data;
 


  lineChart.update();

}

//To edit-> but should remove all
function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}

/*
// Filter out and set back into chart.data.datasets
chart.data.datasets = chart.data.datasets.filter(function(obj) {
  return (obj.label != targetLabel); 
});
// Repaint
chart.update();*/
