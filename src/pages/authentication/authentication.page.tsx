import React, { useState } from "react";
import axios from "axios";
import { useAsyncFn } from "react-use";
import clsx from "clsx";
import Fade from "@material-ui/core/Fade";
import { Redirect } from "react-router-dom";
import useSignInUpStyles from "./styles";
import { FADE_TIMEOUT } from "./constants";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import {
    SignUpSchema,
    signUpInitialValues,
    signUpFields,
} from "./sign-up-schema";
import FormikField from "../../components/atoms/formik-field/formik-field.component";
import BackendFeedback from "../../components/atoms/backend-feedback/backend-feedback.component";
import { connect } from "react-redux";
import {
    SignInSchema,
    signInInitialValues,
    signInFields,
} from "./sign-in-schema";
import { setUser } from "../../redux/user/user.actions";
import { signInUrl, signInRequestBody } from "./sign-in-form.api";
import { signUpUrl, signUpRequestBody } from "./sign-up.api";
import FormikForm from "../../components/atoms/formik-form/formik-form.component";

const AuthenticationPage = ({ setUser }: { setUser: any }) => {
    const classes = useSignInUpStyles();

    const [isSignUp, setIsSignUp] = useState(false);

    const [signUpState, signUp] = useAsyncFn(
        async (values: any) => {
            const response = await axios.post(
                signUpUrl,
                signUpRequestBody(values),
            );
            const data = await response.data;
            setIsSignUp(!isSignUp);
            return data;
        },
        [signUpUrl],
    );

    const [signInState, signIn] = useAsyncFn(
        async (values: any) => {
            const response = await axios.post(
                signInUrl,
                signInRequestBody(values),
            );
            const data = await response.data;
            setUser(data);
            return data;
        },
        [signInUrl],
    );

    return (
        <div className={classes.root}>
            <Fade in={!isSignUp} timeout={FADE_TIMEOUT}>
                <div
                    className={clsx(classes.signUp, {
                        [classes.none]: isSignUp,
                    })}
                >
                    <div className={classes.formWrapper}>
                        <FormikForm
                            initialValues={signUpInitialValues}
                            schema={SignUpSchema}
                            onSubmit={signUp}
                            fields={signUpFields}
                            state={signUpState}
                            title={"Sign Up"}
                        />
                        <Typography
                            className={classes.link}
                            variant="h6"
                            component={Link}
                            onClick={(event: any) => {
                                event.preventDefault();
                                setIsSignUp(!isSignUp);
                            }}
                        >
                            {"Already have an account?"}
                        </Typography>
                    </div>
                    <div className={clsx(classes.image, classes.signUpImage)} />
                </div>
            </Fade>
            <Fade in={isSignUp} timeout={FADE_TIMEOUT}>
                <div
                    className={clsx(classes.signIn, {
                        [classes.none]: !isSignUp,
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
                            onClick={(event: any) => {
                                event.preventDefault();
                                setIsSignUp(!isSignUp);
                            }}
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
});

export default connect(null, mapDispatchToProps)(AuthenticationPage);
