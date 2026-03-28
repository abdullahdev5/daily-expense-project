import { navigationRef } from './navigationRef';
import { APP_ROUTES, AUTH_ROUTES, ROUTES } from './routes';
import { AppStackParamList, AuthStackParamList, RootStackParamList } from './types';

export const navigateAuth = <T extends keyof AuthStackParamList>(
    screen: T,
    params?: AuthStackParamList[T]
) => {
    if (!navigationRef.isReady()) return;

    navigationRef.navigate({
        name: ROUTES.AUTH,
        params: { screen, params }
    });
}

export const navigateApp = <T extends keyof AppStackParamList>(
    screen: T,
    params?: AppStackParamList[T]
) => {
    if (!navigationRef.isReady()) return;

    navigationRef.navigate({
        name: ROUTES.APP,
        params: { screen, params }
    });
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ 
        name: ROUTES.AUTH,
        params: {
          screen: AUTH_ROUTES.LOGIN
        }
      }],
    });
  }
}

export function resetToMain() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{
        name: ROUTES.APP,
        params: {
          screen: APP_ROUTES.HOME
        }
      }]
    })
  }
}