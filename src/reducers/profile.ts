import ProfileActions from 'actions/profile/consts';
import { IPhotoRp } from 'services/profile/models';
import { generateAsyncItemReducer } from 'utils/redux';

export const uploadProfilePhoto = generateAsyncItemReducer<IPhotoRp>(ProfileActions.UPDATE_PROFILE_PHOTO);
