
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
      }, { 
        data: [88,88,88,90,92,96,97,95,95,95],
        label: "K-cuts",
        borderColor: "#3cba9f",
        fill: false
      }
    ]
  },
  options: {
    
    title: {
      display: true,
      text: 'Audit Scores'
    }
  }
});
