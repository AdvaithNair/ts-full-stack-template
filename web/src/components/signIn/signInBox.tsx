import Box from '@material-ui/core/Box';
import React from 'react';
import SignInForm from './SignInForm';
import { Grid } from '@material-ui/core';
import Blurb from '../Blurb';
import logo from '../../images/logo.png';

const SignInBox = () => {
  return (
    <Box boxShadow={4} bgcolor='background.paper' m={4} p={4} borderRadius={8}>
      <img
        width='250'
        src={logo}
        alt='Logo'
        style={{ paddingBottom: '16px' }}
      />
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='flex-start'
      >
        <Grid item sm>
          <SignInForm />
        </Grid>
        <Grid item md>
          <Blurb
            headerText={'Welcome Back!'}
            dataText={'Please sign into your account'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInBox;
