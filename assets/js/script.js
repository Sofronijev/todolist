const addButton = document.getElementById("add");
const addTask = document.getElementById("task");

addButton.onclick = function () {
    newTask();
}
addTask.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        newTask();
    }
});

function newTask() {
    let taskText = addTask.value.trim();

    //check if empty string
    if (taskText == "" || taskText == null) {
        return;
    }
    //create li element and add class
    let listItem = document.createElement("LI");
    listItem.classList.add("list-group-item");

    //create i element and add checkbox img
    let checkBox = document.createElement("i");
    checkBox.classList.add("material-icons");
    checkBox.classList.add("checkbox");
    let checkBoxText = document.createTextNode("check_box_outline_blank");
    checkBox.appendChild(checkBoxText);
    //add checkbox to li element
    listItem.appendChild(checkBox);

    //create span element and add text
    let listText = document.createElement("span");
    listText.classList.add("text");
    let textnode = document.createTextNode(taskText);
    listText.appendChild(textnode);
    //add Text to li element
    listItem.appendChild(listText);

    //create i element and add delete img
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("material-icons");
    deleteIcon.classList.add("delete");
    let deleteIconText = document.createTextNode("delete");
    deleteIcon.appendChild(deleteIconText);
    //add delete icon to li element
    listItem.appendChild(deleteIcon);

    //create i element and add important img
    let editIcon = document.createElement("i");
    editIcon.classList.add("material-icons");
    editIcon.classList.add("important");
    let editIconText = document.createTextNode("star");
    editIcon.appendChild(editIconText);
    //add edit icon to li element
    listItem.appendChild(editIcon);

    //add everyting in li elemnt to table list
    document.getElementById("listTable").appendChild(listItem);
    
    
    /*
    // OVO NE RADI! Za delete i hoce da radi ali ponavlja se vise puta kad ima vise elemenata, addeventlistener dodaje event vise puta na jedno dugme, tako da ako ga doda paran broj puta on ce da toggle paran broj i izgledace kao da se nista ne desava, nisam nasao resenje osim da izbacim u global funkcije

    //delete button on click
    let deleteButton = document.querySelectorAll(".delete");    
    for(let i = 0; i<deleteButton.length; i++){
        deleteButton[i].addEventListener("click", function(){
            this.parentElement.remove();
        });       
    }
    let importantButton = document.querySelectorAll(".important");
    for (let y = 0; y<importantButton.length; y++){
         importantButton[y].addEventListener("click", function(){
            this.classList.toggle("gold");            
        });
    }
    */

    //clear input field
    addTask.value = "";

}
//selects whole list of tasks
//Ovo sam prvo radi osa for loop koji dodaje eventlistener za svako dugme, ali nije dobro radilo za checkbox, radilo je na svakom drugom

let list = document.querySelector("#listTable");
let doneList = document.querySelector("#doneTable");
list.addEventListener('click', function (ev) {
    //ev.target is element that is clicked on
    // changes checkbox
    if (ev.target.classList.contains("checkbox")) {
        ev.target.classList.toggle("done");
        ev.target.parentElement.classList.toggle("lineThrough");
        if (ev.target.textContent === "check_box_outline_blank") {
            ev.target.textContent = "check_box";         
            doneList.appendChild(ev.target.parentElement);
        }  
    }  
    if (ev.target.classList.contains("delete")) {
        ev.target.parentElement.remove();
    }
    //mark important
    if (ev.target.classList.contains("important")) {
        ev.target.classList.toggle("gold");
    }
});

doneList.addEventListener('click', function (ev) {    
    if (ev.target.classList.contains("checkbox")) {
        ev.target.classList.toggle("done");
        ev.target.parentElement.classList.toggle("lineThrough");
        if (ev.target.textContent === "check_box") {
            ev.target.textContent = "check_box_outline_blank";            
            list.appendChild(ev.target.parentElement);
        } 
    } 
    if (ev.target.classList.contains("delete")) {
        ev.target.parentElement.remove();
    }
    //mark important
    if (ev.target.classList.contains("important")) {
        ev.target.classList.toggle("gold");
    } 
});