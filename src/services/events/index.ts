import { IAsyncData, IEvent, IPaginationData } from 'models';
import { IUpcomingEventFilter, IEventsResponse, ICreateEventRq } from 'services/events/models';
import { getRequest, makeQueryParams, postRequest } from 'utils/rest';

const EVENTS_BASE_URL = 'https://release-event-1.herokuapp.com/v1';
const EventServices = {
    getUpcomingEvents (filters: IUpcomingEventFilter): any {
        const queryParams = makeQueryParams(filters);
        return getRequest<IAsyncData<IEventsResponse>>(`${EVENTS_BASE_URL}/events/upcoming-events${queryParams}`,);
    },

    createEvent (eventData: ICreateEventRq): any {
        return postRequest<ICreateEventRq, void>(`${EVENTS_BASE_URL}/events`, eventData);
    },

    getEvents (paginationData: IPaginationData = { limit: 10, offset: 0 }): any {
        const queryParams = makeQueryParams(paginationData);
        return getRequest<IAsyncData<IEventsResponse>>(`${EVENTS_BASE_URL}/events/user-events${queryParams}`);
    },

    getEventDetails (id: number | string): any {
        return getRequest<IAsyncData<IEvent>>(`${EVENTS_BASE_URL}/events/${id}`);
    }
};

export default EventServices;
