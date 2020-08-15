import React from "react";
// Components
import SignIn from "../../components/molecules/sign-in/sign-in.component";
import SignUp from "../../components/molecules/sign-up/sign-up.component";
// Context
import { SignInUpProvider } from "../../context/sign-in-sign-up.context";

const SignInSignUpPage = () => {
    return (
        <SignInUpProvider>
            <div>
                <SignUp />
                <SignIn />
            </div>
        </SignInUpProvider>
    );
};

export default SignInSignUpPage;
