document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('item');
    const prioritySelect = document.getElementById('priority');
    const addTaskBtn = document.getElementById('submitBtn');
    const taskList = document.getElementById('taskList');

    let tasks = loadTasks();

    // Load tasks from local storage
    function loadTasks() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks to the page
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}`; // Add priority class
            taskItem.dataset.index = index;

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => toggleTask(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    // Add a new task
    function addTask() {
        const taskText = newTaskInput.value.trim();
        const taskPriority = prioritySelect.value;
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false, priority: taskPriority }); // Save task as an object
            saveTasks();
            renderTasks();
            newTaskInput.value = '';
        }
    }

    // Toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        addTask();
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            addTask();
        }
    });

    renderTasks();
});
