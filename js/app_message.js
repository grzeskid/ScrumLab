const userName = document.querySelector(".app-message-form input");
const setUserName = document.querySelector(".app-message-form button");
const loginName = document.querySelector(".user-name");
const message = document.querySelector(".app-message");
const userIcon = document.querySelector(".fa-user-circle");

const allToHide = document.querySelector(".main-desktop");

hideWidgets();
checkingLocalStorage();

loginName.innerText = localStorage.getItem("loggedUser");

setUserName.addEventListener("click" , setName);
userIcon.addEventListener("click", newUserLogin)


function setName(event) {
    if(userName.value == "") {
        alert("Podaj swoje imię")
    }
    event.preventDefault();
    loginName.innerText = userName.value;
    localStorage.setItem("loggedUser", userName.value)
    checkingLocalStorage();
    hideWidgets();
}

function checkingLocalStorage() {
    if(localStorage.getItem("loggedUser") !== "") {
        message.style.display = "none";
    }
}

//funkcja czyszcząca localStorage
function newUserLogin(event) {
    console.log(localStorage)
    event.target = localStorage.setItem("loggedUser", "")
    message.style.display = "flex";
    loginName.innerText = localStorage.getItem("loggedUser");
    hideWidgets();
}

// funkcja chowająca widgety
function hideWidgets() {
    if(localStorage.getItem("loggedUser") === "") {
        allToHide.style.display = "none";
    }
    else {
        allToHide.style.display = "flex";
    }
}

