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
            tipo: 'imagen',
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(refDoc => {
            M.toast({html: `Imagen guardada y punlicada correctamente id: ${refDoc.id}`,displayLength: 2000});
        })
        .catch(error => {
            M.toast({html: `Error al guardar la publicación error: ${error}`,displayLength: 2000});
        })
    }
    subirImagen(file, uid){
        const refStorage = firebase.storage().ref(`imagenesPublicadas/${uid}/${file.name}`);
        const task = refStorage.put(file);
        task.on('state_changed', snapshot => {
            const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            document.querySelector('.porcentaje').style.cssText = `width: ${porcentaje}%;`;
            
        }, err => {
            M.toast({html: `Error al guardar en la base de datos ${err}`,displayLength: 2000});
        }, () => {
            task.snapshot.ref.getDownloadURL()
                .then(url => {
                    sessionStorage.setItem('imgNewPost', url)
                    M.toast({html: `URL: ${url}`,displayLength: 2000});
                })
                .catch(err => {
                    M.toast({html: `Error obteniendo la URL: ${err}`,displayLength: 2000});
                })
        })
    }
    publicarVideo(uid, emailUser, titulo, autor, descripcion, videoLink){
        return this.db.collection('publicaciones').add({
            uid: uid,
            emailUser: emailUser,
            autor: autor,
            titulo: titulo,
            descripcion: descripcion,
            videoLink: videoLink,
            tipo: 'video',
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(refDoc => {
            M.toast({html: `video guardado y publicado correctamente id: ${refDoc.id}`,displayLength: 2000});
        })
        .catch(error => {
            M.toast({html: `Error al guardar la publicación error: ${error}`,displayLength: 2000});
        })
    }
    publicarNota(uid, emailUser, titulo, autor, descripcion, contenido){
        return this.db.collection('publicaciones').add({
            uid: uid,
            emailUser: emailUser,
            autor: autor,
            titulo: titulo,
            descripcion: descripcion,
            contenido: contenido,
            tipo: 'nota',
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(refDoc => {
            M.toast({html: `nota guardada y publicada correctamente id: ${refDoc.id}`,displayLength: 2000});
        })
        .catch(error => {
            M.toast({html: `Error al guardar la publicación error: ${error}`,displayLength: 2000});
        })
    }
    consultarImagenesPublicadas(){
        this.db.collection('publicaciones')
            .orderBy('fecha', 'desc')
            .where('tipo', "==", 'imagen')
            .onSnapshot(querySnapshot => {
                document.querySelector('.imagenes__container').innerHTML="";
                if(querySnapshot.empty){
                    M.toast({html: `Imagenes SI esta vacio`,displayLength: 2000});
                }else{
                    M.toast({html: `Imagenes NO esta vacio`,displayLength: 2000});
                    
                    querySnapshot.forEach(imagen => {
                        let imagenHTML = this.templateImagen(
                            imagen.id,
                            imagen.data().titulo,
                            imagen.data().autor,
                            imagen.data().descripcion,
                            imagen.data().contenido,
                            Utilidad.obtenerFecha(imagen.data().fecha.toDate()),
                            imagen.data().imagenLink,
                        );
                        document.querySelector('.imagenes__container').appendChild(imagenHTML)
                        console.log(`Currente data: ${imagen.id}`)
                    })
                }
            })
    }
    templateImagen(id, titulo, autor, descripcion
        , contenido, fecha, imagenLink){
            let template = document.createElement('div');
            template.setAttribute('id', `${id}`);
            template.setAttribute('class', 'imagen__container');
            template.innerHTML = `<img class="imagen__container--img" src="${imagenLink}" alt="Imagen">
            <div class="imagen__container--container">
                <h3 class="imagen__container--titulo">
                    ${titulo}
                </h3>
                <h5 class="imagen__container--autor">
                    Autor: ${autor}
                </h5>
                <p class="imagen__container--fecha">
                    ${fecha}
                </p>
                <p class="imagen__container--descripcion">
                    ${descripcion}
                </p>
                <a class="link" href="http://192.168.0.10:9080/imagenes.html">Ver mas..</a>
            </div>`
            return template;
    }
}