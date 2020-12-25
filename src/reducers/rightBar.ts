import { Reducer } from 'redux';

import * as RightBarActions from 'actions/rightBar/consts';

export const isRightBarOpen: Reducer = (state = false, { type, payload }) => {
    if (type === RightBarActions.SET_RIGHT_BAR_VISIBILITY) {
        return payload;
    } else {
        return state;
    }
};
