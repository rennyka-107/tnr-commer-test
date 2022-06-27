import { createSlice } from "@reduxjs/toolkit";
import { BodyResponseSalePolicy, BodySalePolicy } from "interface/register";

interface InitialState {
  listSalePolicy: BodyResponseSalePolicy[];
  policyById: BodySalePolicy;
}

const initialState: InitialState = {
  listSalePolicy: [],
  policyById: {
    id: "",
    name: "",
    project: "",
    projectId: "",
    content: "",
  },
};

export const salePolicySlice = createSlice({
  name: "salePolicy",
  initialState,
  reducers: {
    getListSalePolicy: (state, action) => {
      state.listSalePolicy = action.payload.content;
    },
	getPolicyById: (state, action) => {
		state.policyById = action.payload;
	}
  },
});

export const { getListSalePolicy,getPolicyById } = salePolicySlice.actions;

export default salePolicySlice.reducer;
