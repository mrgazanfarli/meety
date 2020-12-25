// Promise type guard
import moment from 'moment';

import { ELocalStorageItem } from 'consts';
import { Maybe } from 'models/types';

import { IAsyncData, IError } from 'models';
import { ROUTES } from 'routes/consts';

export function isPromise<T = any> (value: any): value is PromiseLike<T> {
    return value && typeof value.then === 'function';
}

export function isValidEmail (email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email?.trim().toLowerCase());
}

export const hasDateChanged = (oldDate: moment.MomentInput, newDate: moment.MomentInput) => !moment(oldDate).isSame(moment(newDate));

export function isError (obj: any): obj is IError {
    return Boolean(obj) && (obj as IError).error === true;
}

export const isServerError = (error: Maybe<IError>) => `${error?.httpCode}`.startsWith('5');

export const getURLParam = (param: string, location: any): any => {
    return new URLSearchParams(location.search).get(param);
};

export const logout = (history?: any) => {
    localStorage.removeItem(ELocalStorageItem.TOKEN);
    localStorage.removeItem(ELocalStorageItem.USER_DETAILS);
    if (history) {
        history.push(ROUTES.AUTH.LOGIN.PATH);
    } else {
        window.location.href = window.location.origin + '/login';
    }
};
