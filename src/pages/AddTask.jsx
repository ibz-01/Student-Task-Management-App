import { useState } from "react";
import { getTasks } from "../ai_addtask";
import { useContext } from "react";
import { TaskContext } from "../components/TaskList";

export default function AddTask() {

  const {tasks, setTasks } = useContext(TaskContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("");
  const [instructions, setinstructions] = useState("");

  const [loading, setLoading] = useState(false)

  async function getOutput(task) 
  {
    task.preventDefault()

    setLoading(true)

    const output = await getTasks(title,description,deadline,instructions,tasks);
    

    setTimeout( () => {

      setTasks([...tasks,output])
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
      <h1>Add a New Task</h1> <br></br>
      <form onSubmit={getOutput}>
        <input
          type="text"
          value={title}
          placeholder="Task Title"
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br></br>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <textarea
          placeholder="Task Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        ></textarea>
        <textarea
          placeholder="Special Instructions eg. I cannot work on 2nd Aug"
          value={instructions}
          onChange={(e) => setinstructions(e.target.value)}
        ></textarea>
        <button type="submit">Save Task</button>
      </form>
      {loading && (
        <p>
          {" "}
          <center> Generating Tasks... </center> </p>
      )}
    </div>
  );
}






