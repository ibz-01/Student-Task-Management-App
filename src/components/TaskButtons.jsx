import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
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

        

        <Link to="/viewtasks">
          <Button
            className="viewBtn"
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<EventNoteIcon />}
          >
            View Tasks
          </Button>
        </Link>
      </Stack>
    </div>
  );
}

