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

// tasks card container
const tasksContainer = document.querySelector("#tasksContainer");

// task details
// task details modal 
const taskDetailsModal = document.querySelector(".task-details-modal");
// task details title
const taskDetailsTitle = document.querySelector("#taskDetailsTitle");
// task details description
const taskDetailsDescription = document.querySelector("#taskDetailsDescription");
// task details category
const taskDetailsCategory = document.querySelector("#taskDetailsCategory");
// task details priority
const taskDetailsPriority = document.querySelector("#taskDetailsPriority");
// tasks details due date
const taskDetailsDueDate = document.querySelector("#taskDetailsDueDate");
// task details status
const taskDetailsStatus = document.querySelector("#taskDetailsStatus");
// buttons inside task details modal
// edit task button
const editTaskBtn = document.querySelector("#editTaskBtn");
// delete task button
const deleteTaskBtn = document.querySelector("#deleteTaskBtn");
// close task details modal button
const taskDetailsCloseBtn = document.querySelector("#taskDetailsCloseBtn");
// task completed checkbox
const taskCompletedCheckbox = document.querySelector("#taskCompletedCheckbox");

// selected task when clicked
let selectedTask = null;

// edit task modal
const editTaskModal = document.querySelector("#editTaskModal");
// edit task modal close button
const editTaskCloseBtn = document.querySelector("#editTaskCloseBtn");
// edit task form
const editTaskForm = document.querySelector("#editTaskForm");
// edit task title
const editTaskTitle = document.querySelector("#editTaskTitle");
// edit task description
const editTaskDescription = document.querySelector("#editTaskDescription");
// edit category
const editCategory = document.querySelector("#editCategory");
// edit priority
const editPriority = document.querySelector("#editPriority");
// edit due date
const editDueDate = document.querySelector("#editDueDate");
// edit task status
const editTaskStatus = document.querySelector("#editTaskStatus");

// edit task save button
const editSaveBtn = document.querySelector("#editSaveBtn");
// edit task cancel button
const editCancelBtn = document.querySelector("#editCancelBtn");
// edit task form error
const editTaskFormError = document.querySelector("#editTaskFormError");
// edit successfull message
const editTaskSuccessMsg = document.querySelector("#editTaskSuccessMsg");


// delete task confimation modal
const confirmDeleteTaskModal = document.querySelector("#confirmDeleteTaskModal");
// confirm delete button
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
// cancel Confirm Delete Button
const cancelConfirmDeleteBtn = document.querySelector("#cancelConfirmDeleteBtn");
// task delete success message
const deleteTaskSuccessMsg = document.querySelector("#deleteTaskSuccessMsg");

// url search params for tasks filter
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get("status") || "all";

// filter buttons
// all tasks btn
const allTasksFilterBtn = document.querySelector("#allTasksFilterBtn");
// pending tasks btn
const pendingTasksFilterBtn = document.querySelector("#pendingTasksFilterBtn");
// in-progress tasks btn
const inProgressTasksFilterBtn = document.querySelector("#inProgressTasksFilterBtn");
// completed tasks btn
const completedTasksFilterBtn = document.querySelector("#completedTasksFilterBtn");

// no tasks found
const noTasksFound = document.querySelector("#noTasksFound");


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

// function - create task card
function createTaskCard(task) {
    // task card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    // task card title & status container
    const cardTitleStatus = document.createElement("div");
    cardTitleStatus.classList.add("card-title-status");

    // task card title
    const cardTitle = document.createElement("p");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = task.title;

    // task card status
    const cardStatus = document.createElement("p");
    cardStatus.classList.add("card-status");
    if (task.status === "pending") {
        cardStatus.textContent = "Pending";
        cardStatus.classList.add("bg-red-500");
    } else if (task.status === "in-progress") {
        cardStatus.textContent = "In Progress";
        cardStatus.classList.add("bg-amber-500");
    } else if (task.status === "completed") {
        cardStatus.textContent = "Completed";
        cardStatus.classList.add("bg-green-600");
    } 

    // task due
    const cardDueDate = document.createElement("p");
    cardDueDate.classList.add("card-due-date");
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
        month : "short",
        day : "numeric",
        year : "numeric"
    });
    cardDueDate.textContent = formattedDueDate;

    // cardTitle & cardStatus append into cardTitleStatus
    cardTitleStatus.append(cardTitle, cardStatus);

    // cardTitleStatus & cardDueDate append into taskCard
    taskCard.append(cardTitleStatus, cardDueDate);

    // taskCard append into tasksContainer
    tasksContainer.append(taskCard);

    // event listener - click to open task details modal
    taskCard.addEventListener("click", () => {
        showTaskDetails(task, formattedDueDate);
    });
}

