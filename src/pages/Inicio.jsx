import React from 'react'
import { useState } from 'react'
import Carousel from '../components/Carousel'
import Listado from '../components/Listado'
import useTask from '../hooks/useTask'
import useUsers from '../hooks/useUsers'
const Inicio = () => {
    // console.log(miembros)
    const {cargando} = useTask()
    const {justId} = useUsers()
    return (
        <>
            {
                cargando ? (
                    <div className="cajaLoader">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <section className="contenido">
                        <div className="contenedor">

                        <Carousel
                            boton={true}
                            estado="pendiente"
                            titulo="Pendientes del equipo"
                            miembros={justId}
                        />
                        <Carousel 
                            boton={false}
                            titulo="Revisión Invitro"
                            estado="completo"
                            miembros={justId}
                        />
     
                            
                        </div>
                    </section>  
                )
            }
            
        </>
    )
}

export default Inicio