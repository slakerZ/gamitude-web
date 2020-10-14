import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";
import { Redirect } from "react-router-dom";
// API
import { url, request_body } from "../../../api/sign-in-form.api";
// Actions
import { setUser } from "../../../redux/user/user.actions";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// Forms
import { Formik, Form } from "formik";
import { SignInSchema, initialValues, fields } from "./sign-in-schema";
// Components
import FormikField from "../../atoms/formik-field/formik-field.component";
import BackendFeedback from "../../atoms/backend-feedback/backend-feedback.component";
import { useSignInUp } from "../../../context/sign-in-sign-up.context";

const SignInForm = ({ setUser }: { setUser: any }) => {
    const { isSignUp, setIsSignUp } = useSignInUp()!;

    const useStyles = makeStyles((theme) => ({
        root: {
            margin: theme.spacing(8, 4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        header: {
            fontWeight: "bolder",
            textAlign: "center",
            margin: theme.spacing(3, 3),
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            margin: theme.spacing(0, 10),
            display: "flex",
            flexDirection: "column",
        },
        submit: {
            margin: theme.spacing(2, 0),
        },
        link: {
            margin: theme.spacing(1, 1),
            cursor: "pointer",
        },
    }));
    const classes = useStyles();

    const [state, submit] = useAsyncFn(
        async (values: any) => {
            const response = await axios.post(url, request_body(values));
            const data = await response.data;
            setUser(data);
            return data;
        },
        [url],
    );

    return (
        <div className={classes.root}>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={SignInSchema}
            >
                {({ dirty, isValid }) => {
                    return (
                        <Form autoComplete="off" className={classes.form}>
                            <Typography
                                className={classes.header}
                                component="h1"
                                variant="h1"
                            >
                                {"Sign In"}
                            </Typography>
                            <FormikField
                                label={fields[0].label}
                                name={fields[0].name}
                                type={fields[0].type}
                            />
                            <FormikField
                                label={fields[1].label}
                                name={fields[1].name}
                                type={fields[1].type}
                            />
                            <Button
                                disabled={!isValid || !dirty || state.loading}
                                type="submit"
                                variant="outlined"
                                className={classes.submit}
                            >
                                {"Sign In"}
                            </Button>
                            <BackendFeedback
                                loading={state.loading}
                                error={state.error}
                                value={state.value}
                                errorMessage={"Failed to Login"}
                                successMessage={"Successfully Logged In"}
                            />
                            {state.value && !state.loading && !state.error ? (
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
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (user: any) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
