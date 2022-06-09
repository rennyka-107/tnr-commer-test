import { convertToQuery } from 'utils/helper';
import HttpClient from 'utils/HttpClient';
export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginSuccess {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface LoginFailed {
    error?: string;
    error_description?: string;
}

export interface ResponseLoginModel<T> {
    responseCode: string;
    responseData: T;
    responseMessage: string;
}

export const Login = (params: LoginParams) => {
    return HttpClient.post<typeof params, any>(`/user/get-token${convertToQuery(params)}`)
}