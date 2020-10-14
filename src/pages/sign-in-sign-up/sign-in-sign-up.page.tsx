import React from "react";
// Components
import SignUp from "../../components/molecules/sign-up/sign-up.component";
// Context
import { SignInUpProvider } from "../../context/sign-in-sign-up.context";
import useSignInUpStyles from "./styles";

const SignInSignUpPage = () => {
    const classes = useSignInUpStyles();

    return (
        <div className={classes.root}>
            <SignInUpProvider>
                <SignUp />
            </SignInUpProvider>
        </div>
    );
};

export default SignInSignUpPage;
