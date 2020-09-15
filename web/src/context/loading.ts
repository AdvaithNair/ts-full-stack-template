import { Dispatch } from 'react';
import STATE from './state';

export const setLoading = (dispatch: Dispatch<any>): void => {
  dispatch({ type: STATE.SET_LOADING });
};

export const clearLoading = (dispatch: Dispatch<any>): void => {
  dispatch({ type: STATE.CLEAR_LOADING });
};
