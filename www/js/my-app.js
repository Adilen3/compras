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
      { path: '/about/', url: 'about.html',},
      { path: '/inicio-sesion/', url: 'inicio-sesion.html',},
      { path: '/registrarse/', url: 'registrarse.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
   

  
     

});





// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="registrarse"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$('#bregistro').on('click', fnRegistro );
    
    
})

function fnRegistro(){
//alert('entro');
  var email = $$('#rEmail').val();
  var password = $$('#rPassword').val();

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

