export const checkComplete = (id) => {  //aquí checkcomplete recibe el identificador id
  const i = document.createElement('i');
  i.classList.add('far', 'fa-check-square', 'icon');
  i.addEventListener('click', (event) => completeTask(event, id));
  return i;
};
// Immediately invoked function expression IIFE
const completeTask = (event, id) => {
  const element = event.target;
  element.classList.toggle('fas');
  element.classList.toggle('completeIcon');
  element.classList.toggle('far');
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex( item => item.id == id)  //findIndex se usa para saber la posicion dentro del arreglo
  tasks[index]["complete"] = !tasks[index]["complete"]; //accedemos a la propiedad complete, y la negamos (!), para convertirlo en true (o vicebersa)
  localStorage.setItem("tasks", JSON.stringify(tasks)); //después de modificarlo, lo almacenamos de nuevo en el local storage, ya actualizado
};

export default checkComplete;
