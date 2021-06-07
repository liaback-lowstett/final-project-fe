import { createSlice } from '@reduxjs/toolkit';

const tasks = createSlice({
  name: 'tasks',
  initialState: {
    taskItem: []
  },
  reducers: {
    setTasks: (store, action) => {
      store.taskItem = action.payload;
    },
    addNewTask: (store, action) => {
      store.taskItem = [...store.taskItem, action.payload]
    }
  }
});

export default tasks;
