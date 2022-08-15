export interface TabProjectResponse {
  id: string;
  name: string;
  projectId: string;
  text: string;
  position: number;
  updateDate: string;
}

export interface CommonResponse<D = any> {
  responseData: D | null;
  responseMessage: string;
  responseCode: string;
  httpStatusCode: number;
  success: boolean;
  total: number;
  headers: D;
  totalElement: number;
}

export interface ResponseTypeAPI {
  responseCode: string;
  responseMessage: string;
  responseData: any;
  headers: any;
  totalElement: number;
}

export interface Product {
  category: any;
  commune: string;
  diaChi: string;
  district: string;
  doorDirection: string;
  favouriteStatus: number;
  landArea: string;
  levelType: any;
  location: string;
  lotSymbolCommercial: any;
  lotSymbolLegal: any;
  maxFloor: number;
  minFloor: number;
  name: string;
  numBath: number;
  numBed: number;
  outstanding: number;
  paymentStatus: number;
  productId: string;
  projectAvatar: string;
  projectId: string;
  projectName: string;
  projectTypeCode: string;
  projectTypeId: string;
  province: string;
  thumbnail: string;
  tongBanGhi: string;
  totalPrice: string;
  unitPrice: string;
}
