import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {fetchByName} from '../apis';
import {useDispatch, useSelector} from 'react-redux';
import {StyleVars} from '../styles';
import LeftArrow from '../assets/icons/LeftArrow';
import colors from '../styles/colors';
import FastImage from 'react-native-fast-image';
import {fetchByNameAction} from '../store/actions';
import {alpha3ToCountry} from './../constants';
import Backfill from '../components/Backfill';

const WIDTH = StyleVars.WINDOW_WIDTH - StyleVars.PRIMARY_SPACING * 2;
const HEIGHT = WIDTH / 2;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  shadowContainer: {
    marginVertical: 5,
    marginHorizontal: StyleVars.SMALL_SPACING,
  },
  container: {
    minHeight: '100%',
    paddingHorizontal: StyleVars.PRIMARY_SPACING,
    paddingTop: StyleVars.PRIMARY_SPACING,
    paddingBottom: StyleVars.SCREEN_BOUNDARY,
    backgroundColor: 'white',
    color: 'black',
  },
  back: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: StyleVars.SCREEN_BOUNDARY,
    paddingVertical: StyleVars.PRIMARY_SPACING,
    width: 120,
    fontWeight: 'bold',
    borderRadius: StyleVars.BORDER_RADIUS_SM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    paddingLeft: StyleVars.PRIMARY_SPACING,
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingTop: StyleVars.SCREEN_BOUNDARY,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: StyleVars.SCREEN_BOUNDARY,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  name: {
    fontSize: StyleVars.FONT_SIZES.lg,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: StyleVars.PRIMARY_SPACING,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metric: {
    fontSize: StyleVars.FONT_SIZES.md,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: StyleVars.SMALL_SPACING,
  },
  value: {
    fontSize: StyleVars.FONT_SIZES.sm,
    color: 'black',
    paddingBottom: StyleVars.SMALL_SPACING,
  },
  border: {
    paddingHorizontal: StyleVars.PRIMARY_SPACING,
  },
  borderCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflowY: 'auto',
  },
  borderCountry: {
    padding: StyleVars.PRIMARY_SPACING,
    marginHorizontal: StyleVars.PRIMARY_SPACING,
    borderRadius: StyleVars.BORDER_RADIUS_SM,
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

const CountryDetails = ({route, navigation}) => {
  const {name} = route.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState();

  const dispatch = useDispatch();

  const mapCountries = useSelector(state => state?.countries?.mapCountries);

  useEffect(() => {
    const fetchCountriesByName = async (
      countryName: string,
      queryParams: Record<string, any>,
    ) => {
      setLoading(true);
      setError('');
      let response;
      try {
        response = await fetchByName(countryName, queryParams);
        dispatch(fetchByNameAction(response[0]));
      } catch (err) {
        setError(err?.message);
      }
      setLoading(false);
      setResult(response[0]);
    };
    if (name && !mapCountries[name].isComplete) {
      fetchCountriesByName(name, {
        fullText: true,
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
      });
    } else {
      setResult(mapCountries[name]);
    }
  }, [name, mapCountries, dispatch]);

  const details =
    useMemo(() => {
      if (result) {
        const currencies = result?.currencies || [];
        let finalCurrencies = Object.keys(currencies);
        finalCurrencies = finalCurrencies.map(
          currency => currencies[currency].name,
        );

        return [
          {
            metric: 'Native Name',
            value: result?.name?.official,
          },
          {
            metric: 'Population',
            value: result?.population?.toLocaleString('en-US'),
          },
          {
            metric: 'Region',
            value: result?.region,
          },
          {
            metric: 'Sub Region',
            value: result?.subregion,
          },
          {
            metric: 'Capital',
            value: result?.capital?.join(', '),
          },
          {
            metric: 'Currencies',
            value: finalCurrencies?.join(', '),
          },
          {
            metric: 'Languages',
            value: Object.values(result?.languages || {}),
          },
        ];
      }
    }, [result]) || [];

  const renderItem = ({item, index}: {item: CountryDetails; index: number}) => {
    const countryName = alpha3ToCountry[item];
    return (
      <Shadow
        key={`${item}${index}`}
        distance={8}
        startColor={'#00000010'}
        containerStyle={styles.shadowContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Country-Details', {
              name: countryName,
            });
          }}>
          <View style={styles.borderCountry}>
            <Text>{countryName}</Text>
          </View>
        </TouchableOpacity>
      </Shadow>
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

  return loading || !!error ? (
    renderBackfill()
  ) : (
    <ScrollView style={styles.container}>
      <Shadow
        distance={8}
        startColor={'#00000010'}
        containerStyle={{marginVertical: 5}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.back}>
            <LeftArrow size={18} color={colors.text.SHADE_50} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
      </Shadow>
      {result && (
        <View style={styles.detailsContainer}>
          <FastImage
            style={styles.image}
            source={{
              uri: result.flags?.png,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{result?.name?.common}</Text>

            {details.map(entry => (
              <View key={entry.metric} style={styles.details}>
                <Text style={styles.metric}>{entry.metric}: </Text>
                <Text style={styles.value}>{entry.value}</Text>
              </View>
            ))}
            <Text style={styles.metric}>Border Countries: </Text>
            <FlatList
              contentContainerStyle={styles.container}
              data={result?.borders || []}
              renderItem={renderItem}
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={true}
              horizontal
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.noRecords}>No Countries Around</Text>
                </View>
              }
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CountryDetails;
