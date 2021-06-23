/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';

const lists = createSlice({
  name: 'lists',
  initialState: {
    listTitle: [],
    tasks: [],
    errors: null
  },
  reducers: {
    setLists: (store, action) => {
      store.listTitle = action.payload;
    },
    addNewList: (store, action) => {
      store.listTitle = [...store.listTitle, action.payload]
    },
    // filter items with id (add task (push), remove task (pull), update listTitle (set))
    updateListWithCurrent: (store, action) => {
      const updatedList = store.listTitle.filter((item) => item._id !== action.payload._id);
      store.listTitle = [...updatedList, action.payload]
    },
    removeList: (store, action) => {
      const decreasedList = store.listTitle.filter((item) => item._id !== action.payload)
      store.listTitle = decreasedList
    },
    setTasks: (store, action) => {
      store.tasks = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default lists