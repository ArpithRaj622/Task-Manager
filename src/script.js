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

const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const category = document.querySelector("#category");
const priority = document.querySelector("#priority");
const dueDate = document.querySelector("#due-date");
const taskStatus = document.querySelector("#task-status");

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

function openTaskModal() {
    addTaskModal.classList.remove("hidden");
}

function closeTaskModal() {
    addTaskModal.classList.add("hidden");
}

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
        return;
    }
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
});