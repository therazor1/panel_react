import React, { useState } from 'react'
import useUsers from '../hooks/useUsers'

const Listado = () => {   
    
    const {justId, cargando} = useUsers()
    const [pendientes, setPendientes] = useState([])

    return (
        <>
            {
                cargando ? "Cargando" : (
                    justId.map(id => (
                        <h3
                            key={id.uid}
                        >{id.uid}</h3>
                    ))
                )
            }
        </>
    )
}

export default Listado