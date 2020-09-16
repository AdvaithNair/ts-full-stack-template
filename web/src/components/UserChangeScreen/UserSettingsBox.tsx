import Box from '@material-ui/core/Box';
import React from 'react';
import {Divider, Grid, Hidden} from '@material-ui/core';
import Blurb from '../Blurb';
import logo from '../../images/logo.png';
import { PROJECT_NAME } from '@app/common';
import UserChangeInfoForm from "./UserChangeInfoForm";

const UserSettingsBox = () => {
  return (
    <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='center'
      >
          <Grid item sm={2}>
              <Grid
                  container
                  direction='row'
                  justify="center"
                  alignItems="center"
              >
                  <Hidden mdUp>
              <img src={"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} style={{borderRadius: '50%'}} width={85}/>
                  </Hidden>
                  <Hidden smDown>
                      <img src={"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"} style={{borderRadius: '50%'}} width={170}/>
                  </Hidden>
              </Grid>
          </Grid>
        <Grid item sm>
            <UserChangeInfoForm/>
        </Grid>
      </Grid>
        <Box m={2}>
            <Divider/>
        </Box>
        <Grid
            container
            direction='row'
            justify='space-around'
            alignItems='center'
        >
            <Blurb headerText={'test'} dataText={'Section2'}/>
        </Grid>
        <Box m={2}>
            <Divider/>
        </Box>
        <Grid
            container
            direction='row'
            justify='space-around'
            alignItems='center'
        >
            <Blurb headerText={'test'} dataText={'Section3'}/>
        </Grid>
    </Box>
  );
};

export default UserSettingsBox;
