import { combineReducers } from 'redux';

import { IAppState } from 'models';
import { isSideBarOpen } from 'reducers/sideBar';
import { isRightBarOpen } from 'reducers/rightBar';
import {
    signIn,
    changePassword,
    resetPassword,
    setPassword,
} from 'reducers/auth';
import { uploadImage } from 'reducers/file';
import { uploadProfilePhoto } from 'reducers/profile';
import {
    generalOptions,
    countryOptions,
    countryFilters,
    generalReport,
    reportType,
    countryReport,
} from 'reducers/report';

const rootReducer = combineReducers<IAppState>({
    isSideBarOpen,
    isRightBarOpen,
    signIn,
    uploadImage,
    changePassword,
    resetPassword,
    uploadProfilePhoto,
    setPassword,
    generalOptions,
    countryOptions,
    countryFilters,
    generalReport,
    reportType,
    countryReport,
});

export default rootReducer;
