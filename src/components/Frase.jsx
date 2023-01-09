import React from 'react'
import { useState, useEffect } from 'react'
const Frase = () => {

    const [frases, setFrases] = useState([])
    const [frase, setFrase] = useState([])
    useEffect(() => {
      const obtenerFrase = async() => {
        try {
            const data = await fetch("./src/helpers/frases.json")
            const {frases} = await data.json()
            setFrases(frases)
            await setFrase(getRandomObject(frases))
        } catch (error) {
            console.log(error)
        }
      }
      obtenerFrase()
    }, [])
    const getRandomObject = (array) => {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    }
    
    return (
        <>
            <h2>{frase.frase}</h2>
            <span>{frase.autor}</span>
        </>
    )
}

export default Frase