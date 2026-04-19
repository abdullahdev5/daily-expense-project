
export const ROUTES = {
    auth: 'auth',
    app: 'app'
} as const;

export const AUTH_ROUTES = {
    login: 'login',
    register: 'register'
} as const;

export const APP_ROUTES = {
    mainTabs: 'mainTabs',
    addTransaction: 'add_transaction'
} as const;

export const Main_TABS_ROUTES = {
    home: 'home',
    wallet: 'wallet',
    insight: 'insight',
    profile: 'profile'
} as const;