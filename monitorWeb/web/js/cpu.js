$(document).ready(function () {
obtenerData();
setTimeout(obtenerDataDinamica, 500);
 myChart = null;

 contador =0;
});

dataG =0;
function obtenerData(){
  $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/GetData',
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (response) {

          JSON.stringify(response);
        console.log(response);

        //alert(response.os);
        document.getElementById('infoCpu').innerHTML = response.cpu.model;
        document.getElementById('VelocidadB').innerHTML = response.cpu.speed /1000 + " Ghz";
        document.getElementById('nucleoCpu').innerHTML = response.cpu.cores;
        document.getElementById('proL').innerHTML = response.cpu.family;

        dataG = parseInt(response.cpu.read);
      },
      error: function (response) {
       //window.location.href = "index.html";
      }
  });


}


info = [];
function obtenerDataDinamica(){


  $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/GetData',
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (response) {

          JSON.stringify(response);

          var porcentaje =0;
          var total = 0;
          var usado = 0;

          total = parseInt(response.cpu.speed);
          usado = parseInt(response.cpu.read);

      //    porcentaje = (total * usado) / 100;

          document.getElementById('usoCpu').innerHTML = usado + " %";

          //console.log(porcentaje);
      //    info.push(usado);
        //  console.log(info);
        dataG = usado;

      },
      error: function (response) {
       //window.location.href = "index.html";
      }
  });

setTimeout(obtenerDataDinamica, 1000);
//setTimeout(graficar, 1000);
actualizarG();

}


$(document).ready(function () {

  graficar();
});


function graficar(){
//alert(info);



  var canvasV = document.getElementById("myChart").getContext("2d");
  // var ctx = canvasV.;
   myChart = new Chart(canvasV, {
    type: 'line',
    data: {
      labels: [0],
      datasets: [{
        data: [dataG],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 2,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false,
      }
    }
  });





}


function actualizarG(){
  contador = contador +1;

  myChart.data.datasets[0].data[contador] = dataG;
  myChart.data.labels[contador] = contador;
  myChart.update();

}
