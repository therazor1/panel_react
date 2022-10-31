import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

const Cerrar = () => {
    // alert("Hola")
    const navigate = useNavigate()
    localStorage.removeItem('token');
    return(
        <Navigate to="/login" />
    )
}

export default Cerrar