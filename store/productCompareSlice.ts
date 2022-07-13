import { createSlice } from '@reduxjs/toolkit';
import { CompareParamsI } from "../pages/api/compareApi";

export interface comparePopUpItemI {
  thumbnail: string;
  projectName: string;
  name: string;
  productId: string;
}

interface ProductCompareI {
  compareParams: CompareParamsI[];
  compareItems: any[];
  comparePopUpItem: comparePopUpItemI[];
}

const initialState: ProductCompareI = {
  compareParams: [],
  compareItems: [],
  comparePopUpItem: [],
}

export const productCompareSlice = createSlice({
  name: "productCompare",
  initialState,
  reducers: {
    getCompareParam: (state, action) => {
      state.compareParams = action.payload;
    },
    getCompareItem: (state, action) => {
      state.compareItems = action.payload;
    },
    getComparePopUpItem: (state, action) => {
      state.comparePopUpItem = action.payload;
    },
    removeCompareItem: (state, action) => {
      state.compareItems = state.compareItems.filter(item => item.productId !== action.payload);
    },
    removeComparePopUpItem: (state, action) => {
      state.comparePopUpItem = state.comparePopUpItem.filter(item => item.productId !== action.payload);
    },
    removeAllComparePopUpItem: (state, action) => {
      state.comparePopUpItem = initialState.comparePopUpItem;
    }
  }
})

export const {
  getCompareParam,
  getCompareItem,
  getComparePopUpItem,
  removeCompareItem,
  removeComparePopUpItem,
  removeAllComparePopUpItem,
} = productCompareSlice.actions;

export default productCompareSlice.reducer;