import { displayTasks } from "./readTasks.js";

export const deleteIcon = (id) => {      //volvemos a recibir el identificador id
  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  i.addEventListener('click', () => deleteTask(id));  //volvemos a modificar la función addevenlistener
  return i;
};

const deleteTask = (id) => { //obtenemos el identificador
  const li = document.querySelector("[data-list]"); //aquí volvemos a seleccionar las listas, que es el elemento padre de todas las tareas
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex((item) => item.id == id);  //obtenemos el index
  tasks.splice(index,1); //splice es un metodo de js para borrar o agregar elementos. En este caso nos sirve para eliminarlo del arreglo
  li.innerHTML = ""; //aquí le decimos que elimine todo el contenido que tiene la lista
  localStorage.setItem("tasks", JSON.stringify(tasks)); //ahora volvemos a actualizar el localStorage (una vez ejecutado el splice)
  displayTasks(); //y aquí volvemos a llamar la función displayTasks (se llama en cada evento que existe en nuestra plataforma)
};

export default deleteIcon;
