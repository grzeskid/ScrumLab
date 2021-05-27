import {getObjectArrayFromLocalStorage, setObjectArrayToLocalStorage} from "./localStorageHelper.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

    const loginName = document.querySelector(".user-name");
    loginName.innerText = localStorage.getItem("loggedUser");

    const button1=document.querySelector("#button1");
    const button2=document.querySelector("#button2");
    const input1=document.querySelector("#input1");
    const input2=document.querySelector("#input2");
    const display_left=document.querySelector("#display_left").firstElementChild;
    const display_right=document.querySelector("#display_right").firstElementChild;
    const button_actept=document.querySelector("#button_actept");
    const input_name=document.querySelector("#name");
    const input_description=document.querySelector("#description")

    let array_instruction=[]
    let array_ingredients=[]
    
   const update=(place, array)=>{
       place.innerHTML=""
       if(place==display_left){
         array.forEach((element, ind) => {
            const nev_li=document.createElement("li");
            nev_li.innerHTML=`${ind+1}. <span>${element}</span> <i class="fas fa-pencil-alt iconEdit"></i> <i class="far fa-trash-alt iconTrash"></i>`;
            place.appendChild(nev_li); 

            const iconTrash=nev_li.querySelector(".iconTrash"); 
            const iconEdit=nev_li.querySelector(".iconEdit");

            iconTrash.addEventListener("click", function (event) {
                const id= array.indexOf(event.target.parentElement.querySelector("span").innerText)
                array.splice(id,1); 
                update(place, array); 
            });

            iconEdit.addEventListener("click", function (event) {
                let sign = prompt("EDYTUJ!",event.target.parentElement.firstElementChild.innerText);
                event.target.parentElement.querySelector("span").innerText=sign
            });
            

        });}
        else{
        place.style.listStyle="disc inside";
            array.forEach((element, ind) => {
                const nev_li=document.createElement("li");
                nev_li.innerHTML=`<span>${element}</span> <i class="fas fa-pencil-alt iconEdit"></i> <i class="far fa-trash-alt iconTrash"></i>`;
                place.appendChild(nev_li); 
    
                const iconTrash=nev_li.querySelector(".iconTrash"); 
                const iconEdit=nev_li.querySelector(".iconEdit");
    
                iconTrash.addEventListener("click", function (event) {
                    const id= array.indexOf(event.target.parentElement.querySelector("span").innerText)
                    array.splice(id,1); 
                    update(place, array);
                });
    
                iconEdit.addEventListener("click", function (event) {
                    let sign = prompt("EDYTUJ!",event.target.parentElement.firstElementChild.innerText);
                    event.target.parentElement.querySelector("span").innerText=sign
                });
                
    
            });  
        }
    }

    button1.addEventListener("click", function (event) {
        const value_input=input1.value;
        array_instruction.push(value_input);
        input1.value="";
        update(display_left, array_instruction);    

    });

    button2.addEventListener("click", function (event) {
        const value_input=input2.value;
        array_ingredients.push(value_input);
        input2.value="";
        update(display_right, array_ingredients);    

    });

   
    button_actept.addEventListener("click", function (event) {
    if(id_edition==null){
       if(input_name.value=="" || input_description.value=="" || array_ingredients.length==0 || array_instruction.length==0){
           alert("BŁĄD PODCZAS WPROWADZENIA PRZEPISU! POLE NIE MOŻE BYĆ PUSTE.")
       } 
        else{
        const new_recipt={name:input_name.value, description:input_description.value, instruction:array_instruction, ingredients:array_ingredients};
        let new_array;
        if(localStorage.getItem("recipArray")==null){
            new_array=[]
        }
        else{
            new_array=getObjectArrayFromLocalStorage("recipArray")
        }
        new_array.push(new_recipt);
        setObjectArrayToLocalStorage("recipArray", new_array)
        window.open("../recipes.html", "_self")
    }
 }
        else{

            const id_edition=localStorage.getItem("id_edition");
           let edit_array=getObjectArrayFromLocalStorage("recipArray");
                edit_array[id_edition-1].name=input_name.value;
                edit_array[id_edition-1].description=input_description.value;
                edit_array[id_edition-1].instruction=array_instruction;
                edit_array[id_edition-1].ingredients=array_ingredients;
                setObjectArrayToLocalStorage("recipArray", edit_array)
                localStorage.removeItem("id_edition"); 

            window.open("../recipes.html", "_self")
            
        }
    })

const id_edition=localStorage.getItem("id_edition");
if(id_edition!=null){
    console.log("bedę edytować"); 

    const element_edytion=getObjectArrayFromLocalStorage("recipArray")[parseInt(id_edition)-1]
    input_name.value=element_edytion.name;
    input_description.value=element_edytion.description;
    update(display_right, element_edytion.ingredients);
    update(display_left, element_edytion.instruction);
    array_instruction=element_edytion.instruction;
    array_ingredients=element_edytion.ingredients;
}
});

