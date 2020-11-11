import React, { useState, MouseEvent, useEffect } from "react";
import { useAsyncFn } from "react-use";
import clsx from "clsx";
import Fade from "@material-ui/core/Fade";
import { Redirect } from "react-router-dom";
import useSignInUpStyles from "./styles";
import { FADE_TIMEOUT } from "./constants";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {
    SignUpSchema,
    signUpInitialValues,
    signUpFields,
} from "./sign-up-schema";
import { connect } from "react-redux";
import {
    SignInSchema,
    signInInitialValues,
    signInFields,
} from "./sign-in-schema";
import { setUser } from "../../redux/user/user.actions";
import FormikForm from "../../components/atoms/formik-form/formik-form.component";
import { AuthenticationType } from "./types";
import { postRegister } from "api/users/users.api";
import { RegisterRequestBodyType } from "api/users/types";
import { postLogin } from "api/authorization/authorization.api";
import { LoginRequestBodyType } from "api/authorization/types";
import {
    editMessage,
    editSeverity,
    setOpen as setSnackbarOpen,
} from "redux/snackbar/snackbar.actions";

const AuthenticationPage = ({
    setUser,
    editMessage,
    editSeverity,
    setSnackbarOpen,
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
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (signUpState.error && !signUpState.loading && !signUpState.value) {
            const msg = signUpState.error.message.includes("401")
                ? "Username or Email already taken"
                : "Failed to register";
            editSeverity("error");
            editMessage(msg);
            setSnackbarOpen(true);
        } else if (signUpState.value) {
            editSeverity("success");
            editMessage("Successfully registered");
            setSnackbarOpen(true);
            setIsSignUp(false);
        }
    }, [signUpState, editSeverity, editMessage, setSnackbarOpen]);

    useEffect(() => {
        if (signInState.error && !signInState.loading && !signInState.value) {
            const msg = "Failed to Log in";
            editSeverity("error");
            editMessage(msg);
            setSnackbarOpen(true);
        }
    }, [signInState, editSeverity, editMessage, setSnackbarOpen]);

    return (
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
    editMessage: (value: any) => dispatch(editMessage(value)),
    editSeverity: (value: any) => dispatch(editSeverity(value)),
    setSnackbarOpen: (value: any) => dispatch(setSnackbarOpen(value)),
});

export default connect(null, mapDispatchToProps)(AuthenticationPage);
