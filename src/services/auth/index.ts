import { ILoginCredentials } from 'services/auth/models';
import { postRequest } from 'utils/rest';

const AuthServices = {
    signIn (credentials: ILoginCredentials) {
        return postRequest<ILoginCredentials, void>('https://event-auth.herokuapp.com/v1/users/login', credentials);
    },
};

export default AuthServices;
