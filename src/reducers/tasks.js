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
    setErrors: (store, action) => {
      store.errors = action.payload
    }
    // editTask: (store, action) => {
    //   const updatedTask = store.taskItem.map((task) => {
    //     if (task.id === action.payload) {
    //       return {
    //         ...task,
    //         title: task.title,
    //         post: task.post
    //       }
    //     } else {
    //       return task
    //     }
    //   })
    //   store.taskItem = updatedTask
    // },
    // removeTask: (store, action) => {
    //   const removedTask = store.items.filter((task) => task._id !== action.payload)
    //   store.answers = removedTask
    // },
  }
});

export default tasks;
