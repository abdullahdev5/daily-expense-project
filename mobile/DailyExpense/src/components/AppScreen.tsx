import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

type AppScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const AppScreen = ({
  children,
  style,
}: AppScreenProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}
    >
      {children}
    </View>
  );
};

export default AppScreen;
