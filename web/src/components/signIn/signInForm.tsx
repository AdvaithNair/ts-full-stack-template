import Box from '@material-ui/core/Box';
import React, { ChangeEvent, useState } from 'react';
import {Button, TextField, Grid, Link, Divider} from '@material-ui/core';
import Password from '../Password';
import TextEntry from "../TextEntry";


const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const getUsername = (event: { target: { value: any; }; }) => {
        const text = event.target.value;
        setUsername(text);
    };

    const getPassword = (event: { target: { value: any; }; }) => {
        const text = event.target.value;
        setPassword(text);
    };

    return(
        <form noValidate onSubmit={e => {return}}>
            <TextEntry onChange={getUsername} helperText={''} fullWidth={true} required={true} label={'Email'} />
            <Password error={false} onChange={getPassword} helperText={"Enter your password"} fullWidth={true} required={true} />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign In
            </Button>
            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid item>
                    <Box m={2}>
                    <Link href="/forgotPassword">
                        {"Forgot password?"}
                    </Link>
                    </Box>
                </Grid>
                <Grid item>
                    <Box m={2}>
                    <Link href="/signup">
                        {"Sign Up"}
                    </Link>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default SignInForm;
