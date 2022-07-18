import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	listCustomer: any[]
}
const initialState: InitialState = {
	listCustomer: []
};

export const sendRequestSlice = createSlice({
  name: "sendRequest",
  initialState,
  reducers: {
	setListCustomer: (state, action) => {
		state.listCustomer = action.payload
	}
  },
});

export const { setListCustomer } = sendRequestSlice.actions;

export default sendRequestSlice.reducer;
