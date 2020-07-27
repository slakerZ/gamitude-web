import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
// Components
import SignIn from "../../components/molecules/sign-in/sign-in.component";
import SignUp from "../../components/molecules/sign-up/sign-up.component";
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
    /*
    return (
        <SignInUpProvider>
            <SignInUpContext.Consumer>
                {(context) => (
                    <div className={classes.SignInSignUp}>
                        <SignUp checked={!context.data} />
                        <SignIn checked={context.data} />
                    </div>
                )}
            </SignInUpContext.Consumer>
        </SignInUpProvider>
    );
    */
    return <div></div>;
};

export default SignInSignUpPage;
