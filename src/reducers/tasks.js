import { createSlice } from '@reduxjs/toolkit';

const tasks = createSlice({
  name: 'tasks',
  initialState: {
    taskItem: [],
    deadline: null,
    error: null
  },
  reducers: {
    addTask: (store, action) => {
      store.taskItem = action.payload;
    },
    addDeadline: (store, action) => {
      store.deadline = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    }
  }
});

export default tasks;
