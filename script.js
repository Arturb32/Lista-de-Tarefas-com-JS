const taskInput = document.querySelector('.input-task');
const buttonTask = document.querySelector('.button-task');
const tasks = document.querySelector('.tasks');
function createLi() {
    const li = document.createElement('li');
    return li;
}
taskInput.addEventListener('keypress', function(e) {
    if(e.keyCode == 13){
        if(!(taskInput.value)) return;
        createTask(taskInput.value);
    }
});
function clearInput () {
    taskInput.value = '';
    taskInput.focus();
}

function createButtonRemove(li) {
    li.innerText += ' ';
    const buttonRemove = document.createElement('button');
    buttonRemove.innerText = 'Apagar';
    buttonRemove.setAttribute('class', 'remove');
    buttonRemove.setAttribute('title', 'Remove this task');
    li.appendChild(buttonRemove);
}

function createTask(inputText) {
    const li = createLi();
    li.innerText = inputText;
    tasks.appendChild(li);
    clearInput();
    createButtonRemove(li)
    saveTask();
}
buttonTask.addEventListener('click', function() {
    if(!(taskInput.value)) return;
    createTask(taskInput.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('remove')) {
        el.parentElement.remove();
        saveTask();
    }
});

function saveTask() {
    const liTask = tasks.querySelectorAll('li');
    const taskList = [];

    for(let task of liTask)  {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        taskList.push(taskText);
    }

    const taskJason = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJason);
}
function addSaveTask() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);

    for(let task of taskList){
        createTask(task);
    }
}
addSaveTask();