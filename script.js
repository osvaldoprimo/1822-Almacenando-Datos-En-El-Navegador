
import { addTask } from "./components/addTask.js";
import { displayTasks } from "./components/readTasks.js";
const btn = document.querySelector('[data-form-btn]'); //selecciona el botón y llama a una función cada vez que el usuario le da click (con lo de abajo)


//Arrow functions o funciones anonimas
btn.addEventListener('click', addTask);

displayTasks();
