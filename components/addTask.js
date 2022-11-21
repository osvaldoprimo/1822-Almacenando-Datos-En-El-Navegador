import { uniqueDates } from '../services/date.js';
import {checkComplete} from './checkComplete.js';
import {deleteIcon} from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addTask = (evento) => {   //funcion addTask que va a recibir un evento y este evento es el que genera el formulario
    evento.preventDefault();
    
    const list = document.querySelector('[data-list]'); //después va a traernos la lista en la cual vamos a ir agregando las tareas
    const input = document.querySelector('[data-form-input]'); //en el input el usuario llena con la tarea que quiere hacer
    const calendar = document.querySelector("[data-form-date]"); //calendario en el que selecciona la fecha

    const value = input.value; //valor del input: aquí ya tenemos el texto que puso el usuario
    const date = calendar.value;  //fecha en un formato poco habitual a nuestro uso
    const dateFormat = moment(date).format("DD/MM/YYYY"); //aquí tenemos a moment (librería importada) que recibe como parámetro la fecha ingresada, y luego le damos el formato que queremos darle a esa fecha

    if(value == "" || date == ""){
        return;    //si una de estas dos condiciones se cumple, simplemente regresa y no se ejecuta el codigo de abajo: para que no me tire una actividad vacia 
    }

    input.value = '';  //limpiamos el input para que tenga un string vacío
    calendar.value = ""; // limpiamos el calendario para que tenga un string vacío

    const complete = false;

    const taskObj = {                 //esta constante es un objeto (lo hacemos para guardar info en el navegador) 
      value,            //en este objeto guardamos el value
      dateFormat,        //y el dateFormat
      complete,    //al inicio siempre es false, porque no está completada
      id: uuid.v4(), // aquí agregamos un identificador, que nos sirve para saber qué elemento marcar como completado o para eliminar
  };

list.innerHTML = "";
    

    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];  // taskList es igual a los cambios almacenados en el localStorage (se guardan todos los cambios en el navegador (y no solo el ultimo cambio) con la llave tasks)
    // lee la info almacenada, lo regresa en un formato JSON, y para que podamos usarla la pasamos por el JSON.parse (para que genere un bojeto de formato javascript). En caso 
    // de que nos regrese NULL, nos defina un arreglo vacío.
    taskList.push(taskObj);  //push es un método para arreglos. aquí a nuestro taskList le vamos a agregar nuestro taskObj
        /*sessionStorage.setItem("tasks", JSON.stringify(taskOjet));*/  //acá vinculo con el navegador para guardar la info. en este caso la info se pierde al cerrar la pestaña.
    localStorage.setItem("tasks", JSON.stringify(taskList));    //acá volvemos a agregar nuestro arreglo de tareas ya actualizado, pero con JSON.stringifi conviertiéndolo a un formato JSON (todo string).

    displayTasks();

    //const task = createTask(taskObj); // acá creamos una tarea task que va a recibir como parámetro el mismo objeto que creamos arriba (taskObj)
    //list.appendChild(task);          //agregamos esta tarea (task) a nuestra lista que estamos seleccionando con data atribute
  }
  
  
  
  export const createTask = ({value,dateFormat, complete, id}) => { // la constante createTask que va a recibir un objeto que tiene dentro la llave value y la llave dateFormat. También va a recibir los valores de complete y id.
    const task = document.createElement('li'); // aquí generamos un elemento del tipo "li", 
        task.classList.add('card'); //luego le agregamos una clase "card"
    
    const taskContent = document.createElement('div'); //aquí generamos un elemento del tipo "div"
   
    const check  = checkComplete(id);
    
    if(complete) {                // en caso de complete sea true, se le agrega las clases CSS de abajo (para tener la casilla azul)
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    };


    const titleTask = document.createElement('span'); //aquí generamos un elemento del tipo "span"
        titleTask.classList.add('task'); //a nuestro elemento span le agregamos la tarea "task"
        titleTask.innerText = value; // aquí a titleTask le agregamos el valor o texto que escribió el usuario
        taskContent.appendChild(check); //aquí le agregamos los hijos a taskContent que va a tener el checkbox de la tarea y el
        taskContent.appendChild(titleTask); // titulo de la tarea
    
    /*const dateElement = document.createElement("span"); //aquí creamos el elemento span
        dateElement.innerHTML = dateFormat; // al que se asignamos su innerHTML con la fecha que estamos recibiendo como parámetro en dateFormat*/
        // esto está comentado. Sirve para agregar al lado de cada actividad la fecha. Podría moficicarse para que mostrara también el horario de la actividad
        
        task.appendChild(taskContent); //aquí seguimos agregando hijos a padres
        /*task.appendChild(dateElement); //con esto aparece la fecha en nuestra página, al lado de la tarea*/ //al borrar la const dateElement, comento esto. Si uso esa const, debo "descomentar" esto
        task.appendChild(deleteIcon(id));
    return task; // por último regresamos la tarea
   
};