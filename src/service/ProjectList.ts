import HttpClient from 'utils/HttpClient';
import { CommonResponse } from "type/common";
import { convertToQuery } from 'utils/helper';
export interface ParamsListProjectI {
    pageNumber: number,
    pageSize: number,
}

export interface BodyListProjectI {
    projectId?: string,
    location?: string,
    projectTypeId?: string,
    fromPrice?: 0,
    toPrice?: 0
}

const LIST_PROJECT = '/api/project/information/search';

export const getListProjectTNR = (params: ParamsListProjectI, body: BodyListProjectI) => {
    console.log(body, 'body');

    return HttpClient.post<any, CommonResponse>(`${LIST_PROJECT}${convertToQuery(params)}`, body);
}