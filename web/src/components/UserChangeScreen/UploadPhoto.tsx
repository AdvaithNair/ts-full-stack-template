import React, { useContext, useState } from 'react';
import Box from '@material-ui/core/Box';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Hidden,
  Tooltip,
  CircularProgress,
  IconButton
} from '@material-ui/core';
import axios from '../../utils/axios';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import { FILE_UPLOADS, ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const UploadPhoto = () => {
  const [open, setOpen] = useState(false);
  const [imageName, setImageName] = useState<string>('');
  const [imageUpload, setImageUpload] = useState<Blob>(new Blob());
  const [imageError, setImageError] = useState<string>('');
  const { state, dispatch } = useContext<ReducerContext>(UserContext);

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
    } else setImageName('');

    if (imageData.type.trim().substring(0, 5) !== 'image') {
      setImageName('');
      setImageError('Upload Image File');
    } else setImageError('');
  };

  // 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg
  const submitPhoto = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let photoInput: any = document.getElementById(FILE_UPLOADS.PROFILE_PICTURE);
    if (photoInput.files[0]) {
      const formData = new FormData();
      const upload_file = photoInput.files[0];
      formData.append(FILE_UPLOADS.PROFILE_PICTURE, upload_file);
      axios
        .post('/api/user/upload-profile-picture', formData)
        .then((res: any) => {
          setLoading(dispatch);
          dispatch({ type: STATE.SET_UPLOAD_IMAGE, payload: res.data });
          clearLoading(dispatch);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Upload Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload a .jpeg/.png to display to other users. NOTE: This
            must follow the user guidelines
          </DialogContentText>
          <Box width={'250px'}>
            <form onSubmit={submitPhoto}>
              <input
                type='file'
                id='profile-picture'
                name='profile-picture'
                accept='image/png, image/jpeg'
              />
              <input className='submit-input' type='submit' value='Upload' />
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Hidden mdUp>
          {/*<Tooltip
            title='Upload Profile Picture'
            arrow
            onClick={handleClickOpen}
          >
            <img
              src={state.user.imageURL}
              style={{ borderRadius: '50%' }}
              width={85}
              height={85}
            />
          </Tooltip>*/}
        </Hidden>
        <Hidden smDown>
          {/*<Tooltip
            title='Upload Profile Picture'
            arrow
            onClick={handleClickOpen}
          >
            <img
              src={state.user.imageURL}
              style={{ borderRadius: '50%' }}
              width={170}
              height={170}
          />
          </Tooltip>*/}
          <Tooltip
            title='Update Profile Picture'
            placement='bottom'
            onClick={handleClickOpen}
          >
            <div
              className='profile-card-image-container'
              onClick={() => setOpen(true)}
            >
              <img
                className='profile-card-image'
                src={state.user.imageURL}
                alt={state.user.username}
              ></img>
              <div className='profile-card-image-overlay'>
                <IconButton
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <PhotoCameraIcon fontSize='large' />
                </IconButton>
              </div>
            </div>
          </Tooltip>
        </Hidden>
      </Grid>
    </div>
  );
};

export default UploadPhoto;
