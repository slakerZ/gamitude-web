import { Formik, Form } from "formik";

import React, { FC } from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import FormikField from "components/atoms/formik-field/formik-field.component";

import useFormikFormStyles from "./styles";
import { FormikFormPropType } from "./types";

const FormikForm: FC<FormikFormPropType> = ({
    title,
    initialValues,
    schema,
    onSubmit,
    fields,
    state,
    enableReinitialize = false,
}: FormikFormPropType) => {
    const classes = useFormikFormStyles();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
            enableReinitialize={enableReinitialize}
        >
            {({ dirty, isValid, submitForm }) => {
                return (
                    <Form autoComplete="off" className={classes.form}>
                        {title ? (
                            <Typography
                                className={classes.header}
                                component="h1"
                                variant="h1"
                            >
                                {title}
                            </Typography>
                        ) : null}
                        <Grid container spacing={2}>
                            {fields.map(
                                ({ label, name, type, sm, xs }, index) => {
                                    return (
                                        <Grid item xs={xs} sm={sm} key={index}>
                                            <FormikField
                                                label={label}
                                                name={name}
                                                type={type}
                                                id={`${name}-${index}`}
                                            />
                                        </Grid>
                                    );
                                },
                            )}
                        </Grid>
                        <Button
                            disabled={!isValid || !dirty || state.loading}
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={submitForm}
                        >
                            {state.error ? (
                                "RETRY"
                            ) : state.loading ? (
                                <CircularProgress />
                            ) : title ? (
                                title
                            ) : (
                                "SUBMIT"
                            )}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormikForm;
