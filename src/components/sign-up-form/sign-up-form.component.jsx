import React from "react";
import axios from "axios";
import { useAsyncFn } from "react-use";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Forms
import { Formik, Form } from "formik";
import { SignUpSchema, initialValues, fields } from "./sign-up-schema";
// Components
import FormikField from "../formik-field/formik-field.component.jsx";
import SignInUpHeader from "../sign-in-up-header/sign-in-up-header.component.jsx";
import SignInUpSubmit from "../sign-in-up-submit/sign-in-up-submit.component.jsx";
import SignInUpGroup from "../sign-in-up-group/sign-in-up-group.component.jsx";
import SignInUpSwitch from "../sign-in-up-switch/sign-in-up-switch.component.jsx";
import BackendFeedback from "../backend-feedback/backend-feedback.component.jsx";

const SignUpForm = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            margin: theme.spacing(8, 4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            margin: theme.spacing(0, 10),
            display: "flex",
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    const url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5020/api/auth/Authorization/Register"
            : "http://gamitude.rocks:31777/api/auth/Authorization/Register";
    const [state, submit] = useAsyncFn(
        async values => {
            const response = await axios.post(url, {
                Name: values.username,
                Email: values.email,
                Password: values.password,
            });
            const data = await response.data;
            return data;
        },
        [url]
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
                            <SignInUpHeader text="Sign Up" />
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
                            <SignInUpGroup
                                field1={fields[2]}
                                field2={fields[3]}
                            />
                            <SignInUpSubmit
                                text="Sign Up"
                                isValid={isValid}
                                dirty={dirty}
                                loading={state.loading}
                            />
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
            <SignInUpSwitch toSignIn={true} />;
        </div>
    );
};

export default SignUpForm;
