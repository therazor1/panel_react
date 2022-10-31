import React from 'react'
import Task from '../components/Task'
import useAuth from '../hooks/useAuth'
import usePanel from '../hooks/usePanel'

const Panel = () => {

    
    const {tareas} = usePanel()


    return (
            <>
                <section className="contenido">
                    <div className="contenedor">
                        <section className="row">
                            <div className="etiqueta">
                                Mis Tareas
                            </div>

                            {/* Separar por componentes */}
                            <div className="tareas-grid">
                                <div className="tasks">
                                    <ul className="tareas-container main">
                                        <li>
                                            <p>Fecha</p>
                                            <p>Solicitado / Encargado</p>
                                            <p>Cliente</p>
                                            <p>Tarea</p>
                                            <p>Tiempo</p>
                                            <p></p>
                                            <p>Estado</p>
                                            <p style={{textAlign: "center", width: "100%"}}>Enlace</p>
                                        </li>
                                    </ul>
                                    <ul className="tareas-container tareas-container-scroll sortable-tasks contenedores-tareas" data-seccion="Pendientes">
                                        {
                                            tareas.map(tarea => (
                                                <Task 
                                                    key={tarea._id}
                                                    tarea={tarea}
                                                />
                                            ))
                                        }
                                    </ul>
                                </div>


                                <div className="tasks proximas">
                                    <ul className="tareas-container main">
                                        <li>
                                            <p>Fecha</p>
                                            <p>Solicitado / Encargado</p>
                                            <p>Cliente</p>
                                            <p>Tarea</p>
                                            <p>Tiempo</p>
                                            <p></p>
                                            <p>Estado</p>
                                            <p style={{textAlign: "center", width: "100%"}}>Enlace</p>
                                        </li>
                                    </ul>
                                    <ul className="tareas-container tareas-container-scroll-2 contenedores-tareas" data-seccion="Pr&oacute;ximas">
                                        <li data-user="9" className="task tarea1 en-c5rso">
                                                <input style={{display:"none"}} className="hid" type="hidden" data-id-pendiente="3303" />
                                                <div className="fecha"><p>03/06/2022</p></div>
                                                <div className="solicitante"><img title="Alejandro Meráz" src="../src/img/perfil.jpg" className="customer"/></div>
                                                <div className="cliente"><img title="InVitro" src="../src/img/perfil.jpg" className="customer"/></div>
                                                <div className="tarea"><p>Api Rest Parte III</p></div>
                                                <div className="tiempo"><p>06:00 hrs</p></div>
                                                <div className="dot off"></div>
                                                <div className="estado">
                                                    <p value="5">Proximos</p>
                                                </div>
                                                <div className="enlace">
                                                    <a href="#" className="ingresar-url" data-url=""><i className="fas fa-link"></i></a>
                                                </div>
                                        </li>                                                    
                                    </ul>
                                </div>
                                <div className="enlaces">
                                    <p>Enlaces de Interés</p>
                                    <ul>
                                        <li>
                                            <a href="">
                                                One Drive

                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="frase">
                                    <p>Frases del día</p>
                                    <h2>La mayor declaración de amor es la que no se hace; el hombre que siente mucho, habla poco</h2>
                                    <span>Platón</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </>
    )
}

export default Panel