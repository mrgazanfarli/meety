import { getRequest, makeQueryParams } from 'utils/rest';

import { ICountryOptionsRp, IOptionsResponse } from './models';

const ReportServices = {
    getGeneralOptions (): Promise<IOptionsResponse> {
        return getRequest('/report/general/options');
    },

    getCountryOptions (): Promise<ICountryOptionsRp> {
        return getRequest('/report/options');
    },

    getCountryFilters (): Promise<IOptionsResponse> {
        return getRequest('/report/country/options');
    },

    getGeneralReport (params: any): Promise<any> {
        const queryParams = makeQueryParams(params);
        return getRequest(`/report/general${queryParams}`);
    },

    getCountryReport (params: any, countryNo: string): Promise<any> {
        const queryParams = makeQueryParams(params);
        return getRequest(`/report/country/${countryNo}${queryParams}`);
    },
};

export default ReportServices;
