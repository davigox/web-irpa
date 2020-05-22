const hacerPublicacion = document.querySelector('#hacerPublicacion');
const publicarImagen = document.querySelector('#publicarImagen');


hacerPublicacion.addEventListener('click', function(){
    const user = firebase.auth().currentUser;
    if(user){
        const modalPublicar = document.getElementById('modalPublicar');
        const instanciaPublicar = M.Modal.getInstance(modalPublicar);
        instanciaPublicar.open();
    }else{
        M.toast({html:'Debes iniciar sesión para publicar',displayLength: 1000}) 
    }
});

publicarImagen.addEventListener('click', function(){
    const modalPublicar = document.getElementById('modalPublicar');
    const instanciaPublicar = M.Modal.getInstance(modalPublicar);
    instanciaPublicar.close();
    const modalImagen = document.getElementById('modalImagen');
    const instanciaImagen = M.Modal.getInstance(modalImagen);
    instanciaImagen.open();
});