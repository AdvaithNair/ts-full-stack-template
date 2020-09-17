import React, { useEffect, useContext } from 'react';
import { COLORS, ReducerContext } from '@app/common';
import { Grid } from '@material-ui/core';
import SignInBox from '../SignIn/SignInBox';
import SignUpBox from '../SignUp/SignUpBox';
import { UserContext } from '../../context/context';

const Landing: React.FC = () => {
  const { state } = useContext<ReducerContext>(UserContext);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ minHeight: '100vh' }}
    >
      {state.isSignup ? <SignUpBox /> : <SignInBox />}
    </Grid>
  );
};

export default Landing;
