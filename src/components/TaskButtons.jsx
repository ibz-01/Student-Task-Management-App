import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";


export default function Buttons()
{

  return (
    <div className="taskBtns">
      <Stack direction="row" spacing={2}>
        <Link to="/addtask">
        <Button
          className="addBtn"
          variant="contained"
          color="success"
          size="large"
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
        </Link>

        
        <Button
          className="delBtn"
          variant="outlined"
          color="error"
          size="large"
          startIcon={<DeleteIcon />}
        >
          Delete Task
        </Button>
      </Stack>
    </div>
  );
}

