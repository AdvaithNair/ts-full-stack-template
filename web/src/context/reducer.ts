import STATE from './state';

// Reducer Function
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case STATE.SET_SIGNUP:
      return {
        ...state,
        isSignup: true
      };
    case STATE.SET_SIGNIN:
      return {
        ...state,
        isSignup: false
      };
    case STATE.AUTH:
      return {
        ...state,
        authenticated: true
      };
    case STATE.NOT_AUTH:
      return {
        ...state,
        authenticated: false
      };
    case STATE.SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case STATE.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case STATE.CLEAR_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
