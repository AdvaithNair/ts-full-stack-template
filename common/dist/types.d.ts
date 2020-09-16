export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}
export interface GlobalState {
    authenticated: boolean;
    loading: boolean;
    isSignup: boolean;
    user: UserCredentials;
}
export interface ReducerContext {
    state: GlobalState;
    dispatch: ({}: {}) => void;
}
export interface UserCredentials {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}
export interface AxiosResponse {
    data: any;
}
export interface AxiosError {
    response: AxiosErrorData;
}
interface AxiosErrorData {
    data: AxiosErrorMessage;
}
interface AxiosErrorMessage {
    error: string;
}
export {};
