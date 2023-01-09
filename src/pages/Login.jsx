import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

import Mensaje from '../components/Mensaje'
import clienteAxios from '../config/clienteAxios'
import useAuth from "../hooks/useAuth"
import useUsers from '../hooks/useUsers'

const Login = ({setAcce}) => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [mensaje, setMensaje] = useState("")

    const {setCambioStado} = useUsers()

    const [datos, setDatos] = useState({
        correo : "",
        password : ""
    })
    const {setAuth} = useAuth();
    const {correo, password} = datos

    const handleInput = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }
    
    const mostrarAlert = () => {
        Swal.fire({
            title : "Bienvenido",
            icon : "success",
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(correo === "" || password === ""){
            setError(true)
            setMensaje("Todos los campos son obligatorios")
            return
        }
        try {
            const {data} = await clienteAxios.post('/auth/login', {correo, password})
            localStorage.setItem("token", data.token)
            setAuth(data)
            setCambioStado(true)
            navigate("/")
        } catch (error) {
            if(!error.response.data.code){
                setError(true)
                setMensaje("Usuario o password incorrectos")
            }
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {
                    error && <Mensaje tipo="error">{mensaje}</Mensaje>
                }
                <div className="campo">
                    <label htmlFor="correo">Correo: </label>
                    <input 
                        type="email" 
                        id='correo'
                        value={correo}
                        name="correo"
                        onChange={handleInput}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        id='password' 
                        name='password'
                        value={password}
                        onChange={handleInput}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Ingresar"
                />
            </form>
        </>
    )
}

export default Login