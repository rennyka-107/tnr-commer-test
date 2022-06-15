import { PTGType, ProductsType, ParamsProducts } from "interface/product";
import { CommonResponse, ResponseTypeAPI } from "type/common";
import HttpClient from "utils/HttpClient";

export const getListProductApi = async (params: ParamsProducts, data: any) => {
  return HttpClient.post<ResponseTypeAPI, CommonResponse>(
    `/api/product/information/search?page=${params.page}&size=${params.size}`,
    data,
    { withToken: false }
  );
};

export const getProducById = async (id: any) => {
  return HttpClient.post<any, CommonResponse>(`/api/product/information/${id}`);
};

export const getProductPtgApi = async (params: PTGType) => {
  const data = JSON.stringify(params);
  return HttpClient.post<any, CommonResponse>(`/api/v1/landsoft/ptg`, data, {
    withToken: false,
  });
};

export const downloadPhieuTinhGiaAPI = async (data: any) => {
  const body = JSON.stringify(data);
  return HttpClient.post<any, CommonResponse>(
    `/api/v1/landsoft/ptg/download`,
    body,
    {
      withToken: false,
    }
  );
};

export const getProductTopByStanding = async () => {
  return HttpClient.get<CommonResponse>(
    `/api/product/information/find-top-by-outstanding`,
    {
      withToken: false,
    }
  );
};

export const getProductFavorite = async (formData: any) => {
  return HttpClient.post<ResponseTypeAPI, CommonResponse>(
    `/api/favourite/search/get-top3-favourite-product`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
};
