import { createSlice } from "@reduxjs/toolkit";
import { PaymentListResponse } from "interface/payment";

interface initialState {
  listPaymentById: PaymentListResponse[];

}
const initialState = {
	listPaymentById: [],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getListPayment: (state, action) => {
      state.listPaymentById = action.payload;
    },
  },
});

export const { getListPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
