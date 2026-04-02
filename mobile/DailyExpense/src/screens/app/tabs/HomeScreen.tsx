import { View, Text } from 'react-native'
import React from 'react'
import AppScreen from '../../../components/AppScreen'
import AppText from '../../../components/Text'
import AppBar from '../../../components/AppBar'

const HomeScreen = () => {
  return (
    <AppScreen>
      <AppBar title='Home' showBackButton={false} />
      <AppText>Home Screen</AppText>
    </AppScreen>
  );
}

export default HomeScreen