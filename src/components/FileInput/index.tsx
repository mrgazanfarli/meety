import * as React from 'react';

interface IProps extends React.InputHTMLAttributes<any> {
    label: React.ReactElement;
    id: string;
}

const FileInput: React.FC<IProps> = ({id, label, ...rest}) => {
    return (
        <>
            <label htmlFor={id} className="cursor-pointer">
                {label}
            </label>
            <input {...rest} type="file" id={id} className="d-none" />
        </>
    )
};

FileInput.displayName = 'FileInput';

export default FileInput;
