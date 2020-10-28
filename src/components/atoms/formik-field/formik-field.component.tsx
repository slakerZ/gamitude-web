import React, { ReactElement } from "react";
// UI Core
import TextField from "@material-ui/core/TextField";
// Formik
import { Field, ErrorMessage } from "formik";
import { FormikFieldPropType } from "./types";
import useFormikFieldStyles from "./styles";

const FormikField = ({
    required = true,
    label,
    name,
    type,
}: FormikFieldPropType): ReactElement => {
    const classes = useFormikFieldStyles();

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
