import React, { FC } from "react";
import { Formik, Form } from "formik";
import Typography from "@material-ui/core/Typography";
import FormikField from "../../atoms/formik-field/formik-field.component";
import Button from "@material-ui/core/Button";
import { FormikFormType } from "./types";
import useFormikFormStyles from "./styles";
import Grid from "@material-ui/core/Grid";

const FormikForm: FC<FormikFormType> = ({
    title,
    initialValues,
    schema,
    onSubmit,
    fields,
    state,
}: FormikFormType) => {
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
                        <Typography
                            className={classes.header}
                            component="h1"
                            variant="h1"
                        >
                            {title}
                        </Typography>
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
                            {state.error ? "retry" : title}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormikForm;
