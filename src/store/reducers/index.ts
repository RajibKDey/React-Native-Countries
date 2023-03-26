import {CountryDetails} from '../../global';
import {FETCH_ALL, FETCH_BY_NAME} from '../constants';
import _ from 'lodash';

type InitialState = {
  mapCountries: Record<string, CountryDetails>;
};

const initialState: InitialState = {
  mapCountries: {},
};

function reducePayload(payload: CountryDetails[]) {
  return payload.reduce(
    (accumulator: InitialState, countryRecord: CountryDetails) => {
      countryRecord.isComplete = false;
      const common = countryRecord.name.common;
      accumulator.mapCountries[common] = countryRecord;
      return accumulator;
    },
    {
      mapCountries: {},
    },
  );
}

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      const {mapCountries} = reducePayload(action.payload);
      return {
        mapCountries,
      };

    case FETCH_BY_NAME:
      const {payload} = action;
      const updatedCountries = _.cloneDeep(state.mapCountries);
      const common = payload?.name?.common;
      updatedCountries[common] = payload;
      updatedCountries[common].isComplete = true;
      return {
        mapCountries: updatedCountries,
      };
    default:
      return state;
  }
};

export default countryReducer;
