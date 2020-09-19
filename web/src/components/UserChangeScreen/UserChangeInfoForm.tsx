import Box from '@material-ui/core/Box';
import React, { useState, useContext } from 'react';
import { Button, Grid, Snackbar, SnackbarContent } from '@material-ui/core';
import {
  EMAIL_REGEX,
  ERRORS,
  ReducerContext,
  CRYPTO_JS_SECRETS,
  LOCALSTORAGE
} from '@app/common';
import { UserContext } from '../../context/context';
import axios from '../../utils/axios';
import CryptoJS from 'crypto-js';
import TextEntryValued from '../General/Entry/FilledTextEntry';
import { clearLoading, setLoading } from '../../context/loading';
import STATE from '../../context/state';
import CustomSnackbar from '../General/Utility/Snackbar';

interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  general?: string;
}

const blankErrors: UserInfo = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  general: ''
};

const UserChangeInfoForm = () => {
  const { state } = useContext<ReducerContext>(UserContext);
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const [input, setInput] = useState<UserInfo>({
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    username: state.user.username
  });

  const [open, setOpen] = useState<string>('');
  const [errors, setErrors] = useState<UserInfo>(blankErrors);

  const filterInput = () => {
    const { email, firstName, lastName, username } = input;
    const currentErrors: UserInfo = blankErrors;

    //Username errors
    if (username === '' || username === undefined)
      currentErrors.username = ERRORS.GENERAL.BLANK;
    else if (username.length < 3)
      currentErrors.username = ERRORS.SIGNUP.USERNAME_SHORT;
    else if (username.length > 10)
      currentErrors.username = ERRORS.SIGNUP.USERNAME_LONG;
    else currentErrors.username = '';

    //First Name errors
    if (firstName === '' || firstName === undefined)
      currentErrors.firstName = ERRORS.GENERAL.BLANK;
    else currentErrors.firstName = '';

    //Last Name errors
    if (lastName === '' || lastName === undefined)
      currentErrors.lastName = ERRORS.GENERAL.BLANK;
    else currentErrors.lastName = '';

    // Email Errors
    if (email === '' || email === undefined)
      currentErrors.email = ERRORS.GENERAL.BLANK;
    else if (!email.match(EMAIL_REGEX))
      currentErrors.email = ERRORS.GENERAL.EMAIL;
    else currentErrors.email = '';

    setErrors(prevErrors => ({ ...prevErrors, ...currentErrors }));

    return !Object.values(currentErrors).some(x => x !== '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filterInput()) {
      axios
        .put('/api/user/update', input)
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
        <Grid item sm>
          <Box width={1}>
            <TextEntryValued
              error={Boolean(errors.firstName)}
              onChange={e => setInput({ ...input, firstName: e.target.value })}
              helperText={errors.firstName}
              fullWidth={true}
              required={true}
              label={'First Name'}
              innerStr={input.firstName}
              small={true}
              name={'firstName'}
            />
          </Box>
        </Grid>
        <Grid item sm>
          <Box width={1}>
            <TextEntryValued
              error={Boolean(errors.lastName)}
              onChange={e => setInput({ ...input, lastName: e.target.value })}
              helperText={errors.lastName}
              fullWidth={true}
              required={true}
              label={'Last Name'}
              innerStr={input.lastName}
              small={true}
              name={'lastName'}
            />
          </Box>
        </Grid>
      </Grid>
      <TextEntryValued
        error={Boolean(errors.username)}
        onChange={e => setInput({ ...input, username: e.target.value })}
        helperText={errors.username}
        fullWidth={true}
        required={true}
        label={'Username'}
        innerStr={input.username}
        small={true}
        name={'username'}
      />
      <TextEntryValued
        error={Boolean(errors.email)}
        onChange={e => setInput({ ...input, email: e.target.value })}
        helperText={errors.email}
        fullWidth={true}
        required={true}
        label={'Email'}
        innerStr={input.email}
        small={true}
        name={'email'}
      />
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Submit Changes
      </Button>
      <CustomSnackbar openStr={open}> </CustomSnackbar>
    </form>
  );
};

export default UserChangeInfoForm;
