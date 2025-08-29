import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ViewTasks from "./pages/ViewTasks";


function App() {


  return (
    <Router>
      <Navbar />
      
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/viewtasks" element={<ViewTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
