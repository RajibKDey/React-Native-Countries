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
import Backfill from '../components/Backfill';
import useCountry from '../hooks/useCountry';

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'white',
    paddingHorizontal: StyleVars.PRIMARY_SPACING,
    paddingBottom: StyleVars.SCREEN_BOUNDARY,
  },
  headerContainer: {
    paddingBottom: StyleVars.SCREEN_BOUNDARY,
    paddingHorizontal: StyleVars.PRIMARY_SPACING,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecords: {
    fontSize: StyleVars.FONT_SIZES.md,
    color: 'black',
  },
});

const Home = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState('');
  const [region, setRegion] = useState('');
  const [result, setResult] = useState<CountryDetails[]>([]);

  const debouncedValue = useDebounce(value, 500);
  const {
    countryMap,
    result: useCountryResult,
    loading,
    error,
    fetchAllCountries,
    fetchCountriesByRegion,
    fetchCountriesByName,
  } = useCountry();

  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  useEffect(() => {
    if (region) {
      fetchCountriesByRegion(region);
    }
  }, [region, fetchCountriesByRegion]);

  useEffect(() => {
    if (debouncedValue.trim()) {
      fetchCountriesByName(debouncedValue.trim());
    }
  }, [debouncedValue, fetchCountriesByName]);

  useEffect(() => {
    if (useCountryResult) {
      setResult(useCountryResult as CountryDetails[]);
    }
  }, [useCountryResult]);

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

  return error ? (
    <Backfill text={error} fill />
  ) : (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{height: '100%'}}>
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
                setResult(Object.values(countryMap));
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
        {loading ? (
          <Backfill fill loading />
        ) : (
          <FlatList
            contentContainerStyle={styles.container}
            data={result}
            renderItem={renderItem}
            keyExtractor={item => item.cca2}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            removeClippedSubviews
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.noRecords}>No Records</Text>
              </View>
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
