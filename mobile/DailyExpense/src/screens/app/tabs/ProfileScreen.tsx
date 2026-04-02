import { View, Text } from 'react-native'
import React from 'react'
import AppScreen from '../../../components/AppScreen';
import AppBar from '../../../components/AppBar';
import AppText from '../../../components/Text';
import { colors } from '../../../theme/colors';

const ProfileScreen = () => {
  return (
    <AppScreen>
      <AppBar title='Profile' showBackButton={false} />
      <AppText>Profile Screen</AppText>
    </AppScreen>
  );
}

export default ProfileScreen