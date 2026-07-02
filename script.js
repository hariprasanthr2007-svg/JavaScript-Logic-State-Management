const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            filter === "active" && task.completed ||
            filter === "completed" && !task.completed
        ) {
            return;
        }

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="complete" data-index="${index}">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add Task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks(currentFilter);
    taskInput.value = "";
});

// Event Delegation
taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("delete")) {
        tasks.splice(index, 1);
    }

    if (e.target.classList.contains("complete")) {
        tasks[index].completed = !tasks[index].completed;
    }

    if (e.target.classList.contains("edit")) {
        const newText = prompt("Edit Task", tasks[index].text);

        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
        }
    }

    saveTasks();
    displayTasks(currentFilter);
});

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        displayTasks(currentFilter);
    });
});

// Initial Load
displayTasks();
