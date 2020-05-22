firebase.initializeApp(firebaseConfig);
firebase.auth().signOut()

const cerrarSesion = document.querySelector('#cerrarSesion')
const iniciarSesion = document.querySelector('#iniciarSesion')
//listener auth()
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        M.toast({html: 'Usuario Logeado'});
        cerrarSesion.classList.remove('hide');
        iniciarSesion.classList.add('hide')
    } else {
        M.toast({html: 'Usuario no Logeado'})
        cerrarSesion.classList.add('hide');
        iniciarSesion.classList.remove('hide')
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelectorAll('#modalLogin');
    var modalLogin = M.Modal.init(elem);

  });

  // firebase.auth().signInWithEmailAndPassword('robodavcuqupe@gmail.com', '14041991')

