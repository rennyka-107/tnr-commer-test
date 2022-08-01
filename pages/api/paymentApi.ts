import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListPaymenListById = async () => {
  return HttpClient.get<any, CommonResponse>(
    `/api/v1/payment/get-payment-method`
  );
};

export const apiSavePaymentInformation = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    `api/v1/payment/save-payment-info`,
    data
  );
};

export const apiGetQrCode = async (code: string) => {
  return HttpClient.get<any, CommonResponse>(
    `api/v1/payment/get-qrcode/${code}`
  );
};

export const apiGetPaymentInformation = async (transactionCode: string) => {
  return HttpClient.get<any, CommonResponse>(
    `api/v1/payment/get-payment-info/${transactionCode}`
  );
};

export const apiGetCustomerType = async () => {
  return HttpClient.get<any, CommonResponse>(
    `api/v1/payment/get-customer-type`
  );
};

export const apiGetProfileInformation = async () => {
  return HttpClient.get<any, CommonResponse>(
    `api-profile/profile/get-info`
  );
};

export const apiSendInforMsb = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(`api/v1/payment/send-lead-msb`, data)
}
