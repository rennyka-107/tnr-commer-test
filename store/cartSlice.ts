import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "utils/LocalStorage";
interface InitialState {
  cart: any;
  codeInfo: string | null;
  codeDiscount?: string[];
}

const initialState: InitialState = {
  cart: {},
  codeInfo: null,
  codeDiscount: [],
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
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
