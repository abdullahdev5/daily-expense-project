/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
} from 'react-native';
import {
  SafeAreaProvider,
  // useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
import GlobalSnackbar from './components/GlobalSnackbar';
import AppNavigator from './navigation/AppNavigator';
import { useEffect } from 'react';
import { userStore } from './store/userStore';
import { getToken } from './storage/auth.storage';
import KeepAwake from 'react-native-keep-awake';

function App() {
  // useEffect(() => {
  //   const token = getToken();

  //   if (token) {
  //     userStore.getState().getUser();
  //   } else {
  //     userStore.getState().setUser(undefined);
  //   }
  // }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <GlobalSnackbar />
        <AppStatusBar />
        <AppNavigator />
        <KeepAwake />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function AppStatusBar() {
  const { isLight } = useTheme();

  return (
    <StatusBar
      barStyle={isLight ? 'dark-content' : 'light-content'}
      translucent
      backgroundColor="transparent"
    />
  );
}

// const RootStack = createNativeStackNavigator();
// const AuthStack = createNativeStackNavigator();
// const AppStack = createNativeStackNavigator();

// function AppContent() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator initialRouteName='auth'>
//         <RootStack.Screen name='auth' component={AuthStackScreens} options={{ headerShown: false }} />
//         <RootStack.Screen name='app' component={AppStackScreens} />
//       </RootStack.Navigator>      
//     </NavigationContainer>
//   );

// }


// function AuthStackScreens() {
//   return (
//     <AuthStack.Navigator initialRouteName='register'>
//       <AuthStack.Screen name='register' component={RegisterScreen} options={{ headerShown: false }} />
//       <AuthStack.Screen name='login' component={LoginScreen} />
//     </AuthStack.Navigator>
//   );
// }

// function AppStackScreens() {
//   return (
//     <AppStack.Navigator>
//       <AppStack.Screen name='home' component={HomeScreen} />
//     </AppStack.Navigator>
//   );
// }

export default App;
