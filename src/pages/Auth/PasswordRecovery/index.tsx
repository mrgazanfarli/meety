import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { initializeResetPassword, resetPassword } from 'actions/auth';
import { IAppState, IAsyncData } from 'models';
import { EInputSize } from 'models/enums';
import { getURLParam, isServerError, isValidEmail } from 'utils';
import { isError, isPending } from 'utils/redux';

import Button from 'components/Button';
import FormFieldError from 'components/FormFieldError';
import Input from 'components/Input';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';

enum EFormField {
    EMAIL = 'email'
}

interface IForm {
    email: string;
}

const PasswordRecoveryPage: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const location = useLocation();
    const email = getURLParam('email', location);
    const resetPasswordBranch = useSelector<IAppState, IAsyncData<void>>((state) => state.resetPassword);

    const {
        control,
        errors,
        getValues,
        trigger,
        handleSubmit,
    } = useForm<IForm>();

    const handleSend = handleSubmit(values => {
        dispatch(resetPassword(values));
    });

    React.useEffect(
        () => {
            return () => {
                dispatch(initializeResetPassword());
            };
        },
        []
    );

    return (
        <>
            <h1 className="font-weight-semi-bold">{t('Pages.password-recovery.title')}</h1>
            <InputContainer className="auth-input-container mb-4 cmt-32">
                <Label text={t('Common.inputs.email.label')} />
                <Controller
                    control={control}
                    name={EFormField.EMAIL}
                    rules={{
                        required: !getValues()[EFormField.EMAIL],
                        validate: {
                            isValidEmail: email => isValidEmail(email),
                        }
                    }}
                    defaultValue={email || ''}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            inputSize={EInputSize.MD}
                            isEmail
                            value={value}
                            onChange={onChange}
                            hasError={Boolean(errors[EFormField.EMAIL])}
                            onBlur={() => {
                                trigger(EFormField.EMAIL).then(() => onBlur());
                            }}
                            disabled={isPending(resetPasswordBranch)}
                            placeholder={t('Common.inputs.email.placeholder')}
                        />
                    )}
                />
                {isError(resetPasswordBranch) && (
                    <div className="mt-2">
                        <FormFieldError
                            message={isServerError(resetPasswordBranch.error) ? t('Error.serverError') : t('Error.resetPassword.checkEmail')}
                        />
                    </div>
                )}
            </InputContainer>
            <Button
                fullWidth
                onClick={handleSend}
                disabled={isPending(resetPasswordBranch)}
            >
                {t('ACTIONS.send')}
            </Button>
        </>
    )
};

PasswordRecoveryPage.displayName = 'PasswordRecoveryPage';

export default PasswordRecoveryPage;
