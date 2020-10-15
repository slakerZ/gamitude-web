import React, { useState, MouseEvent } from "react";
import axios from "axios";
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
import {
    signInUrl,
    signInRequestBody,
} from "../../api/authentication/authentication.api";
import {
    signUpUrl,
    signUpRequestBody,
} from "../../api/authentication/authentication.api";
import FormikForm from "../../components/atoms/formik-form/formik-form.component";
import { AuthenticationType } from "./types";
import {
    SignUpValuesType,
    SignInValuesType,
} from "../../api/authentication/types";

const AuthenticationPage = ({ setUser }: AuthenticationType) => {
    const classes = useSignInUpStyles();

    const [isSignUp, setIsSignUp] = useState(false);

    const [signUpState, signUp] = useAsyncFn(
        async (values: SignUpValuesType) => {
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
        async (values: SignInValuesType) => {
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

    const handleSwitchSignUpIn = (event: MouseEvent) => {
        event.preventDefault();
        setIsSignUp(!isSignUp);
    };

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
                            onClick={handleSwitchSignUpIn}
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
});

export default connect(null, mapDispatchToProps)(AuthenticationPage);
