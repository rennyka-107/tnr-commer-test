import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  payload: any;
}

const initialState: InitialState = {
  payload: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.payload = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
