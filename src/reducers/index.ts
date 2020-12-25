import { combineReducers } from 'redux';

import { IAppState } from 'models';
import {
    signIn,
    changePassword,
    resetPassword,
    setPassword,
} from 'reducers/auth';
import { uploadImage } from 'reducers/file';

const rootReducer = combineReducers<IAppState>({
    signIn,
    uploadImage,
    changePassword,
    resetPassword,
    setPassword,
});

export default rootReducer;
