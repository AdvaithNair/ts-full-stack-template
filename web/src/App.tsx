import React, {useEffect} from "react";
import "./App.css";
import Ping from "./components/Ping";
import Password from "./components/Password"
import SignInBox from "./components/signIn/signInBox";
import SignInContainer from "./components/signIn/signInContainer";
import { ThemeProvider } from '@material-ui/core/styles'
import Theme from "./components/Theme";
import SignUpContainer from "./components/signUp/signUpContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./components/mainPage/mainPage";

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={Theme}>
            <Switch>
                <Route path="/" component={MainPage} exact />
                <Route path="/signIn" component={SignInContainer} />
                <Route path="/signUp" component={SignUpContainer} />
            </Switch>
        </ThemeProvider>
    </div>
  );
}

export default App;
