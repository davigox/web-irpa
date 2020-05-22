const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');

const btnInicioSesion = document.querySelector('#btnInicioSesion');
btnInicioSesion.addEventListener('click', function() {
    event.preventDefault()
    const user = userEmail.value;
    const password = userPassword.value;
    const auth = new Auth();
    auth.authEmailPass(user,password);
})
cerrarSesion.addEventListener('click', function (){
    firebase.auth().signOut()
})