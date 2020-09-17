import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Grid, Typography } from '@material-ui/core';
import axios from "../utils/axios";
import {AxiosError, AxiosResponse} from "axios";
import {clearLoading, setLoading} from "../context/loading";
import STATE from "../context/state";
import CryptoJS from "crypto-js";
import {CRYPTO_JS_SECRETS, ERRORS, LOCALSTORAGE, ReducerContext} from "@app/common";
import {UserContext} from "../context/context";

interface Props {
  buttonText: string;
  route: string;
  title: string;
}

const BasicAppBar: React.FC<Props> = ({ title, buttonText, route }) => {
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const handleSubmit = () => {
    axios
        .post('/api/user/signout')
        .then((res: AxiosResponse) => {
          setLoading(dispatch);
          dispatch({
            type: STATE.CLEAR_USER
          });
          clearLoading(dispatch);

        })
        .catch((error: AxiosError) => {

        });
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Grid
            justify='space-between'
            container
          >
            <Grid item>
              <Typography variant='h6'>{title}</Typography>
            </Grid>
            <Grid item>
              <Button href={route} color='inherit'>
                {buttonText}
              </Button>
              <Button onClick={handleSubmit} color='inherit'>
                Sign Out
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BasicAppBar;
