import { IAppState, IAsyncData } from 'models';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { EInputSize } from 'models/enums';
import { ROUTES } from 'routes/consts';
import { getURLParam } from 'utils';
import { setPassword } from 'actions/auth';

import Button from 'components/Button';
import Input from 'components/Input';
import InputContainer from 'components/InputContainer';
import Label from 'components/Label';
import { isPending } from 'utils/redux';

interface IForm {
    password: string;
    confirmPassword: string;
}

enum EFormField {
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
}

const PasswordSetPage: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const setPassBranch = useSelector<IAppState, IAsyncData<void>>((state) => state.setPassword);
    const token = getURLParam('token', history.location);

    if (!token) {
        history.push(ROUTES.AUTH.LOGIN.PATH);
    }

    const {
        getValues,
        trigger,
        handleSubmit,
        errors,
        control,
    } = useForm<IForm>();

    const handleSend = handleSubmit((values) => {
        dispatch(setPassword({
            ...values,
            token,
        })).then(() => {
            history.push(ROUTES.AUTH.LOGIN.PATH);
        })
    });

    const isSetLoading = isPending(setPassBranch);

    return (
        <>
            <h1 className="font-weight-semi-bold">{t('Pages.password-set.title')}</h1>
            <InputContainer className="auth-input-container mb-4 cmt-32">
                <Label text={t('Common.inputs.password.label')} />
                <Controller
                    defaultValue=""
                    name={EFormField.PASSWORD}
                    control={control}
                    rules={{
                        required: getValues().password || true
                    }}
                    render={({ onChange, value, onBlur }) => {
                        return (
                            <Input
                                inputSize={EInputSize.MD}
                                isPassword
                                value={value}
                                onChange={onChange}
                                hasError={Boolean(errors?.password)}
                                disabled={isSetLoading}
                                onBlur={() => {
                                    trigger(EFormField.PASSWORD).then(onBlur);
                                }}
                                placeholder={t('Common.inputs.password.placeholder')}
                            />
                        )
                    }}
                />
            </InputContainer>
            <InputContainer className="auth-input-container mb-4 cmt-32">
                <Label text={t('Common.inputs.password-confirmation.label')} />
                <Controller
                    defaultValue=""
                    name={EFormField.CONFIRM_PASSWORD}
                    control={control}
                    rules={{
                        required: getValues().confirmPassword || true,
                        validate: {
                            isSame: (val) => {
                                return val === getValues().password
                            }
                        }
                    }}
                    render={({ onChange, value, onBlur }) => {
                        return (
                            <Input
                                inputSize={EInputSize.MD}
                                isPassword
                                value={value}
                                onChange={onChange}
                                hasError={Boolean(errors?.confirmPassword)}
                                disabled={isSetLoading}
                                onBlur={() => {
                                    trigger(EFormField.CONFIRM_PASSWORD).then(onBlur);
                                }}
                                placeholder={t('Common.inputs.password.placeholder')}
                            />
                        )
                    }}
                />
            </InputContainer>
            <Button
                fullWidth
                onClick={handleSend}
                disabled={isSetLoading}
            >
                {t('ACTIONS.send')}
            </Button>
        </>
    );
};

PasswordSetPage.displayName = 'PasswordSetPage';

export default PasswordSetPage;
