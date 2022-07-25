const nuevaTask = document.querySelector("#newTask")
const btnAddTask = document.querySelector("#addTask")
const tbody = document.querySelector("tbody")
const completadas = document.querySelector("#doneTasks")
const pendientes = document.querySelector("#remainTasks")
const totalTasks = document.querySelector("#resumeTasks")
const mensaje = document.querySelector("#mensaje")
const tareas = []

function renderTasks(){
    let templateLists = ""

    for (let task of tareas){
        templateLists += `
        <tr>
            <td class="text-Detail-Table">${task.id} </td>
            <td>${task.name}</td>
            <td> <input type="checkbox" onclick ="cambiarestado(${task.id})" ${task.estado ? "checked" : ""}></td>
            <td><button onclick="borrar(${task.id})"> x </button></td>
        </tr>`;}
    tbody.innerHTML=templateLists;
    contarTareas();
}


btnAddTask.addEventListener('click', ()=>{
    const nameTask = nuevaTask.value;

    if (nameTask != ""){
        mensaje.innerHTML = "";
        tareas.push({ id: dinamicUUID(), name: nameTask });
        nuevaTask.value = "";
        renderTasks();
    }else{
        mensaje.innerHTML = "Favor ingresa una tarea";
    }
});

function borrar(id) {
    const index = tareas.findIndex((ele) => ele.id == id);
    tareas.splice(index, 1);
    renderTasks(tareas);
};

function cambiarestado(id){
    tareas.map((ele) => {if(ele.id == id) ele.estado = !ele.estado});
    renderTasks(tareas);
}

function contarTareas(){
    totalTasks.innerHTML = tareas.length;
    const completasTotal = tareas.filter((task) => task.estado === true);
    completadas.innerHTML =completasTotal.length;
    pendientes.innerHTML = tareas.length - completasTotal.length;
}

const dinamicUUID = (() => (id = 0, () => id++))();