$(document).ready(function () {




obtenerProceso();



});

function obtenerProceso(){
  $.ajax({
      type: 'GET',
      url: 'http://localhost:4000/proceso',
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (response) {

          JSON.stringify(response);
        console.log(response);
        html ='';
         porcentaje = 0;


        for (i = 0; i < response.length; i++) {

            ramuso = parseInt(response[i].RAM)

            porcentaje = ((ramuso *100) / 3670016) * 1024



                     if(response[i].USUARIO == "1000") {


                           html += '<tr id="' + response[i].PID + '">';
                           html += '<td id="PID-' + response[i].PID + '">' + response[i].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[i].PID + '">' + response[i].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[i].PID + '">Oliver</td>';
                           html += '<td id="ESTADO-' + response[i].PID + '">' + response[i].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[i].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';
                         }
                         else if(response[i].USUARIO == "121"){
                           html += '<tr id="' + response[i].PID + '">';
                           html += '<td id="PID-' + response[i].PID + '">' + response[i].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[i].PID + '">' + response[i].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[i].PID + '">Gnome</td>';
                           html += '<td id="ESTADO-' + response[i].PID + '">' + response[i].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[i].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';

                         }
                         else if(response[i].USUARIO == "4294967295"){
                           html += '<tr id="' + response[i].PID + '">';
                           html += '<td id="PID-' + response[i].PID + '">' + response[i].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[i].PID + '">' + response[i].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[i].PID + '">root</td>';
                           html += '<td id="ESTADO-' + response[i].PID + '">' + response[i].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[i].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';

                         }




              }


            $("#paginas").html(html);
            document.getElementById('totalP').innerHTML = "total de Procesos: " + response.length;


      },
      error: function (response) {
      // alert("error");
      }
  });

setTimeout(obtenerProceso, 1000);

}

$("table").delegate("td", "click", function () {
    id     = $(this).closest('tr').attr("id");
  //  alert(id)

    //factura   = $("#factura").val($("#factura-" + id).html());
});

/////////////////killprocess
function killProceso(idP){
  $.ajax({
      type: 'GET',
      url: 'http://localhost:4000/todos/' + idP,
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (response) {

          JSON.stringify(response);
        console.log(response);



      },
      error: function (response) {
      // alert("error");
      }
  });


}



$("#terminar").on('click', function () {

  alertify.confirm('Alerta', 'Desea Finalizar el proceso: ' + id + '?',
  function(){

    alertify.success('Se Finalizo el proceso: ' + id)
    killProceso(id);
  }
  , function(){ alertify.error('se canceló la operación')});


});


$(document).ready(function () {
  var toggler = document.getElementsByClassName("caret");
  var i;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }


});
