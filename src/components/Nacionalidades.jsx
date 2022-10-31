import React from 'react'

const Nacionalidades = ({nation, setNacionalidad, nacionalidad}) => {
    return (
        <span className="campo">
            <label htmlFor={nation.nombre}>{nation.nombre}</label>
                <input style={{marginRight:"5px"}} type="radio" name="nacionalidad" id={nation.nombre} value={nation._id} checked={nacionalidad === nation._id} onChange={e=>setNacionalidad(e.target.value)}/>
        </span>
    )
}

export default Nacionalidades