import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  data: null,
  selected: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: INIT_STATE,
  reducers: {
    actionTeacher: (state, action) => {
      state.data = action.payload;
      return state;
    },
    actionSelectedTeacher: (state, action) => {
      state.selected = action.payload;
      return state;
    },
  },
});

export const { actionTeacher, actionSelectedTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;
