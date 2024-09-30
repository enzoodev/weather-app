import { RFValue } from 'react-native-responsive-fontsize';

export const theme = {
  colors: {
    main: '#008C8C',
    mainLight: '#5FA0A0',
    mainContrast: '#FFFFFF',
    background: '#EDECEE',
    backgroundAlt: '#F7F7F8',
    backgroundDark: '#D9D8DA',
    textPrimary: '#1A181B',
    textSecondary: '#3E3A40',
    textTertiary: '#5F5B62',
    buttonTextColor: '#FFFFFF',
    buttonBackground: '#4C4B4C',
    inputBackground: '#F7F7F8',
    inputBorder: '#D9D8DA',
    inputBorderInFocus: '#9F9BA1',
    cardBackground: '#F7F7F8',
    cardBorder: '#D9D8DA',
    cardBorderInner: '#C9C5CB',
    cardButtonBackgroundColor: '#3E3A40',
    headerBackground: '#F7F7F8',
    headerBorder: '#D9D8DA',
    skeleton: '#D9D8DA',
    placeholder: '#9F9BA1',
    iconButtonBackground: '#D9D8DA',
    success: '#32CD32',
    warning: '#FFD700',
    error: '#DF0202',
    successContrast: '#FFFFFF',
    warningContrast: '#FFFFFF',
    errorContrast: '#FFFFFF',
    bottomTabsBackgroundColor: '#F7F7F8',
    bottomTabsBorderColor: '#D9D8DA',
  },

  fonts: {
    main: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
  },

  fontSizes: {
    xxs: RFValue(8),
    xs: RFValue(10),
    sm: RFValue(12),
    md: RFValue(14),
    lg: RFValue(16),
    xl: RFValue(18),
    xxl: RFValue(25),
  },

  iconSizes: {
    xs: RFValue(15),
    sm: RFValue(20),
    md: RFValue(25),
    lg: RFValue(30),
    xl: RFValue(35),
    xxl: RFValue(45),
    xxxl: RFValue(55),
  },

  opacity: {
    10: '1A',
    20: '33',
    30: '4D',
    40: '66',
    50: '80',
    60: '99',
    70: 'B3',
    80: 'CC',
    90: 'E6',
  },

  layout: {
    1: RFValue(4),
    2: RFValue(8),
    3: RFValue(12),
    4: RFValue(16),
    5: RFValue(20),
    6: RFValue(24),
    7: RFValue(28),
    8: RFValue(32),
    9: RFValue(36),
    10: RFValue(40),
    11: RFValue(44),
    12: RFValue(48),
    16: RFValue(64),
    17: RFValue(68),
    18: RFValue(72),
    20: RFValue(80),
    21: RFValue(84),
    24: RFValue(96),
    28: RFValue(112),
    32: RFValue(128),
    40: RFValue(160),
    48: RFValue(192),
    52: RFValue(208),
    56: RFValue(224),
    64: RFValue(256),
    72: RFValue(288),
    80: RFValue(320),
    96: RFValue(384),
  },

  border: {
    width: {
      sm: RFValue(0.5),
      md: RFValue(1),
      lg: RFValue(2),
    },
    radius: {
      xs: RFValue(2),
      sm: RFValue(4),
      md: RFValue(6),
      lg: RFValue(8),
      xl: RFValue(12),
      full: 9999,
    },
  },
};
