const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOpenBtn = document.querySelector("#mobileMenuOpenBtn");
const mobileMenuCloseBtn = document.querySelector("#mobileMenuCloseBtn");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav-links a");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");

const body = document.body;

const addTaskBtn = document.querySelector(".add-task button");
const addTaskModal = document.querySelector(".add-task-modal");
const closeTaskModalBtn = document.querySelector(".form-close-btn");
const taskModalCancelBtn = document.querySelector("#taskCancel");
const addTaskForm = document.querySelector(".add-task-modal form");
const formErrorMsg = document.querySelector(".form-error");

const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const category = document.querySelector("#category");
const priority = document.querySelector("#priority");
const dueDate = document.querySelector("#due-date");
const taskStatus = document.querySelector("#task-status");

const tasksContainer = document.querySelector(".tasks-container");

const taskDetailsModal = document.querySelector(".task-details-modal");
const taskDetailsCloseBtn = document.querySelector("#taskDetailsCloseBtn");

const taskDetailsTitle = document.querySelector(".task-details-modal .task-details .title");
const taskDetailsDescription = document.querySelector(".task-details-modal .task-details .description");
const taskDetailsCategory = document.querySelector(".task-details-modal .task-details .category");
const taskDetailsPriority = document.querySelector(".task-details-modal .task-details .priority");
const taskDetailsDueDate = document.querySelector(".task-details-modal .task-details .due-date");
const taskDetailsStatus = document.querySelector(".task-details-modal .task-details .status");

let clickedTaskDetails;
const editTaskBtn = document.querySelector("#editTaskBtn");
const deleteTaskBtn = document.querySelector("#deleteTaskBtn");

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

// summary card for clicking
// total tasks card
const totalTasksCard = document.querySelector("#totalTasksCard");
totalTasksCard.addEventListener("click", () => {
    window.location.href = "components/tasks.html";
});

// pending tasks card
const pendingTasksCard = document.querySelector("#pendingTasksCard");
pendingTasksCard.addEventListener("click", () => {
    window.location.href = "components/tasks.html";
});

// in-progress tasks card
const inProgressTasksCard = document.querySelector("#inProgressTasksCard");
inProgressTasksCard.addEventListener("click", () => {
    window.location.href = "components/tasks.html";
});

// completed tasks card
const completedTasksCard = document.querySelector("#completedTasksCard");
completedTasksCard.addEventListener("click", () => {
    window.location.href = "components/tasks.html";
});

// get data from local storage
const myTasksString = localStorage.getItem("myTasks");
const myTasks = JSON.parse(myTasksString);
const tasksArray = myTasks ? myTasks : [];

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

// open task form
function openTaskModal() {
    addTaskModal.classList.remove("hidden");
}

// close task form
function closeTaskModal() {
    addTaskModal.classList.add("hidden");
    formErrorMsg.classList.add("hidden");
}

// create task card
function createTaskCard(task) {
    // entire card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    // card title and status container
    const taskTitleStatus = document.createElement("div");
    taskTitleStatus.classList.add("card-title-status");

    // card title
    const cardTitle = document.createElement("p");
    cardTitle.classList.add("title");
    cardTitle.textContent = task.title;

    // card status
    const cardStatus = document.createElement("p");
    cardStatus.classList.add("status");
    if (task.taskStatus === "pending") {
        cardStatus.textContent = "Pending";
        cardStatus.classList.add("bg-red-600");

    } else if (task.taskStatus === "in-progress") {
        cardStatus.textContent = "In Progress";
        cardStatus.classList.add("bg-amber-400");

    } else if (task.taskStatus === "completed") {
        cardStatus.textContent = "Completed";
        cardStatus.classList.add("bg-green-600");
    }

    // due date
    const cardDueDate = document.createElement("p");
    cardDueDate.classList.add("due-date");
    const date = new Date(task.dueDate);
    cardDueDate.textContent = `Due: ${date.toLocaleDateString("en-US", {
        month : "short",
        day : "numeric",
        year : "numeric"
    })}`;

    // append
    taskTitleStatus.append(cardTitle, cardStatus);
    taskCard.append(taskTitleStatus, cardDueDate);

    // to open task details modal
    taskCard.addEventListener("click", () => {
        editTaskModal.classList.add("hidden");
        clickedTaskDetails = task;
        taskDetailsModal.classList.remove("hidden");
        taskDetailsTitle.textContent = task.title;
        taskDetailsDescription.textContent = task.description;
        taskDetailsCategory.textContent = `Category: ${task.category}`;
        taskDetailsPriority.textContent = `Priority: ${task.priority}`;
        taskDetailsDueDate.textContent = `Due: ${date.toLocaleDateString("en-US", {
            month : "short",
            day : "numeric",
            year : "numeric"
        })}`;
        if (task.taskStatus === "pending") {
            taskDetailsStatus.textContent = "Status: Pending";
        } else if (task.taskStatus === "in-progress") {
            taskDetailsStatus.textContent = "Status: In Progress";
        } else if (task.taskStatus === "completed") {
            taskDetailsStatus.textContent = "Status: Completed";
        }
         
    });

    return taskCard;
}

