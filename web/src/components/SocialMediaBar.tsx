import Box from '@material-ui/core/Box';
import React, {ChangeEvent} from 'react';
import {Divider, Grid, Hidden, Tooltip, Typography, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button} from '@material-ui/core';
import instagramLogo from '../../images/instagramLogo.png'
import UserPasswordUpdateForm from "./UserChangeScreen/UserPasswordUpdateForm";
import TextEntry from "./TextEntry";

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

    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box boxShadow={4} bgcolor='background.paper' m={1} p={0} height={height} width={width} borderRadius={18}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{text}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username below
                    </DialogContentText>
                    <Box width={"250px"}>
                    <TextEntry onChange={e => setInput(e.target.value)} helperText={'Enter your username here'} label={text} required={true} fullWidth={true} error={false}/>
                    </Box>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                onClick={handleClickOpen}
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
