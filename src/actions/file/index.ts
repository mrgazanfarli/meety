import FileServices from 'services/file';

import FileActions from './consts';

export const uploadImage = (file: FormData): any => {
    return {
        payload: FileServices.uploadImage(file),
        type: FileActions.UPLOAD_IMAGE,
    }
};
