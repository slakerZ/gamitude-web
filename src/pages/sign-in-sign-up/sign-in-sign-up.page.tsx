import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
// Components
import SignIn from "../../components/molecules/sign-in/sign-in.component";
import SignUp from "../../components/molecules/sign-up/sign-up.component";
// Context
import { SignInUpProvider } from "../../context/sign-in-sign-up.context";

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
            <div>
                <SignUp />
                <SignIn />
            </div>
        </SignInUpProvider>
    );

    return <div></div>;
};

export default SignInSignUpPage;
