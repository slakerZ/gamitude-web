import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";

const SignUp = () => {
    const useStyles = makeStyles({
        signUp: {
            backgroundColor: "transparent",
            boxShadow: "5px 5px 10px #000000",
        },
    });
    const classes = useStyles();

    return <div className={classes.signUp}>Sign UP</div>;
};

export default SignUp;
