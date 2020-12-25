import { Dispatch } from 'redux';
import * as RightBarActions from './consts';

export const setRightBarVisibility = (isOpen: boolean) => (dispatch: Dispatch) => {
    dispatch({
        type: RightBarActions.SET_RIGHT_BAR_VISIBILITY,
        payload: isOpen,
    })
};
