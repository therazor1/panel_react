import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

const UsersContext = createContext()

const UsersProvider = ({children}) => {
    const [miembros, setMiembros] = useState([])
    const [updateUser, setUpdateUser] = useState({})
    const [mensaje, setMensaje] = useState({})
    const [modal, setModal] = useState(false)
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    const [justId, setJustId] = useState([])

    const [cambioStado, setCambioStado] = useState(true)

    useEffect(() => {
      const getUsersId = async()=> {
        const {data} = await clienteAxios.get('/users/justId')
        setJustId(data)
        setCambioStado(false)
      }
      getUsersId()
    }, [cambioStado ?? true])
    

    const addUser = async(user) => {
        if(user.uid){
            editarUsuario(user)
        }else{
            agregarUsuario(user)
        }
    }

    const agregarUsuario = async(user) =>{
        try {
            const {data} = await clienteAxios.post('/users', user)
            setMiembros([
                ...miembros,
                data.usuario
            ])
            setModal(false)
            setMensaje({
                tipo : true,
                msg : ""
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuario Agregado",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            setMensaje({
                tipo : false,
                msg : error.response.data.errors[0].msg
            })
        }finally{
            navigate("/usuarios")
        }
    }

    const editarUsuario = async(user) => {
        try {
            const {data} = await clienteAxios.put(`/users/${user.uid}`, user)
            const userActualizado = miembros.map(user => user.uid === data.usuario.uid ? data.usuario : user)
            setMiembros(userActualizado)
            setModal(false)
            setMensaje({
                tipo : true,
                msg : ""
            })
            setUpdateUser({})
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuario Editado",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            setMensaje({
                tipo : false,
                msg : error.response.data.msg
            })
        }finally{
            navigate("/usuarios")
        }
    }

    const deleteUser = async(id) => {
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
                const {data} = await clienteAxios.delete(`/users/${id}`)
                const userDelete = miembros.filter(user => user.uid !== id)
                setMiembros(userDelete)
                Swal.fire(
                    'Deleted!',
                    'El usuario ha sido eliminado',
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
        })

    }
   
    useEffect(() => {
      const getUsers = async() => {
        try {
            const {data} = await clienteAxios('/users')
            setMiembros(data.usuarios)
            // setAuth(data.usuario)
        } catch (error) {
            setAuth({})
        }finally{
            setCargando(false)
        }
      }
      getUsers()
    }, [])



   
    
    

    return (
        <UsersContext.Provider
            value={{
                miembros,
                setMiembros,
                addUser,
                updateUser,
                setUpdateUser,
                mensaje,
                setMensaje,
                setModal,
                modal,
                deleteUser,
                justId,
                cargando,
                setJustId,
                setCambioStado,
                cambioStado
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}


export {
    UsersProvider
}

export default UsersContext