import React from 'react'
import { useState, useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'
import { obtenerImagen } from '../helpers/ObtenerImagen'
import useTask from '../hooks/useTask'
const PendienteTask = ({pendienteObtener, estado}) => {
    const {setEditPendiente, setModal} = useTask()
    console.log(pendienteObtener.estado)
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
                const {data} = await clienteAxios.post(`/pendientes/${pendienteObtener}`, estado)
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
    }, [])

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
                    <div style={{backgroundColor : pendienteObtener.creador.color}} className="color" title={pendienteObtener.creador.nombre}></div>
                    <li className="task">
                        <div className="creator creator-30" style={{display:"none"}}></div>
                        <div className="cliente" title={pendienteObtener.cliente.nombre}>
                            <img src={urlImg} className={pendienteObtener.cliente.nombre}/>
                        </div>
                        <div className="tarea"><p>{pendienteObtener.tarea}</p></div><div className="tiempo"><p>{pendienteObtener.hora}</p></div><div className="fechas"><p>{pendienteObtener.fecha}</p></div>
                        <div className="dot off"></div>
                        <div className="estado">
                            <select><option value={pendienteObtener.estado._id}>{pendienteObtener.estado.nombre}</option></select>
                        </div>
                    </li>   
                </a>
            )
        }
        </>
        
    )
}

export default PendienteTask