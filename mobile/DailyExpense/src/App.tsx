/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { Column } from './components/Layout';
import AppText from './components/Text';
import AppTextInput from './components/TextInput';
import AppButton from './components/Button';
import { Formik } from 'formik';
import AppFormInput from './components/FormInput';
import AppCard from './components/Card';

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
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
      }}
    >
      <AppCard>
        <Column center>
          <AppText>Hello Card!</AppText>
        </Column>
      </AppCard>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validateOnChange={true}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ handleSubmit, submitCount }) => (
            <Column expand center>
              <AppText
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.fontSize.xxLarge,
                }}
              >
                Sign Up
              </AppText>

              <AppFormInput
                containerStyle={{ padding: 10 }}
                placeholder="Email"
                keyboardType="email-address"
                name="email"
                submitCount={submitCount}
                validator={text => {
                  if (!text.endsWith('@gmail.com')) {
                    return 'Invalid Email!';
                  }

                  return undefined;
                }}
              />

              <AppFormInput
                containerStyle={{ padding: 10 }}
                placeholder="Password"
                keyboardType="default"
                name="password"
                submitCount={submitCount}
                validator={text => {
                  if (text.length < 6) {
                    return 'password must be atleast 6 characters long!';
                  }

                  return undefined;
                }}
              />

              <View style={{ width: '100%', padding: 10 }}>
                <AppButton onPress={handleSubmit} fullWidth>
                  Submit
                </AppButton>
              </View>
            </Column>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default App;
