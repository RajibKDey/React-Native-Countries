import {CountryDetails} from '../../global';
import {FETCH_ALL, FETCH_BY_NAME} from '../constants';

function fetchAllAction(countries: CountryDetails[]) {
  return {
    type: FETCH_ALL,
    payload: countries,
  };
}

function fetchByNameAction(country: CountryDetails) {
  return {
    type: FETCH_BY_NAME,
    payload: country,
  };
}

export {fetchAllAction, fetchByNameAction};
