import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function Todo_listing() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText]);
      setTaskText('');
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
    setOpenEditDialog(true);
  };

  const saveEditedTask = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editedTask;
      setTasks(updatedTasks);
      setOpenEditDialog(false);
      setEditedTask('');
      setEditIndex(null);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((val, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Box>
          <h3 >To-Do App</h3>
          </Box>
      <Container >
        <div style={{ marginTop: '40px' }}>
          <TextField
            label="Add Task"
            fullWidth
            variant="outlined"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={addTask}
          >
            Add
          </Button>
        </div>
        <List style={{ marginTop: '20px' }}>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              <ListItemText primary={task} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => editTask(index)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(index)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      <Dialog open={openEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task"
            fullWidth
            variant="outlined"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={saveEditedTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Todo_listing;
