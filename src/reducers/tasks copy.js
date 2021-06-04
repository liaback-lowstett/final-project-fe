import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskItem: []
  // deadline: null,
  // error: null
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (store, action) => {
      store.taskItem = action.payload;
    }
    // addDeadline: (store, action) => {
    //   store.deadline = action.payload;
    // },
    // setErrors: (store, action) => {
    //   store.errors = action.payload;
    // }
  }
});

export default tasks;
