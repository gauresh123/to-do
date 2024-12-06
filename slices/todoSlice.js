import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  val: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    add: (state, action) => {
      state.val.push(...action.payload);
    },
    remove: (state, action) => {
      let a = state.val.filter((itm) => itm.id !== action.payload);
      state.val = a;
    },
    addSingleTodo: (state, action) => {
      state.val.unshift(action.payload);
    },
  },
});

export const { add, remove, addSingleTodo } = todoSlice.actions;

export default todoSlice.reducer;
