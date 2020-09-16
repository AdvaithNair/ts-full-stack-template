import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Grid, Typography } from '@material-ui/core';

interface Props {
  buttonText: string;
  route: string;
  title: string;
}

const BasicAppBar: React.FC<Props> = ({ title, buttonText, route }) => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Grid
            justify='space-between' // Add it here :)
            container
          >
            <Grid item>
              <Typography variant='h6'>{title}</Typography>
            </Grid>
            <Grid item>
              <Button href={route} color='inherit'>
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BasicAppBar;
