/// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    { path: '/about/', url: 'about.html', },
    { path: '/inicio-sesion/', url: 'inicio-sesion.html', },
    { path: '/registrarse/', url: 'registrarse.html', },
    { path: '/index/', url: 'index.html', },
    { path: '/categorias/', url: 'categorias.html', },
    { path: '/productos/', url: 'productos.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
  //sembrar();
  //agregarProducto();

})

function sembrar() {
  var db = firebase.firestore();
  var data = {

    nombre: "leonardo",
    mail: "pepe@hotmail.com",
    rol: "developer"

  };
  db.collection("personas").add(data)
    .then(function (docRef) { // .then((docRef) => {
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { // .catch((error) => {
      console.log("Error: " + error);
    })
}

function agregarProducto() {
  var db = firebase.firestore();

  var producto = {

    nombre: "blusa",
    precio: "$180",
    color: "blanco",

  };
  db.collection("productos").add(producto)
    .then(function (docRef) { // .then((docRef) => {
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { // .catch((error) => {
      console.log("Error: " + error);
    })
}

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="registrarse"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$('#bregistro').on('click', fnRegistro);
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  fillProductos();
})


$$(document).on('page:init', '.page[data-name="inicio-sesion"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$('#bingresa').on('click', bingresa);

})
$$(document).on('page:init', '.page[data-name="categorias"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$('#btnAgregarCategoria').on('click', agregaCategoria);

})

$$(document).on('page:init', '.page[data-name="productos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$('#agregarTProducto').on('click', agregarProducto);
  $$("#imgInp").change(function () {
    readURL(this);
  });
  fillCboCategoria();
})
// Lee las categorias de la base de datos y las agrega en input de nombre cboCategorias - selecciona de la base de datos en la coleccion Categorias
function fillCboCategoria() {
  console.log('Entro a la funcion fillCboCategoria 1');
  var db = firebase.firestore();// Creamos referencia/instancia a base de datos firestore
  console.log('Creamos la referencia de la base de datos 2');
  db.collection("Categorias").get()
    .then(listaCat => {
      console.log('Se obtuvieron categorias 3');
      listaCat.forEach(doc => {
        console.log('Recorrer las categorias 4');
        var ddl = "#cboCategorias";
        console.log('Agregando categoria 5');
        $$(ddl).append('<option value="' + doc.data().Nombre + '">' + doc.data().Nombre + "</option>'");
        console.log('Se agrego categoria 6');
      })
      return data; // si marca erro quitar toda esta linea
    })
    .catch(error => {
      console.log(error);
    })
    console.log('Se agregaron categorias 7');
}
// select <option value="Pantalones">Pantalones</option> /select


function readURL(input) {
  console.log(input);
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $$('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function bingresa() {

  var email = $$('#mail').val();
  console.log(email);
  var password = $$('#password').val();
  console.log(password);

  if (password.length <= 5) {
    alert('La contraseña no contiene una longitud valida');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      location.href = "index.html";
    })
    .catch((error) => {
      alert('Usuario / Contraseña incorrecto');
      $$('#mail').val('');
      $$('#password').val('');
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}


function fnRegistro() {
  //alert('entro');
  var email = $$('#rEmail').val();
  var password = $$('#rPassword').val();
  if (email.length > 0 && password.length > 0) {

    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log('usuario creado');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "--" + errorMessage);
        // ..
      });
  }
  else {
    alert('Debes ingresar Email y contraseña valido');
  }
}

function Regresar() {
  //window.location.href = "/index/";
}

function agregaCategoria() {
  var nombreCategoria = $$("#acategorias").val();
  var db = firebase.firestore();
  var categoria = {
    CategoriaId: "3",
    Nombre: nombreCategoria
  };
  db.collection("Categorias").add(categoria)
    .then(function (docRef) { // .then((docRef) => {
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { // .catch((error) => {
      console.log("Error: " + error);
    })
  console.log('Agregando categorias');
}

function agregarProducto() {
  var categoria = $$('select[name=cboCategorias]').val();
  var nombreProducto = $$('#nombreProducto').val();
  var colorProducto = $$('#colorProducto').val();
  var precioProducto = $$('#precioProducto').val();
  var descripcion = $$('#descripcion').val();

  var db = firebase.firestore();
  var producto = {
    Nombre: $$('#nombreProducto').val(),
    Descripcion: $$('#descripcion').val(),
    Color: $$('#colorProducto').val(),
    Precio: $$('#precioProducto').val(),
    Imagen: "",
    Categoria: $$('select[name=cboCategorias]').val()
  }
  db.collection("MisProductos").add(producto)
    .then(function (docRef) { // .then((docRef) => {
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { // .catch((error) => {
      console.log("Error: " + error);
    })
  console.log('Agregando categorias');

}


function fillProductos() {
  console.log('Listando productos');
  var db = firebase.firestore();
  db.collection("MisProductos").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().Nombre + ' ' + doc.data().Descripcion);
      });
    })
    .catch(function (error) { // .catch((error) => {
      console.log("Error: " + error);
    })
}