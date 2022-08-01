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
    { path: '/productos-muestra/:categoria/', url: 'productos-muestra.html', },
    { path: '/categoriaProductos/', url: 'categoriaProductos.html', },
    { path: '/muestraDetalleProducto/:id/', url: 'muestraDetalleProducto.html', },
    { path: '/comprarDetalle/:id/', url: 'comprarDetalle.html', },
  ]
  // ... other parameters
});


var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
})

function sembrar() {
  var db = firebase.firestore();
  var data = {
    nombre: "leonardo",
    mail: "pepe@hotmail.com",
    rol: "developer"
  };
  db.collection("personas").add(data)
    .then(function (docRef) { 
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { 
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
    .then(function (docRef) {
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { 
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
$$(document).on('page:init', '.page[data-name="categoriaProductos"]', function (e) {
  listarCategorias();
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
    })
    .catch(error => {
      console.log(error);
    })
  console.log('Se agregaron categorias 7');
}

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
  var password = $$('#password').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      location.href = "index.html";
    })
    .catch((error) => {
      $$('#idalertloginuser').attr('class', 'error-msg');
      $$('#mail').val('');
      $$('#password').val('');
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + '--' + errorMessage);
      //se valida el error que arroja y se muestra en español el mensaje a usuario
      switch (error.code) {
        case 'auth/wrong-password':
          $$('#idalertloginuser').text('La contraseña no es válida o el usuario no tiene contraseña');
          break;
        case 'auth/user-not-found':
          $$('#idalertloginuser').text('No existe registro de usuario correspondiente a este email. El usuario puede haber sido eliminado');
          break;
        case 'auth/invalid-email':
          $$('#idalertloginuser').text('La dirección de correo electrónico tiene un formato incorrecto.');
          break;
        default:
          break;
      }
    });
}


function fnRegistro() {
  var email = $$('#rEmail').val();
  var password = $$('#rPassword').val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      $$('#idalertadduser').attr('class', 'success-msg');
      $$('#idalertadduser').text('El usuario se registro correctamente');
    })
    .catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + "--" + errorMessage);

      $$('#idalertadduser').attr('class', 'error-msg');
      switch (error.code) {
        case 'auth/weak-password':
          $$('#idalertadduser').text('La contraseña debe tener al menos 6 caracteres');
          break;
        case 'auth/email-already-in-use':
          $$('#idalertadduser').text('La dirección de correo electrónico ya está en uso por otra cuenta');
          break;
        case 'auth/invalid-email':
          $$('#idalertadduser').text('La dirección de correo electrónico tiene un formato incorrecto.');
          break;
        default:
          $$('#idalertadduser').text('Ocurrio un error al procesar el registro, Intente mas tarde');
          break;
      }

    });
}

function Regresar() {
  //window.location.href = "/index/";
}

function agregaCategoria() {
  var nombreCategoria = $$("#acategorias").val();
  if (nombreCategoria.trim().length > 0) {
    var db = firebase.firestore();
    var categoria = {
      CategoriaId: "3",
      Nombre: nombreCategoria
    };
    db.collection("Categorias").add(categoria)
      .then(function (docRef) {
        console.log("OK! Con el ID: " + docRef.id);
        $$('#idalertcategorias').attr('class', 'success-msg');
        $$('#idalertcategorias').text('Se registro la categoria con el numero de documento: ' + docRef.id);
      })
      .catch(function (error) {
        console.log("Error: " + error);
      })
  }
  else {
    $$('#idalertcategorias').attr('class', 'error-msg');
    $$('#idalertcategorias').text('Debe ingresar un nombre de categoria valido');
  }
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
  if (nombreProducto.trim().length > 0 && colorProducto.trim().length > 0 && precioProducto.trim().length > 0) {
    db.collection("MisProductos").add(producto)
      .then(function (docRef) { 
        $$('#idalertproductos').attr('class', 'success-msg');
        $$('#idalertproductos').text('Se registro el producto con el numero de documento: ' + docRef.id);
        $$('#nombreProducto').val('');
        $$('#colorProducto').val('');
        $$('#precioProducto').val('');
        $$('#descripcion').val('');
      })
      .catch(function (error) { 
        console.log("Error: " + error);
      })
  }
  else {
    $$('#idalertproductos').attr('class', 'error-msg');
    if (nombreProducto.trim().length == 0) {
      $$('#idalertproductos').text('Debe introducir un nombre valido para el producto');
    }
    else {
      if (colorProducto.trim().length == 0) {
        $$('#idalertproductos').text('Debe introducir un color valido para el producto');
      }
      else {
        if(precioProducto.trim().length == 0 )
        {
          $$('#idalertproductos').text('Debe introducir un precio valido para el producto');
        }
      }
    }
  }

}


