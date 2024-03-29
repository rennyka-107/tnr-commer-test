export interface PTGType {
  ProjectName: string;
  BlockName: string;
  ProductName: string;
  DepositDate: string;
  IsMortgage: boolean;
  GroupCusID: number;
  ProvinceID: number;
  DistrictID: number;
  PriceID: number;
}

interface ListPolicyType {
  PolicyID?: number;
  PolicyName?: string;
}
interface ListPromotionType {
  PromotionID?: number;
  PromotionName?: string;
  Value?: string;
  Amount?: string;
}
interface ListScheduleType {
  ScheduleID?: number;
  ScheduleName?: string;
}
export interface PTGResponse {
  DepositMoney?: number;
  DepositMoneyMin?: number;
  PromotionMoney?: string;
  ApartmentPrice?: string;
  LandPrice?: string;
  PreLandPrice?: number;
  BuildPrice?: string;
  PreBuildPrice?: number;
  LandMoney?: string;
  PreLandMoney?: number;
  BuildMoney?: string;
  PreBuildMoney?: number;
  FoundationMoney?: string | number;
  TotalMoney?: string;
  ListDocument?: [];
  ListPolicy?: ListPolicyType[];
  ListPromotion?: ListPromotionType[];
  ListSchedule?: ListScheduleType[];
  TotalMoneyText?: string;
  ProductQuotation?: number | string;
  VAT?: number;
  MaintenanceFee?: number;
  PreTotalMoney?: number;
  priceId?: number | null;
  scheduleId?: string | null;
  TimeOfPayment?: number | null;
  TimeOfPaymentUnit?: string | null;
}

//interface getListProducts

export interface ProductsType {
  projectId: string;
  location: string;
  projectTypeId: string;
}
export interface ParamsProducts {
  page: number;
  size: number;
}
export interface ProductsResponse {
  id: string;
  name: string;
  landArea: number;
  numBed: number;
  numBath: number;
  direction: string;
  airConditioner: number;
  swimmingPool: number;
  gym: number;
  projectLevelDetailId: string;
  diaChi?: string;
  status: number;
  build?: boolean;
  apartmentModelId: string;
  lotSymbolLegal: string;
  lotSymbolCommercial: string;
  doorDirection?: string;
  location?: string;
  projectId: string;
  homeNum: string;
  buildArea?: string;
  wallArea: number;
  clearArea: number;
  price: 10.0;
  unitPrice: number;
  nameProjectType: string;
  tongBanGhi: string;
  totalPrice: string;
  category: string;
  thumbnail?: string;
  productId?: string;
  paymentStatus?: number | string | null;
  projectTypeCode?: string;
  floor?: number;
  minFloor?: number;
  maxFloor?: number;
  floorHeight?: string | null;
  projectLocation?: string;
  projectName?: string;
  projectTypeId: string;
  productionId: string;
}

export interface ResponseSearchById {
  id: string;
  name: string;
  landArea: number;
  numBed: number;
  numBath: number;
  doorDirection: string;
  projectName?: string;
  airConditioner: number;
  swimmingPool: number;
  levelDetailName?: string;
  levelDetailParentName?: string;
  levelDetailGrandfatherName?: string;
  lot_code?: string;
  visitContent?: string;
  build?: boolean;
  gym: number;
  projectType?: {
    name: string;
    id: string;
    nameDisplay: string;
  };
  projectLevelDetail: {
    id: string;
    level: string;
    map1: string;
    map2: string;
    name: string;
  };
  lurPrice?: string;
  lurUnitPrice?: string;
  status: number;
  apartmentModel: {
    id: string;
    project: string;
    name: string;
    numBed: number;
    numBath: number;
    landArea: number;
    unitArea: number;
    direction: string;
    image: string;
    description: string;
    dcreatedAt: string;
    dupdatedAt: string;
    screatedBy: string;
    supdatedBy: string;
    nstatus: number;
  };
  lotSymbolLegal: string;
  lotSymbolCommercial: string;
  project?: {
    id: string;
    name: string;
    location: string;
    idls?: string;
    constructArea: number;
    density: number;
    type: string;
    scale: string;
    funcDivision: string;
    ownership: string;
    description: string;
    avatar: string;
    code: string;
    tradeName: string;
    abbreviationName: string;
    status: string;
    commune: string;
    district: string;
    provincial: string;
    modifyDate: string;
    lsName: string;
    video?: string;
    hotline?: string;
    visitContent?: string;
  };
  projectTypeId?: string;
  homeNum: string;
  wallArea: number;
  clearArea: number;
  price: number;
  unitPrice: number;
  thongTinDuAn: {
    id: string;
    name: string;
    location: string;
    constructArea: number;
    density: number;
    type: string;
    scale: string;
    funcDivision: string;
    ownership: string;
    description: string;
    avatar: string;
    code: string;
    tradeName: string;
    abbreviationName: string;
    status: string;
    commune: string;
    district: string;
    provincial: string;
    modifyDate: string;
    lsName: string;
  };
  outstanding: number;
  carpetPrice: number;
  totalVatPrice: number;
  constructPrice: number;
  unitVatMaintainPrice: number;
  totalPrice: number;
  vat: number;
  maintainPrice: number;
  idMapper: number;
  syncFrom: string;
  productNo: string;
  productTypeId: number;
  balconyDirection: string;
  buildArea: number;
  floorNum: number;
  isCornerApartment: number;
  idls: string;
  floor: string;
  video?: string;
  defaultPhoneNumber?: string;
  isOpeningSale?: boolean;
  apartmentModelPhotos?: string[] | null;
  thumbnail?: string | null;
  paymentStatus?: string | number | null;
  projectTypeCode?: string;
  minFloor?: number;
  maxFloor?: number;
  buildType?: string;
  floorHeight?: string | null;
}

///api/product/information/find-top-by-outstanding
export interface TBOUTStanding {
  id: string;
  name: string;
  landArea: number;
  numBed: number;
  numBath: number;
  projectId: string;
  projectName: string;
  projectLocation: string;
  build?: boolean;
}
