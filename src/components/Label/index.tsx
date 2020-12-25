import * as React from 'react';

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string;
}

const Label: React.FC<IProps> = ({ text, ...rest }) => {
    return (
        <label className={`label mt-2 ${rest.className || ''}`} {...rest}>
            {text}
        </label>
    );
};

Label.displayName = 'Label';

export default Label;
