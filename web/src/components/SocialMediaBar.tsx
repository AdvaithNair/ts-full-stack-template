import Box from '@material-ui/core/Box';
import React, {ChangeEvent} from 'react';
import {Divider, Grid, Hidden, Tooltip, Typography} from '@material-ui/core';
import instagramLogo from '../../images/instagramLogo.png'
import UserPasswordUpdateForm from "./UserChangeScreen/UserPasswordUpdateForm";

interface Props {
    logo: any;
    text: string;
    width: number;
    height: number;
    imgHeight: number;
}

const SocialMediaBar: React.FC<Props> = ({
                                             logo,
                                             text,
    width,
    height,
                                             imgHeight
                                         }) => {
    return (
        <Box boxShadow={4} bgcolor='background.paper' m={1} p={0} height={height} width={width} borderRadius={18}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Box marginRight={1} marginTop={2}>
                    <img height={imgHeight} width={imgHeight} src={logo} alt={text} />
                </Box>
                <Box marginTop={1.5}>
                <Typography variant='body2'>{text}</Typography>
                </Box>
            </Grid>

        </Box>
    );
};

export default SocialMediaBar;
