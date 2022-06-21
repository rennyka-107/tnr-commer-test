import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  saveInfo: {};
  zenCodeQR: string;
}

const initialState = {
  saveInfo: {},
  zenCodeQR: "",
};

export const infoSlice = createSlice({
  name: "informationCustom",
  initialState,
  reducers: {
    saveInfo: (state, action) => {
      state.saveInfo = action.payload;
    },
    getCodeQR: (state, action) => {
      state.zenCodeQR = action.payload;
    },
  },
});

export const { saveInfo, getCodeQR } = infoSlice.actions;

export default infoSlice.reducer;
