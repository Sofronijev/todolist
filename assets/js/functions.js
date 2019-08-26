function checkLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function addToLocalStorage(text, date) {
    //checks if tasks exists or not (without this tasks dont get deleted if you don't refresh page after deleting)
    let tasksArray = checkLocalStorage();
    //create object for task and add to local storage
    let tasksObject = {
        objectText: text,
        objectDate: date,
        objectChecked: false,
        objectImportant: false,
    }
    tasksArray.push(tasksObject);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function createDate(date) {
    let splitDate = date.split("-");
    // splitDate[1] - 1 is because month is indexed from 0 to 11
    let selectedDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    return selectedDate;
}

function checkTextInput(text, existingText) {
    ///text - value from text input
    /// existingText - text from all tasks that are already set    
    if (text === "" || text === null) {
        //stops function form going further if there is no valid input
        return false;
    }
    for (let i = 0; i < existingText.length; i++) {
        if (existingText[i].textContent === text) {
            alert("Task already exists");
            return false;
        }
    }
    return true;
}

function newTask(inputText, inputDate, checked = false, star = false) {

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
    listText.setAttribute("name", "text");
    let textnode = document.createTextNode(inputText);
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

    if (inputDate !== "") {
        //create date
        let dueDate = document.createElement("p");
        dueDate.classList.add("date");
        let taskDate = createDate(inputDate);
        let dueDateText = document.createTextNode(`Due date: ${taskDate.toDateString()}`);
        dueDate.appendChild(dueDateText);
        listItem.appendChild(dueDate);
    }

    //add everyting in li element to list, if its finished then to doneTable, else listTable
    checked === true ? document.getElementById("doneTable").appendChild(listItem) : document.getElementById("listTable").appendChild(listItem);

    countAlltasks();
    //clear input field
    addTask.value = "";
}

//count all finished tasks
function countFinished() {
    let doneTasks = document.querySelectorAll(".done");
    document.getElementById("finished").textContent = doneTasks.length;
}

//count all unfinished tasks
function countAlltasks() {
    let allTasks = document.querySelectorAll("#listTable>li");
    document.getElementById("allTasks").textContent = allTasks.length;
}

//change objectImportrant to true or false in local storage
function checkIfImportantLocal(clickedElement) {

    if (clickedElement.classList.contains("gold")) {
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        //find clicked element in localStorage and set objectChecked to true
        localTasks.forEach(task => {
            if (task.objectText === clickedElement.parentElement.children.namedItem("text").textContent) {
                task.objectImportant = true;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(localTasks));
    } else {
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        localTasks.forEach(task => {
            if (task.objectText == clickedElement.parentElement.children.namedItem("text").textContent) {
                task.objectImportant = false;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(localTasks));

    }
}

//delete element from local storage
function deleteLocal(clickedElement) {
    //load all elements in localStorage
    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    localTasks.forEach((task, index) => {
        if (task.objectText == clickedElement.parentElement.children.namedItem("text").textContent) {
            localTasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(localTasks));
}