import { combineReducers } from 'redux';

import { IAppState } from 'models';
import {
    signIn,
} from 'reducers/auth';
import {
    upcomingEvents,
    createEvent,
} from 'reducers/events';


const rootReducer = combineReducers<IAppState>({
    signIn,
    upcomingEvents,
    createEvent,
});

export default rootReducer;
