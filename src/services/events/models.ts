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

export interface IEventsResponse {
    totalPageCount: number;
    events: IEvent[];
}


export interface ICreateEventRq extends Omit<IEvent, 'id' | 'eventStatus' | 'imgUrl'> { }
