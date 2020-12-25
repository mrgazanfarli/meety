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
import { IAppState, IAsyncData, IUser } from 'models';
import { EInputSize } from 'models/enums';

// import Button from 'components/Button';
import FormFieldError from 'components/FormFieldError';
import Input from 'components/Input';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import SimpleLink from 'components/SimpleLink';
import { isServerError, isValidEmail } from 'utils';
import { isError, isPending } from 'utils/redux';

enum EFormField {
    EMAIL = 'email',
    PASSWORD = 'password',
}

interface IForm {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const signInBranch = useSelector<IAppState, IAsyncData<IUser>>((state) => state.signIn);

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

    const handleLogin = (e?: FormEvent) => {
        e && e.preventDefault();
        makeLoginRequest();
    };

    return (
        <div className="vw-100 d-flex align-items-center justify-content-center">
            <form onSubmit={handleLogin}>
                <InputContainer className="auth-input-container mb-4">
                    <Label text={t('Common.inputs.email.label')} />
                    <Controller
                        control={control}
                        name={EFormField.EMAIL}
                        defaultValue=""
                        rules={{
                            required: !getValues()[EFormField.EMAIL],
                            validate: {
                                isEmail: (value) => isValidEmail(value)
                            }
                        }}
                        render={({ onChange, value, onBlur }) => (
                            <Input
                                inputSize={EInputSize.MD}
                                hasError={Boolean(errors[EFormField.EMAIL])}
                                isEmail
                                value={value}
                                onBlur={() => {
                                    onBlur();
                                    trigger(EFormField.EMAIL);
                                }}
                                disabled={isPending(signInBranch)}
                                onChange={onChange}
                                placeholder={t('Common.inputs.email.placeholder')}
                            />
                        )}
                    />
                </InputContainer>
                <InputContainer className="auth-input-container cmb-12">
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
                <p className="fs-2 text-center text-dark">{t('Pages.login.or-login-with')}</p>
                <div className="login-page__google-button-container">
                    <GoogleLogin
                        clientId={GOOGLE_CREDENTIALS.clientId}
                        redirectUri={'http://localhost:7000/login'}
                        buttonText={t('Pages.login.login-with-google')}
                        style={{ width: '100%' }}
                    />
                </div>
                <SimpleLink
                    className="cmb-12"
                    href={`/password-recovery${getValues()[EFormField.EMAIL] ? `?email=${getValues()[EFormField.EMAIL]}` : ''}`}
                >
                    {t('Pages.login.forgot-password-question')}
                </SimpleLink>
                {isError(signInBranch) && (
                    <div className="auth-input-container mb-2">
                        <FormFieldError
                            message={isServerError(signInBranch.error) ? t('Error.serverError') : t('Error.login.loginFailed')}
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