// task details modal
// function - open task details modal
function showTaskDetails(task, dueDate) {
    taskDetailsTitle.textContent = task.title;
    taskDetailsDescription.textContent = task.description;
    taskDetailsCategory.textContent = `Category : ${task.category}`;
    taskDetailsPriority.textContent = `Priority : ${task.priority}`;
    taskDetailsDueDate.textContent = `Due date : ${dueDate}`;
    taskDetailsStatus.textContent = `Status : ${task.status}`;

    taskDetailsModal.classList.remove("opacity-0");
    taskDetailsModal.classList.remove("pointer-events-none");
    activateBgCover();

    if (task.status === "completed") {
        taskCompletedCheckbox.checked = true;
    } else if (task.status === "pending") {
        taskCompletedCheckbox.checked = false;
    } else if (task.status === "in-progress") {
        taskCompletedCheckbox.checked = false;
    }

    selectedTask = task;
}
// function - close task details modal
function closeTaskDetails() {
    taskDetailsModal.classList.add("opacity-0");
    taskDetailsModal.classList.add("pointer-events-none");
    deactivateBgCover();
}

// edit task modal
// function - open edit task modal
function openEditTaskModal() {
    closeTaskDetails();
    activateBgCover();
    editTaskModal.classList.remove("-translate-y-full");
    editTaskModal.classList.remove("opacity-0");
}
// function - close edit task modal
function closeEditTaskModal() {
    deactivateBgCover();
    editTaskModal.classList.add("-translate-y-full");
    editTaskModal.classList.add("opacity-0");
}
// function - task edit success message
function taskEditSuccess() {
    editTaskSuccessMsg.classList.remove("opacity-0");
    setTimeout(() => {
        editTaskSuccessMsg.classList.add("opacity-0");
    }, 3000);
}

// delete confirmation modal
// function - open delete confirmation modal
function openDeleteConfirm() {
    closeTaskDetails();
    activateBgCover();
    confirmDeleteTaskModal.classList.remove("opacity-0");
    confirmDeleteTaskModal.classList.remove("pointer-events-none");
}
// function - close delete confirmation modal
function closeDeleteConfirm() {
    deactivateBgCover();
    confirmDeleteTaskModal.classList.add("opacity-0");
    confirmDeleteTaskModal.classList.add("pointer-events-none");
}
// function - show delete task success message
function taskDeleteSuccess() {
    deleteTaskSuccessMsg.classList.remove("opacity-0");
    setTimeout(() => {
        deleteTaskSuccessMsg.classList.add("opacity-0");
    }, 3000);
}

// function - check if task are empty
function checkIfTasksEmpty(tasksArray) {
    if (tasksArray.length === 0) {
        noTasksFound.classList.remove("hidden");
    } else {
        noTasksFound.classList.add("hidden");
    }
}

// function - display 3 latest task cards
function displayTaskCards() {
    tasksContainer.innerHTML = "";
    // the latest appear at top
    // all tasks
    if (status === "all") {
        const allTasks = tasksArray.slice();
        allTasks.reverse().forEach((task) => {
            createTaskCard(task);
        });
        checkIfTasksEmpty(allTasks);  
    }
    // pending tasks 
    else if (status === "pending") {
        const pendingTasks = tasksArray.filter((task) => {
            return task.status === "pending";
        });
        pendingTasks.reverse().forEach((task) => {
           createTaskCard(task); 
        });
        checkIfTasksEmpty(pendingTasks);
    }
    // in-progress tasks
    else if (status === "in-progress") {
        const inProgressTasks = tasksArray.filter((task) => {
            return task.status === "in-progress";
        });
        inProgressTasks.reverse().forEach((task) => {
            createTaskCard(task);
        });
        checkIfTasksEmpty(inProgressTasks);
    }
    // completed tasks
    else if (status === "completed") {
        const completedTasks = tasksArray.filter((task) => {
            return task.status === "completed";
        });
        completedTasks.reverse().forEach((task) => {
            createTaskCard(task);
        });
        checkIfTasksEmpty(completedTasks);
    }  
}

