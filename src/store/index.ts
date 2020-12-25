import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import { reduxPromiseMiddleware } from 'store/middlewares';
import { composeEnhancers } from 'utils/redux';

const middleWares = [thunk, reduxPromiseMiddleware,];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares)));

export default store;
