import { View, Text, ColorValue, TextProps, TextStyle } from 'react-native';
import React, { Children } from 'react';
import { FontWeight } from '../types/styles';
import { useTheme } from '../theme/ThemeProvider';

type AppTextProps = TextProps & {
  children: string;
  color?: ColorValue;
  fontSize?: number;
  fontWeight?: FontWeight;
  style?: TextStyle | TextStyle[];
};

const AppText = ({
  children,
  color,
  fontSize,
  fontWeight,
  style,
}: AppTextProps) => {
  const { theme } = useTheme();

  const finalColor = color ?? theme.colors.text;
  const finalFontSize = fontSize ?? theme.fontSize.medium;
  const finalFontWeight = fontWeight ?? 'medium';

  return (
    <Text
      style={[
        {
          color: finalColor,
          fontSize: finalFontSize,
          fontWeight: finalFontWeight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default AppText;
