onload = function () {

  // verificamos que el navegador soporte Web Storage
  if ('localStorage' in window && window['localStorage'] !== null) {
      cargarTareas();
  } else {
      alert('Tu navegador no tiene soporte para Web Storage');
  }
}

function guardarTarea() {

  // obtenemos la tarea y la categoría del formulario
  var categoria = document.getElementById("cboCategorias").value;
  var tarea = document.getElementById("txtNota").value;

  // si no se eligió ninguna categoría impedimos agregar la nota
  if (categoria == "") {
      alert("Por favor indique una categoría.");
      return false;
  }

  // impedimos agregar una tarea vacía
  if (tarea == "") {
      alert("Por favor ingrese una tarea a guardar");
      return false;
  }

  // obtenemos la lista de quehaceres del Local Storage
  var almacenamiento = JSON.parse(localStorage.getItem('ListaQuehaceres'));

  // obtenemos la cantidad de elementos que tenemos guardados
  var cantidadElementos = almacenamiento.length;

  // almacenamos la nueva tarea
  almacenamiento[cantidadElementos] = categoria;
  almacenamiento[cantidadElementos + 1] = tarea;

  try {
      localStorage.setItem('ListaQuehaceres', JSON.stringify(almacenamiento));
  } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
          alert('Se llegó al límite de almacenamiento');
      }
  }

  // dejamos todo listo para ingresar una nueva tarea
  categoria = "";
  cargarTareas();
  limpiarNota();
  return false;
}

function limpiarNota() {
  var tarea = document.getElementById("txtnota");
  tarea.value = '';
}

function cargarTareas() {

  // obtenemos la lista de quehaceres
  var almacenamiento = JSON.parse(localStorage.getItem('ListaQuehaceres'));

  // en caso que la lista no exista la creamos
  if (!almacenamiento) {
      almacenamiento = [];

      try {
          localStorage.setItem('ListaQuehaceres', JSON.stringify(almacenamiento));
      } catch (e) {
          if (e == QUOTA_EXCEEDED_ERR) {
              alert('Se llegó al límite de almacenamiento');
          }
      }
  }

  // obtenemos el formulario que posee todas las tareas ya ingresadas
  var tareas = document.getElementById("tareas");

  // verificamos el filtro que está puesto
  var currentFilter = document.getElementById("cboCategorias").value;
  var checkBox = "";

  // iteramos entre las notas agregadas
  for (var i = almacenamiento.length - 1; i >= 0; i = i - 2) {

      // sólo mostramos las notas del filtro aplicado
      if (currentFilter == almacenamiento[i - 1] || currentFilter == "") {

          // agregamos un checkbox con la nota y le agregamos una llamada a eliminarNota si se hace click
          checkBox += '<div class="checkbox">' + '<label>' + '<input type="checkbox" value="" onclick="eliminarNota(' + i + ')">' + almacenamiento[i] + ' (' + almacenamiento[i - 1] + ')' + '</label>' + '</div>';
      }
  }

  // agregamos los checkboxes creados al formulario
  if (checkBox != undefined) {
      tareas.innerHTML = checkBox;
  } else {
      tareas.innerHTML = "";
  }

  return false;
}

function eliminarNota(itemId) {

  // obtenemos la lista de elementos
  var almacenamiento = JSON.parse(localStorage.getItem('ListaQuehaceres'));

  // eliminamos la tarea y su categoría
  almacenamiento.splice(itemId - 1, 2);

  // volvemos a guardar la lista de quehaceres

  try {
      localStorage.setItem('ListaQuehaceres', JSON.stringify(almacenamiento));
  } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
          alert('Se llegó al límite de almacenamiento');
      }
  }

  cargarTareas();
}
