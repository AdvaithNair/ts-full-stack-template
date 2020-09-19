import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import SignInBox from './SignInBox';

const SignInContainer = () => {
  useEffect(() => {
    (window as any).bubbly({
      colorStart: '#5a0073',
      colorStop: '#000081',
      bubbleFunc: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`
    });
  }, []);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ minHeight: '100vh' }}
    >
      <SignInBox />
    </Grid>
  );
};

export default SignInContainer;
