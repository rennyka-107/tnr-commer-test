import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "utils/LocalStorage";
import { CompareParamsI } from "../pages/api/compareApi";

export interface comparePopUpItemI {
  thumbnail: string;
  projectName: string;
  name: string;
  productId: string;
  projectId: string;
  projectType: string;
}

interface ProductCompareI {
  compareParams: CompareParamsI[];
  compareItems: any[];
  comparePopUpItem: comparePopUpItemI[];
  isValid: boolean;
}

const initialState: ProductCompareI = {
  compareParams: [],
  compareItems: [],
  comparePopUpItem: LocalStorage.get("compare-item") ?? [],
  isValid: true,
};

export const productCompareSlice = createSlice({
  name: "productCompare",
  initialState,
  reducers: {
    getCompareParam: (state, action) => {
      state.compareParams = action.payload;
    },
    getCompareItem: (state, action) => {
      console.log(action.payload);
      state.compareItems = action.payload;
    },
    getComparePopUpItem: (state, action) => {
      LocalStorage.set("compare-item", action.payload);
      state.comparePopUpItem = action.payload;
    },
    removeCompareItem: (state, action) => {
      state.compareItems = state.compareItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    removeComparePopUpItem: (state, action) => {
      const items = state.comparePopUpItem.filter(
        (item) => item.productId !== action.payload
      );
      LocalStorage.set("compare-item", items);
      state.comparePopUpItem = items;
    },
    removeAllComparePopUpItem: (state, action) => {
      LocalStorage.remove("compare-item");
      state.comparePopUpItem = [];
    },
    setValidCompare: (state, action) => {
      state.isValid = action.payload;
    },
    setCompareUrl: (state, action) => {
      LocalStorage.set("compare-url", {
        projectId: action.payload.projectId,
        projectTypeId: action.payload.projectTypeId,
        priceTo: "20",
        priceFrom: "1",
        areaTo: "200",
        areaFrom: "30",
        categoryId: "",
      });
    },
  },
});

export const {
  getCompareParam,
  getCompareItem,
  getComparePopUpItem,
  removeCompareItem,
  removeComparePopUpItem,
  removeAllComparePopUpItem,
  setValidCompare,
} = productCompareSlice.actions;

export default productCompareSlice.reducer;
