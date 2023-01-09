import React from 'react'
import { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import useTask from '../hooks/useTask'
import useUsers from '../hooks/useUsers'

import io from "socket.io-client"
import usePanel from '../hooks/usePanel'
import useAuth from '../hooks/useAuth'
const socket = io('http://localhost:8080')


const Inicio = () => {
    // console.log(miembros)
    const {cargando} = useTask()
    const {justId, setCambioStado} = useUsers()
    const {setBoolAgregado} = usePanel()
    const {auth} = useAuth()
    

    useEffect(()=>{
        socket.on('mensaje', mensaje => {
            setCambioStado(true)
            if(auth.id == mensaje){
                setBoolAgregado(true)
            }
        })
        return () => {
            socket.off('mensaje', mensaje => console.log(mensaje))
        }
    }, [])
    return (
        <>
            {
                cargando ? (
                    <div className="cajaLoader">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <section className="contenido">
                        <div className="contenedor contenido_main">
                        <Carousel
                            boton={true}
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