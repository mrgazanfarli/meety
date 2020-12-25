import { ERequestStatus } from 'models/enums';
import { Maybe } from 'models/types';
import moment from 'moment';
import { IPhotoRp } from 'services/profile/models';
import { ICountryOptionsRp, IOptionsResponse } from 'services/report/models';

export interface Action<T = any> {
    type: T
}

export interface ICustomAction<P> {
    payload?: P;
    type: string;
}

export interface AnyAction extends Action {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any
}

export interface IAsyncDataBase {
    error: Maybe<IError>;
    status: ERequestStatus;
}

export interface IAsyncData<T> extends IAsyncDataBase {
    data: Maybe<T>;
}

export interface IAppState {
    isSideBarOpen: boolean;
    isRightBarOpen: boolean;
    signIn: IAsyncData<IUser>;
    uploadImage: IAsyncData<ISimpleId>;
    changePassword: IAsyncData<void>;
    resetPassword: IAsyncData<void>;
    uploadProfilePhoto: IAsyncData<IPhotoRp>;
    setPassword: IAsyncData<void>;
    generalOptions: IAsyncData<IOptionsResponse>;
    countryOptions: IAsyncData<ICountryOptionsRp>;
    countryFilters: IAsyncData<IOptionsResponse>;
    generalReport: IAsyncData<any>;
    reportType: string;
    countryReport: IAsyncData<any>;
}

export interface IRoute {
    component: any;
    path: string;
}

export interface ISavedItem {

}

export interface IMomentDateComparison {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
}

export interface IError {
    code?: string;
    httpCode?: number;
    error?: boolean;
    message?: string;
    request?: any;
}

export interface IUser {
    name: string;
    surname: string;
    email: string;
    position: string;
    token: string;
    photo: string;
    photoChangedName: string;
}

export interface ISimpleId {
    id: string | number;
}

export interface ILocalUser {
    name: string;
    surname: string;
    email: string;
    position: string;
    photo: string;
    photoChangedName: string;
}

export interface IOptions {
    key: string;
    options: IDataWithNumber[];
}

export interface IDataWithNumber {
    no: number;
    name: string;
}
