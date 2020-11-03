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
    labels: [0],
    datasets: [{ 
        data: [0],
        label: "Temp",
        borderColor: "#3e95cd",
        fill: false,
        hidden: false
      },{ 
        data: [0],
        label: "Tryk",
        borderColor: "#c72a3f",
        fill: false,
        hidden: true
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

function addData(chart, label, temp, tryk) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(temp);
  chart.data.datasets[1].data.push(tryk);
  
  if(chart.data.datasets[0].data.length >= 10){
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
  for(let index = myLineChart.data.labels[myLineChart.data.labels.length-1]; index <= dbdata.length; index++) 
  {
    addData(myLineChart, dbdata[index].id, dbdata[index].temp, dbdata[index].pressure);
  }


}


function changeAxis()
{
  var x = document.getElementById("y-aksen").value;
  alert("REEEE");
  myLineChart.getDatasetMeta(0).hidden = true;
  myLineChart.getDatasetMeta(1).hidden = false;

  /* myLineChart.data.dataset[0].hidden = true;
  myLineChart.data.dataset[1].hidden = false; */
  myLineChart.update();
}