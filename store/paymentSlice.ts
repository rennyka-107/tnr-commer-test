import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  listPayment: any[];
  qrCode: string;

}
const initialState: InitialState = {
	listPayment: [],
  qrCode: ""
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setListPayment: (state, action) => {
      state.listPayment = action.payload;
    },
    setQrCode: (state, action) => {
      state.qrCode = action.payload;
    },
  },
});

export const { setListPayment, setQrCode } = paymentSlice.actions;

export default paymentSlice.reducer;
