import React from 'react'
import ListaClientes from '../components/ListaClientes'
import Modal from '../components/Modal'
import useClients from '../hooks/useClients'

const Clientes = () => {

    const {clients, modal, handleAddClient} = useClients()


    return (
        <>
            <section className="contenido">
                <div className="contenedor">
                    <section className="row">
                        <div className="titulo-clientes">
                            <p>Clientes</p>
                            <button onClick={handleAddClient}>
                                + Agregar Cliente
                            </button>
                        </div>
                        <ul className="lista-de-clientes">
                            {
                                clients.map(cliente =>(
                                    <ListaClientes 
                                        key={cliente._id}
                                        cliente={cliente}
                                    />
                                ))
                            }
                        </ul>
                    </section>
                </div>
            </section>
            {
                modal && <Modal />
            }
        </>
    )
}

export default Clientes