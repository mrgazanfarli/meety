import { EEventType, EOrganizationWay } from 'models/enums';

export interface IUpcomingEventFilter {
    name?: string;
    location?: string;
    vendor?: string;
    eventType?: EEventType;
    organizationWay?: EOrganizationWay;
    datetime?: string;
    offset: number;
    limit: number;
}
