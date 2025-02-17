document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Eveniment pentru adăugarea unui task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Șterge</button>
    `;
    
    taskItem.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    taskItem.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        taskItem.remove();
        saveTasks();
    });

    taskList.appendChild(taskItem);
    taskInput.value = "";

    saveTasks();
}

// Salvare în localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Încărcare task-uri salvate
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskData => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskData.text}</span>
            <button class="delete-btn">Șterge</button>
        `;

        if (taskData.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        taskItem.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
    });
}
