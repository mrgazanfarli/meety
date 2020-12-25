import { Dispatch } from 'redux';
import * as SideBarActions from './consts';

export const setSideBarVisibility = (isOpen: boolean) => (dispatch: Dispatch) => {
    dispatch({
        type: SideBarActions.SET_SIDEBAR_VISIBILITY,
        payload: isOpen,
    })
};
