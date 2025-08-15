import { useContext } from "react";
import { TaskContext } from "../components/TaskList";
import Collapse from "../components/Collapse";
import DeleteButton from "../components/DeleteButton";

export default function ViewTasks() {
  const { tasks } = useContext(TaskContext);

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (

    

    <div className="task-list">
      {tasks.map((task, index) => (
        <Collapse
          key={index}
          id={`collapse-task-${index}`} // unique ID
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
                            {sub.time}: {sub.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
                <DeleteButton id={index}/>
            </div>
          }
        />
      ))}
    </div>
  );
}
