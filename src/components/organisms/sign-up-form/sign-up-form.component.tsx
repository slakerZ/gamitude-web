import React from "react";
import axios from "axios";
import { useAsyncFn } from "react-use";
// Context
import { useSignInUp } from "../../../context/sign-in-sign-up.context";
// API
import { url, request_body } from "../../../api/sign-up.api";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// Forms
import { Formik, Form } from "formik";
import { SignUpSchema, initialValues, fields } from "./sign-up-schema";
// Components
import FormikField from "../../atoms/formik-field/formik-field.component";
import BackendFeedback from "../../atoms/backend-feedback/backend-feedback.component";

const SignUpForm = () => {
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
    const { isSignUp, setIsSignUp } = useSignInUp()!;

    const [state, submit] = useAsyncFn(
        async (values: any) => {
            const response = await axios.post(url, request_body(values));
            const data = await response.data;
            setIsSignUp(true);
            return data;
        },
        [url],
    );

    return (
        <div className={classes.root}>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={SignUpSchema}
            >
                {({ dirty, isValid }) => {
                    return (
                        <Form autoComplete="off" className={classes.form}>
                            <Typography
                                className={classes.header}
                                component="h1"
                                variant="h1"
                            >
                                {"Sign Up"}
                            </Typography>
                            <Grid container spacing={2}>
                                {fields.map(
                                    ({ label, name, type, xs, sm }, index) => {
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
                                disabled={!isValid || !dirty || state.loading}
                                type="submit"
                                variant="outlined"
                                className={classes.submit}
                            >
                                {"Sign Up"}
                            </Button>
                            <BackendFeedback
                                loading={state.loading}
                                error={state.error}
                                value={state.value}
                                errorMessage={"Failed to Register"}
                                successMessage={"Successfully Registered"}
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
    );
};

export default SignUpForm;
