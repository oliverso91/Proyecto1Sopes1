$(document).ready(function () {




obtenerProceso();



});

function obtenerProceso(){
  $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/proceso',
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


                for (j = 0; j < response[i].PID.length; j++) {

                   if(response[i].PPID === response[j].PID){
                     console.log("es iguañ");
                     if(response[i].USUARIO == "1000") {


                           html += '<tr id="' + response[j].PID + '">';
                           html += '<td id="PID-' + response[j].PID + '">' + response[j].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[j].PID + '">' + response[j].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[j].PID + '">Oliver</td>';
                           html += '<td id="ESTADO-' + response[j].PID + '">' + response[j].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[j].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';
                         }
                         else if(response[i].USUARIO == "121"){
                           html += '<tr id="' + response[j].PID + '">';
                           html += '<td id="PID-' + response[j].PID + '">' + response[j].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[j].PID + '">' + response[j].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[j].PID + '">Oliver</td>';
                           html += '<td id="ESTADO-' + response[j].PID + '">' + response[j].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[j].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';

                         }
                         else if(response[i].USUARIO == "4294967295"){
                           html += '<tr id="' + response[j].PID + '">';
                           html += '<td id="PID-' + response[j].PID + '">' + response[j].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[j].PID + '">' + response[j].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[j].PID + '">Oliver</td>';
                           html += '<td id="ESTADO-' + response[j].PID + '">' + response[j].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[j].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';

                         }

                   }
                   else {
                     console.log("noeses iguañ");
                     if(response[i].USUARIO == "1000") {

                       html += '<tr id="' + response[j].PID + '">';
                       html += '<td id="PID-' + response[j].PID + '">' + response[j].PID + '</td>';
                       html += '<td id="NOMBRE-' + response[j].PID + '">' + response[j].NOMBRE + '</td>';
                       html += '<td id="USUARIO-' + response[j].PID + '">Oliver</td>';
                       html += '<td id="ESTADO-' + response[j].PID + '">' + response[j].ESTADO + '</td>';
                       html += '<td id="RAM-' + response[j].PID + '">' + porcentaje.toFixed(2); + '</td>';
                       html += '</tr>';
                         }
                         else if(response[i].USUARIO == "121"){
                           html += '<tr id="' + response[j].PID + '">';
                           html += '<td id="PID-' + response[j].PID + '">' + response[j].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[j].PID + '">' + response[j].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[j].PID + '">Oliver</td>';
                           html += '<td id="ESTADO-' + response[j].PID + '">' + response[j].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[j].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';

                         }
                         else if(response[i].USUARIO == "4294967295"){
                           html += '<tr id="' + response[j].PID + '">';
                           html += '<td id="PID-' + response[j].PID + '">' + response[j].PID + '</td>';
                           html += '<td id="NOMBRE-' + response[j].PID + '">' + response[j].NOMBRE + '</td>';
                           html += '<td id="USUARIO-' + response[j].PID + '">Oliver</td>';
                           html += '<td id="ESTADO-' + response[j].PID + '">' + response[j].ESTADO + '</td>';
                           html += '<td id="RAM-' + response[j].PID + '">' + porcentaje.toFixed(2); + '</td>';
                           html += '</tr>';

                         }

                   }
                 }
              }


            $("#paginas").html(html);


      },
      error: function (response) {
      // alert("error");
      }
  });


}

$("table").delegate("td", "click", function () {
    id     = $(this).closest('tr').attr("id");
    alert(id)

    //factura   = $("#factura").val($("#factura-" + id).html());
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
