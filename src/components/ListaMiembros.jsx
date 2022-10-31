import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faChalkboardTeacher, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import useUsers from '../hooks/useUsers'
const ListaMiembros = ({miembro}) => {
    // console.log(miembro)
    const {setUpdateUser, setModal, deleteUser} = useUsers()
    const {uid, nombre, correo, area, color, img, rol, orden} = miembro
    const handleUpdate = ()=>{
        setUpdateUser(miembro)
        setModal(true)
    }

    return (
        <li className='miembro'>
            <div className="cliente-miembro">
                <img 
                    src={img ? img : "src/img/user.png"} 
                    className="member" 
                />
                <ol>
                    <li className="name">
                        <FontAwesomeIcon icon={faUser} />
                        {nombre}
                    </li>
                    <li className="mail">
                        <FontAwesomeIcon icon={faEnvelope} />
                        {correo}
                    </li>
                    <li className="role">
                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                        {rol}
                    </li>
                </ol>
            </div>
            <div className="buttons">
                <a 
                    className='edit'
                    onClick={handleUpdate}
                >
                    <FontAwesomeIcon icon={faPen} />
                </a>
                <a 
                    className='delete'
                    onClick={()=>deleteUser(uid)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </a>
            </div>
        </li>
    )
}

export default ListaMiembros