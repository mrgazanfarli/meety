import { IError } from 'models';
import { isPromise } from 'utils';
import {
    generateSuccessActionTypeName,
    generateErrorActionTypeName,
    generatePendingActionTypeName
} from 'utils/redux';

export const reduxPromiseMiddleware = ({ dispatch }: any): any => (next: any) => (action: any) => {
    if (action && isPromise(action.payload)) {
        const { type, payload } = action;
        // const timestamp = +new Date();
        const meta = {
            ...action.meta,
            // timestamp,
        };

        dispatch({
            meta,
            type: generatePendingActionTypeName(type),
        });

        return payload.then(
            (result: any) => {
                dispatch({
                    meta,
                    payload: result,
                    type: generateSuccessActionTypeName(type),
                });
                return result;
            },
            (error: IError) => {
                dispatch({
                    meta,
                    payload: error,
                    type: generateErrorActionTypeName(type),
                });

                return Promise.reject(error);
            },
        );
    } else {
        return next(action);
    }
};
