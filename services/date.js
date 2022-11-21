export const uniqueDates = (tasks) => {
    const unique = [];

    tasks.forEach( task => {
        if(!unique.includes(task.dateFormat) ){
            unique.push(task.dateFormat);
        }
    });
   return unique;  
};

export const orderDate = (dates) =>{  //esto lo hacemos para ordenar las fechas
    return dates.sort((a,b) => {  //sort es un método de los arreglo. Permite dar diferentes ordenamientos a un arreglo
        const firstDate = moment(a, "DD/MM/YYYY");
        const seconDate = moment(b, "DD/MM/YYYY");
        return firstDate - seconDate;
    }); s

}