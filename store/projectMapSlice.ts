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
  ArrayImgMap: any[];
  ListTarget: any[];
  lstOffers: any[];
  Resize: string;
  OldTarget: any;
  openModalSale: boolean;
  ListChildTarget: any[]
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
  lstOffers: [],
  ArrayImgMap: [],
  ListTarget: [],
  Resize: "",
  OldTarget: null,
  openModalSale: true,
  ListChildTarget: []
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
    setListTarget: (state, { payload }) => {
      state.ListTarget = payload;
    },
    setResize: (state, { payload }) => {
      state.Resize = payload;
    },
    setOldTarget: (state, { payload }) => {
      state.OldTarget = payload;
    },
    setOpenModalSale: (state, {payload}) => {
      state.openModalSale = payload;
    },
    setListChildTarget: (state, {payload}) => {
      state.ListChildTarget = payload;
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
  setArrayImgMap,
  setListTarget,
  setResize,
  setOldTarget,
  setOpenModalSale,
  setListChildTarget
} = projectMapSlice.actions;

export default projectMapSlice.reducer;
