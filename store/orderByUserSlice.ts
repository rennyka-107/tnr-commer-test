import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

interface State {
  contacts: any[];
}

const orderByUserSlice = createSlice({
  name: "@orderByUser",
  initialState,
  reducers: {
    setOrderByUser: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

export const { setOrderByUser } = orderByUserSlice.actions;

export default orderByUserSlice.reducer;
