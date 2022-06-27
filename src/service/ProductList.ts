import HttpClient from "utils/HttpClient";
import { CommonResponse } from "type/common";
import { convertToQuery } from "utils/helper";
export interface ParamsListProductI {
  page: number;
  size: number;
}

export interface BodyListProductI {
	projectTypeId: any;
	provinceId:any;

}

const LIST_PRODUCT = "/api/product/information/advance/search";

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
