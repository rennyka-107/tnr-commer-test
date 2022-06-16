import { CommonResponse, ResponseTypeAPI } from "type/common";
import { convertToQuery } from "utils/helper";
import HttpClient from 'utils/HttpClient';

const GET_CONTRACT = 'api/customer/customer-order/find-by-user';
const GET_NOTIFICATION = '/api/customer/notification/find-notification-by-user';
const CHANGE_PASSWORD = '/api/v1/account/change-password';
export interface ContractI {
    address: string | null;
    avatar: string | null;
    birth: string | null;
    businessRegistration: string | null;
    customerId: string | null;
    dateIssue: string | null;
    district: string | null;
    email: string | null;
    fullname: string | null;// tên khách hàng
    id: string | null;
    idNumber: string | null;
    orderId: string | null;
    permanentAddress: string | null;
    phone: string | null;
    placeIssue: string | null;
    province: string | null;

    projectName?: string; // tên dự án
    productName?: string// tên lô;
    bookingCode?: string;// mã đặt chỗ
    bookingTime?: string;// thời gian đặt chỗ
    deposited?: string;// số tiền đã cọc
    paid?: number;// số tiền đã thanh toán
    remaining?: number;// số tiền còn lại
    status?: number | string;// trạng thái


}

export interface NotiI {
    id: string;
    notiTime: string;
    orderId: string | null;
    status: number;
    type: number;
    userid: string;
}


export const getContractByUser = () => {
    return HttpClient.get<ResponseTypeAPI, CommonResponse<ContractI[]>>(`${GET_CONTRACT}`);
}

export const getNotificationByUser = () => {
    return HttpClient.get<ResponseTypeAPI, CommonResponse<NotiI[]>>(`${GET_NOTIFICATION}`);
}

export const changePassword = (params: { oldPassword: string, newPassword: string }) => {
    return HttpClient.post<ResponseTypeAPI, any>(`${CHANGE_PASSWORD}${convertToQuery(params)}`);
}