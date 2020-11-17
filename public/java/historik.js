function liveswitch()
{
    if(document.location.search.replace(/^.*?\=/,''))
    {
        window.document.location = './index.html?num=' + document.location.search.replace(/^.*?\=/,'');
    }
    else
    {
        window.document.location = './index.html';
    }
}
    
function changeAxis()
{
  var x = document.getElementById("y-aksen").value;
  if(x === "temperatur")
  {
    myLineChart.getDatasetMeta(0).hidden = false;
    myLineChart.getDatasetMeta(1).hidden = true;
    myLineChart.getDatasetMeta(2).hidden = true;
  }
  if(x === "tryk")
  {
    myLineChart.getDatasetMeta(0).hidden = true;
    myLineChart.getDatasetMeta(1).hidden = false;
    myLineChart.getDatasetMeta(2).hidden = true;
  }
  if(x === "højde")
  {
    myLineChart.getDatasetMeta(0).hidden = true;
    myLineChart.getDatasetMeta(1).hidden = true;
    myLineChart.getDatasetMeta(2).hidden = false;
  }
  


  myLineChart.update();
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
      },{
        data: [0],
        label: "Alt",
        borderColor: "#17852a",
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

