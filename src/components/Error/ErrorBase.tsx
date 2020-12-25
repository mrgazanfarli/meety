import * as React from 'react';

interface IProps {
    title: string;
    description: string;
    image: any;
}

const ErrorBase: React.FC<IProps> = ({description, image, title}) => {
    return (
        <div className="d-flex flex-column align-items-center p-2">
            <img src={image} alt="Error" className="mw-100 cmb-32" />
            <h1 className="mb-2">{title}</h1>
            <p className="fs-1 color-kimberly-dark">{description}</p>
        </div>
    )
};

ErrorBase.displayName = 'ErrorBase';

export default ErrorBase;
