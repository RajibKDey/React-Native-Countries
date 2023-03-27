import Config from 'react-native-config';
import CallApi from '../utils/callApi';

const ALL = 'all';
const NAME = 'name';
const REGION = 'region';
const ALPHA = 'alpha';

const fetchAll = () => {
  return CallApi({
    url: `${Config.BASE_URL}${ALL}`,
    method: 'GET',
    queryParams: {
      fields: [
        'flags',
        'name',
        'population',
        'region',
        'capital',
        'cca2',
        'cca3',
      ],
    },
  });
};

const fetchByName = (name: string, queryParams?: any) => {
  return CallApi({
    url: `${Config.BASE_URL}${NAME}/${name}`,
    method: 'GET',
    queryParams: {
      fields: [
        'flags',
        'name',
        'population',
        'region',
        'capital',
        'cca2',
        'cca3',
      ],
      ...queryParams,
    },
  });
};

const fetchByRegion = (region: string) => {
  return CallApi({
    url: `${Config.BASE_URL}${REGION}/${region}`,
    method: 'GET',
    queryParams: {
      fields: [
        'flags',
        'name',
        'population',
        'region',
        'capital',
        'cca2',
        'cca3',
      ],
    },
  });
};

const fetchByCode = (codes: string[]) => {
  return CallApi({
    url: `${Config.BASE_URL}${ALPHA}`,
    method: 'GET',
    queryParams: {
      codes,
      fields: [
        'name',
        'cca2',
        'cca3',
        'independent',
        'currencies',
        'capital',
        'region',
        'subregion',
        'languages',
        'latlng',
        'borders',
        'area',
        'population',
        'timezones',
        'continents',
        'flags',
      ],
    },
  });
};

export {fetchAll, fetchByName, fetchByRegion, fetchByCode};
