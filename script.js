const inputTask = document.getElementById("input-task");
const taskList = document.getElementById("task-list");


let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));

function updateLocalStorege() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function Task(discripchen){
    this.discripchen = discripchen;
    this.complited = false;
}


function checkValidInput(input) {
    if (input === "") {
      alert("You don't write text");
      return false;
    }
    return input;  
}

function createHTMLElements(task, index){
    return `
            <li class="to-do-item" id="${index}">
                <input onclick="comlidedTask(${index});" type="checkbox" ${task.complited ? "checked" : ""}>
                <span>${task.discripchen}</span>
                <button onclick="deleteTask(${index});"><i class="fas fa-times"></i></button>
            </li>
    `
}
function deleteTask(index){
    let toDoItem = document.getElementById(index);
    tasks.splice(index, 1);
    updateLocalStorege();
    toDoItem.remove()
}

function addItem(){
    let inputTaskText = inputTask.value;
    if(checkValidInput(inputTaskText)){
        tasks.push(new Task(inputTaskText));
        updateLocalStorege();
        fillHTMLList();
        inputTask.value = "";
  }
}

function fillHTMLList() {
    taskList.innerHTML = "";
    if(tasks.length > 0){
      tasks.forEach((element,index) => {
        taskList.innerHTML +=  createHTMLElements(element, index);
      });
    }
    
}

function comlidedTask(index) {
    tasks[index].complited = !tasks[index].complited;
    console.log(index);
    updateLocalStorege();
}

fillHTMLList();