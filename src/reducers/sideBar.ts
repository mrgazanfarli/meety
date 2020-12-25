import { Reducer } from 'redux';

import * as SideBarActions from 'actions/sideBar/consts';

export const isSideBarOpen: Reducer = (state = false, { type, payload }) => {
    if (type === SideBarActions.SET_SIDEBAR_VISIBILITY) {
        return payload;
    } else {
        return state;
    }
};
