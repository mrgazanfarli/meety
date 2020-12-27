import { IPaginationData } from 'models';
import { ICreateEventRq, IUpcomingEventFilter } from 'services/events/models';
import EventServices from 'services/events';
import { generateInitialActionTypeName } from 'utils/redux';

import EventActions from './consts';

export const getUpcomingEvents = (filters: IUpcomingEventFilter) => {
    return {
        type: EventActions.UPCOMING_EVENTS,
        payload: EventServices.getUpcomingEvents(filters),
    }
};

export const createEvent = (eventData: ICreateEventRq): any => {
    return {
        type: EventActions.CREATE_EVENT,
        payload: EventServices.createEvent(eventData),
    }
};

export const getUserEvents = (paginationData: IPaginationData): any => {
    return {
        type: EventActions.GET_USER_EVENTS,
        payload: EventServices.getEvents(paginationData),
    }
};

export const getEventDetails = (id: string | number): any => {
    return {
        type: EventActions.GET_EVENT_DETAILS,
        payload: EventServices.getEventDetails(id),
    }
};

export const resetEventDetails = () => {
    return {
        type: generateInitialActionTypeName(EventActions.GET_EVENT_DETAILS),
    }
};
