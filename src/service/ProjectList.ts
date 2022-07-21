import HttpClient from 'utils/HttpClient';
import { CommonResponse } from "type/common";
import { convertToQuery } from 'utils/helper';
import { BorderStyle } from '@mui/icons-material';
export interface ParamsListProjectI {
    pageNumber: number,
    pageSize: number,
}

export interface BodyListProjectI {
    projectId?: any,
    location?: any,
	provinceId?: any,
    projectTypeId?: any,
    fromPrice?: 0,
    toPrice?: 0
	provinceIdList?: any,
	projectTypeIdList?: any,
	textSearch?: any,
}

const LIST_PROJECT = '/api/project/information/search';

export const getListProjectTNR = (params: ParamsListProjectI, body: BodyListProjectI) => {
	const newBody = {
		...body,
		provinceId: body.provinceId === "1" ? "" : body.provinceId,
		provinceIdList: body.provinceIdList ? body.provinceIdList : [],
		projectTypeIdList: body.projectTypeIdList ? body.projectTypeIdList : [],
		textSearch: body.textSearch
	}
    // console.log(body, 'body');

    return HttpClient.post<any, CommonResponse>(`${LIST_PROJECT}${convertToQuery(params)}`, newBody);
}