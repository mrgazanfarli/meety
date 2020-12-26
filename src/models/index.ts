import { EEventPrivacy, EEventStatus, EEventType, EOrganizationWay, ERequestStatus } from 'models/enums';
import { Maybe } from 'models/types';
import moment from 'moment';
import { userEvents } from 'reducers/events';
import { IUserEventsResponse } from 'services/events/models';

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
    upcomingEvents: IAsyncData<IUpcomingEvent[]>,
    createEvent: IAsyncData<void>,
    userEvents: IAsyncData<IUserEventsResponse>
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

export interface ISimpleId {
    id: string | number;
}

export interface IVendor {
    id: number | string;
    name: string;
}

export interface IExtra {
    name: string;
    attendees: string[];
}

export interface IUpcomingEvent {
    dateTime: string;
    location: string;
    name: string;
    description: string;
    vendor: IVendor;
    eventType: EEventType;
    eventPrivacy: EEventPrivacy;
    extras: string;
    organizationWay: EOrganizationWay;
    createdBy: string;
}

export interface IEvent {
    dateTime: string;
    location: string;
    name: string;
    description: string;
    vendor: IVendor;
    eventType: EEventType;
    eventPrivacy: EEventPrivacy;
    extras: string;
    organizationWay: EOrganizationWay;
    noiseAllowed: boolean;
    smokingAllowed: boolean;
    createdBy: string;
    eventStatus?: EEventStatus;
    imgUrl?: string;
}

export interface IPaginationData {
    offset: number;
    limit: number;
}
