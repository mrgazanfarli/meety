import { IDataWithNumber, IOptions } from 'models';

export interface IOptionsResponse {
    optionsResponse: IOptions[];
}

export interface ICountryOptionsRp {
    counties: IDataWithNumber[];
}
