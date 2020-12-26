import { ELocalStorageItem } from 'consts';
import { ROUTES } from 'routes/consts';
import { ILoginCredentials } from 'services/auth/models';
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
