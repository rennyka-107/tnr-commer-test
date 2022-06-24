import { createSlice } from "@reduxjs/toolkit";
import {
  MenuBar,
  MenuBarProjectType,
  MenuBarLocation,
  CategoryResponse,
} from "../src/interface/menuBarList";

interface InitialState {
  listMenuBarType: MenuBar[];
  listMenuBarProjectType: MenuBarProjectType[];
  listMenuLocation: MenuBarLocation[];
  listCategory: CategoryResponse[];
}
const initialState: InitialState = {
  listMenuBarType: [],
  listMenuBarProjectType: [],
  listMenuLocation: [],
  listCategory: [],
};

export const menuBarSlice = createSlice({
  name: "menubar",
  initialState,
  reducers: {
    getListMenuBarType: (state, action) => {
      const dataProject = [
        {
          id: "1",
          name: "Tất cả dự án",
        },
      ];
      const newDataProject = dataProject.concat(action.payload);
      state.listMenuBarType = newDataProject;
    },
    getListMenuBarProjectType: (state, action) => {
      const dataProjectType = [
        {
          id: "1",
          name: "Tất Cả",
          description: "mô tả tất cả các loại ",
          icon: "http://210.245.85.229:1983/static-data/5c979bae-249b-4b0a-880a-9729cb757a50/0c48b9c7-ddbc-491e-961a-1f0758e648a1/Project_Type/f6caa857-2d8f-421f-bff9-dc120640e745/can-ho-dich-vu.JPG",
          iconHover:
            "http://210.245.85.229:1983/static-data/dc98ba2c-3fc3-4484-9ac0-832f7184c606/0c48b9c7-ddbc-491e-961a-1f0758e648a1/can_ho_hover/f6caa857-2d8f-421f-bff9-dc120640e745/can_ho_hover.png",
          position: 0,

          code: "0",
          nameDisplay: "Tất Cả",
        },
      ];
      const newDataType = dataProjectType.concat(action.payload);
      state.listMenuBarProjectType = newDataType;
    },
    getListMenuLocation: (state, action) => {
      const dataLocation = [
        {
          syncFrom: "LANDSOFT",
          syncDate: "22-06-2022 23:00:14",
          ProvinceID: 1,
          ProvinceName: "Tất Cả Vị Trí",
        },
      ];
      const splice = action.payload.filter((item) => item.ProvinceID !== 1);
      const newData = dataLocation.concat(splice);
      state.listMenuLocation = newData;
    },
    getListCategory: (state, action) => {
      const dataCategory = [
        {
          id: "1",
          code: "All",
          name: "Tất cả",
        },
      ];
	  const spliceCategory = dataCategory.concat(action.payload);
	  state.listCategory = spliceCategory;
    },
  },
});

export const {
  getListMenuBarType,
  getListMenuBarProjectType,
  getListMenuLocation,
  getListCategory
} = menuBarSlice.actions;

export default menuBarSlice.reducer;
