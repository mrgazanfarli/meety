import { combineReducers } from 'redux';

import { IAppState } from 'models';
import {
    signIn,
} from 'reducers/auth';
import { uploadImage } from 'reducers/file';
import {
    upcomingEvents,
    createEvent,
} from 'reducers/events';


const rootReducer = combineReducers<IAppState>({
    signIn,
    uploadImage,
    upcomingEvents,
    createEvent,
});

export default rootReducer;
