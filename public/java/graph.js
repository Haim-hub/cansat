document.querySelector("button").addEventListener("click", formSubmit);


function formSubmit() {
            window.document.location = './index.html?num=1';
            setInterval(function(){ 
              xhr = new XMLHttpRequest(); 
              xhr.addEventListener("load", xhrLoad); 
              xhr.open("GET", "data/getdata"); 
              xhr.send();
            }, 3000);  
}

function keepItLive()
{
  if(document.location.search.replace(/^.*?\=/,'') >= 1)
  {
    setInterval(function(){ 
      xhr = new XMLHttpRequest(); 
      xhr.addEventListener("load", xhrLoad); 
      xhr.open("GET", "data/getdata"); 
      xhr.send();
    }, 3000);
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
  //document.getElementById("temptext").innerHTML = dbdata[dbdata.length].temp;
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

function animate()
{
  let dbdati = JSON.parse(this.responseText).dbdati;
  requestAnimationFrame( animate );
  autoRotate(dbdati[0].xrotation, dbdati[0].zrotation);
  renderer.render( scene, camera );
}

function autoRotate(xr, zr)
{
  box.rotation.x = xr;
	box.rotation.z = zr;
}


/* function xhrthreeLoad() {
  let dbdata = JSON.parse(this.responseText).dbdata;
  console.log(dbdata[0].xrotation);
  animate(dbdata[0].xrotation, dbdata[0].zrotation);
} */

window.onload = function() 
{
  init();
  setInterval(function(){ 
    xhr = new XMLHttpRequest(); 
    xhr.addEventListener("load", animate); 
    xhr.open("GET", "data/getrotation"); 
    xhr.send();
  }, 200); 
}
