import React from 'react'
import Perfil from "../img/perfil.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faHourglass, faQuestion, faPlus } from '@fortawesome/free-solid-svg-icons'
import Hora from './Hora'
import { useState } from 'react'
import useTask from '../hooks/useTask'
import ModalPendiente from './ModalPendiente'
import useAuth from '../hooks/useAuth'

const Header = ({urlActual}) => {

    const {modal, setModal} = useTask()
    const {auth} = useAuth()
    const [nombre, setNombre] = useState(auth.nombre.split(" ")[0])
    return (
        <header className='scrolled dark'>
                    <div className="contenedor">
                        <div className="row">
                            <div className="perfil">
                                <div className="fotocheck">
                                    <div className="face">
                                        <img src={Perfil} alt="" />
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
        </header>
    )
}

export default Header