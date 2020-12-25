import * as React from 'react';

interface IProps extends React.HTMLAttributes<any> {
    type?: 'basic' | 'primary' | 'secondary';
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: any;
}

const Button: React.FC<IProps> = (props) => {
    const { type = 'primary', fullWidth, disabled = false, onClick, ...rest } = props;

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <button
            {...rest}
            className={`button button--${type} ${fullWidth ? 'w-100' : ''}${disabled ? ' disabled' : ''} ${props.className || ''}`}
            onClick={handleClick}
        >
            {rest.children}
        </button>
    )
};

Button.displayName = 'Button';

export default Button;
