import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const PanelContext = createContext()

const PanelProvider = ({children}) => {

    const [tareas, setTareas] = useState("")



    useEffect(() => {
        const obteneTareas = async() => {
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios("/panel", config)
                setTareas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obteneTareas()
    }, [])
    
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
                tareas,
                editarPening
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