import Box from '@material-ui/core/Box';
import React from 'react';
import SignUpForm from './SignUpForm';
import { Grid, Hidden } from '@material-ui/core';
import Blurb from '../Blurb';
import logo from '../../images/logo.png';
import { PROJECT_NAME } from '@app/common';

const SignUpBox = () => {
  return (
    <Box boxShadow={4} bgcolor='background.paper' m={4} p={4} borderRadius={8}>
      <img
        width='250'
        src={logo}
        alt='Logo'
        style={{ paddingBottom: '10px' }}
      />
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='flex-start'
      >
        <Grid item sm>
          <SignUpForm />
        </Grid>
        <Hidden smDown>
          <Grid item md>
            <Blurb
              headerText={`Welcome to ${PROJECT_NAME}!`}
              dataText={'Please register an account'}
            />
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

export default SignUpBox;
