import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const PanelContext = createContext()

const PanelProvider = ({children}) => {

    const [tareas, setTareas] = useState([])
    const [taskAtrasados, setTaskAtrasados] = useState("")
    const [boolAgregado, setBoolAgregado] = useState(true)
    const editarPening = async (pendiente) => {
        const {id, valor} = pendiente
        try {
            const {data} = await clienteAxios.put(`/panel/${id}`, pendiente)
            const nuevoArreglo =  tareas.map(tareaStatus => tareaStatus._id === data._id ? data : tareaStatus )
            // console.log(nuevoArreglo)
            setTareas(nuevoArreglo)
            // console.log("actualizado")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <PanelContext.Provider
            value={{
                editarPening,
                setTareas,
                tareas,
                taskAtrasados,
                setTaskAtrasados,
                setBoolAgregado,
                boolAgregado
            }}
        >
            {children}
        </PanelContext.Provider>
    )
}

export {
    PanelProvider
}

export default PanelContext