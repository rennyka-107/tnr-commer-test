import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  ProjectInfomation: any & {
    id: string;
  };
  ListLevel: any[];
  Target: any;
  ListChild: any[];
  GeoJsonData: {
    type: string;
    features: any[];
  };
}
const initialState: InitialState = {
  ProjectInfomation: {
    id: "",
  },
  ListLevel: [],
  Target: null,
  ListChild: [],
  GeoJsonData: {
    type: "FeatureCollection",
    features: [],
  },
};

export const projectMapSlice = createSlice({
  name: "projectMap",
  initialState,
  reducers: {
    setListLevel: (state, { payload }) => {
      state.ListLevel = payload;
    },
    setProjectInfomation: (state, { payload }) => {
      state.ProjectInfomation = payload;
    },
    setTarget: (state, { payload }) => {
      state.Target = payload;
    },
    setListChild: (state, { payload }) => {
      state.ListChild = payload;
    },
    setGeoJsonData: (state, { payload }) => {
      state.GeoJsonData.features = payload;
    },
   
  },
});

export const {
  setListLevel,
  setProjectInfomation,
  setTarget,
  setListChild,
  setGeoJsonData,
} = projectMapSlice.actions;

export default projectMapSlice.reducer;
