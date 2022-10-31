import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import Mensaje from './Mensaje'
import Swal from "sweetalert2"
import useUsers from '../hooks/useUsers'


const ModalUser = ({title}) => {

    const {updateUser, setUpdateUser, addUser, mensaje ,setMensaje, setModal} = useUsers()
    

    // Info User
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [area, setArea] = useState("")
    const [color, setColor] = useState("#3c3cbf")
    const [rol, setRol] = useState("")
    const [uid, setId] = useState("")
    const [img, setImg] = useState("")
    useEffect(() => {
        if(Object.keys(updateUser).length > 0){
            setNombre(updateUser.nombre)
            setCorreo(updateUser.correo)
            setArea(updateUser.area)
            setColor(updateUser.color)
            setRol(updateUser.rol)
            setId(updateUser.uid)
        }
    }, [])
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if([nombre, correo, area, color, rol].includes("")){
            setMensaje({
                tipo : false,
                msg : "Todos los campos son olbigatorios"
            })
            return
        }
        await addUser({nombre, correo, area, color, rol, uid, orden: 0, img : "./src/img/user.png"})
    }
    const {tipo, msg} = mensaje

    const handleCloseModal = () =>{
        setNombre("")
        setCorreo("")
        setArea("")
        setColor("")
        setRol("")
        setId(null)
        setUpdateUser({})
        setModal(false)
        setMensaje({})
    }
    return(
        <div className='content_modal'>
            <div className="modal">
                <div className="modal-header">
                    <h3>{ updateUser.nombre ? "Actualizar Integrante" :title}</h3>
                </div>
                <div className="modal-body">
                    <p>Completa los siguientes campos para agregar a un nuevo integrante</p>
                    <form autoComplete='off' onSubmit={handleSubmit} encType="multipart/form-data">
                        {
                            msg && <Mensaje tipo={tipo}>{msg}</Mensaje>
                        }
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text" 
                                name='nombre'
                                id='nombre'
                                value={nombre}
                                onChange={(e)=>setNombre(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <input 
                                type="email" 
                                name='correo'
                                id='correo'
                                value={correo}
                                onChange={(e)=>setCorreo(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="area">Area</label>
                            <select 
                                name="area" 
                                id="area"
                                value={area}
                                onChange={(e)=>setArea(e.target.value)}
                                className="areaIntegrante"
                            >
                                <option value="">-- --</option>
                                <option value="PROGRAMACION">Programación</option>
                                <option value="DISENIO">Diseño</option>
                                <option value="MEDIOS">Medios Digitales</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="color">Color</label>
                            <input 
                                type="color" 
                                name='color'
                                id='color'
                                value={color}
                                onChange={(e)=>setColor(e.target.value)}
                                className="colorIntegrante"
                            />
                        </div>
                        <div>
                            <label htmlFor="rol">Rol</label>
                            <select 
                                name="rol" 
                                id="rol"
                                value={rol}
                                onChange={(e)=>setRol(e.target.value)}
                                className="areaIntegrante"
                            >
                                <option value="">-- --</option>
                                <option value="MASTER">Master</option>
                                <option value="SOLICITANTE">Solicitante</option>
                                <option value="ESTANDAR">Estandar</option>
                            </select>
                        </div>
                        <input type="submit" value={updateUser.nombre ? "Editar Integrante" : "Añadir Integrante"} />
                    </form>
                </div>
                <div className="closeModal" onClick={handleCloseModal}>X</div>
            </div>
        </div>
    )
}

export default ModalUser