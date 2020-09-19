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
  Tooltip
} from '@material-ui/core';
import axios from '../../utils/axios';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import { FILE_UPLOADS, ReducerContext } from '@app/common';
import { UserContext } from '../../context/context';

const UploadPhoto = () => {
  const [open, setOpen] = React.useState(false);
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
    let photoInput = document.getElementById(FILE_UPLOADS.PROFILE_PICTURE);
    // @ts-ignore
    if (photoInput.files[0]) {
      const formData = new FormData();
      // @ts-ignore
      const upload_file = photoInput.files[0];
      formData.append(FILE_UPLOADS.PROFILE_PICTURE, upload_file);
      axios
        .post('/api/user/upload-profile-picture', formData)
        .then((res: any) => {
          console.log(res.data);
          setLoading(dispatch);
          dispatch({ type: STATE.SET_UPLOAD_IMAGE, payload: res.data });
          clearLoading(dispatch);
        })
        .catch((error: any) => {});
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
          <Tooltip
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
          </Tooltip>
        </Hidden>
        <Hidden smDown>
          <Tooltip
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
          </Tooltip>
        </Hidden>
      </Grid>
    </div>
  );
};

export default UploadPhoto;
