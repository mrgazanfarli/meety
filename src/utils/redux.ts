import { compose, Reducer } from 'redux';

import { IAsyncData, ICustomAction } from 'models';
import { Maybe } from 'models/types';
import { ERequestStatus } from 'models/enums';

export function generateErrorActionTypeName (actionTypeName: string | symbol): string {
    return actionTypeName.toString() + "_ERROR";
}

export function generateInitialActionTypeName (actionTypeName: string | symbol): string {
    return actionTypeName.toString() + "_INITIAL";
}

export function generatePendingActionTypeName (actionTypeName: string | symbol): string {
    return actionTypeName.toString() + "_PENDING";
}

export function generateSuccessActionTypeName (actionTypeName: string | symbol): string {
    return actionTypeName.toString() + "_SUCCESS";
}

// TODO: replace any with IError
export function generateAsyncItemReducer<T> (actionType: string): Reducer<IAsyncData<T>, ICustomAction<T | any>> {
    return (state: IAsyncData<T> = getInitialAsyncData<T>(), action: ICustomAction<T | any>): IAsyncData<T> => {
        switch (action.type) {
            case generatePendingActionTypeName(actionType):
                return {
                    ...state,
                    status: ERequestStatus.PENDING,
                };
            case generateSuccessActionTypeName(actionType): {
                return {
                    ...state,
                    data: (action as ICustomAction<T>).payload,
                    error: null,
                    status: ERequestStatus.SUCCESS,
                };
            }
            case generateErrorActionTypeName(actionType): {

                return {
                    ...state,
                    error: (action as ICustomAction<any>).payload,
                    status: ERequestStatus.ERROR,
                };
            }
            case generateInitialActionTypeName(actionType):
                return {
                    ...getInitialAsyncData(),
                };
            default:
                return state;
        }
    };
}

export function getInitialAsyncData<T> (initialData: Maybe<T> = null): IAsyncData<T> {
    return {
        data: initialData,
        error: null,
        status: ERequestStatus.IDLE,
    };
}

export const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

export const isInitial = (data: IAsyncData<any>) => data.status === ERequestStatus.IDLE;

export const isLoading = (data: IAsyncData<any>) =>
    data.status === ERequestStatus.PENDING || data.status === ERequestStatus.IDLE;

export const isPending = (data: IAsyncData<any>) => data.status === ERequestStatus.PENDING;

export const isSuccess = (data: IAsyncData<any>) => data.status === ERequestStatus.SUCCESS;

export const isError = (data: IAsyncData<any>) => data.status === ERequestStatus.ERROR;

export const isInitialLoading = (data: IAsyncData<any>) => isLoading(data) && data.data === null;

export const isInitialPending = (data: IAsyncData<any>) => isPending(data) && data.data === null;
