import AuthActions from 'actions/auth/consts';
import { generateAsyncItemReducer } from 'utils/redux';

export const signIn = generateAsyncItemReducer<void>(AuthActions.SIGN_IN);
export const changePassword = generateAsyncItemReducer<void>(AuthActions.CHANGE_PASSWORD);
export const resetPassword = generateAsyncItemReducer<void>(AuthActions.RESET_PASSWORD);
export const setPassword = generateAsyncItemReducer<void>(AuthActions.SET_PASSWORD);
