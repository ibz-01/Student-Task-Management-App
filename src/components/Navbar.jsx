import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand navbar-brand-text" to="/">
          Weekly Planner App
        </Link>

        <div className="d-flex align-items-center order-lg-last">
          <DarkMode />
          <button
            className="navbar-toggler ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addtask">
                Add Task
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ViewTasks">
                View Tasks
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
