import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  listCustomer: any[];
  orderDetail: any;
}
const initialState: InitialState = {
  listCustomer: [],
  orderDetail: null,
};

export const sendRequestSlice = createSlice({
  name: "sendRequest",
  initialState,
  reducers: {
    setListCustomer: (state, action) => {
      state.listCustomer = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDetail = action.payload;
    },
  },
});

export const { setListCustomer, setOrderDetail } = sendRequestSlice.actions;

export default sendRequestSlice.reducer;
