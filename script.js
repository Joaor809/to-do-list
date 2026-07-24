const form = document.querySelector("form");
const listTasks = document.querySelector(".list-tasks");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const buttonAdd = document.querySelector(".button-add");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const titleTask = document.querySelector("#title").value;
    const descriptionTask = document.querySelector("#description").value;
    const task = {
        id: id,
        title: titleTask,
        description: descriptionTask
    };
    tasks.push(task)
    renderTasks();
    form.reset();
});

function renderTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Para não duplicar
    listTasks.innerHTML = "";
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");
        div.innerHTML = `
        <div class="task-header">
            <h4>${task.title}</h4>
            <button class="remove-task" onclick="removeTask(${task.id})"><i class="bi bi-trash"></i></button>
        </div>
        <p>${task.description}</p>
        `;
        listTasks.appendChild(div);
    });
}

// Relógio
const time = document.querySelector(".time");
function atualizarRelogio() {
    let hour = new Date();
    time.innerHTML = hour.toLocaleTimeString('pt-Br');
}
atualizarRelogio();
setInterval(atualizarRelogio, 1000);


function removeTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        renderTasks();
    }
}