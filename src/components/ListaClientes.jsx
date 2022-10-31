import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import useClients from '../hooks/useClients'
import clienteAxios from '../config/clienteAxios'
import Swal from 'sweetalert2'
import { obtenerImagen } from '../helpers/ObtenerImagen'


const ListaClientes = ({cliente}) => {
    const {setEditClient, setModal, deleteClient} = useClients()
    
    const {_id, nombre, visto ,imagen } = cliente
    // Cambio Estado Visible o No
    const [show, setShow] = useState(visto)
    const cambioEstado = async(id) => {
        try {
            const {data} = await clienteAxios.put(`/clients/visto/${id}`)
            setShow(data.visto.visto)
        } catch (error) {
            console.log(error)
        }
    }
    // Obtener Imagen
    const [urlImg, setUrlImg] = useState("")
    useEffect(() => {
        setUrlImg(obtenerImagen(imagen))
    }, [imagen])
    


    const editClient = () => {
        setModal(true)
        setEditClient(cliente)
    }

    const borrarCliente = async(id) => {
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
            await deleteClient(id)
        }
        })
    }


    return (
        <li className='cliente'>
            <div className="cliente-contenedor">
                <img 
                    src={urlImg} 
                />
                <p>{nombre}</p>
            </div>
            <div className="buttons">
                <a 
                    className={`visible ${show ? 'on' : 'off'} `}
                    onClick={()=>cambioEstado(_id)}
                >
                    <FontAwesomeIcon icon={faEye} />
                </a>
                <a 
                    className='edit'
                    onClick={editClient}
                >
                    <FontAwesomeIcon icon={faPen} />
                </a>
                <a 
                    className='delete'
                    onClick={()=>borrarCliente(_id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </a>
            </div>
        </li>
    )
}

export default ListaClientes