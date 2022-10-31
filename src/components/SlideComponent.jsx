import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import PendienteTask from "./PendienteTask";
import useTask from "../hooks/useTask"
import {SplideSlide} from '@splidejs/react-splide';
const SlideComponent = ({user, estado}) => {
    const [pendientes, setPendientes] = useState({})  
    const [infoPendiente, setInfoPendiente] = useState([])
    useEffect(()=>{
        const obtenerAllPendiente = async () => {
          try {
            await user.idPendiente.forEach(async element => {
              const {data} = await clienteAxios.post(`/pendientes/${element}`, estado)
              setInfoPendiente([
                ...infoPendiente,
                data
              ])
            });
            // setPendientes({
            //   id : user.uid,
            //   infoPendiente
            // })
          } catch (error) {
            console.log(error)
          }
        }
        obtenerAllPendiente()
    }, [])
    console.log(infoPendiente)
    return (
      <SplideSlide>
        <div className="card">
          <div className="card-header">
            <div className="perfil">
              <img src="" alt="" />
              <p className="name">{user.nombre}</p>
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
                  // pendientes.map(pendiente => (
                  //   <PendienteTask 
                  //     key={pendiente}
                  //     pendienteObtener={pendiente}
                  //     estado={estado}
                  //   />
                  // ))
              }
              
            </ul>
          </div>
        </div>
      </SplideSlide>
    )
}

export default SlideComponent