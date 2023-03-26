import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {StyleVars} from '../styles';

type DividerProps = {
  theme: boolean;
};

const createStyles = (theme: boolean) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: StyleVars.PRIMARY_SPACING,
      paddingVertical: StyleVars.PRIMARY_SPACING * 2,
      fontWeight: 'bold',
      fontSize: StyleVars.FONT_SIZES.xlg,
      color: Colors[!theme ? 'white' : 'black'],
      backgroundColor: Colors[theme ? 'white' : 'black'],
    },
    horizontalBar: {
      borderBottomColor: Colors.darker,
      borderWidth: StyleVars.BORDERS.sm,
    },
  });

const Divider: FC<DividerProps> = ({theme}) => {
  const styles = createStyles(theme);
  return <View style={styles.horizontalBar} />;
};

export default Divider;
