import { CommonResponse } from "type/common";
import HttpClient from "utils/HttpClient";

export interface favoriteParamI {
  productId: string;
  action: 1 | 0;
}

export const ToggleProductFavorite = async (param: favoriteParamI) => {
  return HttpClient.post<any, CommonResponse>(
    `/api/favourite/favourite-product-action?productionId=${param.productId}&action=${param.action}`,
    {
      withToken: true,
    }
  );
};