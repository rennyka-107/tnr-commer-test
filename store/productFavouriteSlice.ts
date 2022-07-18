import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  checkUp: boolean;
  listFavouriteByUser: any[];
}

const initialState: InitialState = {
	checkUp: false,
	listFavouriteByUser:[]
};

export const productFavouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setProductFavourite: (state, action) => {
		// console.log(action)
      state.checkUp = action.payload;
    },
	getListFavouriteByUser: (state, action) => {
		state.listFavouriteByUser = action.payload
	}
  },
});

export const { setProductFavourite ,getListFavouriteByUser} = productFavouriteSlice.actions;

export default productFavouriteSlice.reducer;
