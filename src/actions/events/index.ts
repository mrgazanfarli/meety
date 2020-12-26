import { IEvent } from 'models';
import { IUpcomingEventFilter } from 'services/events/models';
import EventServices from 'services/events';

import EventActions from './consts';

export const getUpcomingEvents = (filters: IUpcomingEventFilter) => {
    return {
        type: EventActions.UPCOMING_EVENTS,
        payload: EventServices.getUpcomingEvents(filters),
    }
};

export const createEvent = (eventData: IEvent): any => {
    return {
        type: EventActions.CREATE_EVENT,
        payload: EventServices.createEvent(eventData),
    }
};
