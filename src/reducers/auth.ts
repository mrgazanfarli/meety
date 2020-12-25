import AuthActions from 'actions/auth/consts';
import { IUser } from 'models';
import { generateAsyncItemReducer } from 'utils/redux';

export const signIn = generateAsyncItemReducer<IUser>(AuthActions.SIGN_IN);
export const changePassword = generateAsyncItemReducer<void>(AuthActions.CHANGE_PASSWORD);
export const resetPassword = generateAsyncItemReducer<void>(AuthActions.RESET_PASSWORD);
export const setPassword = generateAsyncItemReducer<void>(AuthActions.SET_PASSWORD);
