import Box from '@material-ui/core/Box';
import React, { useState, useContext } from 'react';
import { Button, Grid, Snackbar, SnackbarContent } from '@material-ui/core';
import Password from '../Password';
import TextEntry from '../TextEntry';
import {
  EMAIL_REGEX,
  ERRORS,
  ReducerContext,
  CRYPTO_JS_SECRETS,
  LOCALSTORAGE
} from '@app/common';
import { UserContext } from '../../context/context';
import STATE from '../../context/state';
import CustomLink from '../CustomLink';
import axios from '../../utils/axios';
import CryptoJS from 'crypto-js';

interface SignUp {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  general?: string;
}

const blankErrors: SignUp = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  general: ''
};

const SignUpForm = () => {
  const [input, setInput] = useState<SignUp>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: ''
  });

  const [open, setOpen] = useState<string>('');
  const [errors, setErrors] = useState<SignUp>(blankErrors);
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const filterInput = () => {
    const { email, password, firstName, lastName, username } = input;
    const currentErrors: SignUp = blankErrors;

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

    // Password Errors
    if (password === '' || password === undefined)
      currentErrors.password = ERRORS.GENERAL.BLANK;
    else if (password.length < 6)
      currentErrors.password = ERRORS.GENERAL.PASSWORD_SHORT;
    else currentErrors.password = '';

    setErrors(prevErrors => ({ ...prevErrors, ...currentErrors }));

    return !Object.values(currentErrors).some(x => x !== '');
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filterInput()) {
      axios
        .post('/api/user/signup', input)
        .then((res: any) => {
          // Set State Here
          console.log(res.data);
          // setLoading(dispatch);
          /*dispatch({
                      type: STATE.SET_USER,
                      payload: parseUser(data.loginEmail)
                    });*/
          // clearLoading(dispatch);
          
          // Hash Response
          const userInfo: string = JSON.stringify(res.data);
          const userHash: string = CryptoJS.AES.encrypt(
            userInfo,
            CRYPTO_JS_SECRETS.USER_DATA
          ).toString();

          // Sets to LocalStorage
          localStorage.setItem(LOCALSTORAGE.USER, userHash);
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
            <TextEntry
              error={Boolean(errors.firstName)}
              onChange={e => setInput({ ...input, firstName: e.target.value })}
              helperText={errors.firstName}
              fullWidth={false}
              required={true}
              label={'First Name'}
            />
          </Box>
        </Grid>
        <Grid item sm>
          <Box width={1}>
            <TextEntry
              error={Boolean(errors.lastName)}
              onChange={e => setInput({ ...input, lastName: e.target.value })}
              helperText={errors.lastName}
              fullWidth={false}
              required={true}
              label={'Last Name'}
            />
          </Box>
        </Grid>
      </Grid>
      <TextEntry
        error={Boolean(errors.username)}
        onChange={e => setInput({ ...input, username: e.target.value })}
        helperText={errors.username}
        fullWidth={true}
        required={true}
        label={'Username'}
      />
      <TextEntry
        error={Boolean(errors.email)}
        onChange={e => setInput({ ...input, email: e.target.value })}
        helperText={errors.email}
        fullWidth={true}
        required={true}
        label={'Email'}
      />
      <Password
        error={Boolean(errors.password)}
        onChange={e => setInput({ ...input, password: e.target.value })}
        helperText={
          Boolean(errors.password)
            ? errors.password
            : 'Enter a password & be careful!'
        }
        fullWidth={true}
        required={true}
      />
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Sign Up
      </Button>
      <Grid container direction='row' justify='flex-end' alignItems='center'>
        <Grid item>
          <Box m={1}>
            <CustomLink
              onClick={() => dispatch({ type: STATE.SET_SIGNIN })}
              text={'Sign In'}
            />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={Boolean(open)}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#cc0000'
          }}
          message={<span id='client-snackbar'>{open}</span>}
        />
      </Snackbar>
    </form>
  );
};

export default SignUpForm;