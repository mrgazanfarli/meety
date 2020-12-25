import * as React from 'react';

import { IRoute } from 'models';
import { ROUTES } from 'routes/consts';

// Auth-related pages
const LoginPage = React.lazy(() => import('pages/Auth/Login'));
const PasswordRecoveryPage = React.lazy(() => import('pages/Auth/PasswordRecovery'));
const PasswordSetPage = React.lazy(() => import('pages/Auth/PasswordSet'));

// Dashboard
const DashboardPage = React.lazy(() => import('pages/Dashboard'));

export const authProtectedRoutes: IRoute[] = [
    { path: ROUTES.DASHBOARD.PATH, component: DashboardPage },

];

export const publicRoutes: IRoute[] = [
    { path: ROUTES.AUTH.LOGIN.PATH, component: LoginPage },
    { path: ROUTES.AUTH.PASSWORD_RECOVERY.PATH, component: PasswordRecoveryPage },
    { path: ROUTES.AUTH.PASSWORD_SET.PATH, component: PasswordSetPage },
];
