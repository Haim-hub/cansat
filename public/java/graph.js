var ctx = document.getElementById('myChart');
var myLineChart = new Chart(ctx, {
    type: 'line',
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Målt",
        borderColor: "#3e95cd",
        fill: false
      },{ 
        data: [60,110,120,126,137,115,133,121,283,1478],
        label: "Teoretisk",
        borderColor: "#c0daeb",
        fill: false
      }
      
    ]
  },
  options: {
    legend: {
        display: false
    },
    scales: {
      xAxes: [{
        ticks: {
            autoSkip: true,
        }
    }]
    }
  }
});

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  
  if(chart.data.datasets[0].data.length > 10){
    removeData(myLineChart);
  }
}

function removeData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
  });
  chart.update();
}

