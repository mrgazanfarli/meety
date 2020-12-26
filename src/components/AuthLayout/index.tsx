import * as React from 'react';

const AuthLayout: React.FC = (props) => {
    return (
        <div className="auth-layout bg-white">
            <div className="auth-layout__left-side">
                <div>
                    {props.children}
                </div>
            </div>
            <div className="auth-layout__right-side" />
        </div>
    );
};

AuthLayout.displayName = 'AuthLayout';

export default AuthLayout;
