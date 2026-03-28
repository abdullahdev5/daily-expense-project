import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { navigationRef } from './navigationRef';
import { APP_ROUTES, AUTH_ROUTES, ROUTES } from './routes';
import {
  AppStackParamList,
  AuthStackParamList,
  RootStackParamList,
} from './types';
import { getToken } from '../storage/auth.storage';
import { userStore } from '../store/userStore';
import AppScreen from '../components/AppScreen';
import AppActivityLoader from '../components/Loader';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppNavigator() {
  const isLoading = userStore(s => s.isLoading);
  const user = userStore((s) => s.user);

  if (isLoading) {
    return (
      <AppScreen style={{ justifyContent: 'center', alignItems: 'center' }}>
        <AppActivityLoader />
      </AppScreen>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name={ROUTES.APP} component={AppStackScreens} options={{ headerShown: false }} />
        ) : (
          <RootStack.Screen
            name={ROUTES.AUTH}
            component={AuthStackScreens}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

function AuthStackScreens() {
  return (
    <AuthStack.Navigator
      initialRouteName={AUTH_ROUTES.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen 
        name={AUTH_ROUTES.LOGIN}
        component={LoginScreen}
      />

      <AuthStack.Screen
        name={AUTH_ROUTES.REGISTER}
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  );
}

function AppStackScreens() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name={APP_ROUTES.HOME} component={HomeScreen} options={{ headerShown: false }} />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
