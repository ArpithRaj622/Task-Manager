const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOpenBtn = document.querySelector("#mobileMenuOpenBtn");
const mobileMenuCloseBtn = document.querySelector("#mobileMenuCloseBtn");
const mobileMenuLinks = document.querySelectorAll(".mobile-nav-links a");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");

const body = document.body;

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