const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 3001;

let tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];
let nextId = 3;

app.use(bodyParser.json());
app.use(cors());
// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a specific task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

app.get("/completed-tasks", (req, res) => {
    const completedTasks = tasks.filter((task) => task.completed);
    res.json(completedTasks);
  });
  
// Create a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: nextId++,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.title = req.body.title;
  task.completed = req.body.completed;
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
