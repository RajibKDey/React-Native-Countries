const palette = {
  GREY_00: '#FFFFFF',
  GREY_10: '#F5F5F5',
  GREY_20: '#E0E0E0',
  GREY_30: '#BDBDBD',
  GREY_40: '#A9A9A9',
  GREY_50: '#707070',
  GREY_60: '#404040',
  GREY_70: '#252525',
  GREY_75: '#1C1C1C',
  GREY_80: '#121212',
  GREY_90: '#060606',
  GREY_100: '#000000',

  ERROR: '#FF6A6A',
  SUCCESS: '#2CE999',
  WARNING: '#EA9132',
  LIKE_COLOR: '#FF6D6D',
  HIGHLIGHT: 'gold',
  HIGHLIGHT_2: '#FF9A00',
  LINK: '#2f55a4',

  TRANSPARENT: 'transparent',

  ACCENT: '#DD5C64',

  TRANSPARENT_TINT: 'rgba(21, 21, 21, 0.20)',
  BACKGROP_COLOR: 'rgba(0, 0, 0, 0.8)',

  DEFAULT_ACTIVE_COLOR: '#00dcff',

  VERIFIED: 'gold',
};

const social = {
  FACEBOOK: '#2f55a4',
  TWITTER: '#4ba0ec',
  INSTAGRAM: '#E74B5C',
  YOUTUBE: '#E53123',
  PINTEREST: '#D32D2F',
  WHATSAPP: '#25D366',
  GOOGLE: '#4285F4',
};

const APP_BACKGROUND = palette.GREY_80;
const TAB_BACKGROUND = palette.GREY_100;

const buttons = {
  SHADE_20: palette.GREY_20,
  SHADE_30: palette.GREY_30,
  SHADE_40: palette.GREY_40,
  SHADE_90: palette.GREY_90,
  SHADE_100: palette.GREY_100,
};

const backgrounds = {
  MELD: APP_BACKGROUND,

  SHADE_100: palette.GREY_100,
  SHADE_90: palette.GREY_90,
  SHADE_80: palette.GREY_80,
  SHADE_75: palette.GREY_75,
  SHADE_70: palette.GREY_70,
  SHADE_60: palette.GREY_60,
  SHADE_50: palette.GREY_50,
  SHADE_40: palette.GREY_40,
  SHADE_30: palette.GREY_30,
  SHADE_20: palette.GREY_20,

  SHADE_10: palette.GREY_10,
  ACCENT: palette.ACCENT,
};

const text = {
  MELD: APP_BACKGROUND,

  SHADE_100: palette.GREY_100, // black
  SHADE_90: palette.GREY_90, // tab color
  SHADE_80: palette.GREY_80,
  SHADE_75: palette.GREY_75,
  SHADE_70: palette.GREY_70,
  SHADE_50: palette.GREY_50,
  SHADE_40: palette.GREY_40,
  SHADE_30: palette.GREY_30,
  SHADE_20: palette.GREY_20,
  SHADE_10: palette.GREY_10,
  SHADE_00: palette.GREY_00,

  ACCENT: palette.ACCENT,
};

const borders = {
  MELD: APP_BACKGROUND,

  SHADE_70: palette.GREY_70,
  SHADE_60: palette.GREY_60,
  SHADE_50: palette.GREY_50,
  SHADE_40: palette.GREY_40,
  SHADE_30: palette.GREY_30,
  SHADE_20: palette.GREY_20,
};

const shadows = {
  SHADE_100: palette.GREY_100,
  SHADE_50: palette.GREY_50,
};

const colors = {
  APP_BACKGROUND,
  TAB_BACKGROUND,
  LIKE_COLOR: palette.LIKE_COLOR,
  ERROR: palette.ERROR,
  WARNING: palette.WARNING,
  SUCCESS: palette.SUCCESS,
  HIGHLIGHT: palette.HIGHLIGHT,
  HIGHLIGHT_2: palette.HIGHLIGHT_2,
  LINK: palette.LINK,
  TRANSPARENT: palette.TRANSPARENT,
  TRANSPARENT_TINT: palette.TRANSPARENT_TINT,
  VERIFIED: palette.VERIFIED,
  DEFAULT_ACTIVE_COLOR: palette.DEFAULT_ACTIVE_COLOR,
  REFRESH_LOADER: palette.GREY_40,
  BACKGROP_COLOR: palette.BACKGROP_COLOR,

  social,

  text,
  borders,
  buttons,
  shadows,
  backgrounds,
};

export default colors;
