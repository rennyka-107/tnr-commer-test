import { createSlice } from '@reduxjs/toolkit';
import { CompareParamsI } from "../pages/api/compareApi";

interface ProductCompareI {
  compareParams: CompareParamsI[];
}

const initialState: ProductCompareI = {
  compareParams: [],
}

export const productCompareSlice = createSlice({
  name: "productCompare",
  initialState,
  reducers: {
    getCompareParam: (state, action) => {
      state.compareParams = action.payload;
    }
  }
})

export const {
  getCompareParam,
} = productCompareSlice.actions;

export default productCompareSlice.reducer;