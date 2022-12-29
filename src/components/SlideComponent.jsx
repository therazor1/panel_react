import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import PendienteTask from "./PendienteTask";
import useTask from "../hooks/useTask"
import {SplideSlide} from '@splidejs/react-splide';
import useUsers from "../hooks/useUsers";
const SlideComponent = ({user, estado = ""}) => {
    const {setCambioStado, cambioStado} = useUsers()
    const [pendientes, setPendientes] = useState(Array(user)[0][estado] ? Array(user)[0][estado] : [])  
    const [infoPendiente, setInfoPendiente] = useState([])
    const [infoUser, setInfoUser] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const infoUsuario = async() => {
            try {
                const {data} = await clienteAxios(`/users/infoUser/${user.uid}`)
                setInfoUser(data)
            } catch (error) {
                console.log(error)
            }finally{
              setCargando(false)
            }
            
      }
      infoUsuario()
    }, [cambioStado ?? true])

    return (
      <>
        {
          cambioStado ? "Cargando" : (
            <SplideSlide>
              <div className="card">
                <div className="card-header">
                  <div className="perfil">
                    <img src="" alt="" />
                    <p className="name">{infoUser.nombre}</p>
                  </div>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      <p>Cliente</p>
                      <p>Tarea</p>
                      <p>Tiempo</p>
                      <p>Fecha</p>
                      <p>Estado</p>
                    </li>
                  </ul>
                  <ul className="pendiente">
                    {   
                      pendientes.map(pendiente => (
                          <PendienteTask 
                            key={pendiente}
                            pendiente={pendiente}
                          />
                      ))

                    }
                    
                  </ul>
                </div>
              </div>
            </SplideSlide>
          )
        }
      </>
    )
}

export default SlideComponent