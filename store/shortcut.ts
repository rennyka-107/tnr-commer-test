import { createSlice } from "@reduxjs/toolkit";
export type typeShortcut='BANG_HANG'|'HUONG_DAN_OL';
interface InitialState {
  title: string;
  typeAction:typeShortcut;
}

const initialState: InitialState = {
  title:"Bảng hàng trực tuyến",
  typeAction:'BANG_HANG'
};

export const shortcut = createSlice({
  name: "shortcut",
  initialState,
  reducers: {
    setShortcut: (state, action) => {
      state.title = action.payload.title;
      state.typeAction = action.payload.typeAction;
    },
  },
});

export const {setShortcut} = shortcut.actions;

export default shortcut.reducer;
