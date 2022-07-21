import { createSlice } from "@reduxjs/toolkit";
import { ProjectTypeParamsI } from "interface/paramResponse";
interface InitialState {
  projectTypeListResponse: ProjectTypeParamsI[];
  projectListResponse:  ProjectTypeParamsI[];
}

const initialState: InitialState = {
  projectTypeListResponse: [ ],
  projectListResponse:  [
    {
      name: "",
      id: "",
    },
  ],
};

export const paramsSearchSlice = createSlice({
  name: "paramsearch",
  initialState,
  reducers: {
    getListProjectTypeResponse: (state, action) => {
      state.projectTypeListResponse = action.payload;
    },
	getListProjectResponse: (state, action) => {
		state.projectListResponse = action.payload;
	  },
  },
});

export const { getListProjectTypeResponse ,getListProjectResponse} = paramsSearchSlice.actions;

export default paramsSearchSlice.reducer;
