import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
// Components
import SignIn from "../../components/sign-in/sign-in.component.jsx";
import SignUp from "../../components/sign-up/sign-up.component.jsx";
// Context
import {
    SignInUpContext,
    SignInUpProvider,
} from "../../context/sign-in-sign-up.context";

const SignInSignUpPage = () => {
    const useStyles = makeStyles({
        root: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
        },
        switch: {
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 200,
        },
    });
    const classes = useStyles();

    return (
        <SignInUpProvider>
            <SignInUpContext.Consumer>
                {context => (
                    <div className={classes.SignInSignUp}>
                        <SignUp checked={!context.data} />
                        <SignIn checked={context.data} />
                    </div>
                )}
            </SignInUpContext.Consumer>
        </SignInUpProvider>
    );
};

export default SignInSignUpPage;
