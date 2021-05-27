import {getObjectArrayFromLocalStorage, setObjectArrayToLocalStorage} from "./localStorageHelper.js";
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!") 

    const loginName = document.querySelector(".user-name");
    loginName.innerText = localStorage.getItem("loggedUser");
    
    const div_list=document.querySelector(".list");

const update_list=(array)=>{
    div_list.innerHTML="";
    array.forEach((element, index) => {
    const nev_div=document.createElement("div");
    nev_div.className="row recip-item"
    nev_div.innerHTML=`<div class="col-1">${index+1}</div>
    <div class="col-3">${element.name}</div>
    <div class="col-6">${element.description}</div>
    <div class="col-2"><i class="fas fa-pencil-alt iconEdit"></i> <i class="far fa-trash-alt iconTrash"></i></div>`;
    div_list.appendChild(nev_div)
    const iconTrash=nev_div.querySelector(".iconTrash"); 
    const iconEdit=nev_div.querySelector(".iconEdit");
    
    
    iconTrash.addEventListener("click", function (event) {
        const id=event.target.parentElement.parentElement.firstChild.innerText;
        
        const new_recipArray=getObjectArrayFromLocalStorage("recipArray")
        new_recipArray.splice(id-1,1)
        setObjectArrayToLocalStorage("recipArray", new_recipArray);
        update_list(new_recipArray);
        console.log(new_recipArray.length)
        if(new_recipArray==0){
            localStorage.removeItem("recipArray");
        }

        });

    iconEdit.addEventListener("click", edition_of_recipe); 
    });
}
    if(localStorage.getItem("recipArray")==null){
        alert("Trochę tutaj pusto 😞. Dodaj swój pierwszy przepis");
    }
    else{
    const test=getObjectArrayFromLocalStorage("recipArray");

    update_list(test);
    }
//____________________________________copy______________________________________________________
    function edition_of_recipe(event){

        const id_edition=event.target.parentElement.parentElement.firstChild.innerText;
        console.log(id_edition);
        localStorage.setItem("id_edition", id_edition); 
        window.open("../new_recipes.html", "_self");

    }



});