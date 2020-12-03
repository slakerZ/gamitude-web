import { Field, ErrorMessage } from "formik";

import React, { ReactElement } from "react";

import TextField from "@material-ui/core/TextField";

import useFormikFieldStyles from "./styles";
import { FormikFieldPropType } from "./types";

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
