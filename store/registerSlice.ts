import { createSlice } from "@reduxjs/toolkit";
import { RegisterResponse } from "interface/register";

interface initialState {
    registerResponse: RegisterResponse[];

}
const initialState = {
	registerResponse: [],
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerAcc: (state, action) => {
      state.registerResponse = action.payload;
    },
  },
});

export const { registerAcc } = registerSlice.actions;

export default registerSlice.reducer;
