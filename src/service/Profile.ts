import { CommonResponse, ResponseTypeAPI } from "type/common";
import { convertToQuery } from "utils/helper";
import HttpClient from "utils/HttpClient";

const GET_CONTRACT = "api/customer/customer-order/find-by-user";
const GET_NOTIFICATION = "/api-noti/notification/get-notice-for-user";
const CHANGE_PASSWORD = "/api-account/v1/account/change-password";
const UPDATE_PROFILE = "api-profile/profile/update";


export interface ContractI {
  address: string | null;
  avatar: string | null;
  birth: string | null;
  businessRegistration: string | null;
  customerId: string | null;
  dateIssue: string | null;
  district: string | null;
  email: string | null;
  fullname: string | null; // tên khách hàng
  id: string | null;
  idNumber: string | null;
  orderId: string | null;
  permanentAddress: string | null;
  phone: string | null;
  placeIssue: string | null;
  productId: string;
  province: string | null;
  uuid?: string;
  totalPrice?: string;
  transactionId?: string;
  paymentStatus?: string;
  paymentStatusString?: string;
  projectName?: string; // tên dự án
  productName?: string; // tên lô;
  bookingCode?: string; // mã đặt chỗ
  bookingTime?: string; // thời gian đặt chỗ
  deposited?: string; // số tiền đã cọc
  paid?: number; // số tiền đã thanh toán
  totalDeposite?: string;
  amountLeft?: string;
  deposite?: string;
  remaining?: number; // số tiền còn lại
  status?: number | string; // trạng thái
  productionImage?: string | null;
  paymentIdentityInfos: any;
}

export interface ProfileI {
  customerTypeId: string;
  appellation: string;
  fullname: string;
  birth: string;
  phone: string;
  email: string;
  idNumber: string;
  idReceivePlace: string;
  idReceiveDate: string;
  domicile: string;
  address: string;
  district?: string;
  province?: string;
  avatar: string;
  avatarThumbnailUrl: string;
  attachPaperThumbnailUrl?: string;
  attachPaper: string;
  fileImages?: any;
  businessRegistration?: any;
  businessRegistrationName?: any;
  commune?: string;
  contactAddress?: string;
  provinceContactName?: string;
  districtContactName?: string;
  communeContactName?: string;
}

export const getContractByUser = () => {
  return HttpClient.get<ResponseTypeAPI, CommonResponse<ContractI[]>>(
    `${GET_CONTRACT}`
  );
};

export const getOrderByUser = (data: any) => {
  return HttpClient.post<any, any>(
    `/api-customer/customer-order/find-by-user`,
    data
  );
};

export const getOrderById = (id: any) => {
  return HttpClient.get<any, any>(`/api/v1/payment/get-payment-info/${id}`);
};

export const getOrderDetail = (body: any) => {
  return HttpClient.post<ResponseTypeAPI, any>(
    `/api/v1/payment/history-detail`,
    body
  );
};

export const getNotificationByUser = ({ page, size }) => {
  return HttpClient.get<ResponseTypeAPI, CommonResponse<any>>(
    `${GET_NOTIFICATION}/${page}/${size}`
  );
};

export const changePassword = (params: {
  oldPassword: string;
  newPassword: string;
}) => {
  return HttpClient.post<ResponseTypeAPI, any>(
    `${CHANGE_PASSWORD}${convertToQuery(params)}`
  );
};

export const updateProfile = (body: ProfileI) => {
  return HttpClient.post<ResponseTypeAPI, any>(`${UPDATE_PROFILE}`, body);
};
