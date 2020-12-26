import { IAsyncData, IEvent, IPaginationData, IUpcomingEvent } from 'models';
import { IUpcomingEventFilter, IUserEventsResponse } from 'services/events/models';
import { getRequest, makeQueryParams, postRequest } from 'utils/rest';

const EventServices = {
    getUpcomingEvents (filters: IUpcomingEventFilter): any {
        const queryParams = makeQueryParams(filters);
        return getRequest<IAsyncData<IUpcomingEvent[]>>(`https://release-event-1.herokuapp.com/v1/events/upcoming-events${queryParams}`,);
    },

    createEvent (eventData: IEvent): any {
        return postRequest<IEvent, void>('https://release-event-1.herokuapp.com/v1/events', eventData);
    },

    getEvents (paginationData: IPaginationData = { limit: 10, offset: 0 }): any {
        const queryParams = makeQueryParams(paginationData);
        return getRequest<IAsyncData<IUserEventsResponse>>(`https://release-event-1.herokuapp.com/v1/events/user-events${queryParams}`);
    },
};

export default EventServices;
