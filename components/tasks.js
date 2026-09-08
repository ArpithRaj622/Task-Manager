const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOpenBtn = document.querySelector("#mobileMenuOpenBtn");
const mobileMenuCloseBtn = document.querySelector("#mobileMenuCloseBtn");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav-links a");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");

// task container variable
const tasksContainer = document.querySelector(".tasks-container-inTasksPage");

const body = document.body;

// clicke edit button
let selectedTask;

// cariables of edit task modal
const editTaskModal = document.querySelector(".edit-task-modal");
const editTaskForm = document.querySelector(".edit-task-modal form");
const editTitle = document.querySelector("#edit-task-title");
const editDescription = document.querySelector("#edit-task-description");
const editCategory = document.querySelector("#edit-category");
const editPriority = document.querySelector("#edit-priority");
const editDueDate = document.querySelector("#edit-due-date");
const editStatus = document.querySelector("#edit-task-status");
const editModalCloseBtn = document.querySelector(".edit-task-modal .header .form-close-btn");
const saveEditBtn = document.querySelector("#editSave");
const cancelEditBtn = document.querySelector("#editCancel");
const editTaskFormError = document.querySelector(".edit-form-error");

// get data from local storage
const myTasksString = localStorage.getItem("myTasks");
const myTasks = JSON.parse(myTasksString);
const tasksArray = myTasks ? myTasks : [];



// functions
// mobile menu open function
function openMobileMenu() {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenuBackdrop.classList.remove("opacity-0");
    mobileMenuBackdrop.classList.remove("pointer-events-none");
    body.classList.add("overflow-hidden");
}

// mobile menu close function
function closeMobileMenu() {
    mobileMenu.classList.add("translate-x-full");
    mobileMenuBackdrop.classList.add("opacity-0");
    mobileMenuBackdrop.classList.add("pointer-events-none");
    body.classList.remove("overflow-hidden");
}

// create task card function
function createTaskCard(task) {
    // card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card-inTasksPage");

    // details inside card
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details-inTasksPage");

    // content inside task details
    
    // task title
    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title-inTasksPage");
    taskTitle.textContent = task.title;

    // task description
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description-inTasksPage");
    taskDescription.textContent = task.description;

    // task category
    const taskCategory = document.createElement("p");
    taskCategory.classList.add("task-category-inTasksPage");
    taskCategory.textContent = `Category: ${task.category}`;

    // task priority
    const taskPriority = document.createElement("p");
    taskPriority.classList.add("task-priority-inTasksPage");
    taskPriority.textContent = `Priority: ${task.priority}`;

    // task due date
    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("task-due-date-inTasksPage");
    const date = new Date(task.dueDate);
    taskDueDate.textContent = `Due: ${date.toLocaleDateString("en-US", {
        month : "short",
        day : "numeric",
        year : "numeric"
    })}`;

    // task status
    const taskStatus = document.createElement("p");
    taskStatus.classList.add("task-status-inTasksPage");
    if (task.taskStatus === "pending") {
        taskStatus.textContent = "Pending";
        taskStatus.classList.add("bg-red-600");
    } else if (task.taskStatus === "in-progress") {
        taskStatus.textContent = "In Progress";
        taskStatus.classList.add("bg-amber-400"); 
    } else if (task.taskStatus === "completed") {
        taskStatus.textContent = "Completed";
        taskStatus.classList.add("bg-green-600");
    }

    taskDetails.append(taskTitle, taskDescription, taskCategory, taskPriority, taskDueDate, taskStatus);
    // task details, ends here

    // buttons container inside card
    const taskCardButtons = document.createElement("div");
    taskCardButtons.classList.add("task-btns-inTasksPage");

    // edit button
    const editTaskBtn = document.createElement("button");
    editTaskBtn.id = "editTask-inTasksPage";
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editTaskBtn.append(editIcon, "Edit");

    // delete button
    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.id = "deleteTask-inTasksPage";
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteTaskBtn.append(deleteIcon, "Delete");

    // append to button container
    taskCardButtons.append(editTaskBtn, deleteTaskBtn);

    // append details conatiner and buttons container into card
    taskCard.append(taskDetails, taskCardButtons);

    // edit button event listener
    editTaskBtn.addEventListener("click", () => {
        editTaskModal.classList.remove("hidden");
        selectedTask = task;
        editTitle.value = task.title;
        editDescription.value = task.description;
        editCategory.value = task.category;
        editPriority.value = task.priority;
        editDueDate.value = task.dueDate;
        editStatus.value = task.taskStatus;
    });

    // delete button event listener
    deleteTaskBtn.addEventListener("click", () => {
        tasksArray.splice(tasksArray.indexOf(task), 1);
        const tasksArrayString = JSON.stringify(tasksArray);
        localStorage.setItem("myTasks", tasksArrayString);
        renderTasks();
    });

    return taskCard;
}

// render tasks function
function renderTasks() {
    tasksContainer.innerHTML = "";
    tasksArray.slice().reverse().forEach((task) => {
        const card = createTaskCard(task);
        tasksContainer.append(card);
    });
}

// functions end here


// event listeners
// mobile menu open event listner
mobileMenuOpenBtn.addEventListener("click", openMobileMenu);

// mobile menu close event listner
mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);

// mobile menu links iteration
mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

// backdrop click close mobile menu
mobileMenuBackdrop.addEventListener("click", closeMobileMenu);


// edit task form submit button
editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (editTitle.value.trim() === "" || editDescription.value.trim() === "" || editDueDate.value === "" ) {
        editTaskFormError.classList.remove("hidden");
        return;
    }
    editTaskFormError.classList.add("hidden");
    
    selectedTask.title = editTitle.value;
    selectedTask.description = editDescription.value;
    selectedTask.category = editCategory.value;
    selectedTask.priority = editPriority.value;
    selectedTask.dueDate = editDueDate.value;
    selectedTask.taskStatus = editStatus.value;

    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("myTasks", tasksArrayString);
    editTaskForm.reset();
    editTaskModal.classList.add("hidden");
    renderTasks();
});

// edit modal close button event listener
editModalCloseBtn.addEventListener("click", () => {
    editTaskModal.classList.add("hidden");
});

// edit modal cancel button event listener
cancelEditBtn.addEventListener("click", () => {
    editTaskModal.classList.add("hidden");
});

// event listeners end here


// call card render function
renderTasks();