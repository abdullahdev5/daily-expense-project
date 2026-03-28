import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { APP_ROUTES, AUTH_ROUTES, ROUTES } from "./routes"
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    // [ROUTES.AUTH]: {
    //     screen?: keyof AuthStackParamList,
    //     params?: AuthStackParamList[keyof AuthStackParamList]
    // };
    // [ROUTES.APP]: {
    //     screen?: keyof AppStackParamList,
    //     params?: AppStackParamList[keyof AppStackParamList]
    // };
    [ROUTES.AUTH]: NavigatorScreenParams<AuthStackParamList>;
    [ROUTES.APP]: NavigatorScreenParams<AppStackParamList>;
}

export type AuthStackParamList = {
    [AUTH_ROUTES.LOGIN]: undefined;
    [AUTH_ROUTES.REGISTER]: undefined;
}

export type AppStackParamList = {
    [   APP_ROUTES.HOME]: undefined;
}


export type AuthNavigation = NativeStackNavigationProp<AuthStackParamList>;
export type AppNavigation = NativeStackNavigationProp<AppStackParamList>;