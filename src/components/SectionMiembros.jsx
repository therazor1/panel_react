import { SplideSlide } from '@splidejs/react-splide'
import React from 'react'
import SplideComponent3 from './SplideComponent3'
import clienteAxios from '../config/clienteAxios'
import { useEffect } from 'react'
import { useState } from 'react'
const SectionMiembros = ({miembro, estado}) => {
    const [cargando, setCargando] = useState(true)

    return (
        <div className='row_tasks'>
            <SplideSlide>
            <div className="card">
                <div className="card-header">
                    <div className="perfil">
                    <img src="" alt="" />
                    <p className="name">{miembro.nombre}</p>
                    </div>
                    <span className="date">Hoy</span>
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
                    <SplideComponent3 
                        key={miembro.uid}
                        miembro={miembro}
                        estado={estado}
                    />
                }
                </ul>
                </div>
            </div>
            </SplideSlide>
        </div>
    )
}

export default SectionMiembros