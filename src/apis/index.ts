import Config from 'react-native-config';
import CallApi from '../utils/callApi';

const ALL = 'all';
const NAME = 'name';
const REGION = 'region';
const ALPHA = 'alpha';

const fields = [
  'flags',
  'name',
  'population',
  'region',
  'capital',
  'cca2',
  'cca3',
];

const extraFields = [
  'independent',
  'currencies',
  'subregion',
  'languages',
  'latlng',
  'borders',
  'area',
  'timezones',
  'continents',
];

const fetchAll = () => {
  return CallApi({
    url: `${Config.BASE_URL}${ALL}`,
    method: 'GET',
    queryParams: {
      fields: fields,
    },
  });
};

const fetchByName = (name: string, queryParams?: any) => {
  return CallApi({
    url: `${Config.BASE_URL}${NAME}/${name}`,
    method: 'GET',
    queryParams: {
      fields: fields,
      ...queryParams,
    },
  });
};

const fetchByRegion = (region: string) => {
  return CallApi({
    url: `${Config.BASE_URL}${REGION}/${region}`,
    method: 'GET',
    queryParams: {
      fields: fields,
    },
  });
};

const fetchByCode = (codes: string[]) => {
  return CallApi({
    url: `${Config.BASE_URL}${ALPHA}`,
    method: 'GET',
    queryParams: {
      codes,
      fields: [...fields, ...extraFields],
    },
  });
};

export {fetchAll, fetchByName, fetchByRegion, fetchByCode};
