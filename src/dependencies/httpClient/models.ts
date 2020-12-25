import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Schema } from 'yup';

export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface IRequestConfig extends AxiosRequestConfig {
    refreshTokenOnExpiry?: boolean;
    uuid?: string;
}

export interface IConfigPresets {
    default: IRequestConfig;
    increasedTimeout: IRequestConfig;
    multipartFormData: IRequestConfig;
    blobResponse: IRequestConfig;
}

export interface IHttpClient {
    requestAPI: <Request, Response>(
        method: RequestMethod,
        url: string,
        data: Request,
        config?: IRequestConfig,
        validationSchema?: Schema<Response>,
        authHeadersMode?: 'none' | 'refresh' | 'access',
    ) => Promise<AxiosResponse<Response>>;

    get: <Response>(url: string, config?: IRequestConfig, validationSchema?: Schema<Response>) => Promise<Response>;

    post: <Request, Response>(
        url: string,
        data?: Request,
        config?: IRequestConfig,
        validationSchema?: Schema<Response>,
    ) => Promise<Response>;

    put: <Request, Response>(
        url: string,
        data?: Request,
        config?: IRequestConfig,
        validationSchema?: Schema<Response>,
    ) => Promise<Response>;

    delete: <Response>(url: string, config?: IRequestConfig, validationSchema?: Schema<Response>) => Promise<Response>;

    patch: <Request, Response>(
        url: string,
        data?: Request,
        config?: IRequestConfig,
        validationSchema?: Schema<Response>,
    ) => Promise<Response>;

    readonly configPresets: IConfigPresets;
}
