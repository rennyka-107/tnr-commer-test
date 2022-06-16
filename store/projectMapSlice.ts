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
  ImgMap: string | null;
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
  ImgMap: null,
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
    setImgMap: (state, { payload }) => {
      state.ImgMap = payload;
    },
  },
});

export const {
  setListLevel,
  setProjectInfomation,
  setTarget,
  setListChild,
  setGeoJsonData,
  setImgMap,
} = projectMapSlice.actions;

export default projectMapSlice.reducer;
