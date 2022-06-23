import { createSlice } from "@reduxjs/toolkit";
import { BodyResponseSalePolicy } from "interface/register";

interface InitialState {
	listSalePolicy : BodyResponseSalePolicy[]
}

const initialState : InitialState = {
	listSalePolicy: [],
}

export const salePolicySlice = createSlice({
	name: 'salePolicy',
	initialState,
	reducers: {
		getListSalePolicy: (state,action) => {
			state.listSalePolicy = action.payload;
		},
	},
});

export const {getListSalePolicy} = salePolicySlice.actions;

export default salePolicySlice.reducer;