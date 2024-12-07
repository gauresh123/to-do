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
    addSingleTodo: (state, action) => {
      state.val.unshift(action.payload);
    },
    update: (state, action) => {
      action.payload.forEach((newItem) => {
        const index = state.val.findIndex((item) => item.id === newItem.id);
        if (index !== -1) {
          state.val[index] = { ...state.val[index], ...newItem };
        }
      });
    },
  },
});

export const { add, addSingleTodo, update } = todoSlice.actions;

export default todoSlice.reducer;
