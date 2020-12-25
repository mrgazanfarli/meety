import FileActions from 'actions/file/consts';
import { ISimpleId } from 'models';
import { generateAsyncItemReducer } from 'utils/redux';

export const uploadImage = generateAsyncItemReducer<ISimpleId>(FileActions.UPLOAD_IMAGE);
