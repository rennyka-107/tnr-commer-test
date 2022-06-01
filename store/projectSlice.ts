import { createSlice } from "@reduxjs/toolkit";
import { TabProjectResponse } from "type/common";
import { ProjectResponse } from "../src/interface/project";

interface initialState {
  listProjectResponse: ProjectResponse[];
  listTabsProject: TabProjectResponse[]

}
const initialState = {
	listProjectResponse: [],
	listTabsProject:[]
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getListProject: (state, action) => {
      state.listProjectResponse = action.payload;
    },
	getListTabsProject: (state,action) => {
		state.listTabsProject = action.payload
	}
  },
});

export const { getListProject,getListTabsProject } = projectSlice.actions;

export default projectSlice.reducer;
