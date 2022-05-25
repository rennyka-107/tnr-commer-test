import { stringify } from 'querystring';
import HttpClient from 'utils/HttpClient';
import { convertCamelCaseKeysToSnakeCase } from 'utils/helper';
export interface LoginParams {
    username: string;
    password: string;
}

export type LoginResponse<T, D> = T | D;

export interface LoginSuccess {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface LoginFailed {
    error?: string;
    error_description?: string;
}

export const Login = (params: LoginParams) => {
    return HttpClient.post<
        typeof params,
        LoginResponse<LoginSuccess, LoginFailed>
    >('/auth/realms/tnr-admin/protocol/openid-connect/token',
        stringify(convertCamelCaseKeysToSnakeCase({
            ...params,
            clientId: 'tnr-admin',
            grantType: 'password',
        })),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
}