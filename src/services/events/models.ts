import { IEvent, IPaginationData } from 'models';
import { EEventType, EOrganizationWay } from 'models/enums';

export interface IUpcomingEventFilter extends IPaginationData {
    name?: string;
    location?: string;
    vendor?: string;
    eventType?: EEventType;
    organizationWay?: EOrganizationWay;
    dateTime?: string;
}

export interface IUserEventsResponse {
    totalPageCount: number;
    events: IEvent[];
}