function fillProductos() {
  console.log('Listando productos');
  var db = firebase.firestore();
  db.collection("MisProductos").where("Categoria", "==", "Blusas").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().Nombre + ' ' + doc.data().Descripcion);
      });
    })
    .catch(function (error) { 
      console.log("Error: " + error);
    })
}

function listarCategorias() {
  console.log('Entro para listar Categorias');
  var db = firebase.firestore();
  db.collection("Categorias").get()
    .then(listaCat => {
      listaCat.forEach(doc => {
        $$('#divCategorias').append('<a href="/productos-muestra/' + doc.data().Nombre + '/"><div class="row col demo-col-center-content" style="height: 45%"><H3>' + doc.data().Nombre + '</H3><img src="blusa.jpeg" width="50px !important;" height="50px !important" alt=""/></div></a>');
      })
    })
    .catch(error => {
      console.log(error);
    })
}
// Funciones para mostrar productos por categoria
$$(document).on('page:init', '.page[data-name="productos-muestra"]', function (e, page) {
  MostrarProductosPorCategoria(page.route.params.categoria);
})
var filtroProducto = 'Vestidos';
function modificaFiltro(filtro) {
  filtroProducto = filtro;
}
function MostrarProductosPorCategoria(categoria) {
  console.log("filtro:" + filtroProducto);
  var db = firebase.firestore();
  db.collection("MisProductos").where("Categoria", "==", categoria).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        var html = '';
        html = '<a href="/muestraDetalleProducto/' + doc.id + '/">';
        html += '     <div class="card demo-card-header-pic">';
        html += '       <div>';
        html += '         <div class="card-content card-content-padding">';
        html += '           <p>' + doc.data().Nombre + '</p>';
        html += '           <p>' + doc.data().Descripcion + '</p>';
        html += '           <p> $ ' + doc.data().Precio + '</p>';
        html += '       </div>';
        html += '     </div>';
        html += '   </a>';
        $$('#divProducts').append(html);
      });
    })
    .catch(function (error) { 
      console.log("Error: " + error);
    })
}


//funciones para mostrar producto
$$(document).on('page:init', '.page[data-name="muestraDetalleProducto"]', function (e, page) {
  console.log('muestraDetalleProducto');
  verProducto(page.route.params.id);
})

function verProducto(id) {
  console.log(id);
  console.log('verProducto');
  var db = firebase.firestore();
  db.collection("MisProductos").doc(id).get()
    .then(doc => {
      var html = '';
      var nombre = doc.data().Nombre;
      html += '<div style="border: 1px solid rgb(119, 136, 211); display:block;">';
      html += '   <p>' + doc.data().Imagen + '</p>';
      html += '   <p>' + doc.data().Nombre + '</p>';
      html += '   <p>' + doc.data().Descripcion + '</p>';
      html += '   <p> $ ' + doc.data().Precio + '</p>';
      html += '   <a href="/comprarDetalle/' + doc.id + '/" class="col button button-fill")>comprar</a>';
      html += '</div>';
      $$('#divProducto').append(html);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })
}

// funciones para la compra
$$(document).on('page:init', '.page[data-name="comprarDetalle"]', function (e, page) {
  //productoMuestra
  var db = firebase.firestore();
  db.collection("MisProductos").doc(page.route.params.id).get()
    .then(doc => {
      var html = '';
      var nombre = doc.data().Nombre;
      html += '<div style="border: 1px solid rgb(119, 136, 211); display:block;">';
      html += '   <p>' + doc.data().Imagen + '</p>';
      html += '   <p>' + doc.data().Nombre + '</p>';
      html += '   <p>' + doc.data().Descripcion + '</p>';
      html += '   <p> $ ' + doc.data().Precio + '</p>';
      html += '</div>';
      $$('#productoMuestra').append(html);
      localStorage.setItem("id", doc.id);
      localStorage.setItem("precio", doc.data().Precio);
      $$('#ventasubtotal').text('$ ' + doc.data().Precio);
      $$('#ventatotal').text('$ ' + doc.data().Precio);
    })
    .catch(function (error) { 
      console.log("Error: " + error);
    })
})

function TerminarCompra() {

  var db = firebase.firestore();
  var id = localStorage.getItem("id");
  var precio = localStorage.getItem("precio");

  var venta = {
    productoDocId: id,
    precio: precio,
    cantidad: "1",
    total: precio,
  };
  db.collection("Ventas").add(venta)
    .then(function (docRef) { 
      console.log("OK! Con el ID: " + docRef.id);
    })
    .catch(function (error) { 
      console.log("Error: " + error);
    })
}