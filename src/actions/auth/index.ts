import { ELocalStorageItem } from 'consts';
import { ROUTES } from 'routes/consts';
import { generateInitialActionTypeName } from 'utils/redux';
import {
    ILoginCredentials,
    IPasswordChangeRq,
    IPasswordResetRq,
    IPasswordSetRq,
} from 'services/auth/models';
import AuthServices from 'services/auth';

import AuthActions from './consts';

export const signIn = (credentials: ILoginCredentials, history: any) => {
    return {
        payload: AuthServices.signIn(credentials).then(() => {
            localStorage.setItem(ELocalStorageItem.TOKEN, 'token');
            history.push(ROUTES.DASHBOARD.PATH);
        }),
        type: AuthActions.SIGN_IN,
    }
};

export const changePassword = (passwordData: IPasswordChangeRq): any => {
    return {
        payload: AuthServices.changePassword(passwordData),
        type: AuthActions.CHANGE_PASSWORD,
    }
};

export const resetPassword = (resetPasswordData: IPasswordResetRq) => {
    return {
        payload: AuthServices.resetPassword(resetPasswordData),
        type: AuthActions.RESET_PASSWORD,
    }
};

export const initializeResetPassword = () => {
    return {
        type: generateInitialActionTypeName(AuthActions.RESET_PASSWORD),
    }
};

export const setPassword = (setPasswordData: IPasswordSetRq): any => {
    return {
        payload: AuthServices.setPassword(setPasswordData),
        type: AuthActions.SET_PASSWORD,
    }
};
