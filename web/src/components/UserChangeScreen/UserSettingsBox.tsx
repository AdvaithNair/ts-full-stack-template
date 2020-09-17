import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Hidden,
    Tooltip,
    Typography
} from '@material-ui/core';
import Blurb from '../Blurb';
import UserChangeInfoForm from "./UserChangeInfoForm";
import UserPasswordUpdateForm from "./UserPasswordUpdateForm";
import instagramLogo from '../../images/instagramLogo.png';
import snapchatLogo from '../../images/snapchatLogo.png';
import twitterLogo from '../../images/twitterLogo.png';
import facebookLogo from '../../images/facebookLogo.png';
import SocialMediaBar from "../SocialMediaBar";
import TextEntry from "../TextEntry";
import axios from "../../utils/axios";
import CryptoJS from "crypto-js";
import {CRYPTO_JS_SECRETS, ERRORS, LOCALSTORAGE} from "@app/common";

const UserSettingsBox = () => {
    const [open, setOpen] = React.useState(false);
    const [imageName, setImageName] = useState<string>("");
    const [imageUpload, setImageUpload] = useState<Blob>(new Blob());
    const [imageError, setImageError] = useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleImageChange = (event: any) => {
        const imageData = event.target.files[0];
        if (imageData !== undefined) {
            setImageUpload(imageData);
            setImageName(imageData.name);
        } else setImageName("");

        if (imageData.type.trim().substring(0, 5) !== "image") {
            setImageName("");
            setImageError("Upload Image File");
        } else setImageError("");
    };

    const submitPhoto = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let photoInput = document.getElementById('profile-picture');
        // @ts-ignore
        if (photoInput.files[0]) {
            const formData = new FormData();
            // @ts-ignore
            const upload_file = photoInput.files[0];
            formData.append('profile-picture', upload_file);
            axios
                .post('/api/user/upload-profile-picture', formData)
                .then((res: any) => {

                    console.log(res.data);

                })
                .catch((error: any) => {

                });
        }
    }

    return (
        <Box boxShadow={4} bgcolor='background.paper' m={2} p={3} borderRadius={8}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload Profile Picture</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please upload a .jpeg/.png to display to other users. NOTE: This must follow the user guidelines
                    </DialogContentText>
                    <Box width={"250px"}>
                        <form onSubmit={submitPhoto}>
                            <input type="file"
                                   id="profile-picture" name="profile-picture"
                                   accept="image/png, image/jpeg"
                            />
                            <input
                                className="submit-input"
                                type="submit"
                                value="Upload"
                            />
                        </form>
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
                            <Tooltip title="Upload Profile Picture" arrow onClick={handleClickOpen}>
                                <img
                                    src={"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}
                                    style={{borderRadius: '50%'}} width={85}/>
                            </Tooltip>
                        </Hidden>
                        <Hidden smDown>
                            <Tooltip title="Upload Profile Picture" arrow onClick={handleClickOpen}>
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
                    <SocialMediaBar logo={twitterLogo} imgHeight={20} text={'Twitter'} width={180} height={55}/>
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
