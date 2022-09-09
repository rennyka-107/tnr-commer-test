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
    scheduleId: string | null | number;
    referenceCode: string | null;
    priceId: string | null | number;
  };
  referenceCode: string | null;
  fileIdNumberFront: {
    file: File | string | null;
    path: string | null;
    name: string | null;
  };
  fileIdNumberBehind: {
    file: File | string | null;
    path: string | null;
    name: string | null;
  };
  fileIdNumberHouseHold: {
    file: File | string | null;
    path: string | null;
    name: string | null;
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
        provinceContactName: "",
        districtContactName: "",
        communeContactName: "",
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
    paymentMediaList: [],
    scheduleId: "",
    priceId: "",
    referenceCode: "",
  },
  referenceCode: null,
  fileIdNumberFront: { file: null, path: "", name: "" },
  fileIdNumberBehind: { file: null, path: "", name: "" },
  fileIdNumberHouseHold: { file: null, path: "", name: "" },
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
    setReferenceCode: (state, action) => {
      state.referenceCode = action.payload;
    },
    setFileFinishTransaction: (state, { payload: { type, file } }) => {
      switch (type) {
        case 0:
          state.fileIdNumberFront = file;
          return;
        case 1:
          state.fileIdNumberBehind = file;
          return;
        case 2:
          state.fileIdNumberHouseHold = file;
          return;
      }
    },
    resetAllFileFinishTransaction: (state) => {
      state.fileIdNumberFront = { file: null, path: "", name: "" };
      state.fileIdNumberBehind = { file: null, path: "", name: "" };
      state.fileIdNumberHouseHold = { file: null, path: "", name: "" };
    },
  },
});

export const {
  setListPayment,
  setQrCode,
  setData,
  setUploadMedia,
  setReferenceCode,
  setFileFinishTransaction,
  resetAllFileFinishTransaction
} = paymentSlice.actions;

export default paymentSlice.reducer;
