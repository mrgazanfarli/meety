import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import 'react-dates/initialize';

import App from 'App';
import i18n from 'i18n';
import reportWebVitals from 'reportWebVitals';
import store from 'store';

import 'react-dates/lib/css/_datepicker.css';
import 'assets/sass/index.scss';

// localStorage.setItem('token', 'test');

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
