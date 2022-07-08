export interface searchLocationResponse {
  productId: string;
  projectId: string;
  nameProduct: string;
  landArea: string;
  numBed: number;
  numBath: number;
  doorDirection: string;
  unitPrice: string;
  lotSymbolLegal: string;
  lotSymbolCommercial: string;
  totalPrice: string;
  nameProject: string;
  location: string;
  province: string;
  district: string;
  commune: string;
  thumbnail: string;
  diaChi: string;
  tongBanGhi: string;
  projectName: string;
  category: string;
  maxFloor?: number;
  minFloor?: number;
  name: string;
  projectTypeCode?: string;
  paymentStatus?:string|number|null;
  
}
