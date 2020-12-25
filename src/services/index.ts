import {
    getRequest,
    postRequest,
    putRequest,
    delRequest,
    patchRequest,
} from 'utils/rest';

export const testService = (): Promise<string> => {
    return getRequest('/test');
};
