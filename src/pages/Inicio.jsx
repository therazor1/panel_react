import React from 'react'
import Carousel from '../components/Carousel'
import useTask from '../hooks/useTask'
import useUsers from '../hooks/useUsers'
const Inicio = () => {
    // console.log(miembros)
    const {cargando} = useTask()
    const {miembros} = useUsers()
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
                                estado={["632476dee7580e1d74a840f5", "632476fee7580e1d74a840f7" ]}
                                titulo="Pendientes del equipo"
                                miembros={miembros}
                            />
                            {/* <Carousel 
                                boton={false}
                                estado={["63247710e7580e1d74a840f9"]}
                                titulo="Revisión Invitro"
                            />
                            <Carousel 
                                boton={false}
                                estado={["63247722e7580e1d74a840fb"]}
                                titulo="Próximos"
                            /> */}
                        </div>
                    </section>  
                )
            }
            
        </>
    )
}

export default Inicio