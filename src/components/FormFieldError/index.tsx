import * as React from 'react';

interface IProps {
    message: string;
}

const FormFieldError: React.FC<IProps> = ({ message }) => {
    return (
        <p className="form-field-error fs-1">{message}</p>
    )
};

FormFieldError.displayName = 'FormFieldError';

export default FormFieldError;
