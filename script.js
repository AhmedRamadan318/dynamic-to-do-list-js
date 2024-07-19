document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') return; // Skip if taskText is empty

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function () {
            removeTask(taskText);
            li.remove(); // Remove the list item from the DOM
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to the task list
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Function to remove a task
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    // Event listener for Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);
            event.preventDefault(); // Prevent form submission
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
