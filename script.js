document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the task list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid saving duplicates
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        let rmvBtn = document.createElement('button');
        rmvBtn.textContent = 'Remove';
        rmvBtn.classList.add('remove-btn');

        // Attach an event listener to the remove button to remove the task
        rmvBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        });

        // Append the remove button to the list item
        li.append(rmvBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if needed
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Save a new task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Attach event listener to the Add Task button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
        } else {
            alert("Enter a task");
        }
    });

    // Allow tasks to be added by pressing the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
            } else {
                alert("Enter a task");
            }
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
