import EventActions from 'actions/events/consts';
import { IAsyncData, IEvent, IUpcomingEvent } from 'models';
import { IUserEventsResponse } from 'services/events/models';
import { generateAsyncItemReducer } from 'utils/redux';

export const upcomingEvents = generateAsyncItemReducer<IUpcomingEvent[]>(EventActions.UPCOMING_EVENTS);
export const createEvent = generateAsyncItemReducer<void>(EventActions.CREATE_EVENT);
export const userEvents = generateAsyncItemReducer<IUserEventsResponse>(EventActions.GET_USER_EVENTS);
