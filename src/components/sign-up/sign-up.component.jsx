import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
// Components
import SignUpForm from "../sign-up-form/sign-up-form.component.jsx";
import SignInUpImage from "../sign-in-up-image/sign-in-up-image.component.jsx";

const SignUp = ({ checked }) => {
    const useStyles = makeStyles({
        root: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "40vw 60vw",
        },
    });
    const classes = useStyles();

    return (
        <Fade in={checked}>
            <div className={classes.root}>
                <SignUpForm />
                <SignInUpImage signIn={false} />
            </div>
        </Fade>
    );
};

export default SignUp;
