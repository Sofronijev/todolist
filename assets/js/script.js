const addButton = document.getElementById("add");
const addTask = document.getElementById("task");
const clearButton = document.getElementById("clearTasks");

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

    let allTasks = document.querySelectorAll("#listTable>li");
    document.getElementById("allTasks").textContent = allTasks.length;

    //clear input field
    addTask.value = "";
}

//counts elements that are finished (has done class)
function countFinished() {
    let doneTasks = document.querySelectorAll(".done");
    document.getElementById("finished").textContent = doneTasks.length;
}

function countAlltasks() {
    let allTasks = document.querySelectorAll("#listTable>li");
    document.getElementById("allTasks").textContent = allTasks.length;
}

//selects whole list of tasks
let list = document.querySelector("#listTable");
list.addEventListener("click", function (ev) {
    //ev.target is element that is clicked on
    // changes checkbox
    let clickedElement = ev.target;
    if (clickedElement.classList.contains("checkbox")) {
        clickedElement.classList.add("done");
        clickedElement.parentElement.classList.add("taskDone");
        //counts number of finished tasks
        countFinished();

        if (clickedElement.textContent === "check_box_outline_blank") {
            clickedElement.textContent = "check_box";
            doneList.appendChild(clickedElement.parentElement);
            countAlltasks();
        }
    }
    if (clickedElement.classList.contains("delete")) {
        clickedElement.parentElement.remove();
        countAlltasks();
    }
    //mark important
    if (clickedElement.classList.contains("important")) {
        clickedElement.classList.toggle("gold");
    }
});
let doneList = document.querySelector("#doneTable");
doneList.addEventListener("click", function (ev) {
    let clickedElement = ev.target;
    if (clickedElement.classList.contains("checkbox")) {
        clickedElement.classList.remove("done");
        //counts number of finished tasks
        countFinished();

        clickedElement.parentElement.classList.remove("taskDone");
        if (clickedElement.textContent === "check_box") {
            clickedElement.textContent = "check_box_outline_blank";
            list.appendChild(clickedElement.parentElement);
            countAlltasks();
        }

    }
    if (clickedElement.classList.contains("delete")) {
        clickedElement.parentElement.remove();
        countFinished()
    }
    //mark important
    if (clickedElement.classList.contains("important")) {
        clickedElement.classList.toggle("gold");
    }
});

clearButton.addEventListener("click", function () {
    //delete all children in #doneTable UL, except first that is h4 element    
    while (doneList.children[1]) {
        doneList.removeChild(doneList.children[1]);
        //clear number of finished tasks
        let doneTasks = document.querySelectorAll(".done");
        document.getElementById("finished").textContent = doneTasks.length;
    }
});


//sta sve treba da bude u objektu
//tekst, da li je important, da li je stiklirano