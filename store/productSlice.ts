import { createSlice } from "@reduxjs/toolkit";
import {
  PTGResponse,
  ProductsResponse,
  ResponseSearchById,
  TBOUTStanding,
} from "../src/interface/product";

interface initialState {
  listProductResponse: ProductsResponse[];
  productItem: PTGResponse;
  productByID: ResponseSearchById[];
  productFavorite: TBOUTStanding[];
  productFavoriteType: any[];
  productTopByOutStanding: TBOUTStanding[];
  totalElement: number;
}
const initialState = {
  listProductResponse: [],
  totalElement: 0,
  productItem: {
    DepositMoney: 0,
    DepositMoneyMin: 0,
    ListPolicy: [],
    ListPromotion: [],
    ListSchedule: [],
    MaintainanceFee: null,
    LandPrice: 0,
    BuildPrice: 0,
    BuildMoney: 0,
    LandMoney: 0,
    ProductPrice: null,
    ProductQuotation: null,
    PromotionMoney: null,
    TotalMoney: null,
    TotalMoneyText: "",
    VAT: 0,
    MaintenanceFee: 0,
    PreTotalMoney: 0,
    priceId: null,
    scheduleId: "",
	TimeOfPayment: 0,
	TimeOfPaymentUnit: ""
  },
  productByID: {
    id: "adf68c39-c5b3-4a80-b806-a2b8a840d4c4",
    name: "Lô A2",
    landArea: 1,
    numBed: 1,
    numBath: 1,
    doorDirection: "Tây",
    airConditioner: 0,
    swimmingPool: 0,
    gym: 0,
    projectLevelDetail: null,
    status: 0,
    apartmentModel: {
      id: "70ee43e5-e8f5-4777-b115-00b5910b4753",
      project: "d76bdba6-1826-412a-a7d1-7450e8fb3978",
      name: "mẫu căn hộ  TNR",
      numBed: 6,
      numBath: 41,
      landArea: 340,
      unitArea: 56,
      direction: "null",
      image: "C:\\file-upload\\1 - Copy.jpg",
      description: "null",
      dcreatedAt: null,
      dupdatedAt: "27-05-2022",
      screatedBy: null,
      supdatedBy: null,
      nstatus: 0,
    },
    lotSymbolLegal: "LOT1",
    lotSymbolCommercial: "Lot1",
    project: {
      id: "3c530b64-3b0c-4037-a206-e05a43ca5e9c",
      name: "TNR Star Lam Sơn",
      location: "Hải Phòng",
      constructArea: 1.2,
      density: 3.4,
      type: "0c48b9c7-ddbc-491e-961a-1f0758e648a2",
      scale: "Quy mô hàng Tỉnh",
      funcDivision: "Phân khu tiểu khu 1",
      ownership: "TNR",
      description: "Mô tả",
      avatar: "https://i.imgur.com/WRpzJQE.jpg",
      code: "TL001",
      tradeName: "TVT001",
      abbreviationName: "TVT001",
      status: "1",
      commune: "Xã 1",
      district: "Huy?n 1",
      provincial: "Tỉnh 1",
      modifyDate: null,
      lsName: null,
    },
    homeNum: "4",
    wallArea: 80,
    clearArea: 100,
    price: 3000000000,
    unitPrice: 3400000,
    thongTinDuAn: {
      id: "3c530b64-3b0c-4037-a206-e05a43ca5e9c",
      name: "TNR Star Lam Sơn",
      location: "Hải Phòng",
      constructArea: 1.2,
      density: 3.4,
      type: "0c48b9c7-ddbc-491e-961a-1f0758e648a2",
      scale: "Quy mô hàng Tỉnh",
      funcDivision: "Phân khu tiểu khu 1",
      ownership: "TNR",
      description: "Mô tả",
      avatar: "https://i.imgur.com/WRpzJQE.jpg",
      code: "TL001",
      tradeName: "TVT001",
      abbreviationName: "TVT001",
      status: "1",
      commune: "Xã 1",
      district: "Huy?n 1",
      provincial: "Tỉnh 1",
      modifyDate: null,
      lsName: null,
    },
    outstanding: 1,
    carpetPrice: 1000000,
    totalVatPrice: 3500000000,
    constructPrice: 340000000,
    unitVatMaintainPrice: 3600000000,
    totalPrice: 4000000000,
    vat: 12000000,
    maintainPrice: 12000000,
    idMapper: 1,
    syncFrom: "LANDSOFT",
    productNo: "NHA_1",
    productTypeId: 1,
    balconyDirection: "S",
    buildArea: 120,
    floorNum: 3,
    isCornerApartment: 1,
    idls: null,
    floor: null,
    productByID: "",
  },
  productTopByOutStanding: [],
  productFavorite: [],
  productFavoriteType: [],
  productLocation: [],
  productCondition: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProduct: (state, action) => {
      state.listProductResponse = action.payload;
    },
    getProductPTG: (state, action) => {
      state.productItem = action.payload;
    },
    getProductById: (state, action) => {
      state.productByID = action.payload;
    },
    getListProductTopByOS: (state, action) => {
      state.productTopByOutStanding = action.payload;
    },
    getProductFavorite: (state, action) => {
      state.productFavorite = action.payload;
    },
    getProductType: (state, action) => {
      state.productFavoriteType = action.payload;
    },
    getProductLocation: (state, action) => {
      state.productLocation = action.payload;
    },
    getProductOrderCondition: (state, action) => {
      state.productCondition = action.payload;
    },
    getPaggingProductSearch: (state, action) => {
      state.totalElement = action.payload;
    },
  },
});

export const {
  getProductPTG,
  getListProduct,
  getProductById,
  getListProductTopByOS,
  getProductFavorite,
  getProductType,
  getProductLocation,
  getProductOrderCondition,
  getPaggingProductSearch,
} = productSlice.actions;

export default productSlice.reducer;
