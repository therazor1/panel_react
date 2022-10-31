import { useState, useEffect, createContext } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
import Beaber from "../helpers/Beaber"
const ClientsContext = createContext()


const ClientsProvider = ({children}) => {
    // Navigate
    const navegacion = useNavigate()
    // Modal
    const [modal, setModal] = useState(false)
    const handleAddClient = () => {
        setModal(true)
    }
    // Clientes
    const [clients, setClients] = useState([])
    const [clientsActive, setClientsActive] = useState([])
    const [editClient, setEditClient] = useState({})
    const [nacionalidades, setNacionalidades] = useState([])

    // Obtener Clientes Activos
    useEffect(()=>{
        const obtenerClientsActivos = async() => {
            try {
                const {data:{clients}} = await clienteAxios('/clients/active')
                setClientsActive(clients)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerClientsActivos()
    }, [])
    // Obtener Clientes
    useEffect(() => {
        const obtenerClientes = async() => {
            
            try {
                const {data:{usuarios}} = await clienteAxios('/clients')
                setClients(usuarios)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerClientes()
    }, [])

    // Obtener Nacionalidades
    useEffect(() => {
      const obtenerNacionalidad = async() => {
        try {
            const {data} = await clienteAxios("/nacionalidad")
            setNacionalidades(data.nations)
        } catch (error) {
            console.log(error)
        }
      }
      obtenerNacionalidad()
    }, [])
    

    // Agregar o Editar Cliente
    const clientAOptions = async(cliente)=>{
        if(cliente.get("id")){
            await updateClient(cliente)
        }else{
            // AddClient
            await addClient(cliente)
        }
    }

    const addClient = async(cliente)=>{
        try {
            const {data} = await clienteAxios.post("/clients", cliente)
            setClients([
                ...clients,
                data.client
            ])
            Swal.fire({
                title : "Cliente Agregado",
                icon : "success",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error)
        }
    }
    const updateClient = async(cliente) => {
        const {data:{client}} = await clienteAxios.put(`/clients/${cliente.get("id")}`, cliente)
        const id = client._id
        const clientesNuevos = clients.map(cliente => cliente._id === id ? client : cliente)
        setClients(clientesNuevos)
        Swal.fire({
            title : "Cliente Actualizado",
            icon : "success",
            showConfirmButton: false,
            timer: 1500
        })
    }

    // Borrar Cliente
    const deleteClient = async(id) => {
        try {
            const {data} = await clienteAxios.delete(`/clients/${id}`)
            const deleleClient = clients.filter(client => client._id !== id)
            setClients(deleleClient)
            Swal.fire(
                'Deleted!',
                'El Cliente ha sido eliminado',
                'success'
            )
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

    
    return (
        <ClientsContext.Provider
            value={{
                clients,
                setClients,
                nacionalidades,
                clientAOptions,
                setEditClient,
                editClient,
                modal,
                setModal,
                handleAddClient,
                deleteClient,
                clientsActive
            }}
        >
            {children}
        </ClientsContext.Provider>
    )
}

export {
    ClientsProvider
}

export default ClientsContext