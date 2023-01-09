import React, { useState } from 'react'
import useUsers from '../hooks/useUsers'

const ModalPerfil = () => {

    const {setModalPerfil} = useUsers()
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
      e.preventDefault()
    }
    const handleCloseModal = () =>{
      setModalPerfil(false)
    }
    return (
      <div className='content_modal'>
            <div className="modal">
                <div className="modal-header">
                    <h3>Actualizar Información</h3>
                </div>
                <div className="modal-body">
                    <p>Actualiza tus datos:</p>
                    <form autoComplete='off' onSubmit={handleSubmit} encType="multipart/form-data">
                      <div>
                          <label htmlFor="Imagen Perfil">Imagen Perfil</label>
                          <input 
                              type="file" 
                              name='perfil'
                              onChange={(e)=>setColor(e.target.value)}
                              className="colorIntegrante"
                          />
                      </div>
                      <div>
                        <label htmlFor="Imagen Perfil">Imagen Perfil</label>
                        <input 
                              type="password" 
                              name='password'
                              onChange={(e)=>setColor(e.target.value)}
                              className="colorIntegrante"
                          />
                      </div>
                      <input type="submit" value="Actualizar" />
                    </form>
                </div>
                <div className="closeModal" onClick={handleCloseModal}>X</div>
            </div>
      </div>
    )
}

export default ModalPerfil