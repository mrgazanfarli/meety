import * as React from 'react';

import { IRoute } from 'models';
import { ROUTES } from 'routes/consts';

// Auth-related pages
const LoginPage = React.lazy(() => import('pages/Auth/Login'));

// Dashboard
const DashboardPage = React.lazy(() => import('pages/Dashboard'));

// Events
const EventsPage = React.lazy(() => import('pages/Events'));
const EventDetailsPage = React.lazy(() => import('pages/Events/details'));

export const authProtectedRoutes: IRoute[] = [
    { path: ROUTES.DASHBOARD.PATH, component: DashboardPage },
    { path: ROUTES.EVENTS.DETAILS.PATH, component: EventDetailsPage },
    { path: ROUTES.EVENTS.PATH, component: EventsPage },
];

export const publicRoutes: IRoute[] = [
    { path: ROUTES.AUTH.LOGIN.PATH, component: LoginPage },
];
