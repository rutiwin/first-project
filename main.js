let noteIdCounter = 0;
let tasksArray = [];

window.onload = function () {
    loadTasksFromLocalStorage();
};

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach(task => {
            displayTask(task);
            updateNoteIdCounter(task.id);
        });
    }
}

function updateNoteIdCounter(taskId) {
    const taskIdNumber = parseInt(taskId.split('-')[1]);
    if (!isNaN(taskIdNumber) && taskIdNumber >= noteIdCounter) {
        noteIdCounter = taskIdNumber + 1;
    }
}

function addNote() {
    const taskInput = document.getElementById("task-information").value;
    const dateInput = document.getElementById("task-date").value;
    const timeInput = document.getElementById("task-time").value;

    if (taskInput.trim() === '' || dateInput.trim() === '' || timeInput.trim() === '') {
        alert("Please fill in all the required fields.");
        return;
    }

    const task = {
        id: 'note-' + noteIdCounter,
        taskContent: taskInput,
        dueDate: dateInput,
        targetTime: timeInput
    };

    displayTask(task);
    tasksArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    resetFormInputs();
    noteIdCounter++;
}

function displayTask(task) {
    const notesContainerDiv = document.getElementById("notes-container");

    const noteDiv = document.createElement('div');
    noteDiv.id = task.id;
    noteDiv.className = 'note-div-class';
    const makeArrayFromTheDateStr = task.dueDate.split('-');
    const formattedDate = `${makeArrayFromTheDateStr[2]}-${makeArrayFromTheDateStr[1]}-${makeArrayFromTheDateStr[0]}`;
    noteDiv.innerHTML = `
    <div><textarea class="note-textarea">${task.taskContent}</textarea></div><div>${formattedDate}</div><div>${task.targetTime}</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill close-button" viewBox="0 0 16 16" onclick="deleteTask('${task.id}')">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708 -.708"/>
    </svg>`;

    notesContainerDiv.appendChild(noteDiv);
}

function deleteTask(taskId) {
    const taskElement = document.getElementById(taskId);
    taskElement.remove();

    tasksArray = tasksArray.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function resetFormInputs() {
    document.getElementById("task-information").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-time").value = "";
}