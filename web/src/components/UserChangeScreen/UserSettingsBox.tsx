import Box from '@material-ui/core/Box';
import React from 'react';
import {Divider, Grid, Hidden, Tooltip, Typography} from '@material-ui/core';
import Blurb from '../Blurb';
import UserChangeInfoForm from "./UserChangeInfoForm";
import UserPasswordUpdateForm from "./UserPasswordUpdateForm";
import instagramLogo from '../../images/instagramLogo.png';
import snapchatLogo from '../../images/snapchatLogo.png';
import twitterLogo from '../../images/twitterLogo.png';
import facebookLogo from '../../images/facebookLogo.png';
import SocialMediaBar from "../SocialMediaBar";

const UserSettingsBox = () => {
    return (
        <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
            <Grid
                container
                direction='row'
                justify='space-around'
                alignItems='center'
            >
                <Grid item sm={4}>
                    <Grid
                        container
                        direction='row'
                        justify="center"
                        alignItems="center"
                    >
                        <Hidden mdUp>
                            <Tooltip title="Upload Profile Picture" arrow>
                                <img
                                    src={"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}
                                    style={{borderRadius: '50%'}} width={85}/>
                            </Tooltip>
                        </Hidden>
                        <Hidden smDown>
                            <Tooltip title="Upload Profile Picture" arrow>
                                <img
                                    src={"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}
                                    style={{borderRadius: '50%'}} width={170}/>
                            </Tooltip>
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
                alignItems='flex-start'
            >
                <Grid item sm={4}>
                    <Typography variant='body2'>Connect with External Account</Typography>
                    <Grid
                        container
                        direction='row'
                        justify='space-around'
                        alignItems='flex-start'
                    >
                    <SocialMediaBar logo={instagramLogo} imgHeight={25} text={'Instagram'} width={180} height={55}/>
                    <SocialMediaBar logo={twitterLogo} imgHeight={25} text={'Twitter'} width={180} height={55}/>
                        <SocialMediaBar logo={facebookLogo} imgHeight={25} text={'Facebook'} width={180} height={55}/>
                    <SocialMediaBar logo={snapchatLogo} imgHeight={25} text={'Snapchat'} width={180} height={55}/>
                    </Grid>
                </Grid>
                <Grid item sm>
                    <Blurb headerText={'test'} dataText={'Section3'}/>
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
                <Box width={"100%"}>
                    <UserPasswordUpdateForm/>
                </Box>
            </Grid>

        </Box>
    );
};

export default UserSettingsBox;
