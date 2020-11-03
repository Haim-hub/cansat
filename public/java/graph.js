document.querySelector("button").addEventListener("click", formSubmit);
function formSubmit() {
          setInterval(function(){ 
            xhr = new XMLHttpRequest(); 
            xhr.addEventListener("load", xhrLoad); 
            xhr.open("GET", "data/getdata"); 
            xhr.send();
        }, 3000);
        
}


var ctx = document.getElementById('myChart');
var myLineChart = new Chart(ctx, {
    type: 'line',
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: "Målt",
        borderColor: "#3e95cd",
        fill: false
      },{ 
        data: [],
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
  chart.update();
}

function removeData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
  });
  chart.update();
}


function xhrLoad() {
  let dbdata = JSON.parse(this.responseText).dbdata;
  console.log(dbdata.length);
  console.log(myLineChart.data.labels.length)
  for(let index = myLineChart.data.labels.length; index < dbdata.length; index++) 
  {
    addData(myLineChart, dbdata[index-1].id, dbdata[index-1].temp);
  }


}


