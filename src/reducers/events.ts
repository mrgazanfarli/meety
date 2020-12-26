import EventActions from 'actions/events/consts';
import { IAsyncData, IUpcomingEvent } from 'models';
import { generateAsyncItemReducer } from 'utils/redux';

export const upcomingEvents = generateAsyncItemReducer<IUpcomingEvent[]>(EventActions.UPCOMING_EVENTS);
export const createEvent = generateAsyncItemReducer<void>(EventActions.CREATE_EVENT);
