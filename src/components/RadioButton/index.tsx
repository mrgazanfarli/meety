import * as React from 'react';

interface IProps extends React.InputHTMLAttributes<any> {
    text: string;
}

const RadioButton: React.FC<IProps> = ({checked, onChange, name, text, ...rest}) => {
    return (
        <div onClick={onChange} className="radio-button d-flex align-items-center">
            <input
                {...rest}
                className="radio-button__field"
                type="radio"
                onChange={onChange}
                name={name}
                checked={checked}
            />
            <span className="radio-button__checker"/>
            <span className="fs-1 font-weight-semi-bold cpl-24 color-kimberly-dark">{text}</span>
        </div>
    )
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
