import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  cart: any;
  codeInfo: string | null;
  codeDiscount?: string[];
}

interface KeyItem {
  createAt: string;
  description: string;
  id: string;
  systemKey: string;
  systemValue: string;
  valueType: number;
}

type State = Record<string, any>;

const initialState: State = {};

const generalInfoSlice = createSlice({
  name: "@generalInfo",
  initialState,
  reducers: {
    setGeneralInfo: (state, action) => {
      action.payload.forEach((keyItem: KeyItem) => {
        state[keyItem.systemKey] = keyItem.systemValue;
      });
    },
    getGeneralInfo: (state) => {
      return state;
    },
  },
});

export const { setGeneralInfo, getGeneralInfo } = generalInfoSlice.actions;

export default generalInfoSlice.reducer;
