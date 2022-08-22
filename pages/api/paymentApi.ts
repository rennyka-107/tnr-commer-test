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
  return HttpClient.get<any, CommonResponse>(`api-profile/profile/get-info`);
};

export const apiSendInforMsb = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    `api/v1/payment/send-lead-msb`,
    data
  );
};

interface LiquidationPikesParams {
  transactionId: number;
  transactionCodeLandSoft: string;
  productId: string;
  customerIdentity: string;
  customerName: string;
}

export const apiLiquidationPikes = async (params: LiquidationPikesParams) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/v1/payment/send-request/liquidation-pikes`,
    params
  );
};
export const apiTransferProductPayment = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/v1/payment/send-request/transfer-product-payment`,
    data
  );
};

interface DepositRefundParams {
  transactionId: number;
  transactionCodeLandSoft: string;
  productId: string;
  customerIdentity: string;
  customerName: string;
}

export const apiDepositRefund = async (params: DepositRefundParams) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/v1/payment/send-request/deposit-refund`,
    params
  );
};

export const apiChangeProductPayment = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/v1/payment/send-request/change-product-payment`,
    data
  );
};

export const apiValidReferenceCode = async (code: string) => {
  return HttpClient.get<string, CommonResponse>(
    `/api/v1/landsoft/get-reference-code/${code}`
  );
};
