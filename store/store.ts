import { GeneralInfo } from "./../pages/api/contactApi";
import { combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Action } from "redux";
import menubar from "./menuBarSlice";
import payments from "./paymentSlice";
import products from "./productSlice";
import projects from "./projectSlice";
import carts from "./cartSlice";
import projectMap from "./projectMapSlice";
import searchs from "./searchSlice";
import userManual from "./userManualSlice";
import profile from "./profileSlice";
import shortcut from "./shortcut";
import infoCms from "./infoCmsSlice";
import salePolicy from "./salePolicySlice";
import productCompareSlice from "./productCompareSlice";
import notification from "./notificationSlice";
import specialoffers from "./SpecialOffersSlice";
import banners from "./bannerSlice";
import favourites from "./productFavouriteSlice";
import sendRequest from "./sendRequestSlice";
import paramsSearch from "./paramsSearchSlice";
import generalInfo from "./generalInfoSlice";
import orderByUser from "./orderByUserSlice";
import { TypedUseSelectorHook } from "react-redux";

const combinedReducer = combineReducers({
  menubar,
  products,
  projects,
  payments,
  carts,
  projectMap,
  searchs,
  userManual,
  profile,
  shortcut,
  infoCms,
  salePolicy,
  productCompareSlice,
  notification,
  specialoffers,
  banners,
  favourites,
  sendRequest,
  paramsSearch,
  generalInfo,
  orderByUser,
});

export type RootState = ReturnType<typeof combinedReducer>;
const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      menubar: {
        menubarList: action.payload.menubar.listMenuBarType,
        menuBarProjectList: action.payload.menubar.listMenuBarProjectType,
        listMenuLocation: action.payload.menubar.listMenuLocation,
        listCategory: action.payload.menubar.listCategory,
        ...action.payload.menubar,
      },
      products: {
        listProductResponse: action.payload.products.listProductResponse,
        productItem: action.payload.products.productItem,
        productByID: action.payload.products.productByID,
        productTopByOutStanding:
          action.payload.products.productTopByOutStanding,
        totalElement: action.payload.searchs.totalElement,
      },
      projects: {
        listProjectResponse: action.payload.projects.listProjectResponse,
        listTabsProject: action.payload.projects.listTabsProject,
      },
      payments: {
        ...action.payload.payments,
      },
      carts: {
        ...action.payload.carts,
      },
      projectMap: {
        ...action.payload.projectMap,
      },
      searchs: {
        SearchHomeLocation: action.payload.searchs.SearchHomeLocation,
        totalElement: action.payload.searchs.totalElement,
      },
      userManual: {
        listUserManual: action.payload.userManual.listUserManual,
        userManualById: action.payload.userManual.userManualById,
      },
      profile: {
        updateInfo: action.payload.profile.updateInfoResponse,
        userInfo: action.payload.profile.userInfo,
        infoCms: {
          saveInfo: action.payload.saveInfo,
          getCodeQR: action.payload.getCodeQR,
        },
        transationList: action.payload.transationList,
      },
      shortcut: {
        ...action.payload.shortcut,
      },
      salePolicy: {
        ...action.payload.salePolicy,
      },
      productCompareSlice: {
        ...action.payload.productCompareSlice,
      },
      notification: {
        ...action.payload.notification,
      },
      specialoffers: {
        ...action.payload.specialoffers,
      },
      banners: {
        ...action.payload.banners,
      },
      favourites: {
        ...action.payload.favourites,
      },
      sendRequest: {
        ...action.payload.sendRequest,
      },
      paramsSearch: {
        ...action.payload.paramResponse,
      },
      generalInfo: {
        ...action.payload.generalInfo,
      },
      orderByUser: {
        ...action.payload.orderByUser,
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
let store: ReturnType<typeof configureStore>;

export const makeStore = () => {
  store = configureStore({
    reducer: masterReducer,
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
export { store };
