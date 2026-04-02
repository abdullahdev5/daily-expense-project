import { View, Text } from 'react-native';
import React from 'react';
import AppScreen from '../../../components/AppScreen';
import AppBar from '../../../components/AppBar';
import AppText from '../../../components/Text';

const InsightScreen = () => {
  return (
    <AppScreen>
      <AppBar title="Insight" showBackButton={false} />
      <AppText>Insight Screen</AppText>
    </AppScreen>
  );
};

export default InsightScreen;
