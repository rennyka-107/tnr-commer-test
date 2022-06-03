import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  getCart: {};
  codeInfo: string | null;
  codeDiscount?: string[];
}

const initialState = {
  getCart: {},
  codeInfo: null,
  codeDiscount: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.getCart = action.payload;
    },
    getCodeInfo: (state, action) => {
      state.codeInfo = action.payload;
    },
    getCodeDiscount: (state, action) => {
      state.codeDiscount = action.payload;
    },
  },
});

export const { getCart, getCodeInfo, getCodeDiscount } = cartSlice.actions;

export default cartSlice.reducer;
