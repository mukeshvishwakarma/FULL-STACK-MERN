import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import axios from "axios"; // Import axios
import "./index.css";
import App from "./App";

const API_URL = "http://localhost:3001";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/completed-tasks`);
      setCompletedTasks(response.data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  return (
    <div>
      <h2>Completed Tasks Page</h2>
      <p>Total Completed Tasks: {completedTasks.length}</p>
      <table>
        <thead>
          <tr>
            <th>SR NO.</th>
            <th>Task Title</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

const NotFound = () => {
  return <h2>Page not found</h2>;
};

const AppWithRoutes = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setCompletedTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <NavLink exact={true} to="/" activeClassName="active">
            All Tasks
          </NavLink>
          <NavLink exact={true} to="/completed" activeClassName="active">
            Completed Tasks
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<AppWithRoutes />, document.getElementById("root"));
