document.addEventListener('DOMContentLoaded', function (addTask) {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        let taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Enter a task");
        } else {
            const li = document.createElement('li');
            li.textContent = taskText;

            let rmvBtn = document.createElement('button');
            rmvBtn.textContent = 'Remove';
            rmvBtn.classList.add('remove-btn');

            rmvBtn.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.append(rmvBtn);
            taskList.appendChild(li);
            taskInput.value = '';
        }
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    

    addTask();
});