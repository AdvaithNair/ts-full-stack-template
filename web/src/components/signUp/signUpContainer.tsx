import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import SignUpBox from './SignUpBox';
import { COLORS } from '@app/common';

const SignUpContainer = () => {
  useEffect(() => {
    (window as any).bubbly({
      colorStart: COLORS.BUBBLY_START,
      colorStop: COLORS.BUBBLY_STOP,
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
      <SignUpBox />
    </Grid>
  );
};

export default SignUpContainer;
