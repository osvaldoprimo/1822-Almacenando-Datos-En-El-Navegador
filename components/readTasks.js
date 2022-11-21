import { createTask } from "./addTask.js"; //importamos la función de createTask
import { uniqueDates, orderDate } from "../services/date.js";
import dateElement from "./dateElement.js";

export const displayTasks = () =>{  
    const list = document.querySelector("[data-list]");  //aquí seleccionamos la lista a la que vamos a querer agregar nuestras tareas ya almacenadas

    
    const taskList = JSON.parse(localStorage.getItem("tasks")) || []; //aquí tomamos la info ya almacenada en nuestro localStorage
    const dates = uniqueDates(taskList);

    orderDate(dates);
    

    dates.forEach (date => {
        const dateMoment = moment(date, "DD/MM/YYYY");
        list.appendChild(dateElement(date));
        taskList.forEach((task) => {  //con forEach vamos a recorrer este arreglo (hay otros métodos para poder hacerlo)
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
            const diff = dateMoment.diff(taskDate); //con diff establecemos diferencias; es decir, decimos que queremos establecer diferencias entre dateMoment y taskDate
            if ( diff == 0){
                list.appendChild(createTask(task));//recibimos como parámetro de nuestra arrowFunction la tarea, cada tarea o cada uno de los elementos que existen dentro de nuestro arreglo
                                                    //le vamos a mandar esa tarea que tiene un formato de objeto, que tiene tanto la llave value como dateFormat, y lo mandamos a nuestra función createTask que nos va
                                                    // a regresar toda la estructura html con clases, todo ya definido, para luego irlo agregando a nuestra lista (list) 
             }
             
        });   
            

    });
}