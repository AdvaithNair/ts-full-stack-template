import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Theme from './components/Theme';
import { UserContext } from './context/context';
import Index from './pages/Index';
import {
  LOCALSTORAGE,
  CRYPTO_JS_SECRETS,
  UserCredentials,
  ReducerContext
} from '@app/common';
import CryptoJS from 'crypto-js';
import axios from './utils/axios';
import { AxiosResponse } from 'axios';
import STATE from './context/state';

const App: React.FC = () => {
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const autoSignin = () => {
    // Gets Encrypted Data
    const userData = localStorage.getItem(LOCALSTORAGE.USER);

    if (userData) {
      // Parses LocalStorage
      const userString = CryptoJS.AES.decrypt(
        userData,
        CRYPTO_JS_SECRETS.USER_DATA
      ).toString(CryptoJS.enc.Utf8);
      const userObject: UserCredentials = JSON.parse(userString);

      // Sets State
      dispatch({ type: STATE.SET_USER, payload: userObject });

      // Sends API Request to Verify User
      axios
        .get('/api/user/verify')
        .then((res: AxiosResponse) => {
          // Compares IDs
          if (userObject.id !== res.data.id) {
            throw new Error();
          }
        })
        .catch(() => {
          // Logout Code
          dispatch({ type: STATE.CLEAR_USER });
          localStorage.clear();
        });
    }
  };

  // Persists User
  useEffect(() => {
    autoSignin();
  }, []);

  return (
    <div className='App'>
      <ThemeProvider theme={Theme}>
        <Switch>
          <Route path='/' component={Index} exact />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
