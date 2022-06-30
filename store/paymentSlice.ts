import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  listPayment: any[];
  qrCode: string;
  uploadMedia: [];
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
    listUserIdDelete: string[];
    paymentMediaList: any[];
  };
}
const initialState: InitialState = {
  listPayment: [],
  qrCode: "",
  uploadMedia: [],
  data: {
    productId: "",
    paymentMethodId: "",
    paymentIdentityInfos: [
      {
        mainUser: 1,
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
    paymentStatus: 0,
    listUserIdDelete: [],
    paymentMediaList: []
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
    setUploadMedia: (state, action) => {
      state.uploadMedia = action.payload;
    },
  },
});

export const { setListPayment, setQrCode, setData, setUploadMedia } = paymentSlice.actions;

export default paymentSlice.reducer;
