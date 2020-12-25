import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Schema } from 'yup';

import { ELocalStorageItem } from 'consts';
import { IError } from 'models';
import { isError, logout } from 'utils';

import { IConfigPresets, IHttpClient, IRequestConfig, RequestMethod } from './models';

export class HttpClient implements IHttpClient {
    private static readonly DEFAULT_CONFIG: IRequestConfig = {
        baseURL: 'http://207.154.239.127/user/api',
        refreshTokenOnExpiry: true,
        timeout: 30000,
    };

    private static readonly BLOB_RESPONSE: IRequestConfig = {
        ...HttpClient.DEFAULT_CONFIG,
        responseType: 'blob',
        timeout: 0,
    };

    private static readonly INCREASED_TIMEOUT: IRequestConfig = {
        ...HttpClient.DEFAULT_CONFIG,
        timeout: 60000,
    };

    private static readonly MULTIPART_FORM_DATA: IRequestConfig = {
        ...HttpClient.INCREASED_TIMEOUT,
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    public readonly configPresets: IConfigPresets = {
        blobResponse: HttpClient.BLOB_RESPONSE,
        default: HttpClient.DEFAULT_CONFIG,
        increasedTimeout: HttpClient.INCREASED_TIMEOUT,
        multipartFormData: HttpClient.MULTIPART_FORM_DATA,
    };

    public constructor (
        private readonly axiosInstance: AxiosInstance,
    ) {
    }

    public requestAPI = <Request, Response> (
        method: RequestMethod,
        url: string,
        data: Request,
        config?: IRequestConfig,
    ): Promise<AxiosResponse<Response>> => {
        const requestConfig = this.prepareRequestConfig(method, url, data, config);

        return new Promise<AxiosResponse>((resolve, reject) => {
            this.axiosInstance
                .request(requestConfig)
                .then((response) => {
                    const responseData = HttpClient.unwrapResponse(response.data);

                    resolve({
                        ...response,
                        data: responseData,
                    });
                })
                .catch((error: AxiosError) => {
                    const normalizedError = HttpClient.normalizeError(error);

                    switch (normalizedError.httpCode) {
                        case 401:
                            logout();

                            break;
                        default:
                            reject(normalizedError);
                    }
                });
        });
    };

    public get = <Response> (
        url: string,
        config?: IRequestConfig,
        validationSchema?: Schema<any>,
    ): Promise<Response> => {
        return this.requestAPIData('get', url, {}, config);
    };

    public post = <Request, Response> (
        url: string,
        data: Request,
        config?: IRequestConfig,
        // validationSchema?: Schema<any>,
    ): Promise<Response> => {
        return this.requestAPIData('post', url, data, config);
    };

    public put = <Request, Response> (
        url: string,
        data: Request,
        config?: IRequestConfig,
        // validationSchema?: Schema<any>,
    ): Promise<Response> => {
        return this.requestAPIData('put', url, data, config);
    };

    public delete = <Response> (
        url: string,
        config?: IRequestConfig,
        // validationSchema?: Schema<any>,
    ): Promise<Response> => {
        return this.requestAPIData('delete', url, null, config);
    };

    public patch = <Request, Response> (
        url: string,
        data?: Request,
        config?: IRequestConfig,
        // validationSchema?: Schema<Response>,
    ): Promise<Response> => {
        return this.requestAPIData('patch', url, data, config);
    };

    private requestAPIData = <TRequestData, TResponseData> (
        method: RequestMethod,
        url: string,
        data: TRequestData,
        config?: IRequestConfig,
    ): Promise<TResponseData> => {
        return Promise.resolve()
            .then(() => this.requestAPI<TRequestData, TResponseData>(method, url, data, config))
            .then((response) => response.data);
    };

    private prepareRequestConfig = (
        method: RequestMethod,
        url: string,
        data: any,
        config?: IRequestConfig,
    ): IRequestConfig => {

        const requestConfig: IRequestConfig = {
            ...HttpClient.DEFAULT_CONFIG,
            ...config,
            data,
            headers: {
                ...(config ? config.headers : {}),
                authorization: `Bearer ${localStorage.getItem(ELocalStorageItem.TOKEN)}`
            },
            method,
            url,
        };

        return requestConfig;
    };

    public static unwrapResponse = (response: any): any => {
        return response && response.data !== undefined && !response.pagination ? response.data : response;
    };

    public static normalizeError = (axiosError: AxiosError): IError => {
        let result: IError;

        if (axiosError.response) {
            if (isError(axiosError.response.data)) {
                // server managed error
                result = axiosError.response.data;
            } else {
                const message =
                    axiosError.response.headers &&
                    axiosError.response.headers['content-type'] &&
                    axiosError.response.headers['content-type'].indexOf('application/json') !== -1 &&
                    axiosError.response.data
                        ? axiosError.response.data.message ||
                        (typeof axiosError.response.data !== 'object' ? axiosError.response.data.toString() : null)
                        : null;

                result = {
                    code:
                        (axiosError.response.data && axiosError.response.data.code) ||
                        axiosError.response.statusText ||
                        'UNKNOWN_ERROR',
                    httpCode: axiosError.response.status || 400,
                    message,
                };
            }
        } else {
            result = {
                code: axiosError.code || 'UNKNOWN_ERROR',
                httpCode: axiosError.code === 'ECONNABORTED' ? 408 : 400,
                message: undefined,
            };
        }

        result.request = axiosError.config;

        return result;
    };
}
