/* Add an eventlistener to the startbutton */
document.querySelector("button").addEventListener("click", formSubmit);
/* When the startbutton is clicked set the URL to have ?num=1 - see keepItLive() for why */
function formSubmit() {
            window.document.location = './index.html?num=1'; 
}

/* Whenever the site is loaded this function is runned */
function keepItLive()
{
  init();
  /* if the URL has num=1 it begins to update the graf from latest index and get the rotation */
  if(document.location.search.replace(/^.*?\=/,'') >= 1)
  {
    setInterval(function(){ 
      functionB();
      functionA();
    }, 100);
  }
}

/* This is the funtion that opes data/getdata at gives the data the site */
function functionB() 
{
  xhr = new XMLHttpRequest(); 
  xhr.addEventListener("load", xhrLoad); 
  xhr.open("GET", "data/getdata"); 
  xhr.send();
}

/* Find the chart in the html-part */
var ctx = document.getElementById('myChart');
/* Create a new chart from Chart.js */
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

/* Add date to the chart */
function addData(chart, label, temp, tryk, alt) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(temp);
  chart.data.datasets[1].data.push(tryk);
  chart.data.datasets[2].data.push(alt);
  
  /* This makes sure we only see thr 10 latest points */
  if(chart.data.datasets[0].data.length >= 10){
    removeData(myLineChart);
  }
  chart.update();
}

/* Remove the fisrt lowset datapoint from the chart */
function removeData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
  });
  chart.update();
}

/* This is the funktion calles by functionB */
function xhrLoad() {
  let dbdata = JSON.parse(this.responseText).dbdata;
  /* Set the textelements to show the latetst datapoint */
  document.getElementById("temptext").innerHTML = dbdata[dbdata.length-1].temp;
  document.getElementById("heighttext").innerHTML = dbdata[dbdata.length-1].alt;
  document.getElementById("pressuretext").innerHTML = dbdata[dbdata.length-1].pressure;
  /* Check if there are more points in the table than in the graf, if so, it will put in the new ones */
  for(let index = myLineChart.data.labels[myLineChart.data.labels.length-1]; index <= dbdata.length; index++) 
  {
    addData(myLineChart, dbdata[index].id, dbdata[index].temp, dbdata[index].pressure, dbdata[index].alt);
  }
}



/* Called when the values of the dropdown is changed */
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

/* If startmplings has been pressed, this makes sure that the site is still live, when you return to it form the historysite */
function hisswitch()
{
    if(document.location.search.replace(/^.*?\=/,''))
    {
        window.document.location = './historik.html?num=' + document.location.search.replace(/^.*?\=/,'');
    }
    else
    {
        window.document.location = './historik.html';
    }
}
 


/* Initialize the 3D cylinder */
function init()
{
  const container = document.getElementById( 'threedcontainer' );
  scene = new THREE.Scene();
  
	geometry = new THREE.CylinderGeometry(0.5 ,0.5 ,2, 16);
	material = new THREE.MeshNormalMaterial();
	box = new THREE.Mesh( geometry, material );
  scene.add( box );
  
    	var fov = 50;
    	var aspect = document.getElementById("modelboxid").getBoundingClientRect().width / document.getElementById("modelboxid").getBoundingClientRect().height;
    	var near = 0.10;
    	var far = 100;
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	camera.rotation.x = -0.4;
	camera.rotation.y = 1;
	camera.rotation.z = 0.37;
	camera.position.x = 3;
	camera.position.y = 0.8;
	camera.position.z = 1.5;
 
/* 	renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( document.getElementById("modelboxid").getBoundingClientRect().width / 1.5 , document.getElementById("modelboxid").getBoundingClientRect().height / 1.5);
  document.body.appendChild( renderer.domElement ); */

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( document.getElementById("threedcontainer").getBoundingClientRect().width, document.getElementById("threedcontainer").getBoundingClientRect().height);
container.appendChild( renderer.domElement );
}
/* Animate the cylinder to the new position */
function animate()
{
  let dbdata = JSON.parse(this.responseText).dbdata;
  requestAnimationFrame( animate );
  autoRotate(dbdata[0].xrotation, dbdata[0].zrotation);
  renderer.render( scene, camera );
}
function autoRotate(xr, zr)
{
  box.rotation.x = xr;
	box.rotation.z = zr;
}
/* Get the rotation from date/getrotation add give it to the animate function */
function functionA()
{
  xhr = new XMLHttpRequest(); 
  xhr.addEventListener("load", animate); 
  xhr.open("GET", "data/getrotation"); 
  xhr.send();
}