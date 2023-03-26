import {createStore, combineReducers} from 'redux';
import countryReducer from './reducers';
const rootReducer = combineReducers({countries: countryReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
