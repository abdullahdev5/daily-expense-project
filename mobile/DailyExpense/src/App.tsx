/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppStatusBar />
        <AppContent />
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

function AppContent() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ 
        backgroundColor: theme.colors.background,
        paddingTop: insets.top
      }, styles.container]}
    >
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: theme.fontSize.small,
        }}
      >
        Welcome to DailyExpense
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
