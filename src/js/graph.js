const ctx = document.getElementById('chart').getContext('2d');
const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor:
                'rgba(0, 0, 0, 1)',
            borderColor: 
                'rgba(0, 0, 0, 0.5)',
            fill: 'No',
            borderWidth: 1
            // xAxisID:
            //     'Time',
            // yAxisID:
            //     'Scores'
        }]
    },
    options: {
        legend:{
            display: false
        },
        scales: {
            yAxes: [{
                scaleLabel:{
                    display: true,
                    labelString: 'Scores'
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                scaleLabel:{
                    display: true,
                    labelString: 'Time'
                }
            }]
        }
    }
});