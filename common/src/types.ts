export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Context State
export interface GlobalState {
  authenticated: boolean;
  loading: boolean;
  isSignup: boolean;
  user: UserCredentials;
}

// Context Reducer
export interface ReducerContext {
  state: GlobalState;
  dispatch: ({}) => void;
}

// User Credentials for Context State
export interface UserCredentials {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
