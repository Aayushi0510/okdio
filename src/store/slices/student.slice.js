import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  data: null,
  selected: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState: INIT_STATE,
  reducers: {
    actionStudent: (state, action) => {
      state.data = action.payload;
      return state;
    },
    actionSelectedStudent: (state, action) => {
      state.selected = action.payload;
      return state;
    },
  },
});

export const { actionStudent, actionSelectedStudent } = studentSlice.actions;

export default studentSlice.reducer;
