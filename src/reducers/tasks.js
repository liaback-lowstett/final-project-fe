import { createSlice } from '@reduxjs/toolkit';

const tasks = createSlice({
  name: 'tasks',
  initialState: {
    taskItem: [],
    errors: null
  },
  reducers: {
    setTasks: (store, action) => {
      store.taskItem = action.payload;
    },
    addNewTask: (store, action) => {
      store.taskItem = [...store.taskItem, action.payload]
    },
    editTask: (store, action) => {
      const updatedTask = store.taskItem.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            taskItem: task.taskItem
          }
        } else {
          return task
        }
      })
      store.taskItem = updatedTask
    },
    toggleComplete: (store, action) => {
      const checkedTask = store.taskItem.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            isComplete: !task.isComplete
          };
        } else {
          return task;
        }
      });
      store.tasks = checkedTask;
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
    // removeTask: (store, action) => {
    //   const removedTask = store.items.filter((task) => task._id !== action.payload)
    //   store.answers = removedTask
    // },
  }
});

export default tasks;
