import Grid from '@material-ui/core/Grid';
import React, {ChangeEvent, useEffect, useState} from 'react';
import SignUpBox from "./signUpBox";


const SignUpContainer = () => {

    let mainWindow: any = window;

    useEffect(() => {
        mainWindow.bubbly({
            colorStart: "#5a0073",
            colorStop: "#000081",
            bubbleFunc: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`
        });
    });

    return(
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}>
            <SignUpBox />
        </Grid>
    )
};

export default SignUpContainer;