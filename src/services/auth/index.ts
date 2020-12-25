import { IUser } from 'models';
import {
    ILoginCredentials,
    IPasswordChangeRq,
    IPasswordResetRq,
    IPasswordSetRq
} from 'services/auth/models';
import { postRequest, putRequest } from 'utils/rest';

const AuthServices = {
    signIn (credentials: ILoginCredentials) {
        return postRequest<ILoginCredentials, IUser>('/login', credentials);
    },

    changePassword (passwordData: IPasswordChangeRq) {
        return putRequest<IPasswordChangeRq, void>('/registration/changepassword', passwordData);
    },

    resetPassword (passwordResetData: IPasswordResetRq) {
        return postRequest<IPasswordResetRq, void>('/registration/reset', passwordResetData);
    },

    setPassword (passwordData: IPasswordSetRq) {
        return putRequest(`/registration/reset/${passwordData.token}`, passwordData);
    }
};

export default AuthServices;
