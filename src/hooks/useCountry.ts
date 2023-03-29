import {useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {fetchAll, fetchByCode, fetchByName, fetchByRegion} from '../apis';
import {CountryDetails} from '../global';
import {fetchAllAction, fetchByNameAction} from '../store/actions';
import {Store} from '../store/configureStore';

const useCountry = () => {
  const [result, setResult] = useState<
    undefined | CountryDetails | CountryDetails[]
  >();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const countryMap = useSelector((state: Store) => state.countries);

  const fetchAllCountries = useCallback(async () => {
    setLoading(true);
    setError('');
    setResult(undefined);
    try {
      const response = await fetchAll();
      dispatch(fetchAllAction(response));
      setResult(response);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [dispatch]);

  const fetchCountriesByRegion = useCallback(async (reg: string) => {
    setLoading(true);
    setError('');
    setResult(undefined);
    try {
      const response = await fetchByRegion(reg);
      setResult(response);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  const fetchCountriesByName = useCallback(async (name: string) => {
    setLoading(true);
    setError('');
    setResult(undefined);
    try {
      const response = await fetchByName(name);
      setResult(response);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  const fetchCountriesByCode = useCallback(
    async (codes: string[]) => {
      setLoading(true);
      setError('');
      setResult(undefined);
      try {
        const response = await fetchByCode(codes);
        dispatch(fetchByNameAction(response[0]));
        setResult(response[0]);
      } catch (err: any) {
        setError(err?.message);
      }
      setLoading(false);
    },
    [dispatch],
  );

  return {
    countryMap,
    result,
    loading,
    error,
    fetchAllCountries,
    fetchCountriesByRegion,
    fetchCountriesByName,
    fetchCountriesByCode,
  };
};

export default useCountry;
