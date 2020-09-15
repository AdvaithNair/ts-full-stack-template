import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Theme from './components/Theme';
import UserProvider from './context/context';
import Index from './pages/Index';

const App: React.FC = () => {
  return (
    <div className='App'>
      <UserProvider>
        <ThemeProvider theme={Theme}>
          <Switch>
            <Route path='/' component={Index} exact />
          </Switch>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
};

export default App;
