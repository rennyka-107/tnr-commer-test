import {
  combineReducers,
  configureStore,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { Action } from "redux";

import menubar from "./menuBarSlice";
import products from './productSlice';
import projects from './projectSlice'

const combinedReducer = combineReducers({
  menubar,
  products,
  projects
});
export type RootState = ReturnType<typeof combinedReducer>
const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      menubar: {
        menubarList: action.payload.menubar.listMenuBarType,
		menuBarProjectList: action.payload.menubar.listMenuBarProjectType
      },
	  products:{
		listProductResponse: action.payload.products.listProductResponse,
		productItem: action.payload.products.productItem
	  },
	  projects: {
		listProjectResponse: action.payload.projects.listProjectResponse
	  }
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
