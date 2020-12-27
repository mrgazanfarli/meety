import { EEventPrivacy, EEventStatus, EEventType, EOrganizationWay, ERequestStatus } from 'models/enums';
import { Maybe } from 'models/types';
import { IEventsResponse } from 'services/events/models';

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
    signIn: IAsyncData<void>;
    upcomingEvents: IAsyncData<IEventsResponse>,
    createEvent: IAsyncData<void>,
    userEvents: IAsyncData<IEventsResponse>,
    eventDetails: IAsyncData<IEvent>,
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

export interface IVendor {
    id?: number | string;
    name: string;
}

export interface IEvent {
    id: number;
    dateTime: string;
    location: string;
    name: string;
    description: string;
    vendor: IVendor;
    eventType: EEventType;
    eventPrivacy: EEventPrivacy;
    extras?: string;
    organizationWay: EOrganizationWay;
    noiseAllowed: boolean;
    smokingAllowed: boolean;
    createdBy: string;
    eventStatus: EEventStatus;
    imgUrl: string;
}

export interface IPaginationData {
    offset: number;
    limit: number;
}
