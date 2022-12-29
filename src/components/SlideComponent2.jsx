import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'

const SlideComponent2 = ({user, estado}) => {
    const {idPendiente} = user
    // console.log(estado)
    const [pendientes, setPendientes] = useState([])
    useEffect(() => {
      const obtenerPendientes = async () => {
        try {
            await idPendiente.forEach( async pendiente => {
                const {data} = await clienteAxios.post(`/pendientes/${pendiente}`, estado)
                console.log(data)
            })
            // const pendientesAll = await clienteAxios.post(`/pendientes/${element}`, estado)
            // console.log(pendientesAll)
        } catch (error) {
            console.log(error)
        }
      }
      obtenerPendientes()
    }, [])
    

    return (
        <div>SlideComponent2</div>
    )
}

export default SlideComponent2