document.querySelector("button").addEventListener("click", formSubmit);


function formSubmit() {
              xhr = new XMLHttpRequest(); 
              xhr.addEventListener("load", xhrLoad); 
              xhr.open("GET", "data/getdata"); 
              xhr.send();
}

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

function addData(chart, label, temp, tryk, alt) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(temp);
    chart.data.datasets[1].data.push(tryk);
    chart.data.datasets[2].data.push(alt);
    chart.update();
}

function xhrLoad() {
    let dbdata = JSON.parse(this.responseText).dbdata;
    for(let index = myLineChart.data.labels[myLineChart.data.labels.length-1]; index <= dbdata.length; index++) 
    {
      addData(myLineChart, dbdata[index].id, dbdata[index].temp, dbdata[index].pressure, dbdata[index].alt);
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

function indexLoad()
{
  xhr = new XMLHttpRequest(); 
  xhr.addEventListener("load", insertIndex); 
  xhr.open("GET", "data/getindex"); 
  xhr.send();
}

function insertIndex()
{
  var table = document.getElementById("indextable");
  let dbdata = JSON.parse(this.responseText).dbdata;

  for(let k = 1; k<=dbdata.length; k++)
  {
    var row = table.insertRow(k);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

console.log(dbdata[k]);

    /* cell1.innerHTML = dbdata[k].num;
    cell2.innerHTML = dbdata[k].date_time;  */
  }

}