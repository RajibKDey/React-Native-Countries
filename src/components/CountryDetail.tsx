import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import FastImage from 'react-native-fast-image';
import {CountryDetails} from '../global';
import {StyleVars} from '../styles';

type CountryDetailProps = {
  country: CountryDetails;
};

const WIDTH = StyleVars.WINDOW_WIDTH - StyleVars.PRIMARY_SPACING * 2;
const HEIGHT = WIDTH / 2;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: StyleVars.BORDER_RADIUS_SM,
    width: '100%',
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: StyleVars.SCREEN_BOUNDARY,
    borderRadius: StyleVars.BORDER_RADIUS_SM,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  detailsContainer: {
    paddingHorizontal: StyleVars.SCREEN_BOUNDARY,
  },
  name: {
    fontSize: StyleVars.FONT_SIZES.lg,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: StyleVars.SMALL_SPACING,
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
});

const CountryDetail: FC<CountryDetailProps> = ({country}) => {
  const details = [
    {
      metric: 'Population',
      value: country.population.toLocaleString('en-US'),
    },
    {
      metric: 'Region',
      value: country.region,
    },
    {
      metric: 'Capital',
      value: country.capital.join(', '),
    },
  ];
  return (
    <Shadow
      distance={8}
      startColor={'#00000010'}
      containerStyle={{marginVertical: 5}}>
      <View style={styles.card}>
        <FastImage
          style={styles.image}
          source={{
            uri: country.flags.png,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{country.name.common}</Text>

          {details.map(entry => (
            <View key={entry.metric} style={styles.details}>
              <Text style={styles.metric}>{entry.metric}: </Text>
              <Text style={styles.value}>{entry.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </Shadow>
  );
};

export default CountryDetail;
