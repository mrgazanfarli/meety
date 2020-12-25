import * as React from 'react';

const SimpleLink: React.FC<React.LinkHTMLAttributes<any>> = (props) => {
    const { className, ...rest } = props;
    return (
        <a className={`simple-link d-inline-block ${className || ''}`} {...rest}>
            {props.children}
        </a>
    );
};

SimpleLink.displayName = 'SimpleLink';

export default SimpleLink;
