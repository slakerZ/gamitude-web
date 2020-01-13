import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";

const SignIn = () => {
    const useStyles = makeStyles({
        signIn: {
            backgroundColor: "transparent",
            boxShadow: "5px 5px 10px #000000",
        },
    });
    const classes = useStyles();

    return <div className={classes.signIn}>Sign In</div>;
};

export default SignIn;
