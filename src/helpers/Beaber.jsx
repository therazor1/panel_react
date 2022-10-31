import React from 'react'
import { useNavigate } from 'react-router-dom'

const Beaber = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/login")
        return
    }
    const config = {
        headers : {
            "Content-Type" : "application/json",
            Authorization :  `Beaber ${token}`
        }
    }
    return config
}

export default Beaber