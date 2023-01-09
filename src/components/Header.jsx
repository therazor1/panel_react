import React from 'react'
import Perfil from "../img/perfil.jpg"
import imagenPerfil from "../img/img_perfil.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faHourglass, faQuestion, faPlus } from '@fortawesome/free-solid-svg-icons'
import Hora from './Hora'
import { useState } from 'react'
import useTask from '../hooks/useTask'
import ModalPendiente from './ModalPendiente'
import useAuth from '../hooks/useAuth'
import useUsers from '../hooks/useUsers'
import ModalPerfil from './ModalPerfil'
import { useEffect } from 'react'

const Header = ({urlActual}) => {

    const {modal, setModal, l} = useTask()
    const {modalPerfil, setModalPerfil, cambiarPasswordUser} = useUsers()
    const {auth} = useAuth()
    const [nombre, setNombre] = useState(auth.nombre.split(" ")[0])
    const [modalPass, setModalPass] = useState(auth.validarPass)
    const [showImagenPerfil, setShowImagenPerfil] = useState("")

    const [showValido, setShowValido] = useState(true)

    const [password, setPassword] = useState("")

    const [enviarPassword, setEnviarPassword] = useState(false)

    const cambiarInfo = () => {
        setModalPerfil(true)
    }



    useEffect(() => {
      const obtenerImagen = async() => {
        if(!auth.imagen){
            setShowImagenPerfil(imagenPerfil)
        }
      }
      obtenerImagen()
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!enviarPassword){
            alert("Password no valido")
            return
        }else{
            await cambiarPasswordUser(password)
        }
    }
    
    const validarPassword = (e) => {
        setPassword(e)
        // console.log(password)
        const validar = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
        const minsuculas = /[a-z]/
        const caracteres = /[@#$%^&*()_+=~:;{}]/
        const numeros = /[0-9]/
        const mayusculas = /[A-Z]/
        const box = document.querySelector("#showBox")
        if(e.length < 10){
            setShowValido(true)
            box.innerHTML = `
                Mínimo 10 caracteres
            `
        }else{
            setShowValido(true)
            if(box){
                box.innerHTML = ""
            }
            if(validar.test(e)){
                setShowValido(false)
                setEnviarPassword(true)
                setPassword(e)
                
            }else{
                setEnviarPassword(false)
                setShowValido(true)
                if(box){
                    box.innerHTML = `
                        <p class="minuscula">1 Minúscula min</p>
                        <p class="caracter">1 caracter especial (@#$%^&*()_+=~:;{})</p>
                        <p class="numero">1 Número Min</p>
                        <p class="mayuscula">1 Mayúscula min</p>
                    `
                    if(minsuculas.test(e)){
                        document.querySelector(".minuscula").innerHTML = "1 Minúscula min"
                    }
                    if(caracteres.test(e)){
                        document.querySelector(".caracter").innerHTML = "1 caracter especial (@#$%^&*()_+=~:;{})"
                    }
                    if(numeros.test(e)){
                        document.querySelector(".numero").innerHTML = "1 Número Min"
                    }
                    if(mayusculas.test(e)){
                        document.querySelector(".mayuscula").innerHTML = "1 Mayúscula min"
                    }
                }
            }
        }
    }

    return (
        <>
            <header className='scrolled dark'>
                        <div className="contenedor">
                            <div className="row">
                                <div className="perfil">
                                    <div className="fotocheck">
                                        <div className="face">
                                            <img 
                                                src={showImagenPerfil} 
                                                alt="" 
                                                onClick={cambiarInfo}
                                            />
                                        </div>
                                        <p className='hiname'>Hola <span>{nombre}</span> </p>
                                    </div>
                                    <div className="hora">
                                        <h4 className="dateTime">
                                            {/* "2:00 pm" */}
                                            <Hora />
                                        </h4>
                                    </div>
                                </div>
                                <div className="tarea">
                                    <a className="togglemode no-dark">
                                        <FontAwesomeIcon icon={faMoon}/>
                                    </a>
                                    <div className="colors-group tarea-tiempo">
                                        <button type='button'>
                                            <FontAwesomeIcon icon={faHourglass}/>
                                        </button>
                                        <ul className='dropdown-works'>
                                            <li>
                                                <p>Promedio de Tiempos</p>
                                            </li>

                                            <li className="form-promedio">
                                                <div className="form-promedio">
                                                    <input 
                                                        type="text" 
                                                        name='promedioTarea'
                                                        placeholder='Ingresa nombre de tarea'
                                                    />
                                                    <input 
                                                        type="time" 
                                                        name='primedioTiempo'
                                                    />
                                                    <a>+</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="colors-group">
                                        <button type='button'>
                                            <FontAwesomeIcon icon={faQuestion}/>
                                        </button>
                                        <div className="dropdown-colors">
                                            <ul className='dropdown-colors'> 
                                                <li><div></div> Edward Alarco</li>
                                                <li><div></div> Alejandro Meráz</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {
                                        urlActual == '/' &&
                                        (
                                            <button 
                                                className='nueva-tarea'
                                                onClick={()=>setModal(true)}
                                            >
                                                <FontAwesomeIcon icon={faPlus}/>
                                                Nueva Tarea
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            modal && <ModalPendiente />
                        }
                        {
                            modalPerfil && <ModalPerfil />
                        }
            </header>
            {
                !modalPass && (
                    <div className='content_modal'>
                        <div className="modal" style={{minHeight:"auto"}}>
                            <div className="modal-header">
                                <h3>Actualizar Password</h3>
                            </div>  
                            <div className="modal-body" style={{minHeight:"auto"}}>
                                <p>Actualiza tu password, esto será una sola vez</p>
                                <form autoComplete='off' onSubmit={handleSubmit} >
                                    <div>
                                        <label htmlFor="password">Nuevo password</label>
                                        <input 
                                            type="password" 
                                            name='password'
                                            id='password'
                                            value={password}
                                            onChange={(e)=>validarPassword(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" value="Actualizar Password "/>
                                </form>
                                {
                                    showValido && (
                                        <div id='showBox'>
                                            
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Header