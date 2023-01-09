import React from 'react'
import { useState, useEffect } from 'react'
import { obtenerImagen } from '../helpers/ObtenerImagen'
import usePanel from '../hooks/usePanel'
import useTask from '../hooks/useTask'
import ComponenteSelect from './ComponenteSelect'

const Task = ({tarea}) => {
    const {condiciones} = useTask()
    const {editarPening} = usePanel()
    const {hora, tarea:nombre, estado, creador, cliente, _id, fecha} = tarea
    const [urlImg, setUrlImg] = useState("")
    useEffect(() => {
        setUrlImg(obtenerImagen(cliente.imagen))
    }, [])

    const editarPendiente = async(e) => {
        const pendiente = {
            id : _id,
            valor : e.target.value
        }
        await editarPening(pendiente)
    }

    return (
        <li data-user="9" className="task tarea1 en-c1rso">
            <div className="fecha"><p>{fecha}</p></div>
            <div className="solicitante"><img title={`Solicitado por ${creador.nombre.split(" ")[0]}`} src="../src/img/perfil.jpg" className="customer solicitante" /></div>
            <div className="cliente"><img title={`${cliente.nombre}`} src={urlImg} className="customer cliente" /></div>
            <div className="tarea"><p>{nombre}</p></div>
            <div className="tiempo"><p>{hora} hrs</p></div>
            <div className="dot off"></div>
            <div className="estado">
                <select 
                    data-state-now="1" 
                    className="current-state"
                    value={estado._id}
                    onChange={(e) => editarPendiente(e)}
                >
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
            <div className="enlace">
                <a href="#" className="ingresar-url" data-url=""><i className="fas fa-link"></i></a>
            </div>
        </li>
    )
}

export default Task