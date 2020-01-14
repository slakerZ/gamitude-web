import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
// Components
import SignIn from "../../components/signIn/sign-in.component.jsx";
import SignUp from "../../components/signUp/sign-up.component.jsx";

const SignInSignUpPage = () => {
    const useStyles = makeStyles({
        SignInSignUp: {
            width: "100vw",
            height: "87vh",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.SignInSignUp}>
            <SignUp />
            <SignIn />
        </div>
    );
};

export default SignInSignUpPage;
