import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { fechaHoy } from '../helpers/FechaHoy'
import useAuth from '../hooks/useAuth'
import useClients from '../hooks/useClients'
import useTask from '../hooks/useTask'
import useUsers from '../hooks/useUsers'
import ComponenteSelect from './ComponenteSelect'
import Mensaje from './Mensaje'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ModalPendiente = () => {
    // Providers
    const {setModal, mensaje, setMensaje, pendienteSend, setAgregado, setEditPendiente, editPendiente, condiciones, deletePendiente} = useTask()
    const {auth} = useAuth()
    const {miembros} = useUsers()
    const {clientsActive} = useClients()

    // Info modal
    const [creador, setCreador] = useState({
        id : auth.id,
        nombre : auth.nombre
    })
    const [responsable, setResponsable] = useState("")
    const [cliente, setCliente] = useState("")
    const [tarea, setTarea] = useState("")
    const [hora, setHora] = useState("")
    const [fecha, setFecha] = useState(fechaHoy())
    const [prioridad, setPrioridad] = useState(false)
    const [trabajoNuevo, setTrabajoNuevo] = useState(false)
    const [estado, setEstado] = useState("")

    // Editar Pendiente
    const [id, setId] = useState("")
    useEffect(() => {
        if(Object.keys(editPendiente).length > 0){
            setResponsable(editPendiente.responsable)
            setCliente(editPendiente.cliente)
            setTarea(editPendiente.tarea)
            setHora(editPendiente.hora)
            setFecha(editPendiente.fecha)
            setPrioridad(editPendiente.prioridad)
            setEstado(editPendiente.estado)
            setId(editPendiente.id)
        }
    }, [])
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        if([creador, responsable, cliente, tarea, hora, fecha].includes("")){
            setMensaje({
                tipo : false,
                msg : "Todos los campos son obligatorios"
            })
            return
        }
        const pendiente = {
            creador : creador.id,
            responsable,
            cliente,
            tarea,
            hora,
            fecha,
            prioridad,
            trabajoNuevo,
            estado : estado ? estado : '632476dee7580e1d74a840f5',
            id
        }
        await pendienteSend(pendiente)
        setAgregado(true)
        setMensaje({
            tipo : true,
            msg : ""
        })
        setModal(false)
    }

    const handleCloseModal = () => {
        setModal(false)
        setEditPendiente({})
        setMensaje({})
    }

    

    const {msg, tipo} = mensaje
    return (
        <div className='content_modal'>
            <div className="modal">
                <div className="modal-header">
                    <h3>{editPendiente.tarea  ? "Editar Tarea" : "Agregar Tarea"}</h3>
                </div>
                {
                    (estado == "632476dee7580e1d74a840f5" || estado == '632476fee7580e1d74a840f7') && (
                        <a 
                            className="delete"
                            onClick={()=>deletePendiente(id, responsable, estado)}
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                            />
                        </a>
                    )
                }
                
                <div className="modal-body">
                    <p>{editPendiente.tarea ? 'Editar Tarea' : 'Completa los siguientes campos para agregar a una Nueva Tarea'}</p>
                    <form autoComplete='off' onSubmit={handleSubmit} >
                        {
                            msg && <Mensaje tipo={tipo}>{msg}</Mensaje>
                        }
                        <div>
                            <label htmlFor="creador">Creador</label>
                            <input 
                                type="text" 
                                name='creador'
                                id='creador'
                                value={creador.nombre}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="responsable">Responsable</label>

                           <select 
                                value={responsable}
                                onChange={(e)=>setResponsable(e.target.value)}
                           >
                            <option value="">-- --</option>
                            {
                                miembros.map(opcion => (
                                    <ComponenteSelect 
                                        key={opcion.uid ? opcion.uid : opcion._id}
                                        opcion={opcion}
                                    />
                                ))
                            }
                           </select>
                        </div>
                        <div>
                            <label htmlFor="cliente">Cliente</label>

                           <select 
                                id='cliente'
                                value={cliente}
                                onChange={(e)=>setCliente(e.target.value)}
                                disabled={editPendiente.tarea}
                           >
                            <option value="">-- --</option>
                            {
                                clientsActive.map(opcion => (
                                    <ComponenteSelect 
                                        key={opcion.uid ? opcion.uid : opcion._id}
                                        opcion={opcion}
                                    />
                                ))
                            }
                           </select>
                        </div>
                        <div>
                            <label htmlFor="tarea">Tarea</label>
                            <input 
                                type="text" 
                                id='tarea'
                                value={tarea}
                                onChange={(e)=>setTarea(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="horas">Horas</label>
                            <input 
                                type="time" 
                                id='horas'
                                value={hora}
                                onChange={(e)=>setHora(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="fecha">Fecha</label>
                            <input 
                                type="date" 
                                id='fecha'
                                value={fecha}
                                onChange={(e)=>setFecha(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="newJob">
                                <label htmlFor="solicitud">Trabajo Nuevo</label>
                                <input 
                                    type="checkbox" 
                                    id='solicitud'
                                    value={trabajoNuevo}
                                    onChange={()=>setTrabajoNuevo(!trabajoNuevo)}
                                />
                            </div>
                            <div className="prioridad">
                                <label htmlFor="prioridad">Prioridad</label>
                                <input 
                                    type="checkbox" 
                                    id='prioridad'
                                    value={prioridad}
                                    onChange={()=>setPrioridad(!prioridad)}
                                />
                            </div>
                        </div>
                        {
                            editPendiente.tarea && (
                                <div>
                                    <label htmlFor="estado">Estado</label>
        
                                <select 
                                        id='estado'
                                        value={estado}
                                        onChange={(e)=>setEstado(e.target.value)}
                                >
                                    <option value="">-- --</option>
                                    {
                                        condiciones.map(opcion => (
                                            <ComponenteSelect 
                                                key={opcion.uid ? opcion.uid : opcion._id}
                                                opcion={opcion}
                                            />
                                        ))
                                    }
                                </select>
                                </div>
                            //     condiciones.map(condition => (
                            //         <Con
                            //     ))
                            )
                        }
                        <input type="submit" value={editPendiente.tarea ? 'Editar Tarea' : "Agregar Tarea"} />
                    </form>
                </div>
                <div className="closeModal" onClick={handleCloseModal}>X</div>
            </div>
        </div>
    )
}

export default ModalPendiente