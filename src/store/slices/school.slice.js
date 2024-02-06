import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  data: null,
  selected: null,
};

const schoolSlice = createSlice({
  name: "school",
  initialState: INIT_STATE,
  reducers: {
    actionSchool: (state, action) => {
      state.data = action.payload;
      return state;
    },
    actionSelectedSchool: (state, action) => {
      state.selected = action.payload;
      return state;
    },
  },
});

export const { actionSchool, actionSelectedSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
