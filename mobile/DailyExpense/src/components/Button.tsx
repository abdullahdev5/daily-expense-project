import {
  View,
  Pressable,
  ColorValue,
  ViewStyle,
  TouchableOpacity,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import AppText from './Text';
import AppIcon from './Icon';
import { colors } from '../theme/colors';
import { IconButtonProps } from 'react-native-vector-icons/Icon';

type AppButtonProps = {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  backgroundColor?: ColorValue;
  foregroundColor?: ColorValue;
  borderRadius?: number;
  gradientColors?: string[];
  disabled?: boolean;
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
  disabled = false,
}: AppButtonProps) => {
  const { theme } = useTheme();

  const finalGradientColors = gradientColors ?? theme.colors.primaryGradient;
  const finalBorderRadius = borderRadius ?? theme.radius.md;
  const disabledColor = theme.colors.disabled;

  const content =
    typeof children == 'string' ? (
      <AppText style={{ color: disabled ? colors.black : (foregroundColor ?? 'white') }}>
        {children}
      </AppText>
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
      disabled={disabled}
      activeOpacity={0.5}
      style={{
        width: fullWidth ? '100%' : width,
        height: height,
      }}
    >
      {!backgroundColor ? (
        <LinearGradient
          colors={
            disabled ? [disabledColor, disabledColor] : finalGradientColors
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[buttonStyle]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View
          style={[
            buttonStyle,
            { backgroundColor: disabled ? disabledColor : backgroundColor },
          ]}
        >
          {content}
        </View>
      )}
    </TouchableOpacity>
  );
};

// IconButton
type AppIconButtonProps = React.ComponentProps<typeof AppIcon> & {
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  rippleColor?: string; // Optional: custom flash color
};

const AppIconButton = ({
  onPress,
  buttonStyle,
  provider = 'Material', // Default to Material
  rippleColor, // = 'rgba(255, 255, 255, 0.3)',
  ...iconProps // Spreads name, size, color, iconSource, etc.
}: AppIconButtonProps) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={iconProps.disabled}
      style={({ pressed }) => [
        {
          borderRadius: '50%',
          padding: 10,
          alignSelf: 'flex-start',
          backgroundColor: pressed
            ? rippleColor ?? theme.colors.rippleColor
            : 'transparent',
        },
        buttonStyle,
      ]}
    >
      {/* We pass all remaining props directly to our universal AppIcon */}
      <AppIcon provider={provider} {...iconProps} />
    </Pressable>
  );
};

export default AppButton;
export { AppIconButton };
