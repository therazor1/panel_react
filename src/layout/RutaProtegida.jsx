import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const {auth, cargando} = useAuth()
    if(cargando) return "Cargando..."
    return (
        <>
        {
            auth.id ? (
            <>
                <Header 
                    urlActual={urlActual}
                />
                <Sidebar 
                    urlActual={urlActual}
                />
                <Outlet />
            </>
            ): <Navigate to="/login" />}
        </>
    )
}

export default RutaProtegida