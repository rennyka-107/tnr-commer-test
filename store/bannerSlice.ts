import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "utils/LocalStorage";
interface InitialState {

  bannerList?: any[];
}

const initialState: InitialState = {

	bannerList: [],
};

export const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    getBanner: (state, action) => {
      state.bannerList = action.payload;
    },

  },
});

export const { getBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
