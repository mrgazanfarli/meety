import EventActions from 'actions/events/consts';
import { IEvent } from 'models';
import { IEventsResponse } from 'services/events/models';
import { generateAsyncItemReducer } from 'utils/redux';

export const upcomingEvents = generateAsyncItemReducer<IEventsResponse>(EventActions.UPCOMING_EVENTS);
export const createEvent = generateAsyncItemReducer<void>(EventActions.CREATE_EVENT);
export const userEvents = generateAsyncItemReducer<IEventsResponse>(EventActions.GET_USER_EVENTS);
export const eventDetails = generateAsyncItemReducer<IEvent>(EventActions.GET_EVENT_DETAILS);
