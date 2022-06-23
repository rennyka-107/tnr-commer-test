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

export const apiUploadFile = async (data: any) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/v1/payment/upload-payment-certification`,
    data,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withToken: false,
    }
  );
};
