import { useState } from "react";
import { getTasks } from "../ai_addtask";
import { useContext } from "react";
import { TaskContext } from "../components/TaskList";
import { resolveConflicts } from "../utilities/addTaskUtils";


export default function AddTask() {

  const { tasks, setTasks } = useContext(TaskContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("");
  const [instructions, setinstructions] = useState("");

  const [loading, setLoading] = useState(false)

  async function getOutput(task) {
    task.preventDefault()

    setLoading(true)

    const output = await getTasks(title, description, deadline, instructions, tasks);

    const fixedOutput = resolveConflicts(output, tasks);

    setTasks((prev) => [...prev, fixedOutput]);

    setTimeout(() => {

      setTasks([...tasks, output])
      setLoading(false)
    }, 2000)


    console.log(output);


    setTitle("");
    setDescription("");
    setDeadline("");
    setinstructions("");
  }


  return (
    <div className="add-task-container">
      <h1>Add a New Task</h1>
      <p className="form-subtitle">Describe your goal and let AI plan it for you</p>
      <form onSubmit={getOutput}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            placeholder="e.g. Prepare for Math Exam"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="What do you need to accomplish?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <textarea
            placeholder="e.g. March 15, 2026"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ minHeight: "50px" }}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Special Instructions</label>
          <textarea
            placeholder="e.g. Max 2 hours of study per day"
            value={instructions}
            onChange={(e) => setinstructions(e.target.value)}
            style={{ minHeight: "50px" }}
          ></textarea>
        </div>
        <button type="submit">
          {loading ? "Generating..." : "✨ Generate Task Plan"}
        </button>
      </form>
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>AI is creating your study plan...</span>
        </div>
      )}
    </div>
  );
}
