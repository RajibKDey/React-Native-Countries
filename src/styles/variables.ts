import {Dimensions, Platform, StatusBar} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const WINDOW_METRICS_INSETS_TOP = initialWindowMetrics?.insets?.top ?? 0;

const WINDOW_METRICS_INSETS_BOTTOM = initialWindowMetrics?.insets?.bottom ?? 0;

const {height, width} = Dimensions.get('window');

let WINDOW_HEIGHT = height;
let WINDOW_WIDTH = width;
let STATUS_BAR_HEIGHT: number | undefined = 0;

// for android -> use react-native-extra-dimensions-android
if (Platform.OS === 'android') {
  WINDOW_HEIGHT = ExtraDimensions.getRealWindowHeight();
  WINDOW_WIDTH = ExtraDimensions.getRealWindowWidth();
  STATUS_BAR_HEIGHT =
    ExtraDimensions.getStatusBarHeight() || StatusBar.currentHeight;
} else {
  STATUS_BAR_HEIGHT = WINDOW_METRICS_INSETS_TOP || 20;
}

// if the orientation is reversed for some reason
// set the appropriate dimensions - on phones for portrait mode
// -> height is always greater than width, so if for some reason, height is lesser, swap the values
if (WINDOW_HEIGHT < WINDOW_WIDTH) {
  const temp = WINDOW_HEIGHT;
  WINDOW_HEIGHT = WINDOW_WIDTH;
  WINDOW_WIDTH = temp;
}

WINDOW_HEIGHT = Math.round(WINDOW_HEIGHT);
WINDOW_WIDTH = Math.round(WINDOW_WIDTH);

const WINDOW_METRICS_FRAME_HEIGHT =
  initialWindowMetrics?.frame?.height ?? WINDOW_HEIGHT;

const WINDOW_METRICS_FRAME_WIDTH =
  initialWindowMetrics?.frame?.width ?? WINDOW_WIDTH;

const SCREEN_BOUNDARY = 20;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const isIPhoneX = () => {
  return Platform.OS === 'ios'
    ? (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;
};

const StatusBarHeight = STATUS_BAR_HEIGHT;

const AVERAGE_BANNER_HEIGHT = 50;

const PRIMARY_SPACING = (SCREEN_BOUNDARY as number) / 2;

const SMALL_SPACING = PRIMARY_SPACING / 2;

const MINI_SPACING = 3;

const LARGE_SPACING = 30;

const MEDIUM_SPACING = 15;

const HEADER_HEIGHT = 60;

const ABSOLUTE_HEADER_OFFSET = Platform.select({
  ios: HEADER_HEIGHT,
  android: WINDOW_METRICS_INSETS_TOP + HEADER_HEIGHT,
});

export default {
  BUTTON: {
    lg: {
      height: 50,
    },
    sm: {
      height: 50,
    },
    md: {
      height: 50,
    },
  },
  STATUS_BAR_HEIGHT: StatusBarHeight,
  AVERAGE_BANNER_HEIGHT,
  LARGE_SPACING,
  SCREEN_BOUNDARY,
  MEDIUM_SPACING,
  PRIMARY_SPACING,
  SMALL_SPACING,
  MINI_SPACING,
  METRIC_LABEL_SIZE: {
    LG: 15,
    MD: 13,
    SM: 11,
    XS: 9,
  },
  TAB_BAR_ICON_SIZE: Platform.select({
    android: 17,
    ios: 17,
  }),
  TAB_BAR_HEIGHT: Platform.select({
    ios: 70,
    android: 70,
  }),
  HEADER_HEIGHT,
  BORDER_RADIUS: 10,
  BORDER_RADIUS_SM: 5,
  BORDER_RADIUS_MD: 15,
  BORDER_RADIUS_LG: 20,
  BORDER_RADIUS_XLG: 30,
  BORDER_RADIUS_XXLG: 60,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_METRICS_INSETS_TOP,
  WINDOW_METRICS_INSETS_BOTTOM,
  WINDOW_METRICS_FRAME_HEIGHT,
  WINDOW_METRICS_FRAME_WIDTH,
  FONT_SIZES: {
    xxxs: 8,
    xxs: 9,
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xlg: 20,
    xxlg: 25,
    xxxlg: 30,
    big: WINDOW_WIDTH / 8,
    huge: WINDOW_WIDTH / 6,
    massive: WINDOW_WIDTH / 4.5,
  },
  SLOP: {
    top: SCREEN_BOUNDARY,
    left: SCREEN_BOUNDARY,
    right: SCREEN_BOUNDARY,
    bottom: SCREEN_BOUNDARY,
  },
  SLOP_MD: {
    top: PRIMARY_SPACING,
    left: PRIMARY_SPACING,
    right: PRIMARY_SPACING,
    bottom: PRIMARY_SPACING,
  },
  SLOP_SM: {
    top: SMALL_SPACING,
    left: SMALL_SPACING,
    right: SMALL_SPACING,
    bottom: SMALL_SPACING,
  },
  SLOP_VERTICAL: {
    top: SCREEN_BOUNDARY,
    left: 0,
    right: 0,
    bottom: SCREEN_BOUNDARY,
  },
  SLOP_HORIZONTAL: {
    top: 0,
    left: SCREEN_BOUNDARY,
    right: SCREEN_BOUNDARY,
    bottom: 0,
  },
  BORDERS: {
    xs: 0.2,
    sm: 0.5,
    md: 1,
    lg: 2,
    xlg: 4,
  },
  TOUCH_OPACITY: 0.7,
  BACKDROP_OPACITY: 0.8,
  ABSOLUTE_HEADER_OFFSET,
};
