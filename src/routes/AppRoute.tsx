import * as React from 'react';
import { Redirect, Route, } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ELocalStorageItem } from 'consts';
import { ROUTES } from 'routes/consts';

import Layout from 'components/Layout';
import AuthLayout from 'components/AuthLayout';

interface IProps {
    component: any;
    isAuthProtected: boolean;
    path: string;
}

const AppRoute: React.FC<IProps> = ({ component: Component, isAuthProtected, ...rest }) => {
    const location = useLocation();

    return (
        <Route
            {...rest}
            exact
            render={(props) => {
                if (isAuthProtected) {
                    if (!localStorage.getItem(ELocalStorageItem.TOKEN)) {
                        return (
                            <Redirect to={{ pathname: ROUTES.AUTH.LOGIN.PATH, state: { from: location } }} />
                        );
                    } else {
                        return (
                            <Layout>
                                <Component {...props} />
                            </Layout>
                        );
                    }
                } else {
                    if (localStorage.getItem(ELocalStorageItem.TOKEN)) {
                        return (
                            <Redirect to={{ pathname: ROUTES.DASHBOARD.PATH }} />
                        );
                    }
                    return (
                        <AuthLayout>
                            <Component {...props} />
                        </AuthLayout>
                    );
                }
            }}
        />
    );
};

AppRoute.displayName = 'AppRoute';

export default AppRoute;