// function - active filter
function setActiveFilter() {
    if (status === "all") {
        allTasksFilterBtn.classList.add("active");
    } else if (status === "pending") {
        pendingTasksFilterBtn.classList.add("active");
    } else if (status === "in-progress") {
        inProgressTasksFilterBtn.classList.add("active");
    } else if (status === "completed") {
        completedTasksFilterBtn.classList.add("active");
    }
}

function render() {
    displayTaskCards();
    setActiveFilter();
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
    closeTaskDetails();
    closeEditTaskModal();
    closeDeleteConfirm();
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
        profileDropdown.classList.add("pointer-events-none");
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

// filter buttons
// event listener - switch filter
allTasksFilterBtn.addEventListener("click", () => {
    window.location.href = "./tasks.html?status=all";
});
// event listener - switch filter
pendingTasksFilterBtn.addEventListener("click", () => {
    window.location.href = "./tasks.html?status=pending";
});
// event listener - switch filter
inProgressTasksFilterBtn.addEventListener("click", () => {
    window.location.href = "./tasks.html?status=in-progress";
});
// event listener - switch filter
completedTasksFilterBtn.addEventListener("click", () => {
    window.location.href = "./tasks.html?status=completed";
});

// task details modal
// event listener - close task details modal
taskDetailsCloseBtn.addEventListener("click", closeTaskDetails);

// event listener - click task completed
taskCompletedCheckbox.addEventListener("change", () => {
    if (taskCompletedCheckbox.checked === true) {
        selectedTask.status = "completed";
        taskDetailsStatus.textContent = `Status : ${selectedTask.status}`;

        const tasksArrayString = JSON.stringify(tasksArray);
        localStorage.setItem("all-tasks", tasksArrayString);
        render();
    } else {
        selectedTask.status = selectedTask.previousStatus;
        taskDetailsStatus.textContent = `Status : ${selectedTask.status}`;

        const tasksArrayString = JSON.stringify(tasksArray);
        localStorage.setItem("all-tasks", tasksArrayString);
        render();
    }
});

// edit task modal
// event listener - edit task button
editTaskBtn.addEventListener("click", () => {
    openEditTaskModal();

    editTaskTitle.value = selectedTask.title;
    editTaskDescription.value = selectedTask.description;
    editCategory.value = selectedTask.category;
    editPriority.value = selectedTask.priority;
    editDueDate.value = selectedTask.dueDate;
    editTaskStatus.value = selectedTask.status;
});
// event listener - edit task form submit button
editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // input values
    const taskTitle = editTaskTitle.value.trim();
    const taskDescription = editTaskDescription.value.trim();
    const taskCategory = editCategory.value;
    const taskPriority = editPriority.value;
    const taskDueDate = editDueDate.value;
    const taskStatus = editTaskStatus.value;

    if (taskTitle === "" || taskDueDate === "") {
        editTaskFormError.classList.remove("hidden");
        return;
    }
    
    const editedTask = {
        title : taskTitle,
        description : taskDescription,
        category : taskCategory,
        priority : taskPriority,
        dueDate : taskDueDate,
        status : taskStatus,
        previousStatus : taskStatus
    };

    tasksArray.splice(tasksArray.indexOf(selectedTask), 1, editedTask);
    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("all-tasks", tasksArrayString);

    editTaskForm.reset();

    closeEditTaskModal();
    taskEditSuccess();
    render();
});
// event listener - cancel edit task modal
editCancelBtn.addEventListener("click", closeEditTaskModal);
// event-listener - close edit task modal
editTaskCloseBtn.addEventListener("click", closeEditTaskModal);

// delete task
// event listener - delete task button
deleteTaskBtn.addEventListener("click", openDeleteConfirm);
// event listener - confirm delete
confirmDeleteBtn.addEventListener("click", () => {
    tasksArray.splice(tasksArray.indexOf(selectedTask), 1);

    const tasksArrayString = JSON.stringify(tasksArray);
    localStorage.setItem("all-tasks", tasksArrayString);
    closeDeleteConfirm();
    taskDeleteSuccess();
    render();
});
// event listener - cancel confirm delete
cancelConfirmDeleteBtn.addEventListener("click", closeDeleteConfirm);

// 
// Event Listeners end
//


const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}

updateThemeIcon();
render();