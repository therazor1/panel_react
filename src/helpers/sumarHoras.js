const sumHours = (times = [])  => {
    let sumaHoras = 0
    let sumaMinutos = 0
    times.forEach(time => {
        if(time !== undefined){
            sumaHoras += parseInt(time.split(":")[0])
            sumaMinutos += parseInt(time.split(":")[1])
            if(sumaMinutos > 59){
                sumaHoras +=1
                sumaMinutos -=60
            }
        }
    });
    return sumaHoras+":"+sumaMinutos
}
  
export {
    sumHours    
}

//   let result = sumHours(["08:59", "02:00", "01:00"]);
//   console.log(result.toString());  // imprime la fecha con las horas sumadas