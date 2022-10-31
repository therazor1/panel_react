import React from 'react'

const Mensaje = ({tipo, children}) => {
    return (
        <div className={`mensaje ${tipo ? 'exito' : 'error'}`}>
            {children}
        </div>
    )
}

export default Mensaje