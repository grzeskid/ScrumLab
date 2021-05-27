import {getObjectArrayFromLocalStorage, setObjectArrayToLocalStorage} from "./localStorageHelper.js";

const loginName = document.querySelector(".user-name");
loginName.innerText = localStorage.getItem("loggedUser");

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function displayNewSchedule() {
        if(window.location.search === "?open=true") {
            document.querySelector(".plan-list").classList.add("d-none")
            document.querySelector(".newPlan").classList.remove("d-none")
            return
        }
    }
    displayNewSchedule()

    const selectInputs = document.getElementsByTagName("select");
    const recipes = getObjectArrayFromLocalStorage("recipArray")
    const weeks = document.querySelector("#weeks");

    weeks.addEventListener("change", function () {
        if (weeks.value > 52 || weeks.length > 2) {
            alert("Liczba tygodni nie może być większa od 52");
            weeks.value = "";
        }
        return
    });

    const addNewPlanButton = document.querySelector(".plan-list-button");
    addNewPlanButton.addEventListener("click", function () {
        document.querySelector(".plan-list").classList.add("d-none")
        document.querySelector(".newPlan").classList.remove("d-none")
    })

    const planTitle = document.querySelector("#planName");
    const planDescription = document.querySelector("#planDescription");
    const weeksNumber = document.querySelector("#weeks");


    const mondayPlan = document.querySelector(".newPlan-table").querySelectorAll(".monday")
    const tuesdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".tuesday")
    const wednesdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".wednesday")
    const thursdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".thursday")
    const fridayPlan = document.querySelector(".newPlan-table").querySelectorAll(".friday")
    const saturdayPlan = document.querySelector(".newPlan-table").querySelectorAll(".saturday")
    const sundayPlan = document.querySelector(".newPlan-table").querySelectorAll(".sunday")

    const planTableAdd = document.querySelector(".plan-table");
    

    function Schedule(id, weekNumber, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.weekNumber = weekNumber;
        this.monday = [];
        this.tuesday = [];
        this.wednesday = [];
        this.thursday = [];
        this.friday = [];
        this.saturday = [];
        this.sunday = [];
    }

    Schedule.prototype.saveToLocalStorage = function (el) {
        const addingPlan = JSON.parse(localStorage.allPlans);
        console.log(addingPlan);
        addingPlan.push(el);
        console.log(addingPlan);
        localStorage.setItem("allPlans", JSON.stringify(addingPlan))
        this.printOnList(el);
    }

    Schedule.prototype.printOnList = function (el) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${el.id}.</td><td>${el.title}</td><td>${el.description}</td><td>${el.weekNumber}</td><td><i class="fas fa-pencil-alt iconEdit-plan"><i class="far fa-trash-alt iconTrash-plan"></td>`;
        planTableAdd.appendChild(newRow);

    }

    window.addEventListener("load", (event) => {
        const planDone = localStorage.getItem("newPlanDone")
        if (planDone) {
            document.querySelector(".succes-widget").classList.remove("d-none");
            localStorage.removeItem("newPlanDone")
        }
        const planEdited = localStorage.getItem("newPlanEdited")
        if (planEdited) {
            document.querySelector(".succes-widget-edit").classList.remove("d-none");
            localStorage.removeItem("newPlanEdited")
        }
        
        if (!localStorage.allPlans) {
            localStorage.setItem("allPlans", JSON.stringify([]))
        }

// LOADING OPTIONS
        const recipeNameArray = []
        // console.log(recipes)
            recipes.forEach(el=> {
            recipeNameArray.push(el.name)
        })

        const selectArray = Array.from(selectInputs)
        selectArray.forEach((el) => {
            let option;
                for (let i=0; i<recipeNameArray.length; i++){
                option = document.createElement("option")
                option.innerHTML = `<option value="">${recipeNameArray[i]}</option>`
                el.appendChild(option)
            }
        })
        

        const planListFromLocal = JSON.parse(localStorage.allPlans);
        planListFromLocal.forEach((el, i) => {
            let newRow = document.createElement("tr");
            newRow.innerHTML = `<td>${[i + 1]}.</td><td>${el.title}</td><td>${el.description}</td><td>${el.weekNumber}</td><td><i class="fas fa-pencil-alt iconEdit-plan"><i class="far fa-trash-alt iconTrash-plan"></td>`;
            planTableAdd.appendChild(newRow);
        })

        const editPlanIcons = document.querySelectorAll(".iconEdit-plan");
        editPlanIcons.forEach((el, i) => {
            el.addEventListener("click", (event) => {
                const row = event.target.parentElement.parentElement;
                document.querySelector("#edit-name").addEventListener("change", () => {
                    // console.log("dupa zbita")
                });
                document.querySelector("#edit-name").value = row.children[1].innerText;
                document.querySelector("#plan-description").value = row.children[2].innerText;
                document.querySelector("#edit-weeks").value = row.children[3].innerText;

                document.querySelector(".plan-list").classList.add("d-none")
                document.querySelector(".edit-plan").classList.remove("d-none")

                const localPlans = JSON.parse(localStorage.allPlans);
                localPlans.forEach((el, i) => {
                    if (document.querySelector("#edit-name").value === el.title) {
                        const edit = i
                        localStorage.setItem("editingNow", edit)
                    }
                })

// SELECTY z local storage
                const localData = JSON.parse(localStorage.allPlans)
                const editingNow = localStorage.getItem("editingNow")
            
                const editMondays = document.querySelector(".cloneTable").querySelectorAll(".monday");
                const editTuesdays = document.querySelector(".cloneTable").querySelectorAll(".tuesday");
                const editWednesdays = document.querySelector(".cloneTable").querySelectorAll(".wednesday");
                const editThursdays = document.querySelector(".cloneTable").querySelectorAll(".thursday");
                const editFridays = document.querySelector(".cloneTable").querySelectorAll(".friday");
                const editSaturdays = document.querySelector(".cloneTable").querySelectorAll(".saturday");
                const editSundays = document.querySelector(".cloneTable").querySelectorAll(".sunday");

                editMondays.forEach((el,i)=>{el.value = localData[editingNow].monday[i]})
                editTuesdays.forEach((el,i)=>{el.value = localData[editingNow].tuesday[i]})
                editWednesdays.forEach((el,i)=>{el.value = localData[editingNow].wednesday[i]})
                editThursdays.forEach((el,i)=>{el.value = localData[editingNow].thursday[i]})
                editFridays.forEach((el,i)=>{el.value = localData[editingNow].friday[i]})
                editSaturdays.forEach((el,i)=>{el.value = localData[editingNow].saturday[i]})
                editSundays.forEach((el,i)=>{el.value = localData[editingNow].sunday[i]})

            })
        })


        const trashPlan = document.querySelectorAll(".iconTrash-plan");
        trashPlan.forEach((el, i) => {
            el.addEventListener("click", (event) => {
                const toDelete = event.target.parentElement.parentElement.parentElement;
                const removeWidget = document.querySelector(".remove-widget");
                removeWidget.classList.remove("d-none")

                const removeWidgetYes = document.querySelector(".remove-widget-yes");
                removeWidgetYes.addEventListener("click", function () {
                    const list = JSON.parse(localStorage.allPlans);
                    console.log(list);
                    list.splice(i, 1);
                    toDelete.parentElement.removeChild(toDelete);
                    localStorage.setItem("allPlans", JSON.stringify(list))
                    console.log(list);

                    window.location.reload()
                removeWidget.classList.add("d-none")
                })

                const removeWidgetNo = document.querySelector(".remove-widget-no");
                removeWidgetNo.addEventListener("click", function () {
                removeWidget.classList.add("d-none")
                })
                
            })
        })

    })
    // ZAMYKANIE EDYCJI
    const editPlanButton = document.querySelector(".edit-button");
    editPlanButton.addEventListener("click", () => {
        // console.log(event)console.log(event.target.parentElement.parentElement.children)

        document.querySelector(".plan-list").classList.remove("d-none")
        document.querySelector(".edit-plan").classList.add("d-none")
    })

    const planCloseButton = document.querySelector(".newPlan-button");
    planCloseButton.addEventListener("click", storePlan);

    function storePlan() {
        const local = JSON.parse(localStorage.allPlans)
        
        // WERYFIKACJA pustych inputów
        if (weeksNumber.value === "") {
            alert("Wpisz na jaki tydzień tworzysz plan ;)")
            return
        }
        if (planTitle.value === "") {
            alert("Nie podałeś nazwy planu ;)")
            return
        }
        if (planDescription.value === "") {
            alert("A opis planu? ;)")
            return
        }

        // WERYFIKACJA nazwy
        const names = []
        local.forEach((el) => {
            names.push(el.title)
        })

        if (names.includes(planTitle.value)) {
            alert("Plan o takiej nazwie istnieje, zmień nazwę planu")
            return
        }

        localStorage.setItem("newPlanDone", true)

        const plan = new Schedule(local.length + 1, weeksNumber.value, planTitle.value, planDescription.value);
        
        mondayPlan.forEach(el => plan.monday.push(el.value))
        tuesdayPlan.forEach(el => plan.tuesday.push(el.value))
        wednesdayPlan.forEach(el => plan.wednesday.push(el.value))
        thursdayPlan.forEach(el => plan.thursday.push(el.value))
        fridayPlan.forEach(el => plan.friday.push(el.value))
        saturdayPlan.forEach(el => plan.saturday.push(el.value))
        sundayPlan.forEach(el => plan.sunday.push(el.value))

        document.querySelector(".plan-list").classList.remove("d-none")
        document.querySelector(".newPlan").classList.add("d-none")

        plan.saveToLocalStorage(plan);

        
        window.location.reload()

    }

    const successWidget = document.querySelector(".succes-widget");
    const editWidget = document.querySelector(".succes-widget-edit");
    


    const closeSuccessWidget = document.querySelector(".success-widget-close");
    closeSuccessWidget.addEventListener("click", function () {
        successWidget.classList.add("d-none")
    })

    const closeEditWidget = document.querySelector(".edit-widget-close");
    closeEditWidget.addEventListener("click", function () {
        editWidget.classList.add("d-none")
    })

    // localStorage.clear()
    console.log(localStorage)

});