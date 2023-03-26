import React, {useState, useEffect} from 'react';
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

const Home = ({navigation}) => {
  const [value, setValue] = useState('');
  const [region, setRegion] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();

  const mapCountries = useSelector(state => state?.countries?.mapCountries);

  const debouncedValue = useDebounce(value, 500);

  const fetchAllCountries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchAll();
      if (response.length > 0) {
        dispatch(fetchAllAction(response));
        setResult(response);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    const fetchCountriesByRegion = async (region: string) => {
      setLoading(true);
      setError('');
      let response;
      try {
        response = await fetchByRegion(region);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
      setResult(response);
    };

    if (region) {
      fetchCountriesByRegion(region);
    }
  }, [region]);

  useEffect(() => {
    const fetchCountriesByName = async (name: string) => {
      setLoading(true);
      setError('');
      let response;
      try {
        response = await fetchByName(name);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
      setResult(response);
    };

    if (debouncedValue.trim()) {
      fetchCountriesByName(debouncedValue.trim());
    }
  }, [debouncedValue]);

  const renderItem = ({item, index}: {item: CountryDetails; index: number}) => {
    return (
      <TouchableOpacity
        key={`${item.cca3}${index}`}
        activeOpacity={StyleVars.TOUCH_OPACITY}
        onPress={() => {
          navigation.navigate('Country-Details', {
            name: item.name.common,
          });
        }}>
        <CountryDetail key={`${item.cca3}${index}`} country={item} />
      </TouchableOpacity>
    );
  };

  const renderBackfill = () => {
    if (!loading && !error) {
      return null;
    }
    if (error) {
      return <Backfill text={error} fill />;
    }
    return <Backfill fill loading />;
  };

  return !result && (loading || !!error) ? (
    renderBackfill()
  ) : (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setOpen(false);
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
              open={open}
              setOpen={setOpen}
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
