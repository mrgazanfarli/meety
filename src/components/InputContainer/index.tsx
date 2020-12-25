import * as React from 'react';

const InputContainer: React.FC<React.HTMLAttributes<any>> = (props) => {
    return (
        <div className={`d-flex flex-column ${props.className}`} {...props}>
            {props.children}
        </div>
    );
};

InputContainer.displayName = 'InputContainer';

export default InputContainer;
