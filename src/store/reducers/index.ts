import {CountryDetails} from '../../global';
import {FETCH_ALL, FETCH_BY_NAME} from '../constants';
import _ from 'lodash';

type Action = {
  type: string;
  payload: any;
};

export type CountryReducerState = Record<string, CountryDetails>;

const initialState = {};

function reducePayload(payload: CountryDetails[]) {
  return payload.reduce(
    (accumulator: CountryReducerState, countryRecord: CountryDetails) => {
      countryRecord.isComplete = false;
      const cca2 = countryRecord.cca2;
      accumulator[cca2] = countryRecord;
      return accumulator;
    },
    {},
  );
}

const countryReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_ALL:
      const mapCountries = reducePayload(action.payload);
      return mapCountries;

    case FETCH_BY_NAME:
      const {payload} = action;
      const updatedCountries: CountryReducerState = _.cloneDeep(state);
      const cca2 = payload?.cca2;
      updatedCountries[cca2] = payload;
      updatedCountries[cca2].isComplete = true;
      return updatedCountries;
    default:
      return state;
  }
};

export default countryReducer;
