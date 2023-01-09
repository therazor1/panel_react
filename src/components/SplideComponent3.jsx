import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import useUsers from '../hooks/useUsers'
import PendienteTask from './PendienteTask'

const SplideComponent3 = ({miembro, estado}) => {
    const {setCambioStado, cambioStado} = useUsers()
    const [task, setTask] = useState([])
    useEffect(() => {
      try {
        if(estado == "pendiente"){
          setTask(miembro.pendiente.concat(miembro.curso))
        } else if(estado == "completo"){
          setTask(miembro.completo.concat(miembro.enviado))
        } else if(estado == "proximos"){
          setTask(miembro.proximos)
        }
      } catch (error) {
        console.log(error)
      }finally{
        setCambioStado(false)
      }
      
    }, [cambioStado ?? true])

    return (
        <>
            {   
              task.map(tas => (
                  <PendienteTask 
                    key={tas}
                    pendiente={tas}
                  />
              ))

            }
                    
        </>
    )
}

export default SplideComponent3