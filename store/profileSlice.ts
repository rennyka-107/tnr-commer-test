import { createSlice } from "@reduxjs/toolkit";
import { ResponseTrans, UpdateInfoResponse } from "interface/infoCustomer";

interface initialState {
  updateInfoResponse: UpdateInfoResponse[];
  userInfo: UpdateInfoResponse;
  transationList: ResponseTrans[];
}
const initialState = {
  updateInfoResponse: [],
  transationList: [],
  userInfo: {
    customerTypeId: "",
    appellation: "",
    fullname: "",
    birth: "",
    phone: "",
    email: "",
    idNumber: "",
    idReceivePlace: "",
    idReceiveDate: "",
    domicile: "",
    address: "",
    avatar: "",
    avatarThumbnailUrl: "",
    attachPaper: "",
    attachPaperThumbnailUrl: "",
    district: "",
    province: "",
  },
};

export const changeInfoSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      state.updateInfoResponse = action.payload;
    },
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    getTransactionByUser: (state, action) => {
      state.transationList = action.payload;
    },
  },
});

export const { changeProfile, getUserInfo,getTransactionByUser } = changeInfoSlice.actions;

export default changeInfoSlice.reducer;
