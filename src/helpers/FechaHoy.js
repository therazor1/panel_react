const fechaHoy = () => {
    const fecha = new Date()
    const day = fecha.getDate().toString().padStart(2, "0")
    const month = fecha.getMonth() + 1
    const year = fecha.getFullYear()
    return year+"-"+month+"-"+day
}
export {
    fechaHoy
}