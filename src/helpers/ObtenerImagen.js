

const obtenerImagen = (imagen) => {
    const  arrImg = {
        name : imagen.split(".")[0],
        extension : imagen.split(".")[1]
    }
    // const url = `http://localhost:8080/api/clients/imagen/${arrImg.name}/${arrImg.extension}`
    const url = `https://panel-backend-zeta.vercel.app/api/clients/imagen/${arrImg.name}/${arrImg.extension}`
    return url
}

export {
    obtenerImagen
}