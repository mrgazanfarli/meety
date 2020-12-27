import { combineReducers } from 'redux';

import { IAppState } from 'models';
import {
    signIn,
} from 'reducers/auth';
import {
    upcomingEvents,
    createEvent,
    userEvents,
    eventDetails,
} from 'reducers/events';


const rootReducer = combineReducers<IAppState>({
    signIn,
    upcomingEvents,
    createEvent,
    userEvents,
    eventDetails,
});

export default rootReducer;
