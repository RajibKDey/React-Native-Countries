import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import {REGIONS} from '../constants';
import useDebounce from '../hooks/useDebounce';
import {StyleVars} from '../styles';
import CountryDetail from '../components/CountryDetail';
import {CountryDetails} from '../global';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllAction} from '../store/actions';
import {fetchAll, fetchByName, fetchByRegion} from '../apis';
import Backfill from '../components/Backfill';
import {Store} from '../store/configureStore';

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'white',
    paddingHorizontal: StyleVars.PRIMARY_SPACING,
    paddingBottom: StyleVars.SCREEN_BOUNDARY,
  },
  headerContainer: {
    paddingBottom: StyleVars.SCREEN_BOUNDARY,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecords: {
    fontSize: StyleVars.FONT_SIZES.md,
    color: 'black',
  },
  ListHeaderComponentStyle: {
    zIndex: 10,
  },
});

const Home = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<CountryDetails[]>([]);
  const dispatch = useDispatch();

  const mapCountries = useSelector((state: Store) => state?.countries);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const fetchAllCountries = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchAll();
        dispatch(fetchAllAction(response));
        setResult(response);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchAllCountries();
  }, [dispatch]);

  useEffect(() => {
    const fetchCountriesByRegion = async (reg: string) => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchByRegion(reg);
        setResult(response);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    if (region) {
      fetchCountriesByRegion(region);
    }
  }, [region]);

  useEffect(() => {
    const fetchCountriesByName = async (name: string) => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchByName(name);
        setResult(response);
      } catch (err: any) {
        setError(err.message);
      }
      setLoading(false);
    };

    if (debouncedValue.trim()) {
      fetchCountriesByName(debouncedValue.trim());
    }
  }, [debouncedValue]);

  const renderItem = useCallback(
    ({item, index}: {item: CountryDetails; index: number}) => {
      return (
        <TouchableOpacity
          key={`${item.cca2}${index}`}
          activeOpacity={StyleVars.TOUCH_OPACITY}
          onPress={() => {
            navigation.navigate('Country-Details', {
              code: item.cca2,
            });
          }}>
          <CountryDetail key={`${item.cca3}${index}`} country={item} />
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const renderBackfill = useCallback(() => {
    if (!loading && !error) {
      return null;
    }
    if (error) {
      return <Backfill text={error} fill />;
    }
    return <Backfill fill loading />;
  }, [error, loading]);

  return !result && (loading || !!error) ? (
    renderBackfill()
  ) : (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Input
              containerStyle={{marginTop: StyleVars.SCREEN_BOUNDARY}}
              search={true}
              hasClearOption={true}
              value={value}
              placeholder={'Search for a country...'}
              onChangeText={val => {
                setValue(val);
                setRegion('');
                if (!val) {
                  setResult(Object.values(mapCountries));
                }
              }}
              loading={loading}
            />
            <Dropdown
              dropdownItems={REGIONS}
              value={region}
              setValue={item => {
                setRegion(item);
                setValue('');
              }}
              placeholder={'Filter by Region...'}
              // enable closing of dropdown on clicking outside
            />
          </View>
        }
        ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
        data={result}
        renderItem={renderItem}
        keyExtractor={item => item.cca3}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={4}
        removeClippedSubviews
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.noRecords}>No Records</Text>
          </View>
        }
      />
    </TouchableWithoutFeedback>
  );
};

export default Home;
