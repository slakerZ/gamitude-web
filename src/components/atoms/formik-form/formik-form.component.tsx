import { Formik, Form } from "formik";
import React, { FC } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import FormikField from "components/atoms/formik-field/formik-field.component";

import { FormikFormPropType } from "./types";

import useFormikFormStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const FormikForm: FC<FormikFormPropType> = ({
    title,
    initialValues,
    schema,
    onSubmit,
    fields,
    state,
}: FormikFormPropType) => {
    const classes = useFormikFormStyles();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
        >
            {({ dirty, isValid }) => {
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