// render tasks
function renderTasks() {
    tasksContainer.innerHTML = "";
    const latestTasks = tasksArray.slice(-4).reverse();

    // create task cards
    latestTasks.forEach((task) => {
        const taskCard = createTaskCard(task);
        tasksContainer.append(taskCard);
    });
}

// render summary cards
function renderSummaryCards() {
    // total tasks
    const totalTasksCount = document.querySelector("#totalTasksCount");
    totalTasksCount.textContent = tasksArray.length;

    // pending tasks
    const pendingTasksCount = document.querySelector("#pendingTasksCount");
    const pendingTasks = tasksArray.filter((task) => {
        return task.taskStatus === "pending";
    });
    pendingTasksCount.textContent = pendingTasks.length;

    // in-progress tasks
    const inProgressTasksCount = document.querySelector("#inProgressTasksCount");
    const inProgressTasks = tasksArray.filter((task) => {
        return task.taskStatus === "in-progress";
    });
    inProgressTasksCount.textContent = inProgressTasks.length;

    const completedTasksCount = document.querySelector("#completedTasksCount");
    const completedTasks = tasksArray.filter((task) => {
        return task.taskStatus === "completed";
    });
    completedTasksCount.textContent = completedTasks.length;
}

renderTasks();
renderSummaryCards();

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

// open add task form
addTaskBtn.addEventListener("click", openTaskModal);

// close add task form
closeTaskModalBtn.addEventListener("click", closeTaskModal);

// add task form cancel button
taskModalCancelBtn.addEventListener("click", closeTaskModal);

// add task form submit button
addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (taskTitle.value.trim() === "" || taskDescription.value.trim() === "" || dueDate.value === "" ) {
        formErrorMsg.classList.remove("hidden");
        return;
    }
    formErrorMsg.classList.add("hidden");
    const taskDetails = {
        title : taskTitle.value,
        description : taskDescription.value,
        category : category.value,
        priority : priority.value,
        dueDate : dueDate.value,
        taskStatus : taskStatus.value
    }
    tasksArray.push(taskDetails);
    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("myTasks", tasksArrayString);
    addTaskForm.reset();

    closeTaskModal();
    renderTasks();
    renderSummaryCards();
});

// close task details modal
taskDetailsCloseBtn.addEventListener("click", () => {
    taskDetailsModal.classList.add("hidden");
});

// edit task button
editTaskBtn.addEventListener("click", () => {
    taskDetailsModal.classList.add("hidden");
    editTaskModal.classList.remove("hidden");

    editTitle.value = clickedTaskDetails.title;
    editDescription.value = clickedTaskDetails.description;
    editCategory.value = clickedTaskDetails.category;
    editPriority.value = clickedTaskDetails.priority;
    editDueDate.value = clickedTaskDetails.dueDate;
    editStatus.value = clickedTaskDetails.taskStatus;
});

// edit task form submit button
editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (editTitle.value.trim() === "" || editDescription.value.trim() === "" || editDueDate.value === "" ) {
        editTaskFormError.classList.remove("hidden");
        return;
    }
    editTaskFormError.classList.add("hidden");
    clickedTaskDetails.title = editTitle.value;
    clickedTaskDetails.description = editDescription.value;
    clickedTaskDetails.category = editCategory.value;
    clickedTaskDetails.priority = editPriority.value;
    clickedTaskDetails.dueDate = editDueDate.value;
    clickedTaskDetails.taskStatus = editStatus.value;

    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("myTasks", tasksArrayString);
    editTaskForm.reset();
    editTaskModal.classList.add("hidden");
    renderTasks();
    renderSummaryCards();
});

// close edit task modal
editModalCloseBtn.addEventListener("click", () => {
    editTaskModal.classList.add("hidden");
    taskDetailsModal.classList.remove("hidden");
});

// cancel edit task
cancelEditBtn.addEventListener("click", () => {
    editTaskModal.classList.add("hidden");
    taskDetailsModal.classList.remove("hidden");
});

// delete task
deleteTaskBtn.addEventListener("click", () => {
    tasksArray.splice(tasksArray.indexOf(clickedTaskDetails), 1);
    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("myTasks", tasksArrayString);
    taskDetailsModal.classList.add("hidden");
    renderTasks();
    renderSummaryCards();
});