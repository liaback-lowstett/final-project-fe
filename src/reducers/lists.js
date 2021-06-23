/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';

const lists = createSlice({
  name: 'lists',
  initialState: {
    listTitle: [], // list
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
    updateListWithCurrent: (store, action) => {
      const decreasedList = store.listTitle.filter((item) => item._id !== action.payload._id);
      store.listTitle = [...decreasedList, action.payload]
    },
    removeList: (store, action) => {
      const decreasedList = store.listTitle.filter((item) => item._id !== action.payload)
      store.listTitle = decreasedList
    },
    setTasks: (store, action) => {
      store.tasks = action.payload;
    },
    // removeTask: (store, action) => {
    //   const decreasedList = store.task.filter((item) => item._id === action.payload)
    //   store.task = decreasedList
    // },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default lists