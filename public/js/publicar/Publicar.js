class Publicar{
    constructor (){
        this.db = firebase.firestore();
    }
    publicarImagen(uid, emailUser, titulo, autor, descripcion, contenido, imagenLink){
        return this.db.collection('publicaciones').add({
            uid: uid,
            emailUser: emailUser,
            autor: autor,
            titulo: titulo,
            descripcion: descripcion,
            contenido: contenido,
            imagenLink: imagenLink,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(refDoc => {
            M.toast({html: `Imagen guardada y punlicada correctamente id: ${refDoc.id}`,displayLength: 1000});
        })
        .catch(error => {
            M.toast({html: `Error al guardar la publicación error: ${error}`,displayLength: 1000});
        })
    }
}