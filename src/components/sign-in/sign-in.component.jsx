import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
// Components
import SignInForm from "../sign-in-form/sign-in-form.component.jsx";
import SignInUpImage from "../sign-in-up-image/sign-in-up-image.component.jsx";

const SignIn = ({ checked }) => {
    const useStyles = makeStyles({
        root: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "60vw 40vw",
        },
    });
    const classes = useStyles();

    return (
        <Fade in={checked}>
            <div className={classes.root}>
                <SignInUpImage signIn={true} />
                <SignInForm />
            </div>
        </Fade>
    );
};

export default SignIn;
