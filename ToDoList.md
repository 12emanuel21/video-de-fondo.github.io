
```python

html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tareas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Lista de Tareas</h1>
        <form id="taskForm">
            <label for="taskDate">Fecha:</label>
            <input type="date" id="taskDate" required>

            <label for="taskPriority">Prioridad:</label>
            <select id="taskPriority" required>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>

            <label for="taskTitle">Título:</label>
            <input type="text" id="taskTitle" placeholder="Título de la tarea" required>

            <label for="taskDescription">Descripción:</label>
            <textarea id="taskDescription" placeholder="Descripción de la tarea" required></textarea>

            <button type="submit">Agregar Tarea</button>
        </form>

        <ul id="taskList"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>

CSS

/* styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input, select, textarea {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    margin-top: 20px;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #f8f9fa;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li button {
    background-color: #dc3545;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

li button:hover {
    background-color: #c82333;
}

/* Colores según prioridad */
li[data-priority="alta"] {
    border-left: 5px solid #dc3545;
}

li[data-priority="media"] {
    border-left: 5px solid #ffc107;
}

li[data-priority="baja"] {
    border-left: 5px solid #28a745;
}

javascript

// script.js
let tasks = []; // Arreglo para almacenar las tareas

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const taskDate = document.getElementById('taskDate').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    // Crear un objeto para la tarea
    const task = {
        date: taskDate,
        priority: taskPriority,
        title: taskTitle,
        description: taskDescription,
    };

    // Agregar la tarea al arreglo
    tasks.push(task);

    // Mostrar las tareas en la lista
    renderTasks();

    // Limpiar el formulario
    document.getElementById('taskForm').reset();
});

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpiar la lista antes de renderizar

    // Recorrer el arreglo de tareas y crear elementos <li>
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.setAttribute('data-priority', task.priority); // Prioridad como atributo
        taskItem.innerHTML = `
            <div>
                <strong>Fecha:</strong> ${task.date}<br>
                <strong>Prioridad:</strong> ${task.priority}<br>
                <strong>Título:</strong> ${task.title}<br>
                <strong>Descripción:</strong> ${task.description}
            </div>
            <button onclick="deleteTask(${index})">Eliminar</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1); // Eliminar la tarea del arreglo
    renderTasks(); // Volver a renderizar la lista
}


