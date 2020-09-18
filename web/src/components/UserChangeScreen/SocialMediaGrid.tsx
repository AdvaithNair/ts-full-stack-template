import React, {useContext} from 'react';
import {ReducerContext} from '@app/common';
import {UserContext} from '../../context/context';
import {Grid, Typography} from "@material-ui/core";
import SocialMediaBar from "../SocialMediaBar";
import instagramLogo from "../../images/instagramLogo.png";
import twitterLogo from "../../images/twitterLogo.png";
import facebookLogo from "../../images/facebookLogo.png";
import snapchatLogo from "../../images/snapchatLogo.png";

const SocialMediaGrid = () => {

    return (
        <div>
            <Typography variant='body2'>Connect with External Account</Typography>
            <Grid
                container
                direction='row'
                justify='space-around'
                alignItems='flex-start'
            >
                <SocialMediaBar
                    logo={instagramLogo}
                    imgHeight={25}
                    text={'Instagram'}
                    width={180}
                    height={55}
                />
                <SocialMediaBar
                    logo={twitterLogo}
                    imgHeight={20}
                    text={'Twitter'}
                    width={180}
                    height={55}
                />
                <SocialMediaBar
                    logo={facebookLogo}
                    imgHeight={25}
                    text={'Facebook'}
                    width={180}
                    height={55}
                />
                <SocialMediaBar
                    logo={snapchatLogo}
                    imgHeight={25}
                    text={'Snapchat'}
                    width={180}
                    height={55}
                />
            </Grid>
        </div>
    );
};

export default SocialMediaGrid;
