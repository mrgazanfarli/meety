import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { authProtectedRoutes, publicRoutes } from 'routes';

import LoadingSpinner from 'components/Loading';
import AppRoute from 'routes/AppRoute';

const App: React.FC = () => {
    return (
        <Router>
            <React.Suspense
                fallback={(
                    <div className="pt-3">
                        <LoadingSpinner />
                    </div>
                )}
            >
                <Switch>
                    {publicRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            component={route.component}
                            key={idx}
                            isAuthProtected={false}
                        />
                    ))}

                    {authProtectedRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            component={route.component}
                            key={idx}
                            isAuthProtected={true}
                        />
                    ))}

                    <Redirect from="*" to="/dashboard" />
                </Switch>
            </React.Suspense>
        </Router>
    );
};

App.displayName = 'App';

export default App;
