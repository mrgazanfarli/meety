import { httpClient } from 'dependencies';
import { IError } from 'models';

export const getRequest = httpClient.get;
export const putRequest = httpClient.put;
export const postRequest = httpClient.post;
export const delRequest = httpClient.delete;
export const patchRequest = httpClient.patch;


export const makeQueryParams = (queryObject, isFirstQuery = true) => {
    const keys = Object.keys(queryObject);
    let query = isFirstQuery ? '?' : '';
    keys.forEach((key, index) => {
        if (queryObject[key]) {
            if (isFirstQuery && index === 0) {
                query = `${query}${key}=${queryObject[key]}`;
            } else {
                query = `${query}&${key}=${queryObject[key]}`;
            }
        }
    });

    return query;
};

export const isNotFoundError = (error: IError) => error.httpCode === 404;

export const isServerError = (error: IError) => `${error.httpCode}`.startsWith('5');
