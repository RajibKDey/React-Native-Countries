import React from 'react';
import _ from 'lodash';
import Svg, {SvgProps} from 'react-native-svg';
import {View, TouchableOpacity} from 'react-native';

import {StyleVars} from '../styles';

export type SvgIconWrapperProps = SvgProps & {
  noSlop?: boolean;
  height?: number;
  width?: number;
  viewBox?: string;
  style?: any;
  onPress?: () => unknown;
  children?: any;
};

/**
 * wrapper for svg icons
 * @param {*} props
 */
const SvgIconWrapper = (props: SvgIconWrapperProps): JSX.Element => {
  const {onPress = null, noSlop = false} = props;

  if (!onPress || onPress === _.noop) {
    return (
      <View pointerEvents="none">
        <Svg {...props}>{props.children}</Svg>
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={StyleVars.TOUCH_OPACITY}
      hitSlop={noSlop ? null : StyleVars.SLOP}>
      <Svg {...props}>{props.children}</Svg>
    </TouchableOpacity>
  );
};

export default SvgIconWrapper;
