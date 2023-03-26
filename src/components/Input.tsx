import React, {FC, useState} from 'react';
import _ from 'lodash';
import {
  TextInput,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  ActivityIndicator,
} from 'react-native';

import {Colors, StyleVars} from '../styles';
import Search from '../assets/icons/Search';
import Cross from '../assets/icons/Cross';

const CLEAR_SEARCH_ICON_DIM = 15;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: StyleVars.PRIMARY_SPACING,
    borderWidth: StyleVars.BORDERS.md,
    borderRadius: StyleVars.BORDER_RADIUS_SM,
    minHeight: 40,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    paddingLeft: StyleVars.PRIMARY_SPACING,
    paddingRight: StyleVars.PRIMARY_SPACING,
  },
  input: {
    paddingLeft: StyleVars.PRIMARY_SPACING,
    paddingRight: StyleVars.PRIMARY_SPACING,
    color: Colors.text.SHADE_100,
  },
  crossIcon: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    paddingLeft: StyleVars.SMALL_SPACING,
    paddingRight: StyleVars.PRIMARY_SPACING,
  },
  searchPadding: {
    paddingLeft: 40,
    paddingRight: Platform.select({
      android: StyleVars.SCREEN_BOUNDARY * 2,
    }),
  },
  crossIconStyle: {
    width: CLEAR_SEARCH_ICON_DIM,
    height: CLEAR_SEARCH_ICON_DIM,
    // backgroundColor: Colors.backgrounds.SHADE_30,
    opacity: 0.5,
    borderRadius: CLEAR_SEARCH_ICON_DIM / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type InputProps = TextInputProps & {
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  search?: boolean;
  searchIconSize?: number;
  searchIconColor?: string;
  crossIconSize?: number;
  crossIconStyle?: StyleProp<TextStyle>;
  crossIconColor?: string;
  hasClearOption: boolean;
  loading?: boolean;
  value: string;
  placeholder?: string;
  placeholderTextColor?: string;
  focusedStyle?: StyleProp<TextStyle>;
  onChangeText: (value: string) => void;
  onFocus?: () => unknown;
  onBlur?: () => unknown;
};

const Input: FC<InputProps> = props => {
  const {
    inputStyle,
    containerStyle,
    search,
    searchIconSize,
    searchIconColor,
    crossIconSize,
    crossIconStyle,
    crossIconColor,
    hasClearOption,
    loading,
    value,
    placeholder = '',
    placeholderTextColor = Colors.text.SHADE_50,
    focusedStyle,
    onFocus = _.noop,
    onBlur = _.noop,
    onChangeText,
  } = props;
  const [isFocussed, setIsFocused] = useState(false);

  const inputOnFocus = (): void => {
    onFocus();
    setIsFocused(true);
  };

  const inputOnBlur = (): void => {
    onBlur();
    setIsFocused(false);
  };

  const inputOnChangeText = (val: string) => {
    onChangeText(val);
  };

  const _renderLeftIcon = () => {
    if (!search) {
      return null;
    }

    // if icon color is passed as props, use that instead
    const customIconColor = searchIconColor || Colors.backgrounds.SHADE_40;

    return (
      <View style={styles.searchIcon}>
        <Search size={searchIconSize || 18} color={customIconColor} />
      </View>
    );
  };

  const clearText = () => {
    return onChangeText('');
  };

  const _renderCrossIcon = () => {
    const customIconColor = crossIconColor || Colors.backgrounds.SHADE_40;

    if (!value.length || !hasClearOption) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.crossIcon}
        onPress={clearText}
        activeOpacity={StyleVars.TOUCH_OPACITY}>
        <View style={[styles.crossIconStyle, crossIconStyle]}>
          {loading ? (
            <ActivityIndicator color={Colors.borders.SHADE_50} size="small" />
          ) : (
            <Cross size={crossIconSize || 24} color={customIconColor} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const searchStyle = search ? styles.searchPadding : {};

  return (
    <View style={[styles.container, containerStyle]}>
      {_renderLeftIcon()}
      <TextInput
        selectionColor={Colors.borders.SHADE_60}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.input,
          inputStyle,
          searchStyle,
          isFocussed && focusedStyle,
        ]}
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
        keyboardAppearance={Platform.OS === 'ios' ? 'dark' : 'default'}
        allowFontScaling={false}
        {...props}
        onChangeText={inputOnChangeText}
      />
      {_renderCrossIcon()}
    </View>
  );
};

export default Input;
