const tocloneTable = document.querySelector(".newPlan-table");
const cloneTable = tocloneTable.cloneNode(true);

const putCloneTable = document.querySelector(".cloneTable");
putCloneTable.appendChild(cloneTable);


const editPlanButton = document.querySelector(".edit-button");
editPlanButton.addEventListener("click", storeEditedPlan)

function storeEditedPlan(){

    const editName = document.querySelector("#edit-name")
    const editDescription = document.querySelector("#plan-description")
    const editWeeks = document.querySelector("#edit-weeks")
    // WERYFIKACJA pustych inputów
    if (editWeeks.value === "") {
        alert("Wpisz na jaki tydzień tworzysz plan ;)")
        return
    } else if (editName.value === "") {
        alert("Nie podałeś nazwy planu ;)")
        return
    } else if (editDescription.value === "") {
        alert("A opis planu? ;)")
        return
    } else {


    localStorage.setItem("newPlanEdited", true)
    
    const localPlans = JSON.parse(localStorage.allPlans);
    // console.log(localPlans);
    const indexToEdit = Number(localStorage.getItem("editingNow"));
    // console.log(indexToEdit);
    localStorage.removeItem("allPlans");
    // console.log(localPlans[indexToEdit].title, document.querySelector("#edit-name").value);

    localPlans[indexToEdit].title = editName.value;
    localPlans[indexToEdit].description = editDescription.value;
    localPlans[indexToEdit].weekNumber = editWeeks.value;

    const saveMonday = document.querySelector(".edit-plan").querySelectorAll(".monday")
    const saveTuesday = document.querySelector(".edit-plan").querySelectorAll(".tuesday")
    const saveWednesday = document.querySelector(".edit-plan").querySelectorAll(".wednesday")
    const saveThursday = document.querySelector(".edit-plan").querySelectorAll(".thursday")
    const saveFriday = document.querySelector(".edit-plan").querySelectorAll(".friday")
    const saveSaturday = document.querySelector(".edit-plan").querySelectorAll(".saturday")
    const saveSunday = document.querySelector(".edit-plan").querySelectorAll(".sunday")

    localPlans[indexToEdit].monday = [saveMonday[0].value, saveMonday[1].value, saveMonday[2].value, saveMonday[3].value, saveMonday[4].value]
    localPlans[indexToEdit].tuesday = [saveTuesday[0].value, saveTuesday[1].value, saveTuesday[2].value, saveTuesday[3].value, saveTuesday[4].value]
    localPlans[indexToEdit].wednesday = [saveWednesday[0].value, saveWednesday[1].value, saveWednesday[2].value, saveWednesday[3].value, saveWednesday[4].value]
    localPlans[indexToEdit].thursday = [saveThursday[0].value, saveThursday[1].value, saveThursday[2].value, saveThursday[3].value, saveThursday[4].value]
    localPlans[indexToEdit].friday = [saveFriday[0].value, saveFriday[1].value, saveFriday[2].value, saveFriday[3].value, saveFriday[4].value]
    localPlans[indexToEdit].saturday = [saveSaturday[0].value, saveSaturday[1].value, saveSaturday[2].value, saveSaturday[3].value, saveSaturday[4].value]
    localPlans[indexToEdit].sunday = [saveSunday[0].value, saveSunday[1].value, saveSunday[2].value, saveSunday[3].value, saveSunday[4].value]

    
    localStorage.setItem("allPlans", JSON.stringify(localPlans))
    
    document.querySelector(".plan-list").classList.remove("d-none")
    document.querySelector(".edit-plan").classList.add("d-none")

    window.location.reload()
}

}
