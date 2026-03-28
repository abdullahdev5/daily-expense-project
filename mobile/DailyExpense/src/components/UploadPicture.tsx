// import React from 'react';
// import { TouchableOpacity, Image, StyleSheet, View, Alert, StyleProp, ViewStyle } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { launchCamera, launchImageLibrary, Asset, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
// import AppIcon from './Icon';

// interface UploadPictureProps {
//   imageUrl?: string | undefined;
//   mode: 'camera' | 'gallery';
//   onUpload: (asset: Asset) => void;
//   size?: number;
//   style: StyleProp<ViewStyle>;
// }

// const UploadPicture: React.FC<UploadPictureProps> = ({ imageUrl, mode, onUpload, size = 120, style }) => {

//   const handlePress = async () => {
//     const options = {
//       mediaType: 'photo' as const,
//       quality: 0.8,
//     };

//     const result = mode === 'camera'
//       ? await launchCamera(options as CameraOptions)
//       : await launchImageLibrary(options as ImageLibraryOptions);

//     if (result.didCancel) return;
//     if (result.errorCode) {
//       Alert.alert('Error', result.errorMessage);
//       return;
//     }

//     if (result.assets && result.assets.length > 0) {
//       onUpload(result.assets[0]);
//     }
//   };

//   const iconName = mode === 'camera' ? 'photo-camera' : 'collections';

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}
//     >
//       {imageUrl ? (
//         <View style={styles.imageWrapper}>
//           <Image source={{ uri: imageUrl }} style={styles.image} />
//           <View style={styles.overlay}>
//              <AppIcon name="edit" size={size * 0.2} color="white" />
//           </View>
//         </View>
//       ) : (
//         <AppIcon style={styles.icon} name={iconName} size={size * 0.4} color="#95A5A6" />
//       )}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F8F9F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#D5DBDB',
//     borderStyle: 'dashed',
//     overflow: 'hidden',
//   },
//   imageWrapper: { width: '100%', height: '100%' },
//   image: { width: '100%', height: '100%' },
//   overlay: {
//     ...StyleSheet.absoluteFill,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     alignSelf: 'center'
//   }
// });

// export default UploadPicture;

import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Alert,
  StyleProp,
  ViewStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import AppIcon from './Icon';

interface UploadPictureProps {
  imageUrl?: string | null;
  mode: 'camera' | 'gallery';
  onUpload: (asset: Asset) => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  imageUrl,
  mode,
  onUpload,
  size = 120,
  style,
}) => {
  const innerSize = size * 0.95;

  const handlePress = async () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8,
    };

    const result =
      mode === 'camera'
        ? await launchCamera(options as CameraOptions)
        : await launchImageLibrary(options as ImageLibraryOptions);

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage);
      return;
    }

    if (result.assets && result.assets.length > 0) {
      onUpload(result.assets[0]);
    }
  };

  const iconName = mode === 'camera' ? 'photo-camera' : 'collections';

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.outerCircle,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          { width: innerSize, height: innerSize, borderRadius: innerSize / 2 },
        ]}
      >
        {imageUrl ? (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <AppIcon name="edit" size={size * 0.2} color="white" />
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.iconWrapper,
              { width: innerSize, height: innerSize },
            ]}
          >
            {/* Standard centering for the 'Camera/Gallery' icon */}
            <AppIcon
              name={'person'}
              size={innerSize * 0.45}
              color="#AAB7B8"
              style={{
                position: 'absolute',
                // Adjust positioning relative to image_0.png anchoring
                bottom: innerSize * 0.1,
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ... keep styles exactly the same as ProfilePhoto above ...
// Added missing styles for UploadPicture (dashed and overlay)
const styles = StyleSheet.create({
  outerCircle: {
    backgroundColor: '#EAECEE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#BDC3C7',
    borderStyle: 'dashed', // Good visual for 'interactive'
  },
  innerCircle: {
    backgroundColor: '#D5DBDB',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center', // Standard centering for camera/gallery
    alignItems: 'center',
  },
});

export default UploadPicture;
