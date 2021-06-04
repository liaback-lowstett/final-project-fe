import { createSlice } from '@reduxjs/toolkit';

const tasks = createSlice({
  name: 'tasks',
  initialState: {
    taskItem: []
  },
  reducers: {
    setTasks: (store, action) => {
      store.taskItem = action.payload;
    }
  }
});

export default tasks;
