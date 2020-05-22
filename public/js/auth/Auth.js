class Auth {
    authEmailPass(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    // $('#avatar').attr('src', 'imagenes/usuario_auth.png')
                    const modal = document.querySelector('#modalLogin')
                    const modalInstancia = M.Modal.getInstance(modal);
                    M.toast({html: `Bienvenido ${result.user.displayName}`})
                    modalInstancia.close()
                } else {
                    firebase.auth().signOut()
                    Materialize.toast(`Por favor realiza la verificación de la cuenta`, 5000)
                }
            })
    }
}