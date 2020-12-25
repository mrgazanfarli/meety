import ReportActions from 'actions/report/consts';
import * as RightBarActions from 'actions/rightBar/consts';
import { IOptions } from 'models';
import { Reducer } from 'redux';
import { ICountryOptionsRp, IOptionsResponse } from 'services/report/models';
import { generateAsyncItemReducer } from 'utils/redux';

export const generalOptions = generateAsyncItemReducer<IOptionsResponse>(ReportActions.GET_GENERAL_OPTIONS);
export const countryOptions = generateAsyncItemReducer<ICountryOptionsRp>(ReportActions.GET_COUNTRY_OPTIONS);
export const countryFilters = generateAsyncItemReducer<IOptionsResponse>(ReportActions.GET_COUNTRY_FILTERS);
export const generalReport = generateAsyncItemReducer<any>(ReportActions.GET_GENERAL_REPORT);
export const countryReport = generateAsyncItemReducer<any>(ReportActions.GET_COUNTRY_REPORT);

export const reportType: Reducer = (state = 'general', { type, payload }) => {
    if (type === ReportActions.SET_REPORT_TYPE) {
        return payload;
    } else {
        return state;
    }
};
