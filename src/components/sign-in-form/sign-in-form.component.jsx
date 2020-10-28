import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useAsyncFn } from "react-use";
// API
import { url, request_body } from "../../api/sign-in-form.api";
// Actions
import { setUser } from "../../redux/user/user.actions";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Forms
import { Formik, Form } from "formik";
import { SignInSchema, initialValues, fields } from "./sign-in-schema";
// Components
import FormikField from "../formik-field/formik-field.component.jsx";
import SignInUpHeader from "../sign-in-up-header/sign-in-up-header.component.jsx";
import SignInUpSubmit from "../sign-in-up-submit/sign-in-up-submit.component.jsx";
import SignInUpSwitch from "../sign-in-up-switch/sign-in-up-switch.component.jsx";
import BackendFeedback from "../backend-feedback/backend-feedback.component.jsx";
import ProjectsRedirect from "../projects-redirect/projects-redirect.component.jsx";

const SignInForm = ({ setUser }) => {
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

    const [state, submit] = useAsyncFn(
        async values => {
            const response = await axios.post(url, request_body(values));
            const data = await response.data;
            setUser(data);
            return data;
        },
        [url]
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
                            <SignInUpHeader text="Sign In" />
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
                            <SignInUpSubmit
                                text="Sign In"
                                dirty={dirty}
                                isValid={isValid}
                                loading={state.loading}
                            />
                            <BackendFeedback
                                loading={state.loading}
                                error={state.error}
                                value={state.value}
                                errorMessage={"Failed to Login"}
                                successMessage={"Successfully Logged In"}
                            />
                            <ProjectsRedirect state={state} />
                        </Form>
                    );
                }}
            </Formik>
            <SignInUpSwitch toSignIn={false} />;
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(SignInForm);