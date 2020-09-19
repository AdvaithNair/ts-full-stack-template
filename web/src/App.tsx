import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import theme from './utils/theme';
import { UserContext } from './context/context';
import Index from './pages/Index';
import { LOCALSTORAGE, ReducerContext } from '@app/common';
import axios from './utils/axios';
import { AxiosResponse } from 'axios';
import STATE from './context/state';
import Animation from './components/General/Utility/Animation';
import Loading from './components/Loading/Loading';

const App: React.FC = () => {
  // const [animation, setAnimation] = useState<boolean>(true);
  const [animation, setAnimation] = useState<boolean>(true);
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

  const autoSignin = () => {
    // Sends API Request to Verify User
    axios
      .get('/api/user/')
      .then((res: AxiosResponse) => {
        // Sets State
        dispatch({ type: STATE.SET_USER, payload: res.data });
      })
      .catch(() => {
        // Logout Code
        dispatch({ type: STATE.CLEAR_USER });
      });
  };

  // Persists User
  useEffect(() => {
    autoSignin();
    setTimeout(() => setAnimation(false), 1950);
  }, []);

  return (
    <div className='App'>
      {animation && (
        <Animation style={{ display: animation ? 'flex' : 'none' }} />
      )}
      {state.loading && <Loading />}
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path='/' component={Index} exact />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
