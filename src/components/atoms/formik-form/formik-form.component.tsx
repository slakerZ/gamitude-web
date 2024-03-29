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
    blurValidation = false,
}: FormikFormPropType) => {
    const classes = useFormikFormStyles();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
            enableReinitialize={enableReinitialize}
            validateOnBlur={blurValidation}
            validateOnChange={!blurValidation}
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
                        <Grid container spacing={1}>
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
                            type="submit"
                            size="large"
                        >
                            {state.error ? (
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    color={isValid ? "primary" : "secondary"}
                                >
                                    {"RETRY"}
                                </Typography>
                            ) : state.loading ? (
                                <CircularProgress />
                            ) : title ? (
                                <Typography
                                    variant="h5"
                                    component="h5"
                                    color={
                                        isValid && dirty
                                            ? "primary"
                                            : "secondary"
                                    }
                                >
                                    {title}
                                </Typography>
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
