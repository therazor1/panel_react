import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import ListaMiembros from '../components/ListaMiembros'
import ModalUser from '../components/ModalUser'
import Sidebar from '../components/Sidebar'
import shortid from "shortid"
import Swal from "sweetalert2"
import useUsers from '../hooks/useUsers'
const Usuarios = () => {

    const {miembros, setMiembros, setModal, modal} = useUsers()


    return (
        <>
            <section className="contenido">
                <div className="contenedor">
                    <section className="row">
                        <div className="titulo-clientes">
                            <p>Miembros del Equipo</p>
                            <button onClick={()=>setModal(true)}>
                                + Añadir Miembro
                            </button>
                        </div>
                        <ul className="lista-de-miembros">
                            {
                                miembros.map(miembro => (
                                    <ListaMiembros 
                                        key={miembro.uid}
                                        miembro={miembro}
                                    />
                                ))
                            }
                            <div className="miembro">

                            </div>
                        </ul>
                    </section>
                </div>
            </section>
            {
                modal && <ModalUser  title="Añadir Integrante al equipo" />
            }
        </>
    )
}

export default Usuarios