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
            setIsSignUp(true);
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
                        <Formik
                            initialValues={signUpInitialValues}
                            onSubmit={signUp}
                            validationSchema={SignUpSchema}
                        >
                            {({ dirty, isValid }) => {
                                return (
                                    <Form
                                        autoComplete="off"
                                        className={classes.form}
                                    >
                                        <Typography
                                            className={classes.header}
                                            component="h1"
                                            variant="h1"
                                        >
                                            {"Sign Up"}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {signUpFields.map(
                                                (
                                                    {
                                                        label,
                                                        name,
                                                        type,
                                                        xs,
                                                        sm,
                                                    },
                                                    index,
                                                ) => {
                                                    return (
                                                        <Grid
                                                            item
                                                            xs={xs}
                                                            sm={sm}
                                                            key={index}
                                                        >
                                                            <FormikField
                                                                label={label}
                                                                name={name}
                                                                type={type}
                                                            />
                                                        </Grid>
                                                    );
                                                },
                                            )}
                                        </Grid>
                                        <Button
                                            disabled={
                                                !isValid ||
                                                !dirty ||
                                                signUpState.loading
                                            }
                                            type="submit"
                                            variant="outlined"
                                            className={classes.submit}
                                        >
                                            {"Sign Up"}
                                        </Button>
                                        <BackendFeedback
                                            loading={signUpState.loading}
                                            error={signUpState.error}
                                            value={signUpState.value}
                                            errorMessage={"Failed to Register"}
                                            successMessage={
                                                "Successfully Registered"
                                            }
                                        />
                                    </Form>
                                );
                            }}
                        </Formik>
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
                        <Formik
                            initialValues={signInInitialValues}
                            onSubmit={signIn}
                            validationSchema={SignInSchema}
                        >
                            {({ dirty, isValid }) => {
                                return (
                                    <Form
                                        autoComplete="off"
                                        className={classes.form}
                                    >
                                        <Typography
                                            className={classes.header}
                                            component="h1"
                                            variant="h1"
                                        >
                                            {"Sign In"}
                                        </Typography>
                                        {signInFields.map(
                                            ({ label, name, type }, index) => {
                                                return (
                                                    <FormikField
                                                        key={index}
                                                        label={label}
                                                        name={name}
                                                        type={type}
                                                    />
                                                );
                                            },
                                        )}

                                        <Button
                                            disabled={
                                                !isValid ||
                                                !dirty ||
                                                signInState.loading
                                            }
                                            type="submit"
                                            variant="outlined"
                                            className={classes.submit}
                                        >
                                            {"Sign In"}
                                        </Button>
                                        <BackendFeedback
                                            loading={signInState.loading}
                                            error={signInState.error}
                                            value={signInState.value}
                                            errorMessage={"Failed to Login"}
                                            successMessage={
                                                "Successfully Logged In"
                                            }
                                        />
                                        {signInState.value &&
                                        !signInState.loading &&
                                        !signInState.error ? (
                                            <Redirect to="/projects" />
                                        ) : null}
                                    </Form>
                                );
                            }}
                        </Formik>
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
