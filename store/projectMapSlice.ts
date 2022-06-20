import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  ProjectInformation: any & {
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
  TargetShape: any;
  ArrayImgMap: any[]
}
const initialState: InitialState = {
  ProjectInformation: {
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
  TargetShape: null,
  ArrayImgMap: []
};

export const projectMapSlice = createSlice({
  name: "projectMap",
  initialState: initialState,
  reducers: {
    setListLevel: (state, { payload }) => {
      state.ListLevel = payload;
    },
    setProjectInformation: (state, { payload }) => {
      state.ProjectInformation = payload;
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
    resetProjectMap: (state) => {
      Object.assign(state, initialState);
    },
    setTargetShape: (state, { payload }) => {
      state.TargetShape = payload;
    },
    setArrayImgMap: (state, { payload }) => {
      state.ArrayImgMap = payload;
    },
  },
});

export const {
  setListLevel,
  setProjectInformation,
  setTarget,
  setListChild,
  setGeoJsonData,
  setImgMap,
  resetProjectMap,
  setTargetShape,
  setArrayImgMap
} = projectMapSlice.actions;

export default projectMapSlice.reducer;
