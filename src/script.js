// 
// Variables start
// 

// body
const body = document.body;

// theme toggle button
const themeToggleBtn = document.querySelector("#themeToggleBtn");
// theme toggle icon
const themeToggleIcon = document.querySelector("#themeToggleBtn i");

// profile container
const profileContainer = document.querySelector("#profileContainer");
// profile button
const profileBtn = document.querySelector("#profileBtn");
// profile dropdown
const profileDropdown = document.querySelector("#profileDropdown");

// background cover
const backgroundCover = document.querySelector("#backgroundCover");

// open mobile menu button
const openMobileMenuBtn = document.querySelector("#openMobileMenuBtn");
// close mobile menu button
const closeMobileMenuBtn = document.querySelector("#closeMobileMenuBtn");
// mobile menu
const mobileMenu = document.querySelector("#mobileMenu");

// open add task modal button
const addTaskBtn = document.querySelector("#addTaskBtn");
// close add task modal button
const addTaskModalCloseBtn = document.querySelector("#addTaskModalCloseBtn");
// task cancel Button
const taskCancelBtn = document.querySelector("#taskCancelBtn");
// task modal
const addTaskModal = document.querySelector("#addTaskModal");

// add task form
const addTaskForm = document.querySelector("#addTaskForm");

// add task input fields
// title
const addTaskTitle = document.querySelector("#addTaskTitle");
// description
const addTaskDescription = document.querySelector("#addTaskDescription");
// category
const addCategory = document.querySelector("#addCategory");
// priority
const addPriority = document.querySelector("#addPriority");
// due date
const addDueDate = document.querySelector("#addDueDate");
// task status
const addTaskStatus = document.querySelector("#addTaskStatus");
// add task form error
const addTaskFormError = document.querySelector("#addTaskFormError");

// task add success message
const addTaskSuccessMsg = document.querySelector("#addTaskSuccessMsg");


// tasks array
const tasksArrayString = localStorage.getItem("all-tasks");
const tasksArray = tasksArrayString === null? [] : JSON.parse(tasksArrayString);


// 
// Variables end
// 



// 
// Functions start
// 

// function - toggle theme 
function toggleTheme() {
    document.documentElement.classList.toggle("dark");
}

// function - update theme icon
function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
        themeToggleIcon.classList.remove("fa-moon");
        themeToggleIcon.classList.add("fa-sun");
    } else {
        themeToggleIcon.classList.add("fa-moon");
        themeToggleIcon.classList.remove("fa-sun");
    }
}

// function - open mobile menu
function openMobileMenu() {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.remove("opacity-0");
}
// function - close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.add("opacity-0");
}

// function - activate background cover
function activateBgCover() {
    backgroundCover.classList.remove("opacity-0");
    backgroundCover.classList.remove("pointer-events-none");
    body.classList.add("overflow-hidden");
}
// function - deactivate background cover
function deactivateBgCover() {
    backgroundCover.classList.add("opacity-0");
    backgroundCover.classList.add("pointer-events-none");
    body.classList.remove("overflow-hidden");
}

// function - open add task modal
function openAddTaskModal() {
    addTaskModal.classList.remove("-translate-y-full");
    addTaskModal.classList.remove("opacity-0");
    activateBgCover();
}
// function - close add task modal
function closeAddTaskModal() {
    addTaskModal.classList.add("-translate-y-full");
    addTaskModal.classList.add("opacity-0");
    deactivateBgCover();
}
// function - show add task success message
function taskAddSuccess() {
    addTaskSuccessMsg.classList.remove("opacity-0");
    setTimeout(() => {
        addTaskSuccessMsg.classList.add("opacity-0");
    }, 3000);
} 

// 
// Functions end
// 



// 
// Event Listeners start
// 

// event listener - background cover click
backgroundCover.addEventListener("click", () => {
    deactivateBgCover();
    closeMobileMenu();
    closeAddTaskModal();
});

// event listener - theme toggle
themeToggleBtn.addEventListener("click", () => {
    toggleTheme();
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark? "dark" : "light");
    updateThemeIcon();
});

// event listener - profile icon click
profileBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("opacity-0");
    profileDropdown.classList.toggle("pointer-events-none");
});
// event listener - close profile dropdown if click outside
document.addEventListener("click", (event) => {
    if (profileContainer.contains(event.target) === false) {
        profileDropdown.classList.add("opacity-0");
    }
});

// event listener - open mobile menu
openMobileMenuBtn.addEventListener("click", () => {
    openMobileMenu();
    activateBgCover();
});
// event listener - close mobile menu
closeMobileMenuBtn.addEventListener("click", () => {
    closeMobileMenu();
    deactivateBgCover();
});

// event listener - open add task modal
addTaskBtn.addEventListener("click", openAddTaskModal);
// event listener - close add task modal
addTaskModalCloseBtn.addEventListener("click", closeAddTaskModal);
// event listener - cancel add task
taskCancelBtn.addEventListener("click", closeAddTaskModal);

// event listener - add task form submit
addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // input values
    const taskTitle = addTaskTitle.value.trim();
    const taskDescription = addTaskDescription.value.trim();
    const taskCategory = addCategory.value;
    const taskPriority = addPriority.value;
    const taskDueDate = addDueDate.value;
    const taskStatus = addTaskStatus.value;

    if (taskTitle === "" || taskDueDate === "") {
        addTaskFormError.classList.remove("hidden");
        return;
    }
    
    const task = {
        title : taskTitle,
        description : taskDescription,
        category : taskCategory,
        priority : taskPriority,
        dueDate : taskDueDate,
        status : taskStatus
    };

    tasksArray.push(task);
    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("all-tasks", tasksArrayString);

    addTaskForm.reset();

    closeAddTaskModal();
    taskAddSuccess();
});

// 
// Event Listeners end
// 




// render theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}
updateThemeIcon();

console.log(tasksArray);