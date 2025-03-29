document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = function () {
        toggleComplete(this);
}

let button = document.createElement("button");
    button.textContent = "✅";
    button.onclick = function () {
        removeTask(this);
    };

    li.appendChild(span);
    li.appendChild(button);
    taskList.appendChild(li);
    
    saveTasks();
    taskInput.value = "";
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.innerText.replace("✅"), completed: li.querySelector("span").classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = task.text;
        span.className = task.completed ? "completed" : "";
        span.onclick = function () {
            toggleComplete(this);
        };

        let button = document.createElement("button");
        button.textContent = "✅";
        button.onclick = function () {
            removeTask(this);
        };

        li.appendChild(span);
        li.appendChild(button);
        taskList.appendChild(li);
    });
}
