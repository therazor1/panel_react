import React from 'react'
import Logo from "../img/logoiv2.png"
import Logo2 from "../img/logo-iv-1.png"
import menu1 from "../img/icon-menu-01a.svg"
import menu2 from "../img/icon-menu-02a.svg"
import menu3 from "../img/icon-menu-03a.svg"
import menu5 from "../img/icon-menu-05a.svg"
import menu6 from "../img/icon-menu-06a.svg"
import menu7 from "../img/icon-menu-07a.svg"
import menu8 from "../img/icon-menu-08a.svg"
import menu9 from "../img/icon-menu-09a.svg"
import menu10 from "../img/icon-menu-10a.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCaretRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link, useLocation} from "react-router-dom"
const Sidebar = ({urlActual}) => {
    
    const [show, setShow] = useState(false)
    const showSidebar = () => {
        setShow(!show)
    }
    return (
        <>
            <div className="bgsidebar"></div>
            <div className={`sidebar ${show ? "hidden" : '' }`}>
                <div className="logo">
                    <img 
                        src={Logo2} 
                    />
                </div>
                <ul>
                    <li>
                        <Link
                            to="/"
                        >
                            <img 
                                src={menu2}
                            />
                            <p>Inicio</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/panel"
                        >
                            <img 
                                src={menu2}
                            />
                            <p>Mi panel</p>
                        </Link>
                    </li>
                    <li>
                        <a >
                            <img 
                                src={menu3}
                            />
                            <p>Clientes</p>
                        </a>
                    </li>
                    <li>
                        <a >
                            <img 
                                src={menu8}
                            />
                            <p>Usuarios</p>
                        </a>
                    </li>
                    <li>
                        <a >
                            <img 
                                src={menu6}
                            />
                            <p>Archivo</p>
                        </a>
                    </li>
                    
                    <li>
                        <a >
                            <img 
                                src={menu5}
                            />
                            <p>Estad&iacute;sticas</p>
                        </a>
                    </li>
                    {/* <!--<li>
                    <a href="#" className="nextArea"><img src="views/img/icon-menu-area.svg"><p>Cambiar área</p></a>
                </li>--> */}

                    <li>
                        <a >
                            <img 
                                src={menu9}
                            />
                            <p>Solicitudes</p>
                        </a>
                    </li>
                    <li className="genqr">
                        <a href="generador-qr">
                            <img 
                                src={menu10}
                            />
                            <p>Generar QR</p>
                        </a>
                    </li>
                    
                    <li>
                        <a href="cerrar">
                            <img 
                                src={menu7}
                            />
                            <p>Cerrar</p>
                        </a>
                    </li>
                    <input 
                        className="validarSalida" 
                        type="hidden"
                    />
                    
                    <li>
                        <a
                            onClick={showSidebar}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </a>
                        
                    </li>
                    
                </ul>
            </div>

            <div className={`sidebar ${show ? "" : "fixed" }`}>
                <div className="logo">
                    <img 
                        src={Logo}
                    />
                </div>
                <ul>
                    <li title="Inicio">
                        <Link
                            className={`pag-inicio ${urlActual == '/' ? 'current' : ""}`}
                            to="/"
                        >
                            <img 
                                src={menu1}
                            />
                        </Link>
                    
                    </li>
                    <li title="Panel">
                        <Link 
                            to="/panel"
                            className={`pag-panel ${urlActual == '/panel' ? 'current' : ""}`}
                        >
                            <img 
                                src={menu2}
                            />
                        </Link>
                    
                    </li>
                    <li title="Clientes">
                        <Link 
                            to="/clientes"
                            className={`pag-clientes ${urlActual == '/clientes' ? 'current' : ""}`}
                        >
                            <img 
                                src={menu3}
                            />
                        </Link>
                    
                    </li>

                    <li title="Usuarios">
                        <Link 
                            to="/usuarios"    
                            className={`pag-usuarios ${urlActual == '/usuarios' ? 'current' : ""}`}
                        >
                            <img 
                                src={menu8}
                            />
                        </Link>
                    
                    </li>
                    <li title="Archivo">
                        <a className="pag-archivo" >
                            <img 
                                src={menu6}
                            />
                        </a>
                    </li>
                    <li title="Estadísticas">
                        <a className="pag-estadisticas">
                            <img 
                                src={menu5}
                            />
                        </a>
                    </li>
                    <li title="Solicitudes">
                        <a className="pag-solicitudes" >
                            <img 
                                src={menu9}
                            />
                        </a>
                    </li>
                    <li title="Generador QR" className="genqr">
                        <a className="pag-generador">
                            <img 
                                src={menu10}
                            />
                        </a>
                    </li>
                    
                    <li title="Salir">
                        <Link 
                            to="/cerrar">
                            <img 
                                src={menu7}
                            />
                        </Link>
                    </li>
                    <li>
                        <a 
                            onClick={showSidebar}
                        >
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </a>
                </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar