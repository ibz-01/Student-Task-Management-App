import { useContext } from "react";
import { TaskContext } from "../components/TaskList";
import Collapse from "../components/Collapse";
import DeleteButton from "../components/DeleteButton";

export default function ViewTasks() {
  const { tasks } = useContext(TaskContext);

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h3>No tasks yet</h3>
        <p>Add your first task and let AI create a study plan for you.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Collapse
          key={index}
          id={`collapse-task-${index}`}
          title={task.title}
          text={
            <div className="task-card">
              <h2 className="task-title">{task.title}</h2>
              {Array.isArray(task.days) &&
                task.days.map((day, i) => (
                  <div key={i} className="task-day">
                    <h3>{day.date}</h3>
                    <ul>
                      {Array.isArray(day.subtasks) &&
                        day.subtasks.map((sub, j) => (
                          <li key={j}>
                            <strong>{sub.time}</strong> — {sub.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              <DeleteButton id={index} />
            </div>
          }
        />
      ))}
    </div>
  );
}
