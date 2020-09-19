import React, { useContext, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import {
  CRYPTO_JS_SECRETS,
  ERRORS,
  LOCALSTORAGE,
  ReducerContext
} from '@app/common';
import { UserContext } from '../../context/context';
import axios from '../../utils/axios';
import CryptoJS from 'crypto-js';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';
import SmallPassword from '../General/Entry/PasswordSmall';

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  general?: string;
}

const blankErrors: ChangePassword = {
  oldPassword: '',
  newPassword: '',
  general: ''
};

const UserPasswordUpdateForm = () => {
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const [input, setInput] = useState<ChangePassword>({
    newPassword: '',
    oldPassword: '',
    general: ''
  });

  const [open, setOpen] = useState<string>('');
  const [errors, setErrors] = useState<ChangePassword>(blankErrors);

  const filterInput = () => {
    const { oldPassword, newPassword } = input;
    const currentErrors: ChangePassword = blankErrors;

    // Password Errors
    if (oldPassword === '' || oldPassword === undefined)
      currentErrors.oldPassword = ERRORS.GENERAL.BLANK;
    //else if (password.length < 6)
    //currentErrors.password = ERRORS.GENERAL.PASSWORD_SHORT;
    else currentErrors.oldPassword = '';

    // Password Errors
    if (newPassword === '' || newPassword === undefined)
      currentErrors.newPassword = ERRORS.GENERAL.BLANK;
    else if (newPassword.length < 6)
      currentErrors.newPassword = ERRORS.GENERAL.PASSWORD_SHORT;
    else currentErrors.newPassword = '';

    setErrors(prevErrors => ({ ...prevErrors, ...currentErrors }));

    return !Object.values(currentErrors).some(x => x !== '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filterInput()) {
      axios //NEED ROUTE
        .put('', input)
        .then((res: any) => {
          // Set State Here
          setLoading(dispatch);
          dispatch({
            type: STATE.SET_USER,
            payload: res.data
          });
          clearLoading(dispatch);
        })
        .catch((error: any) => {
          console.log(error);
          setErrors({ ...blankErrors, general: ERRORS.GENERAL.INVALID });
          setOpen(error.response.data.error);
        });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
      >
        <SmallPassword
          error={Boolean(errors.oldPassword)}
          onChange={e => setInput({ ...input, oldPassword: e.target.value })}
          helperText={''}
          fullWidth={true}
          required={true}
          label={'Old Password'}
        />
        <SmallPassword
          error={Boolean(errors.oldPassword)}
          onChange={e => setInput({ ...input, oldPassword: e.target.value })}
          helperText={'Insert a new password & be careful'}
          fullWidth={true}
          required={true}
          label={'New Password'}
        />
      </Grid>
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Change Password
      </Button>
      <CustomSnackbar openStr={open}> </CustomSnackbar>
    </form>
  );
};

export default UserPasswordUpdateForm;
