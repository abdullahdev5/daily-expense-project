import React from 'react';
import AppScreen from '../components/AppScreen';
import { Column } from '../components/Layout';
import AppButton from '../components/Button';
import { userStore } from '../store/userStore';
import AppText from '../components/Text';
import AppActivityLoader from '../components/Loader';
import { logoutService } from '../services/auth.service';
import { useTheme } from '../theme/ThemeProvider';

const HomeScreen = () => {
  const { theme } = useTheme();

  const isRefreshing = userStore(s => s.isRefreshing);
  const error = userStore(s => s.error);
  const user = userStore(s => s.user);

  const getUser = async () => userStore.getState().refreshUser();

  const logout = () => logoutService();

  return (
    <AppScreen>
      <Column
        mainAxisAlignment="center"
        crossAxisAlignment="center"
        spacing={10}
        style={{ flex: 1 }}
      >
        {error && <AppText color={theme.colors.error}>{error}</AppText>}

        {isRefreshing && <AppActivityLoader />}

        {user && (
          <Column>
            <AppText>ID: {user.id}</AppText>
            <AppText>Name: {user.name}</AppText>
            <AppText>Email: {user.email}</AppText>
            <AppText>Provider: {user.provider}</AppText>
            <AppText>Provider ID: {user.providerId}</AppText>
            <AppText>Created At: {user.createdAt.toLocaleDateString()}</AppText>
          </Column>
        )}

        <AppButton
          onPress={getUser}
        >
          Get User
        </AppButton>

        <AppButton onPress={logout}>Logout</AppButton>
      </Column>
    </AppScreen>
  );
};

export default HomeScreen;
