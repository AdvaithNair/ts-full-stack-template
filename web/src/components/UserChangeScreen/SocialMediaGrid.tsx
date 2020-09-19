import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SocialMediaBar from './SocialMediaBar';
import InstagramLogo from '../../images/Socials/InstagramLogo.png';
import TwitterLogo from '../../images/Socials/TwitterLogo.png';
import FacebookLogo from '../../images/Socials/FacebookLogo.png';
import SnapchatLogo from '../../images/Socials/SnapchatLogo.png';

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
          logo={InstagramLogo}
          imgHeight={25}
          text={'Instagram'}
          width={180}
          height={55}
        />
        <SocialMediaBar
          logo={TwitterLogo}
          imgHeight={20}
          text={'Twitter'}
          width={180}
          height={55}
        />
        <SocialMediaBar
          logo={FacebookLogo}
          imgHeight={25}
          text={'Facebook'}
          width={180}
          height={55}
        />
        <SocialMediaBar
          logo={SnapchatLogo}
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
