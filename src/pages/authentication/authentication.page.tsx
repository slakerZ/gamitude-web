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
import { ReduxStateType } from "../../redux/root.reducer";
import { postRegister } from "api/users/users.api";
import { postRegisterRequestBodyType } from "api/users/types";
import { postLogin } from "api/authorization/authorization.api";
import { postLoginRequestBodyType } from "api/authorization/types";
import CustomSnackBar from "components/atoms/custom-snackbar/custom-snackbar.component";
import { AlertProps } from "@material-ui/lab/Alert";

const AuthenticationPage = ({ setUser }: AuthenticationType) => {
    const classes = useSignInUpStyles();

    const [isSignUp, setIsSignUp] = useState(true);
    const [apiFeedbackOpen, setApiFeedbackOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertProps["severity"]>(undefined);
    const [message, setMessage] = useState("");

    const [signUpState, signUp] = useAsyncFn(
        async (postRegisterRequestBody: postRegisterRequestBodyType) => {
            const data = await postRegister(postRegisterRequestBody);
            return data;
        },
        [postRegister],
    );

    const [signInState, signIn] = useAsyncFn(
        async (postLoginRequestBody: postLoginRequestBodyType) => {
            const data = await postLogin(postLoginRequestBody);
            setUser(data.data);
            return data;
        },
        [postLogin],
    );

    const handleSwitchSignUpIn = (event: MouseEvent) => {
        event.preventDefault();
        setIsSignUp(!isSignUp);
        setApiFeedbackOpen(false);
    };

    useEffect(() => {
        if (signUpState.error && !signUpState.loading && !signUpState.value) {
            const msg = signUpState.error.message.includes("401")
                ? "Username or Email already taken"
                : "Failed to register";
            setSeverity("error");
            setMessage(msg);
            setApiFeedbackOpen(true);
        } else if (signUpState.value) {
            setSeverity("success");
            setMessage("Successfully registered");
            setApiFeedbackOpen(true);
            setIsSignUp(false);
        }
    }, [signUpState]);

    useEffect(() => {
        if (signInState.error && !signInState.loading && !signInState.value) {
            const msg = "Failed to Log in";
            setSeverity("error");
            setMessage(msg);
            setApiFeedbackOpen(true);
        }
    }, [signInState]);

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

            <CustomSnackBar
                open={apiFeedbackOpen}
                setOpen={setApiFeedbackOpen}
                severity={severity}
                message={message}
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (user: any) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(AuthenticationPage);
