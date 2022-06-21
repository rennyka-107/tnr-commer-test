import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";
// export const getCartApi = async () => {
//   return HttpClient;
// };

export const saveInfoCustomAPI = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    "/api/v1/payment/save-payment-info",
    data,
    { withToken: false }
  );
};

export const zenCodeQrAPI = async (id: string) => {
  return HttpClient.get<any, CommonResponse>(
    `/api/v1/payment/get-qrcode/${id}`,
    { withToken: false }
  );
};
