import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// Formik
import { Field, ErrorMessage } from "formik";

const FormikField = ({
    required = true,
    label,
    name,
    type,
}: {
    required?: boolean;
    label: string;
    name: string;
    type: string;
}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(1.5, 0),
        },
        error: {
            position: "fixed",
            color: "red",
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Field
                required={required}
                autoComplete={`new-${label}`}
                as={TextField}
                label={label}
                fullWidth
                helperText={
                    <ErrorMessage
                        component="span"
                        className={classes.error}
                        name={name}
                    />
                }
                name={name}
                type={type}
                variant="outlined"
            />
        </div>
    );
};

export default FormikField;
