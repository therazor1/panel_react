import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import useUsers from "../hooks/useUsers";
import io from "socket.io-client"
import useAuth from "../hooks/useAuth";
// const socket = io('http://localhost:8080')
const socket = io('https://panel-backend-zeta.vercel.app')
const TaskContext = createContext()

const TaskProvider = ({children}) => {
    const {setCambioStado} = useUsers()
    const [pendienteUser, setPendienteUser] = useState([])

    const [modal, setModal] = useState(false)

    const [editPendiente, setEditPendiente] = useState({})

    const [cargando, setCargando] = useState(false)

    const [mensaje, setMensaje] = useState({
        tipo : true,
        msg : ""
    })

    

    const pendienteSend = async(pendiente) => {
        if(pendiente.id){
            await editarPendiente(pendiente)
            setCambioStado(true)
        }else{
            // Agregando
            await agregarPendiente(pendiente)
            setCambioStado(true)
        }
    }
    const [agregado, setAgregado] = useState(false)
    const agregarPendiente = async(pendiente) => {
        try {
            const {data} = await clienteAxios.post(`/pendientes/`, pendiente)
            
            console.log(data)
            if(data.msg){
                socket.emit('taskad', pendiente.responsable)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Pendiente Agregado",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            setAgregado(true)
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Hubo un error al Agregar Tarea",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const editarPendiente = async(pendiente) => {
        const {creador, cliente, trabajoNuevo, id, ...resto} = pendiente
        try {
            const {data} = await clienteAxios.put(`/pendientes/${pendiente.id}`, resto)
            setAgregado(true)
            socket.emit('taskad', 'agregado')
        } catch (error) {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Hubo un error al Editar Tarea",
                showConfirmButton: false,
                timer: 1500
            })
        }
        
    }

    const deletePendiente = async(id, responsable, estado) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
        if (result.value) {
            try {
                const {data} = await clienteAxios.delete(`/pendientes/${id}/${responsable}/${estado}`)
                Swal.fire(
                    'Deleted!',
                    'El usuario ha sido eliminado',
                    'success'
                )
                setEditPendiente({})
                setAgregado(true)
                setModal(false)
                setCambioStado(true)
                socket.emit('taskad', 'agregado')
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: "Hubo un error al Eliminar",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            
        }
        })
    }

    const [condiciones, setCondiciones] = useState([])
    useEffect(()=>{
        const opcionesDeEstado = async() => {
            const {data} = await clienteAxios(`/pendientes/conditions/obtener`)
            setCondiciones(data.condiciones)
        }
        opcionesDeEstado()
    }, [])


    return (
        <TaskContext.Provider
            value={{
                modal,
                setModal,
                setMensaje,
                mensaje,
                setAgregado,
                agregado,
                pendienteSend,
                setEditPendiente,
                editPendiente,
                condiciones,
                deletePendiente,
                setCargando,
                cargando,
                setPendienteUser,
                pendienteUser
            }}
        >
            {children}
        </TaskContext.Provider>
    )

}

export {
    TaskProvider
}

export default TaskContext