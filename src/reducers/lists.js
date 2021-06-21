/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';

// const initialState = localStorage.getItem('lists')
//   ? {
//     list: JSON.parse(localStorage.getItem('lists')).username,
//     tasks: JSON.parse(localStorage.getItem('lists')).accessToken,
//     errors: null
//   }
//   : {
//     list: [],
//     tasks: [],
//     errors: null
//   }

const lists = createSlice({
  name: 'lists',
  initialState: {
    list: [], // same name as in BE - change to listName
    tasks: [],
    errors: null
  },
  reducers: {
    setLists: (store, action) => {
      store.list = action.payload;
    },
    addNewList: (store, action) => {
      store.list = [...store.list, action.payload]
    },
    updateListWithCurrent: (store, action) => {
      const decreasedList = store.list.filter((item) => item._id === action.payload);
      store.list = [...decreasedList, action.payload]
    },
    removeList: (store, action) => {
      const decreasedList = store.list.filter((item) => item._id === action.payload)
      store.list = decreasedList
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