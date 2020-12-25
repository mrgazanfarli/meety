import { EEventPrivacy, EEventType, EOrganizationWay, ERequestStatus } from 'models/enums';
import { Maybe } from 'models/types';
import moment from 'moment';

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
    signIn: IAsyncData<IUser>;
    uploadImage: IAsyncData<ISimpleId>;
    changePassword: IAsyncData<void>;
    resetPassword: IAsyncData<void>;
    setPassword: IAsyncData<void>;
}

export interface IRoute {
    component: any;
    path: string;
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

export interface IDataWithNumber {
    no: number;
    name: string;
}

export interface IVendor {
    id: number;
    name: string;
}

export interface IExtra {
    name: string;
    attendees: string[];
}

export interface IUpcomingEvent {
    datetime: string;
    location: string;
    name: string;
    description: string;
    vendor: IVendor;
    eventType: EEventType;
    eventPrivacy: EEventPrivacy;
    extras: IExtra[];
    organizationWay: EOrganizationWay;
    createdBy: string;
}

// upcoming event filters

export interface IUpcomingEventFilter {
    name: string;
    location: string;
    vendor: string;
    eventType: EEventType;
    organizationWay: EOrganizationWay;
    datetime: string;
}

export interface IEvent {
    datetime: string;
    location: string;
    name: string;
    description: string;
    vendor: IVendor;
    eventType: EEventType;
    eventPrivacy: EEventPrivacy;
    extras: IExtra[];
    organizationWay: EOrganizationWay;

}
