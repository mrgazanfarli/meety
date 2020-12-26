import * as React from 'react';

import { IRoute } from 'models';
import { ROUTES } from 'routes/consts';

// Auth-related pages
const LoginPage = React.lazy(() => import('pages/Auth/Login'));

// Dashboard
const DashboardPage = React.lazy(() => import('pages/Dashboard'));

// Events
const EventsPage = React.lazy(() => import('pages/Events'));

export const authProtectedRoutes: IRoute[] = [
    { path: ROUTES.EVENTS.PATH, component: EventsPage },
    { path: ROUTES.DASHBOARD.PATH, component: DashboardPage },
];

export const publicRoutes: IRoute[] = [
    { path: ROUTES.AUTH.LOGIN.PATH, component: LoginPage },
];
