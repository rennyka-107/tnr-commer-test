import { createSlice } from "@reduxjs/toolkit";
import { ProjectResponse } from "../src/interface/project";

interface initialState {
  listProjectResponse: ProjectResponse[];

}
const initialState = {
	listProjectResponse: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getListProject: (state, action) => {
      state.listProjectResponse = action.payload;
    },
  },
});

export const { getListProject } = projectSlice.actions;

export default projectSlice.reducer;
