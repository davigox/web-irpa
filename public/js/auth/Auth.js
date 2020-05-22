class Auth {
    authEmailPass(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    // $('#avatar').attr('src', 'imagenes/usuario_auth.png')
                    const modal = document.querySelector('#modalLogin')
                    const modalInstancia = M.Modal.getInstance(modal);
                    M.toast({html: `Bienvenido ${result.user.displayName}`, displayLength: 1000})
                    modalInstancia.close()
                } else {
                    firebase.auth().signOut()
                    M.toast({html:'Por favor revisa tus datos',displayLength: 1000})
                }
            })
            .catch(error => {
                firebase.auth().signOut()
                M.toast({html: `error ${error.message}`,displayLength: 1000})
            })
    }
}