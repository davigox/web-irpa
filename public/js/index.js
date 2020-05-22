firebase.initializeApp(firebaseConfig);
firebase.auth().signOut()

const cerrarSesion = document.querySelector('#cerrarSesion')
const iniciarSesion = document.querySelector('#iniciarSesion')
//listener auth()
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        M.toast({html: 'Usuario Logeado', displayLength: 1000});
        cerrarSesion.classList.remove('hide');
        iniciarSesion.classList.add('hide');
    } else {
        M.toast({html: 'Usuario no Logeado', displayLength: 1000});
        cerrarSesion.classList.add('hide');
        iniciarSesion.classList.remove('hide');
    }
});
//iniciando los modals
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var modalLogin = M.Modal.init(modals);

  });
