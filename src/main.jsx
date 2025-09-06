import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TaskProvider } from './components/TaskList';
import DarkMode from './components/DarkMode';
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  
  <TaskProvider>
    <React.StrictMode>
      
      <App/>
    </React.StrictMode>
  </TaskProvider>
);
