import React from 'react';
import { 
  StyleProp, 
  ViewStyle, 
  Image, 
  ImageSourcePropType, 
  ImageStyle 
} from 'react-native';
// Note: We import the Base IconProps to ensure full compatibility
import { IconProps } from 'react-native-vector-icons/Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../theme/ThemeProvider';
import { IconProvider } from '../types/styles';


// Extend the library's IconProps with our custom provider and image logic
type AppIconProps = IconProps & {
  provider?: IconProvider;
  iconSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle | ImageStyle>;
};

const AppIcon = ({ 
  name, 
  provider = 'Material', 
  iconSource, 
  size, 
  color, 
  style,
  ...rest // Capture any other IconProps (onPress, etc.)
}: AppIconProps) => {
  const { theme } = useTheme();
  
  const finalSize = size ?? theme.fontSize.large;
  const finalColor = color ?? theme.colors.text;

  // Standard style to prevent full-width stretching
  const combinedStyle = [{ alignSelf: 'flex-start' as const }, style as any];

  // 1. Image Provider Logic
  if (provider === 'Image' || iconSource) {
    return (
      <Image
        source={iconSource!}
        style={[
          {
            width: finalSize, 
            height: finalSize, 
            tintColor: color, 
            alignSelf: 'flex-start' 
          },
          style,
        ] as ImageStyle}
        resizeMode="contain"
      />
    );
  }

  // Common props for all Vector Libraries
  const vectorProps = {
    ...rest,
    name: name ?? 'help-outline',
    size: finalSize,
    color: finalColor,
    style: combinedStyle,
  };

  // 2. Switch between Vector Providers
  switch (provider) {
    case 'Community':
      return <MaterialCommunityIcon {...vectorProps} />;
    case 'FontAwesome':
      return <FontAwesome5 {...vectorProps} name={name ?? 'question-circle'} />;
    case 'Material':
    default:
      return <MaterialIcon {...vectorProps} />;
  }
};

export default AppIcon;