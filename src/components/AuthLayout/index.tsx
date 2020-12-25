import * as React from 'react';

import mobileAuthBg from 'assets/images/auth/auth-bg-sm.svg';

const AuthLayout: React.FC = (props) => {
    return (
        <div className="auth-layout bg-white">
            <div className="auth-layout__left-side">
                <img src={mobileAuthBg} alt="" className="d-block w-100 d-md-none" />
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
