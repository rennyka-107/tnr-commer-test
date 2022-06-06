import HttpClient from "utils/HttpClient";
import { CommonResponse } from "type/common";
import { convertToQuery } from "utils/helper";
export interface ParamsListProductI {
  pageNumber: number;
  pageSize: number;
}

export interface BodyListProductI {
  projectId: string;
  location: string;
  projectTypeId: string;
}

const LIST_PRODUCT = "/api/product/information/search";

export const getListProductTNR = (
  params: ParamsListProductI,
  body: BodyListProductI
) => {
  // console.log(body, 'body');

  return HttpClient.post<any, CommonResponse>(
    `${LIST_PRODUCT }${convertToQuery(params)}`,
    body
  );
};
