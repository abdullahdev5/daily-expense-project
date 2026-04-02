import { View, Text } from 'react-native'
import React from 'react'
import AppScreen from '../../../components/AppScreen';
import AppText from '../../../components/Text';
import AppBar from '../../../components/AppBar';

const WalletScreen = () => {
  return (
    <AppScreen>
      <AppBar title='Wallet' showBackButton={false} />
      <AppText>Wallet Screen</AppText>
    </AppScreen>
  );
}

export default WalletScreen