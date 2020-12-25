import { Dispatch } from 'redux';
import ReportServices from 'services/report';

import ReportActions from './consts';

export const getGeneralOptions = (): any => {
    return {
        payload: ReportServices.getGeneralOptions(),
        type: ReportActions.GET_GENERAL_OPTIONS,
    }
};

export const getCountryOptions = (): any => {
    return {
        payload: ReportServices.getCountryOptions(),
        type: ReportActions.GET_COUNTRY_OPTIONS,
    }
};

export const getCountryFilters = (): any => {
    return {
        payload: ReportServices.getCountryFilters(),
        type: ReportActions.GET_COUNTRY_FILTERS,
    }
};

export const getGeneralReport = (params: any): any => {
    return {
        payload: ReportServices.getGeneralReport(params),
        type: ReportActions.GET_GENERAL_REPORT,
    }
};

export const setReportType = (type: string) => (dispatch: Dispatch) => {
    dispatch({
        type: ReportActions.SET_REPORT_TYPE,
        payload: type,
    })
};

export const getCountryReport = (params: any, countryNo: string) => {
    return {
        payload: ReportServices.getCountryReport(params, countryNo),
        type: ReportActions.GET_COUNTRY_REPORT,
    }
};
