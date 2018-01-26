/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

$(document).ready(function(){ 
  cargar('Ciudad','#selectCiudad');
  cargar('Tipo','#selectTipo');
  $("#formulario").submit(buscar);
})

//Carga un combo indicando el campo e identificador de control DOM
function cargar(campo,control){
  var form_data = new FormData();
  form_data.append('campo', campo);
  $.ajax({
    url: './cargar.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(data){
        var json=JSON.parse(data.cadena);
        var elemento=$(control);
        for(i=0;i<json.length;i++){
          var option=document.createElement("option");
          option.value=json[i].Tipo;
          option.text=json[i].Tipo;
          elemento.append(option);
        }
        $('select').material_select();
     },
    error: function(xhr, textStatus, error){
      alert(error);
     }
  });
}

// Evento clic del boton muestra todo, mediante ajax recupera todos los datos de propiedades
$("#mostrarTodos").click(function(){
  $.ajax({
    url: './muestra_todo.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: "hola",
    type: 'post',
    success: function(data){
      muestraResultado(data.cadena);
     },
    error: function(){
      alert("error al enviar los datos");
     }
    });
});

// Funcion que recibe los datos y los acomoda en formato de tabla
function muestraResultado(misDatos){
  var tabla='No existen datos con los parametros especificados<br>';
  if(misDatos!=']'){ 
    tabla='<table class="bordered striped tablare">';
    tabla+='<thead><tr>';
    tabla+='<th>Id</th>';
    tabla+='<th>Direccion</th>';
    tabla+='<th>Ciudad</th>';
    tabla+='<th>Telefono</th>';
    tabla+='<th>Codigo Postal</th>';
    tabla+='<th>Tipo</th>';
    tabla+='<th>Precio</th>';
    tabla+='</tr></thead><tbody>';

    var salida='';
    var i;
    var json=JSON.parse(misDatos);
    for(i=0;i<json.length;i++){
        salida+='<tr>';
        salida+='<td>'+json[i].Id+'</td>';
	   salida+='<td>'+json[i].Direccion+'</td>';
	   salida+='<td>'+json[i].Ciudad+'</td>';
	   salida+='<td>'+json[i].Telefono+'</td>';
	   salida+='<td>'+json[i].Codigo_Postal+'</td>';
	   salida+='<td>'+json[i].Tipo+'</td>';
	   salida+='<td>'+json[i].Precio+'</td>';
	   salida+='</tr>';
     }
     tabla+=salida+'</tbody></table>';
    }
    

    $('#datos').html(tabla);
   }

//Funcion que se ejecuta cuando se hace click en buscar
function buscar(event){
  event.preventDefault();
  $('#datos').html('');
  var form_data = new FormData();
  var minimo=$('#rangoPrecio').data('ionRangeSlider').old_from;
  var maximo=$('#rangoPrecio').data('ionRangeSlider').old_to;
  var tipo=$('#selectTipo').val();
  var ciudad=$('#selectCiudad').val();
  form_data.append('minimo', minimo);
  form_data.append('maximo', maximo);
  form_data.append('tipo', tipo);
  form_data.append('ciudad', ciudad);  
  $.ajax({
    url: './buscar.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(data){
      // alert(data.cadena); 
       muestraResultado(data.cadena);
     },
    error: function(xhr, textStatus, error){
      alert(error);
     }
  });
}
