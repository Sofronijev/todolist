const addButton = document.getElementById("add");
const addTask = document.getElementById("task");
const clearButton = document.getElementById("clearTasks");
const dateInput = document.getElementById("dateInput");
const toDoForm = document.querySelector("#toDoForm");

//checking if local storige exsists
let tasksArray = checkLocalStorage();
//if localStorige existst, creates tasks
tasksArray.forEach(task => {
    newTask(task.objectText, task.objectDate, task.objectChecked, task.objectImportant);
});

//counts tasks when loading page
countFinished();
countAlltasks();

toDoForm.addEventListener("submit", function (event) {

    event.preventDefault();
    let taskText = addTask.value.trim();
    let allTasksText = document.querySelectorAll(".text");
    //check if empty string or if tast exists
    if (!checkTextInput(taskText, allTasksText)) {
        return;
    }
    let dateValue = dateInput.value;
    let selectedDate = createDate(dateValue);
    let currentDate = new Date();
    //remove time from date
    currentDate.setHours(0, 0, 0, 0);
    //check if selected date is not something in past
    if (selectedDate < currentDate) {
        alert("Select some date in future");
        return;
    }
    //check if falsy value
    if (!dateValue) {
        selectedDate = "";
    }
    newTask(taskText, dateValue);
    addToLocalStorage(taskText, dateValue);
});

//selects whole list of tasks
let list = document.querySelector("#listTable");
list.addEventListener("click", function (ev) {
    //ev.target is element that is clicked on
    // changes checkbox    
    let clickedElement = ev.target;
    if (clickedElement.classList.contains("checkbox")) {
        clickedElement.classList.add("done");
        clickedElement.parentElement.classList.add("taskDone");
        //load all elements in localStorage
        let localTasks = JSON.parse(localStorage.getItem('tasks'));
        //find clicked element in localStorage and set objectChecked to true
        localTasks.forEach(task => {
            if (task.objectText === clickedElement.nextSibling.textContent) {
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
            if (task.objectText === clickedElement.nextSibling.textContent) {
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
    for (let i = localTasks.length - 1; i >= 0; i--) {
        if (localTasks[i].objectChecked === true) {
            localTasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(localTasks));
});
