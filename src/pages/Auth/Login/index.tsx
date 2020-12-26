import { GOOGLE_CREDENTIALS } from 'consts';
import { FormEvent } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';

import { signIn } from 'actions/auth';
import { IAppState, IAsyncData } from 'models';
import { EInputSize } from 'models/enums';

import FormFieldError from 'components/FormFieldError';
import Input from 'components/Input';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import { isServerError } from 'utils';
import { isError, isPending } from 'utils/redux';

enum EFormField {
    USERNAME = 'username',
    PASSWORD = 'password',
}

interface IForm {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const signInBranch = useSelector<IAppState, IAsyncData<void>>((state) => state.signIn);

    const {
        control,
        getValues,
        trigger,
        errors,
        handleSubmit,
    } = useForm<IForm>();

    const makeLoginRequest = handleSubmit(values => {
        dispatch(signIn(values, history));
    });

    console.log(signInBranch.error)

    const handleLogin = (e?: FormEvent) => {
        e && e.preventDefault();
        makeLoginRequest();
    };

    const handleGoogleLoginSuccess = response => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('googleId', response.googleId);
        localStorage.setItem('googleProfile', JSON.stringify(response.profileObj));
        localStorage.setItem('googleToken', JSON.stringify(response.tokenObj));
        window.location.reload();
    };

    return (
        <div className="vw-100 d-flex align-items-center justify-content-center">
            <form onSubmit={handleLogin}>
                <InputContainer className="auth-input-container mb-4">
                    <Label text={t('Common.inputs.username.label')} />
                    <Controller
                        control={control}
                        name={EFormField.USERNAME}
                        defaultValue=""
                        rules={{
                            required: !getValues()[EFormField.USERNAME],
                        }}
                        render={({ onChange, value, onBlur }) => (
                            <Input
                                inputSize={EInputSize.MD}
                                hasError={Boolean(errors[EFormField.USERNAME])}
                                value={value}
                                onBlur={() => {
                                    onBlur();
                                    trigger(EFormField.USERNAME);
                                }}
                                disabled={isPending(signInBranch)}
                                onChange={onChange}
                                placeholder={t('Common.inputs.username.placeholder')}
                            />
                        )}
                    />
                </InputContainer>
                <InputContainer className="auth-input-container cmb-16">
                    <Label text={t('Common.inputs.password.label')} />
                    <Controller
                        render={({ onChange, value, onBlur }) => (
                            <Input
                                inputSize={EInputSize.MD}
                                isPassword
                                value={value}
                                onBlur={() => {
                                    onBlur();
                                    trigger(EFormField.PASSWORD);
                                }}
                                disabled={isPending(signInBranch)}
                                hasError={Boolean(errors[EFormField.PASSWORD])}
                                onChange={onChange}
                                placeholder={t('Common.inputs.password.placeholder')}
                            />
                        )}
                        name={EFormField.PASSWORD}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: !getValues()[EFormField.PASSWORD],
                        }}
                    />
                </InputContainer>
                <p className="fs-2 text-center text-dark mb-3">{t('Pages.login.or-login-with')}</p>
                <div className="login-page__google-button-container mb-3">
                    <GoogleLogin
                        onFailure={reason => console.log(reason)}
                        onSuccess={handleGoogleLoginSuccess}
                        clientId={GOOGLE_CREDENTIALS.clientId}
                        redirectUri={'http://localhost:7000/login'}
                        buttonText={t('Pages.login.login-with-google')}
                        style={{ width: '100%' }}
                    />
                </div>
                {/*<SimpleLink*/}
                {/*    className="cmb-12"*/}
                {/*    href={`/password-recovery${getValues()[EFormField.USERNAME] ? `?email=${getValues()[EFormField.USERNAME]}` : ''}`}*/}
                {/*>*/}
                {/*    {t('Pages.login.forgot-password-question')}*/}
                {/*</SimpleLink>*/}
                {isError(signInBranch) && (
                    <div className="auth-input-container mb-2">
                        <FormFieldError
                            message={isServerError(signInBranch.error) ? 'Internal server error occurred' : 'Incorrect credentials'}
                        />
                    </div>
                )}
                <Button
                    block
                    role="submit"
                    color={'primary'}
                    disabled={isPending(signInBranch)}
                >
                    {t('ACTIONS.login')}
                </Button>
            </form>
        </div>
    );
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
