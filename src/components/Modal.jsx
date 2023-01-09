import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import useClients from '../hooks/useClients'
import Nacionalidades from './Nacionalidades'
const Modal = () => {

    // Listar Nacionalidades y Funciones de client
    const {nacionalidades, clientAOptions, editClient, setModal, setEditClient} = useClients()

    
    const [mensaje, setMensaje] = useState({
        tipo : true,
        msg : ""
    })
    const [error, setError] = useState(false)
    const [nombre, setNombre] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const [imagen, setImagen] = useState({preview : "", archivo: ""})
    const [id, setId] = useState("")
    const [file, setFile] = useState(false)
    // Close Modal
    const closeModal = () => {
        setNombre("")
        setNacionalidad("")
        setImagen({preview : "", archivo: ""})
        if(editClient){
            setEditClient({})
        }
        setModal(false)
    }
    
    // Verficar setEditClient
    useEffect(() => {
      if(Object.keys(editClient).length > 0){
        const  arrImg = {
            name : editClient.imagen.split(".")[0],
            extension : editClient.imagen.split(".")[1]
        }
        setNombre(editClient.nombre)
        setNacionalidad(editClient.nacionalidad)
        setImagen({
            // preview: `http://localhost:8080/api/clients/imagen/${arrImg.name}/${arrImg.extension}`
            preview: `https://panel-backend-zeta.vercel.app/
            /api/clients/imagen/${arrImg.name}/${arrImg.extension}`
        })
        setId(editClient._id)
      }
    }, [])
    

    const showImg = async(e) => {
        setImagen({
            preview : URL.createObjectURL(e.target.files[0]),
            archivo : e.target.files[0]
        })
        setFile(true)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if([nombre, nacionalidad, imagen.archivo].includes("")){
            setError(true)
            setMensaje({
                tipo : false,
                msg : "Todos los campos son obligatorios"
            })
            return
        }
        // Carga de Imagenes como FormData
        const formSend =  new FormData()
        formSend.append("archivo", imagen.archivo)
        formSend.append("nombre", nombre)
        formSend.append("nacionalidad", nacionalidad)
        formSend.append("id", id)
        // console.log(...formSend)
        await clientAOptions(formSend)
        setError(false)
        closeModal()
        
        
    }
    const {msg, tipo} = mensaje
    return (
        <div className='content_modal'>
            <div className="modal">
                <div className="modal-header">
                    <h3>{`${id ? "Actualizar Cliente" : "Agregar nuevo cliente"}`}</h3>
                </div>
                <div className="modal-body">
                    <p>Completa los siguientes campos para {`${id ? 'actualizar al cliente' : 'agregar a un nuevo cliente'}`}</p>
                    <form autoComplete='off' onSubmit={handleSubmit} encType="multipart/form-data">
                        {
                            error && <Mensaje tipo={tipo}>{msg}</Mensaje>
                        }
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text" 
                                name='nombre'
                                id='nombre'
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{marginBottom:".2rem"}}>Nacionalidad</label>
                            <span className='campo-radio'>
                                {
                                    nacionalidades.map(nation => (
                                        <Nacionalidades 
                                            key={nation._id}
                                            nation={nation}
                                            setNacionalidad={setNacionalidad}
                                            nacionalidad={nacionalidad}
                                        />
                                    ))
                                }
                            </span>
                        </div>
                        <div className="previa-img">
                            {
                                imagen.preview && (
                                    <img 
                                        id="imagenPrevisualizacion" 
                                        src={imagen.preview}
                                    />
                                )
                            }
                            
                            <div>
                                <label htmlFor="seleccionArchivos">Agregar miniatura (Imagenes en png, 400x400)</label>
                                <input 
                                    type="file" 
                                    name="archivo" 
                                    id="seleccionArchivos" 
                                    accept="image/png,image/jpeg" 
                                    onChange={(e) => showImg(e)}
                                />
                            </div>
                        </div>
                        <input type="submit" value={`${id ? "Actualizar Cliente" : "Añadir cliente"}`} />
                    </form>
                </div>
                <div className="closeModal" onClick={closeModal}>X</div>
            </div>
        </div>
    )
}

export default Modal