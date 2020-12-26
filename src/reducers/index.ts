import { combineReducers } from 'redux';

import { IAppState } from 'models';
import {
    signIn,
} from 'reducers/auth';
import {
    upcomingEvents,
    createEvent,
    userEvents,
} from 'reducers/events';


const rootReducer = combineReducers<IAppState>({
    signIn,
    upcomingEvents,
    createEvent,
    userEvents,
});

export default rootReducer;
