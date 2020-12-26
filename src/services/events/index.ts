import { IAsyncData, IEvent, IUpcomingEvent } from 'models';
import { IUpcomingEventFilter } from 'services/events/models';
import { getRequest, makeQueryParams, postRequest } from 'utils/rest';

const EventServices = {
    getUpcomingEvents (filters: IUpcomingEventFilter): any {
        const queryParams = makeQueryParams(filters);
        return getRequest<IAsyncData<IUpcomingEvent[]>>(`https://event-service-v1.herokuapp.com/v1/events/upcoming-events${queryParams}`,);
    },

    createEvent (eventData: IEvent): any {
        return postRequest<IEvent, void>('https://event-service-v1.herokuapp.com/v1/events', eventData);
    },
};

export default EventServices;
