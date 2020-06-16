$(document).ready(function () {
obtenerData();
setTimeout(obtenerDataDinamica, 500);
 myChart = null;

 contador =0;
   var totalRam = 0;
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

        totalRam = parseInt(response.ram.total / 1024000);
        //alert(response.os);
        document.getElementById('infoRam').innerHTML = totalRam +" MB";

        dataG = parseInt(response.ram.usage);

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

          var usadaR =0;
          var total = 0;
           usado = 0;
          var disponible = 0;

          totalR = parseInt(response.ram.total);
          usado = parseInt(response.ram.usage);

      //    porcentaje = (total * usado) / 100;

          document.getElementById('ramUso').innerHTML = usado + " %";

            usadaR = ((usado * totalR) / 100) / 1024000;

            document.getElementById('ramUsoMb').innerHTML = usadaR.toFixed(2) + " MB";

            disponible = totalRam - usadaR;

            document.getElementById('memoriaD').innerHTML = disponible.toFixed(2) + " MB";
          //console.log(porcentaje);
      //    info.push(usado);
        //  console.log(info);
        dataG = usado;

      },
      error: function (response) {
       //window.location.href = "index.html";
      }
  });
actualizarG();
setTimeout(obtenerDataDinamica, 1000);
//setTimeout(graficar, 1000);


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
        borderColor: 'red',
        borderWidth: 2,
        pointBackgroundColor: 'red'
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
