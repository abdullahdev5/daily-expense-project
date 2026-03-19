import { View, Pressable, ColorValue, ViewStyle, TouchableOpacity, StyleProp } from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import AppText from './Text';

type AppButtonProps = {
  children: ReactNode;
  onPress: () => void;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  backgroundColor?: ColorValue;
  foregroundColor?: ColorValue;
  borderRadius?: number;
  gradientColors?: string[];
  wrapperStyle?: StyleProp<ViewStyle>;
};

const AppButton = ({
  children,
  onPress,
  width,
  height,
  fullWidth,
  backgroundColor,
  foregroundColor = 'white',
  borderRadius,
  gradientColors,
  wrapperStyle,
}: AppButtonProps) => {
  const { theme } = useTheme();

  const finalGradientColors = gradientColors ?? theme.colors.primaryGradient;
  const finalBorderRadius = borderRadius ?? theme.radius.md;

  const content =
    typeof children == 'string' ? (
      <AppText style={{ color: foregroundColor ?? 'white' }}>{children}</AppText>
    ) : (
      children
    );

  const buttonStyle: ViewStyle = {
    borderRadius: finalBorderRadius,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        width: fullWidth ? '100%' : width,
        height: height
      }}
    >
      {!backgroundColor ? (
        <LinearGradient
          colors={finalGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[buttonStyle]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[buttonStyle, { backgroundColor }]}>{content}</View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
