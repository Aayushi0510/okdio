import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  data: null,
  selected: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState: INIT_STATE,
  reducers: {
    actionBook: (state, action) => {
      state.data = action.payload;
      return state;
    },
    actionSelectedBook: (state, action) => {
      state.selected = action.payload;
      return state;
    },
  },
});

export const { actionBook, actionSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;
