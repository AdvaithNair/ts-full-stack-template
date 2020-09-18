import React, { createContext, useReducer, useMemo } from 'react';
import { reducer } from './reducer';
import { GlobalState, ReducerContext } from '@app/common';

// Initial State Object
export const initialState: GlobalState = {
  authenticated: false,
  loading: false,
  isSignup: false,
  user: {
    id: -1,
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    imageURL:
      'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'
  }
};

// Context Creation
export const UserContext = createContext<ReducerContext>({
  state: initialState,
  dispatch: (argument: { [k: string]: any }) => {}
});

// Props to allow for props
interface Props {
  props?: any;
}

// User Provider for Global Storage
const UserProvider: React.FC<Props> = (props: any) => {
  // Global User State
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memo for Efficiency
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  // const contextValue = { state, dispatch };

  // Provider Wrapping
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
