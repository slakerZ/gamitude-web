import clsx from "clsx";

import React, { useState, MouseEvent, useEffect, Fragment } from "react";
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
import { postRegister, postResendEmailVerification } from "api/users/users.api";

import FormikForm from "components/atoms/formik-form/formik-form.component";

import FormikDialog from "components/molecules/custom-dialog/formik-dialog.component";

import { FADE_TIMEOUT } from "./constants";
import {
    ResendEmailFields,
    ResendEmailInitialValues,
    ResendEmailSchema,
} from "./resend-email.schema";
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
    const [isResendEmailDialogOpen, setIsResendEmailDialogOpen] = useState(
        false,
    );

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

    const [resendEmailState, resendEmail] = useAsyncFn(async (values) => {
        const response = await postResendEmailVerification(values.login);
        setSnackbarState({
            message: "Resended email",
            severity: "info",
            open: true,
            autoHideDuration: 3000,
        });
        setIsResendEmailDialogOpen(false);
        return response;
    });

    const handleSwitchSignUpIn = (event: MouseEvent) => {
        event.preventDefault();
        setIsSignUp(!isSignUp);
    };

    const handleResendEmail = () => {
        setIsResendEmailDialogOpen(true);
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
                message:
                    "Successfully registered - check your email to confirm account",
                severity: "info",
                open: true,
                autoHideDuration: null,
            });

            setIsSignUp(false);
        }
    }, [signUpState, setSnackbarState]);

    useEffect(() => {
        if (signInState.error && !signInState.loading && !signInState.value) {
            const err: any = { ...signInState.error };
            const status = err.response.status;
            const message = err.response.data.message;

            let msg = "";
            if (status === 403) {
                msg = "Verify your email first";
            } else if (message === "passwordWrongErrorMessage") {
                msg = "Wrong password";
            } else if (message === "noUserWithThatLogin") {
                msg = "Account does not exist";
            } else {
                msg = "Failed to log in";
            }

            setSnackbarState({
                message: msg,
                severity: "error",
                open: true,
                autoHideDuration: 2000,
            });
        }
    }, [signInState, setSnackbarState]);

    useEffect(() => {
        if (resendEmailState.error) {
            const err: any = { ...resendEmailState.error };
            const status = err.response.status;

            const snackbarMessage =
                status === 401
                    ? {
                          message: "Email already verified",
                          severity: "error",
                          open: true,
                          autoHideDuration: 3000,
                      }
                    : {
                          message: "Failed to resend email",
                          severity: "error",
                          open: true,
                          autoHideDuration: 3000,
                      };

            setSnackbarState(snackbarMessage);
        }
    }, [resendEmailState, setSnackbarState]);

    return (
        <Fragment>
            <Helmet>
                <title>{"Gamitude | Authentication"}</title>
            </Helmet>
            <FormikDialog
                open={isResendEmailDialogOpen}
                setOpen={setIsResendEmailDialogOpen}
                title={"Resend Email"}
                onSubmit={resendEmail}
                initialValues={ResendEmailInitialValues}
                validationSchema={ResendEmailSchema}
                formFields={ResendEmailFields}
            />
            <div className={classes.root}>
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
                                blurValidation={true}
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
                        <div
                            className={clsx(classes.image, classes.signUpImage)}
                        />
                    </div>
                </Fade>
                <Fade in={!isSignUp} timeout={FADE_TIMEOUT}>
                    <div
                        className={clsx(classes.signIn, {
                            [classes.none]: isSignUp,
                        })}
                    >
                        <div
                            className={clsx(classes.image, classes.signInImage)}
                        />
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
                            <Typography
                                className={classes.link}
                                variant="h6"
                                component={Link}
                                onClick={handleResendEmail}
                            >
                                {"Verify email didn't come?"}
                            </Typography>
                        </div>
                    </div>
                </Fade>
            </div>
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (user: any) => dispatch(setUser(user)),
    setSnackbarState: (value: any) => dispatch(setSnackbarState(value)),
});

export default connect(null, mapDispatchToProps)(AuthenticationPage);
