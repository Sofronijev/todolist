const addButton = document.getElementById("add");
const addTask = document.getElementById("task");
const clearButton = document.getElementById("clearTasks");

//checking if local storige exsists
let tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

localStorage.setItem('tasks', JSON.stringify(tasksArray));
const data = JSON.parse(localStorage.getItem('tasks'));
console.log(data);
//if localStorige existst, creates tasks
data.forEach(task => {
    newTask(task.objectText, task.objectChecked, task.objectImportant);
})

function addToLocal(text) {
    //create object for task and add to local storage
    let tasksObject = {
        objectText: text,
        objectChecked: false,
        objectImportant: false
    }
    tasksArray.push(tasksObject);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
//counts tasks when loading page
countFinished();
countAlltasks();
addButton.onclick = function () {
    let taskText = addTask.value.trim();
    //check if empty string
    if (taskText == "" || taskText == null) {
        return;
    }
    //check if task already exists
    let allTasksText = document.querySelectorAll(".text");
    for (let i = 0; i < allTasksText.length; i++) {
        console.log("task", taskText);
        console.log("all", allTasksText[i].textContent);
        if (allTasksText[i].textContent === taskText) {
            alert("Task already exists");
            return;
        }
    }

    newTask(taskText);
    addToLocal(taskText);
}
addTask.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let taskText = addTask.value.trim();
        //check if empty string
        if (taskText == "" || taskText == null) {
            return;
        }
        //check if task already exists
        let allTasksText = document.querySelectorAll(".text");
        for (let i = 0; i < allTasksText.length; i++) {           
            if (allTasksText[i].textContent === taskText) {
                alert("Task already exists");
                return;
            }
        }
        newTask(taskText);
        addToLocal(taskText);
    }
});

function newTask(inputText, checked = false, star = false) {
    let taskText = inputText;

    //create li element and add class
    let listItem = document.createElement("LI");
    listItem.classList.add("list-group-item");

    //create i element and add checkbox img
    let checkBox = document.createElement("i");
    checkBox.classList.add("material-icons");
    checkBox.classList.add("checkbox");
    let checkBoxText;
    if (checked === true) {
        checkBoxText = document.createTextNode("check_box");
        checkBox.classList.add("done");
        listItem.classList.add("taskDone");
    } else {
        checkBoxText = document.createTextNode("check_box_outline_blank");
    }
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
    //when adding from localStorige, checks if it was important
    if (star === true) {
        editIcon.classList.add("gold");
    }
    let editIconText = document.createTextNode("star");
    editIcon.appendChild(editIconText);
    //add edit icon to li element
    listItem.appendChild(editIcon);

    //add everyting in li element to list, if its finished then to doneTable, else listTable
    if (checked == true) {
        document.getElementById("doneTable").appendChild(listItem);
    } else {
        document.getElementById("listTable").appendChild(listItem);
    }

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

function checkIfImportantLocal(clickedElement) {

    if (clickedElement.classList.contains("gold")) {
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        //find clicked element in localStorage and set objectChecked to true
        localTasks.forEach(task => {
            if (task.objectText == clickedElement.parentElement.children[1].textContent) {
                task.objectImportant = true;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(localTasks));
    } else {
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));        
        localTasks.forEach(task => {
            if (task.objectText == clickedElement.parentElement.children[1].textContent) {
                task.objectImportant = false;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(localTasks));

    }
}

function deleteLocal(clickedElement) {
    //load all elements in localStorage
    let localTasks = JSON.parse(localStorage.getItem('tasks'));    
    localTasks.forEach((task, index) => {
        if (task.objectText == clickedElement.parentElement.children[1].textContent) {
            localTasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(localTasks));
}

//selects whole list of tasks
let list = document.querySelector("#listTable");
list.addEventListener("click", function (ev) {
    //ev.target is element that is clicked on
    // changes checkbox
    let clickedElement = ev.target;
    if (clickedElement.classList.contains("checkbox")) {
        clickedElement.classList.add("done"); clickedElement.parentElement.classList.add("taskDone");
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        //find clicked element in localStorage and set objectChecked to true
        localTasks.forEach(task => {
            if (task.objectText == clickedElement.nextSibling.textContent) {
                task.objectChecked = true;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(localTasks));
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
        deleteLocal(clickedElement);
        countAlltasks();
    }
    //mark important
    if (clickedElement.classList.contains("important")) {
        clickedElement.classList.toggle("gold");
        //check if element is important or not
        checkIfImportantLocal(clickedElement);
    }
});
let doneList = document.querySelector("#doneTable");
doneList.addEventListener("click", function (ev) {
    let clickedElement = ev.target;
    if (clickedElement.classList.contains("checkbox")) {
        clickedElement.classList.remove("done");
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        //find clicked element in localStorage and set objectChecked to false
        localTasks.forEach(task => {
            if (task.objectText == clickedElement.nextSibling.textContent) {
                task.objectChecked = false;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(localTasks));
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
        deleteLocal(clickedElement);

        countFinished()
    }
    //mark important
    if (clickedElement.classList.contains("important")) {
        clickedElement.classList.toggle("gold");
        checkIfImportantLocal(clickedElement);
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
    //load all elements in localStorage
    let localTasks = JSON.parse(localStorage.getItem('tasks'));    
    for(let i = localTasks.length-1; i >= 0; i--){
        if (localTasks[i].objectChecked === true) {
            localTasks.splice(i, 1);            
        }
    }    
    localStorage.setItem('tasks', JSON.stringify(localTasks));
});


