import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "http://localhost:3001";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleNewTaskTitleChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (newTaskTitle.trim() !== "") {
      try {
        await axios.post(`${API_URL}/tasks`, { title: newTaskTitle });
        fetchTasks();
        setNewTaskTitle("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        title: task.title,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Task Management</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTaskTitle}
          onChange={handleNewTaskTitleChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Check Box</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                /></td>
              <td>
                {task.completed ? <del>{task.title}</del> : task.title}
              </td>
              <td>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
