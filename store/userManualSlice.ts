import { createSlice } from "@reduxjs/toolkit";
import { responseUserManual, userManualByID,userManualContent } from "../src/interface/userManual";

interface initialState {
  listUserManual: responseUserManual[];
  userManualById: userManualByID
}
const initialState = {
  listUserManual: [],
  userManualById:{
	userManualContent: {
		content: ''
	}
  }
};

export const userManualSlice = createSlice({
  name: "usermanual",
  initialState,
  reducers: {
    getListUserManual: (state, action) => {
      state.listUserManual = action.payload;
    },
	getUserManualById: (state, action) => {
		state.userManualById = action.payload
	}
  },
});

export const { getListUserManual,getUserManualById } = userManualSlice.actions;

export default userManualSlice.reducer;
