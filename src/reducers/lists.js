import { createSlice } from '@reduxjs/toolkit';

const lists = createSlice({
  name: 'lists',
  initialState: {
    list: [],
    errors: null
  },
  reducers: {
    setLists: (store, action) => {
      store.list = action.payload;
    },
    addNewList: (store, action) => {
      store.list = [...store.list, action.payload]
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default lists