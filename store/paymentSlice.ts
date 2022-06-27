import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  listPayment: any[];
  qrCode: string;
  data: {
    productId: string;
    paymentMethodId: string;
    paymentIdentityInfos: any[];
    quotationRealt: {
      landPrice: string;
      vat: string;
      maintainPrice: string;
      totalPrice: string;
      sales: string;
      nppDiscount: string;
      totalOnlinePrice: string;
      minEarnestMoney: string;
      regulationOrderPrice: string;
    };
    deposite: string | null;
    totalDeposite: string | null;
    paymentFlag: number;
    production: any;
    paymentStatus: number;
  };
}
const initialState: InitialState = {
  listPayment: [],
  qrCode: "",
  data: {
    productId: "",
    paymentMethodId: "",
    paymentIdentityInfos: [
      {
        customerTypeId: "",
        vocativeId: "",
        fullname: "",
        dob: "",
        phoneNumber: "",
        email: "",
        idNumber: "",
        issueDate: "",
        issuePlace: "",
        permanentAddress: "",
        contactAddress: "",
        province: "",
        district: "",
      },
    ],
    quotationRealt: {
      landPrice: "",
      vat: "",
      maintainPrice: "",
      totalPrice: "",
      sales: "",
      nppDiscount: "",
      totalOnlinePrice: "",
      minEarnestMoney: "",
      regulationOrderPrice: "",
    },
    deposite: null,
    totalDeposite: null,
    paymentFlag: 0,
    production: null,
    paymentStatus: 0
  },
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
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setListPayment, setQrCode, setData } = paymentSlice.actions;

export default paymentSlice.reducer;
