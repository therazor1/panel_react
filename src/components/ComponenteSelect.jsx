import React from 'react'

const ComponenteSelect = ({opcion}) => {
    return (
        <option value={opcion.uid ? opcion.uid : opcion._id}>
            {opcion.nombre}
        </option>
    )
}

export default ComponenteSelect