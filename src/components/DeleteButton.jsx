import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { TaskContext } from "../components/TaskList";

export default function DeleteButton({ id }) {
  
    const { setTasks } = useContext(TaskContext);

    const deleteTask = () => {
      setTasks((prevTasks) => prevTasks.filter((_, index) => index !== id));
    };

  
    return (
    <Button
      className="delBtn"
      variant="outlined"
      color="error"
      size="large"
      startIcon={<DeleteIcon />}
      onClick={deleteTask}
    >
      Delete Task
    </Button>
  )
}
