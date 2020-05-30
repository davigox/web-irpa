const hacerPublicacion = document.querySelector('#hacerPublicacion');

const publicarImagen = document.querySelector('#publicarImagen');
const btnPublicarImagen = document.querySelector('#btnPublicarImagen');

const publicarVideo = document.querySelector('#publicarVideo');
const btnPublicarVideo = document.querySelector('#btnPublicarVideo');

const btnUploadImagen = document.querySelector('#file-upload');

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
btnPublicarImagen.addEventListener('click', function(){
    event.preventDefault();
    const publicar = new Publicar();
    
    const user = firebase.auth().currentUser
    console.log(user.uid)
    if(user == null){
        M.toast({html: `Debes de iniciar sesión para publicar`,displayLength: 1000});
        return 
    }
    const titulo = document.querySelector('#imagenTitulo').value;
    const autor = document.querySelector('#imagenAutor').value;
    const descripcion = document.querySelector('#imagenDescripcion').value;
    const url = document.querySelector('#imagenUrl').value;
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
        ? null
        : sessionStorage.getItem('imgNewPost');
    
    publicar.publicarImagen(
        user.uid,
        user.email,
        titulo,
        autor,
        descripcion,
        url,
        imagenLink
    )
    .then(resp => {
        M.toast({html: `Image publicada correctamente`,displayLength: 2000});
        const modal = document.querySelector('#modalImagen')
        const modalInstancia = M.Modal.getInstance(modal);
        modalInstancia.close()
    })
    .catch(err => {
        M.toast({html: `Error: ${err}`,displayLength: 2000});
    })
})

btnUploadImagen.addEventListener('change', function(e){
    const user = firebase.auth().currentUser;
    if(user == null){
        M.toast({html: `Debes de iniciar sesión para publicar`,displayLength: 1000});
        return 
    }
    const file = e.target.files[0];
    M.toast({html: `Archivo ${file}`,displayLength: 2000});
    const publicar = new Publicar();
    publicar.subirImagen(file, user.uid);
}, false)

publicarVideo.addEventListener('click', function(){
    const modalPublicar = document.getElementById('modalPublicar');
    const instanciaPublicar = M.Modal.getInstance(modalPublicar);
    instanciaPublicar.close();
    const modalVideo = document.getElementById('modalVideo');
    const instanciaVideo = M.Modal.getInstance(modalVideo);
    instanciaVideo.open();
});
btnPublicarVideo.addEventListener('click', function(){
    event.preventDefault();
    const publicar = new Publicar();
    
    const user = firebase.auth().currentUser
    console.log(user.uid)
    if(user == null){
        M.toast({html: `Debes de iniciar sesión para publicar`,displayLength: 1000});
        return 
    }
    const titulo = document.querySelector('#videoTitulo').value;
    const autor = document.querySelector('#videoAutor').value;
    const descripcion = document.querySelector('#videoDescripcion').value;
    const videoLink = `https://www.youtube.com/embed/${document.querySelector('#videoURL').value}`;
    
    publicar.publicarVideo(
        user.uid,
        user.email,
        titulo,
        autor,
        descripcion,
        videoLink
    )
    .then(resp => {
        M.toast({html: `Video publicado correctamente`,displayLength: 2000});
        const modal = document.querySelector('#modalVideo')
        const modalInstancia = M.Modal.getInstance(modal);
        modalInstancia.close()
    })
    .catch(err => {
        M.toast({html: `Error: ${err}`,displayLength: 2000});
    })
})
