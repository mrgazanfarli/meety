import { EInputSize } from 'models/enums';
import * as React from 'react';

import { isValidEmail } from 'utils';

import eyeIcon from 'assets/images/icons/ic-eye.svg';

interface IProps extends React.InputHTMLAttributes<any> {
    value: string;
    onChange: any;
    hasError?: boolean | '';
    isPassword?: boolean;
    errorText?: string;
    isEmail?: boolean;
    inputSize?: EInputSize;
}

const Input: React.FC<IProps> = (props) => {
    const { value, onChange, hasError, isPassword, isEmail, inputSize = EInputSize.SM, onBlur, ...rest } = props;

    const [isContentShown, setContentVisibility] = React.useState(!Boolean(isPassword));
    const [isEmailValid, setEmailValidity] = React.useState(true);

    const handlePasswordToggleClick = () => {
        setContentVisibility(!isContentShown);
    };

    return (
        <div className={`input${isPassword ? ' input--password' : ''}${inputSize ? ` input--${inputSize}` : ''}`}>
            <input
                {...rest}
                type={`${isContentShown ? (isEmail ? 'email' : 'text') : 'password'}`}
                className={`input__field${(hasError || !isEmailValid) ? ' border-danger' : ''} ${rest.className || ''}`}
                value={value}
                onChange={e => {
                    e.persist();
                    onChange(e.target.value);
                }}
                onBlur={e => {
                    if (isEmail) {
                        setEmailValidity(isValidEmail(e.target.value));
                    }
                    onBlur && onBlur(e);
                }}
            />
            {isPassword && (
                <img
                    alt=""
                    src={eyeIcon}
                    className="input__password-visibility"
                    onClick={handlePasswordToggleClick}
                />
            )}
        </div>
    );
};

Input.displayName = 'Input';

export default Input;
