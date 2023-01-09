const fechaHoy = () => {
    const fecha = new Date()
    const day = fecha.getDate().toString().padStart(2, "0")
    let month = fecha.getMonth() + 1
    if(month < 10){
        month = "0"+month.toString()
    }
    const year = fecha.getFullYear()
    return year+"-"+month+"-"+day
}
export {
    fechaHoy
}