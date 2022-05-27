import { createSlice } from "@reduxjs/toolkit";
import { PTGResponse, ProductsResponse } from "../src/interface/product";

interface initialState {
  listProductResponse: ProductsResponse[];
  productItem: PTGResponse;
}
const initialState = {
  listProductResponse: [],
  productItem: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProduct: (state, action) => {
      state.listProductResponse = action.payload;
    },
    getProductPTG: (state, action) => {
      state.productItem = action.payload;
    },
  },
});

export const { getProductPTG,getListProduct } = productSlice.actions;

export default productSlice.reducer;
