import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  data: null,
  selected: null,
  teacherClasses: null,
};

const classesSlice = createSlice({
  name: "classes",
  initialState: INIT_STATE,
  reducers: {
    actionClasses: (state, action) => {
      state.data = action.payload;
      return state;
    },
    actionSelectedClasses: (state, action) => {
      state.selected = action.payload;
      return state;
    },
    actionTeacherClasses: (state, action) => {
      state.teacherClasses = action.payload;
      return state;
    },
  },
});

export const { actionClasses, actionSelectedClasses, actionTeacherClasses } =
  classesSlice.actions;

export default classesSlice.reducer;
