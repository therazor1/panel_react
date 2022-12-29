import React from 'react'
import { useState, useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'
import { obtenerImagen } from '../helpers/ObtenerImagen'
import useTask from '../hooks/useTask'
import useUsers from '../hooks/useUsers'
const PendienteTask = ({pendiente}) => {

    const {setCambioStado, cambioStado} = useUsers()
    const {setEditPendiente, setModal} = useTask()
    const [getPendiente, setgetPendiente] = useState({})
    const [cargando, setCargando] = useState(false)
    const [idCreador, setIdCreador] = useState("")
    const [nombreCreador, setNombreCreador] = useState("")
    const [creadorColor, setCreadorColor] = useState("")
    const [responsableId, setResponsableId] = useState("")
    const [hora, setHora] = useState("")
    const [fecha, setFecha] = useState("")
    const [idCliente, setIdCliente] = useState("")
    const [nombreCliente, setNombreCliente] = useState("")
    const [urlImg, setUrlImg] = useState("")
    const [tarea, setTarea] = useState("")
    const [idEstado, setIdEstado] = useState("")
    const [nombreEstado, setNombreEstado] = useState("")
    const [prioridad, setPrioridad] = useState(false)
    const [id, setId] = useState("")
    useEffect(()=>{
        setCargando(true)
        const obtenerPendiente = async () => {
            try {
                const {data} = await clienteAxios.post(`/pendientes/${pendiente}`)
                // console.log(data)
                setIdCreador(data.creador._id)
                setNombreCreador(data.creador.nombre)
                setCreadorColor(data.creador.color)
                setResponsableId(data.responsable._id)
                setHora(data.hora)
                setFecha(data.fecha)
                setIdCliente(data.cliente._id)
                setNombreCliente(data.cliente.nombre)
                setUrlImg(obtenerImagen(data.cliente.imagen))
                setTarea(data.tarea)
                setIdEstado(data.estado._id)
                setNombreEstado(data.estado.nombre)
                setPrioridad(data.prioridad)
                setId(data._id)
                setgetPendiente(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPendiente()
        setCargando(false)
    }, [cambioStado ?? true])

    const editarPendiente = () => {
        setModal(true)
        let edit = {
            responsable : responsableId,
            cliente : idCliente,
            tarea,
            hora, 
            fecha, 
            prioridad,
            estado : idEstado,
            id
        }
        setEditPendiente(edit)
    }

    return (
        <>
        {
            cargando ? <div className="loader"></div> : (
                <a className="edit solicitudno" onClick={()=>editarPendiente()} >
                    <div style={{backgroundColor : creadorColor}} className="color" title={nombreCreador}></div>
                    <li className="task">
                        <div className="creator" style={{display:"none"}}></div>
                        <div className="cliente" title={nombreCliente}>
                            <img src={urlImg} className={nombreCliente}/>
                        </div>
                        <div className="tarea"><p>{tarea}</p></div>
                        <div className="tiempo"><p>{hora}</p></div>
                        <div className="fechas"><p>{fecha}</p></div>
                        <div className={`dot ${prioridad ? 'on' : 'off'}`}></div>
                        <div className="estado">
                            <select><option value={idEstado}>{nombreEstado}</option></select>
                        </div>
                    </li>
                </a>
            )
        }
        </>
        
    )
}

export default PendienteTask