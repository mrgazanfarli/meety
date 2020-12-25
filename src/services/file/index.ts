import { ISimpleId } from 'models';
import { postRequest } from 'utils/rest';

const FileServices = {
    uploadImage (file: FormData): Promise<ISimpleId> {
        return postRequest('/file/photo', file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },
};

export default FileServices;
