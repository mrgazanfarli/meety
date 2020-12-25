import { IPhotoRp } from 'services/profile/models';
import { putRequest } from 'utils/rest';

const ProfileServices = {
    updateProfilePhoto (photoId: string): Promise<IPhotoRp> {
        return putRequest('/profile/photo', { photoId });
    },
};

export default ProfileServices;
