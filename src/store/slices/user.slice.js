import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  data: null,
};

const userSlice = createSlice({
  name: "autos",
  initialState: INIT_STATE,
  reducers: {
    actionUser: (state, action) => {
      state.data = action.payload;
      return state;
    },
    actionCLearUser: (state, action) => {
      state.data = null;
      return state;
    },
  },
});

export const { actionUser, actionCLearUser } = userSlice.actions;

export default userSlice.reducer;
