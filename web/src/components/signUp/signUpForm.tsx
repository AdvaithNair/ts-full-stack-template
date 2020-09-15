import Box from '@material-ui/core/Box';
import React, {useState} from 'react';
import {Button, Grid, Link} from '@material-ui/core';
import Password from '../Password';
import TextEntry from "../TextEntry";


const SignUpForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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

    const getFirstName = (event: { target: { value: any; }; }) => {
        const text = event.target.value;
        setFirstName(text);

    };

    const getLastName = (event: { target: { value: any; }; }) => {
        const text = event.target.value;
        setLastName(text);
    };
    return (
        <form noValidate onSubmit={e => {
            return
        }}>
            <Grid container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center">
                <Grid item sm>
                    <Box width={1}>
                        <TextEntry onChange={getFirstName} helperText={''} fullWidth={false} required={true}
                                   label={"First Name"}/>
                    </Box>
                </Grid>
                <Grid item sm>
                    <Box width={1}>
                        <TextEntry onChange={getLastName} helperText={''} fullWidth={false} required={true}
                                   label={"Last Name"}/>
                    </Box>
                </Grid>
            </Grid>
            <TextEntry onChange={getUsername} helperText={''} fullWidth={true} required={true} label={"Email"}/>
            <Password error={false} onChange={getPassword} helperText={"Enter a password & be careful!"}
                      fullWidth={true} required={true}/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Sign Up
            </Button>
            <Grid container
                  direction="row"
                  justify="flex-end"
                  alignItems="center">
                <Grid item>
                    <Box m={1}>
                        <Link href="/signin">
                            {"Sign In"}
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default SignUpForm;
