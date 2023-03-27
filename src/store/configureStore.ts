import {createStore, combineReducers} from 'redux';
import countryReducer, {CountryReducerState} from './reducers';

export type Store = {
  countries: CountryReducerState;
};

const rootReducer = combineReducers({countries: countryReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
