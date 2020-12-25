import ProfileServices from 'services/profile';

import ProfileActions from './consts';

export const updateProfilePhoto = (photoId: string): any => {
    return {
        payload: ProfileServices.updateProfilePhoto(photoId),
        type: ProfileActions.UPDATE_PROFILE_PHOTO,
    }
};
