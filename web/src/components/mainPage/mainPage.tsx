import Grid from '@material-ui/core/Grid';
import React, {ChangeEvent, useEffect, useState} from 'react';
import headerCropped from "../../utils/img/headerCropped.jpg";
import BasicAppBar from "../BasicAppBar";

const MainPage = () => {

    return(
        <div>
            <BasicAppBar buttonText={"Login"} route={"/signIn"} title={"INSERT TITLE HERE"}/>
        </div>
    )
};

export default MainPage;
