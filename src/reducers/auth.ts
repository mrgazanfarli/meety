import AuthActions from 'actions/auth/consts';
import { generateAsyncItemReducer } from 'utils/redux';

export const signIn = generateAsyncItemReducer<void>(AuthActions.SIGN_IN);
