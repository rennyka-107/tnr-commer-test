import { createSlice } from "@reduxjs/toolkit";
import { RegisterResponse } from "interface/register";
import { searchLocationResponse } from "interface/searchIF";

interface initialState {
    SearchHomeLocation: searchLocationResponse[];
	totalElement: number
}
const initialState = {
	SearchHomeLocation: [],
	totalElement:0
};

export const searchSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    getSearchHomeLocation: (state, action) => {
      state.SearchHomeLocation = action.payload;
    },
	getPaggingSearch: (state, action) => {
		state.totalElement = action.payload
	}
  },
});

export const { getSearchHomeLocation,getPaggingSearch } = searchSlice.actions;

export default searchSlice.reducer;
