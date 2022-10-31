import moment from "moment" 
import { useState } from "react"

moment.locale('es') 
const Hora = () => {
    const [hora, setHora] = useState("")
    const hoy = moment()
    const insert = hoy.format('dddd Do MMMM YYYY')
    // setInterval(()=>{
    //     setHora(hoy.format('h:mm a'))
    // }, 1000)
    return (
        <>
            <span>{insert}</span>
            {/* <div>{hora}</div> */}
        </>
    )
}

export default Hora