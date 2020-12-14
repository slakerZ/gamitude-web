import clsx from "clsx";

import React, { useState, MouseEvent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useAsyncFn } from "react-use";

import Fade from "@material-ui/core/Fade";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { setUser } from "redux/user/user.actions";

import { postLogin } from "api/authorization/authorization.api";
import { LoginRequestBodyType } from "api/authorization/types";
import { RegisterRequestBodyType } from "api/users/types";
import { postRegister } from "api/users/users.api";

import FormikForm from "components/atoms/formik-form/formik-form.component";

import { FADE_TIMEOUT } from "./constants";
import {
    SignInSchema,
    signInInitialValues,
    signInFields,
} from "./sign-in-schema";
import {
    SignUpSchema,
    signUpInitialValues,
    signUpFields,
} from "./sign-up-schema";
import useSignInUpStyles from "./styles";
import { AuthenticationType } from "./types";

const AuthenticationPage = ({
    setUser,
    setSnackbarState,
}: AuthenticationType) => {
    const classes = useSignInUpStyles();

    const [isSignUp, setIsSignUp] = useState(true);

    const [signUpState, signUp] = useAsyncFn(
        async (postRegisterRequestBody: RegisterRequestBodyType) => {
            const data = await postRegister(postRegisterRequestBody);
            return data;
        },
        [postRegister],
    );

    const [signInState, signIn] = useAsyncFn(
        async (postLoginRequestBody: LoginRequestBodyType) => {
            const data = await postLogin(postLoginRequestBody);
            setUser(data.data);
            return data;
        },
        [postLogin],
    );

    const handleSwitchSignUpIn = (event: MouseEvent) => {
        event.preventDefault();
        setIsSignUp(!isSignUp);
    };

    useEffect(() => {
        if (signUpState.error && !signUpState.loading && !signUpState.value) {
            const msg = signUpState.error.message.includes("401")
                ? "Username or Email already taken"
                : "Failed to register";
            setSnackbarState({
                message: msg,
                severity: "error",
                open: true,
                autoHideDuration: 2000,
            });
        } else if (signUpState.value) {
            setSnackbarState({
                message: "Successfully registered",
                severity: "success",
                open: true,
                autoHideDuration: 2000,
            });

            setIsSignUp(false);
        }
    }, [signUpState, setSnackbarState]);

    useEffect(() => {
        if (signInState.error && !signInState.loading && !signInState.value) {
            const msg = "Failed to Log in";
            setSnackbarState({
                message: msg,
                severity: "error",
                open: true,
                autoHideDuration: 2000,
            });
        }
    }, [signInState, setSnackbarState]);

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{"Gamitude | Authentication"}</title>
            </Helmet>
            <Fade in={isSignUp} timeout={FADE_TIMEOUT}>
                <div
                    className={clsx(classes.signUp, {
                        [classes.none]: !isSignUp,
                    })}
                >
                    <div className={classes.formWrapper}>
                        <FormikForm
                            initialValues={signUpInitialValues}
                            schema={SignUpSchema}
                            onSubmit={signUp}
                            fields={signUpFields}
                            title={"Sign Up"}
                            state={signUpState}
                        />
                        <Typography
                            className={classes.link}
                            variant="h6"
                            component={Link}
                            onClick={handleSwitchSignUpIn}
                        >
                            {"Already have an account?"}
                        </Typography>
                    </div>
                    <div className={clsx(classes.image, classes.signUpImage)} />
                </div>
            </Fade>
            <Fade in={!isSignUp} timeout={FADE_TIMEOUT}>
                <div
                    className={clsx(classes.signIn, {
                        [classes.none]: isSignUp,
                    })}
                >
                    <div className={clsx(classes.image, classes.signInImage)} />
                    <div className={classes.formWrapper}>
                        <FormikForm
                            initialValues={signInInitialValues}
                            schema={SignInSchema}
                            onSubmit={signIn}
                            fields={signInFields}
                            state={signInState}
                            title={"Sign In"}
                        />

                        {signInState.value &&
                        !signInState.loading &&
                        !signInState.error ? (
                            <Redirect to="/projects" />
                        ) : null}
                        <Typography
                            className={classes.link}
                            variant="h6"
                            component={Link}
                            onClick={handleSwitchSignUpIn}
                        >
                            {"Don't have an account?"}
                        </Typography>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (user: any) => dispatch(setUser(user)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(null, mapDispatchToProps)(AuthenticationPage);
