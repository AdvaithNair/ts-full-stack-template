import Box from '@material-ui/core/Box';
import React, { useContext, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import Password from '../General/Entry/Password';
import TextEntry from '../General/Entry/TextEntry';
import { EMAIL_REGEX, ERRORS, ReducerContext, LOCALSTORAGE } from '@app/common';
import { UserContext } from '../../context/context';
import STATE from '../../context/state';
import axios from '../../utils/axios';
import CustomLink from '../General/Utility/CustomLink';
import { AxiosError, AxiosResponse } from 'axios';
import { setLoading, clearLoading } from '../../context/loading';
import CustomSnackbar from '../General/Utility/Snackbar';

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
        })
        .catch((error: AxiosError) => {
          console.log(error);
          setErrors({ ...blankErrors, general: ERRORS.GENERAL.INVALID });
          // setOpen(error.response.data.error);
        });
    }
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
            <CustomLink text={''} />
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
      <CustomSnackbar openStr={open}> </CustomSnackbar>
    </form>
  );
};

export default SignInForm;
