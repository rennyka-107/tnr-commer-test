import { createSlice } from "@reduxjs/toolkit";
import { UpdateInfoResponse } from "interface/infoCustomer";

interface initialState {
  updateInfoResponse: UpdateInfoResponse[];
  userInfo: UpdateInfoResponse;
}
const initialState = {
  updateInfoResponse: [],
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
  },
});

export const { changeProfile, getUserInfo } = changeInfoSlice.actions;

export default changeInfoSlice.reducer;
