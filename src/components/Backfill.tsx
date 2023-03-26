import React, {useCallback} from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';

import {StyleVars, Colors} from '../styles';

const styles = StyleSheet.create({
  backfillContainer: {
    zIndex: 0,
    paddingLeft: StyleVars.SCREEN_BOUNDARY * 2,
    paddingRight: StyleVars.SCREEN_BOUNDARY * 2,
    paddingTop: StyleVars.PRIMARY_SPACING * 2,
    paddingBottom: StyleVars.PRIMARY_SPACING * 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backfillText: {
    color: Colors.text.SHADE_40,
    paddingHorizontal: StyleVars.SCREEN_BOUNDARY,
    fontSize: StyleVars.FONT_SIZES.sm,
    lineHeight: StyleVars.FONT_SIZES.sm * 1.5,
    textAlign: 'center',
    marginBottom: StyleVars.PRIMARY_SPACING,
  },
  actionButtonContainer: {
    maxWidth: '80%',
    alignSelf: 'center',
    marginTop: StyleVars.PRIMARY_SPACING,
  },
  actionButton: {
    minWidth: 150,
  },
  actionTextStyles: {},
  loaderContainer: {
    marginBottom: StyleVars.PRIMARY_SPACING,
  },
});

export type BackfillProps = {
  fill?: boolean;
  loading?: boolean;

  color?: string;

  text?: string;
  textStyles?: StyleProp<TextStyle>;

  buttonStyles?: StyleProp<ViewStyle>;
  hideButton?: boolean;
  actionText?: string;
  onActionClick?: (args: any) => unknown;
  actionButton?: JSX.Element;
};

export default (props: BackfillProps): JSX.Element => {
  const {
    fill,
    color,

    text,
    textStyles,

    loading,

    actionText,
    onActionClick,
    actionButton,
    hideButton,
    buttonStyles,
  } = props;

  const renderActionButton = useCallback(() => {
    if (!actionButton && (!actionText || !onActionClick || hideButton)) {
      return null;
    }
    return (
      <View style={styles.actionButtonContainer}>
        {/* {actionButton || (
          <Button
            // outline
            theme={theme}
            text={actionText}
            activeColor={activeColor}
            buttonStyle={[styles.actionButton, buttonStyles || {}]}
            textStyle={[styles.actionTextStyles || {}]}
            onPress={onActionClick}
          />
        )} */}
      </View>
    );
  }, [actionButton, actionText, onActionClick, hideButton, buttonStyles]);

  /**
   * Renders a loading icon
   * @param {*} props
   */
  const renderLoader = useCallback(() => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          color={color || Colors.borders.SHADE_50}
          size="small"
        />
      </View>
    );
  }, [loading, color]);

  const renderText = useCallback(() => {
    if (!text || typeof text !== 'string') {
      return null;
    }
    return <Text style={[styles.backfillText, textStyles || {}]}>{text}</Text>;
  }, [text, textStyles]);

  return (
    <View style={[styles.backfillContainer, fill ? styles.fill : {}]}>
      {renderLoader()}
      {renderText()}
      {renderActionButton()}
    </View>
  );
};
