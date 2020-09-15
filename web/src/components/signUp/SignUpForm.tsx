import Box from '@material-ui/core/Box';
import React, { useState, useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import Password from '../Password';
import TextEntry from '../TextEntry';
import {EMAIL_REGEX, ERRORS, ReducerContext} from '@app/common';
import { UserContext } from '../../context/context';
import STATE from '../../context/state';
import CustomLink from '../CustomLink';
import axios from "../../utils/axios";

interface SignUp {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    general?: string;
}

const SignUpForm = () => {
    const blankErrors: SignUp = {
        email: '',
        password: '',
        userName: '',
        firstName: '',
        lastName: '',
        general: ''
    };
    const [input, setInput] = useState<SignUp>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        userName: ''
    });

    const [errors, setErrors] = useState<SignUp>(blankErrors);
    const { dispatch } = useContext<ReducerContext>(UserContext);

    const filterInput = () => {
        const { email, password, firstName, lastName, userName } = input;
        const currentErrors: SignUp = blankErrors;

        //Username errors
        if (userName === '' || userName === undefined)
            currentErrors.userName = ERRORS.GENERAL.BLANK;
        else if (userName.length < 3)
            currentErrors.userName = ERRORS.SIGNUP.USERNAME_SHORT;
        else if (userName.length > 10)
            currentErrors.userName = ERRORS.SIGNUP.USERNAME_LONG;
        else currentErrors.userName = '';

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

        return {
            email: currentErrors.email,
            password: currentErrors.password,
            firstName: currentErrors.firstName,
            lastName: currentErrors.lastName,
            userName: currentErrors.userName,
            general: currentErrors.general
        };
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
                })
                .catch((error: Error) => {
                    console.log(error);
                    setErrors({ ...blankErrors, general: ERRORS.GENERAL.INVALID });
                });
        }
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
        >
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
                            helperText={''}
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
                            helperText={''}
                            fullWidth={false}
                            required={true}
                            label={'Last Name'}
                        />
                    </Box>
                </Grid>
            </Grid>
            <TextEntry
                error={Boolean(errors.userName)}
                onChange={e => setInput({ ...input, userName: e.target.value })}
                helperText={''}
                fullWidth={true}
                required={true}
                label={'Username'}
            />
            <TextEntry
                error={Boolean(errors.email)}
                onChange={e => setInput({ ...input, email: e.target.value })}
                helperText={''}
                fullWidth={true}
                required={true}
                label={'Email'}
            />
            <Password
                error={Boolean(errors.password)}
                onChange={e => setInput({ ...input, password: e.target.value })}
                helperText={'Enter a password & be careful!'}
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
        </form>
    );
};

export default SignUpForm;
