import Box from '@material-ui/core/Box';
import React, { useContext, useState } from 'react';
import { Button, Grid, Snackbar, SnackbarContent } from '@material-ui/core';
import Password from '../Password';
import TextEntry from '../TextEntry';
import {
  EMAIL_REGEX,
  ERRORS,
  ReducerContext,
  LOCALSTORAGE,
  CRYPTO_JS_SECRETS
} from '@app/common';
import { UserContext } from '../../context/context';
import STATE from '../../context/state';
import axios from '../../utils/axios';
import CustomLink from '../CustomLink';
import CryptoJS from 'crypto-js';
import { AxiosError, AxiosResponse } from 'axios';
import { setLoading, clearLoading } from '../../context/loading';

interface SignIn {
  email: string;
  password: string;
  general?: string;
}

const SignInForm = () => {
  const blankErrors: SignIn = {
    email: '',
    password: '',
    general: ''
  };
  const [input, setInput] = useState<SignIn>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<SignIn>(blankErrors);
  const [open, setOpen] = useState<string>('');
  const { dispatch } = useContext<ReducerContext>(UserContext);

  const filterInput = () => {
    console.log('Filtering input');
    const { email, password } = input;
    const currentErrors: SignIn = blankErrors;

    // Email Errors
    if (email === '' || email === undefined)
      currentErrors.email = ERRORS.GENERAL.BLANK;
    else if (!email.match(EMAIL_REGEX))
      currentErrors.email = ERRORS.GENERAL.EMAIL;
    else currentErrors.email = '';

    // Password Errors
    if (password === '' || password === undefined)
      currentErrors.password = ERRORS.GENERAL.BLANK;
    //else if (password.length < 6)
    //currentErrors.password = ERRORS.GENERAL.PASSWORD_SHORT;
    else currentErrors.password = '';

    setErrors(prevErrors => ({ ...prevErrors, ...currentErrors }));

    return !Object.values(currentErrors).some(x => x !== '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filterInput()) {
      axios
        .post('/api/user/signin', input)
        .then((res: AxiosResponse) => {
          // Sets User State
          setLoading(dispatch);
          dispatch({
            type: STATE.SET_USER,
            payload: res.data
          });
          clearLoading(dispatch);

          // Hash Response
          const userInfo: string = JSON.stringify(res.data);
          const userHash: string = CryptoJS.AES.encrypt(
            userInfo,
            CRYPTO_JS_SECRETS.USER_DATA
          ).toString();

          // Sets to LocalStorage
          localStorage.setItem(LOCALSTORAGE.USER, userHash);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          console.log(error.message);
          setErrors({ ...blankErrors, general: ERRORS.GENERAL.INVALID });
          // setOpen(error.response.data.error);
        });
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen('');
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
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
          Boolean(errors.password) ? errors.password : 'Enter your password'
        }
        fullWidth={true}
        required={true}
      />
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Sign In
      </Button>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <Box m={2}>
            <CustomLink text={'Forgot Password?'} />
          </Box>
        </Grid>
        <Grid item>
          <Box m={2}>
            <CustomLink
              onClick={() => dispatch({ type: STATE.SET_SIGNUP })}
              text={'Sign Up'}
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
        autoHideDuration={3000}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#cc0000',
            margin: 'auto'
          }}
          message={<span id='client-snackbar'>{open}</span>}
        />
      </Snackbar>
    </form>
  );
};

export default SignInForm;