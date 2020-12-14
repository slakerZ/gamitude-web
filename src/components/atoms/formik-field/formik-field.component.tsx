import { Field, ErrorMessage } from "formik";

import React, { ReactElement, useState } from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import CustomIcon from "../custom-icon/custom-icon.component";
import useFormikFieldStyles from "./styles";
import { FormikFieldPropType } from "./types";

const FormikField = ({
    label,
    name,
    type,
    id,
    required = true,
    startAdornment = true,
    endAdornment = false,
    startIcon = "",
    endIcon = "",
}: FormikFieldPropType): ReactElement => {
    const classes = useFormikFieldStyles();

    const [passwordInputType, setPasswordInputType] = useState("password");

    const typeToIcon = (type: string) => {
        switch (type) {
            case "text":
                return <PersonIcon />;
            case "password":
                return <LockIcon />;
            case "email":
                return <EmailIcon />;
            default:
                return <PersonIcon />;
        }
    };

    const toggleInputType = () => {
        if (passwordInputType === "password") {
            setPasswordInputType("text");
        } else {
            setPasswordInputType("password");
        }
    };

    return (
        <div className={classes.root}>
            {type === "text" || type === "email" ? (
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
                    id={id}
                    InputProps={{
                        startAdornment: startAdornment ? (
                            <InputAdornment position="start">
                                {startIcon ? (
                                    <CustomIcon
                                        variant={startIcon}
                                        size="xsmall"
                                    />
                                ) : (
                                    typeToIcon(type)
                                )}
                            </InputAdornment>
                        ) : null,
                        endAdornment: endAdornment ? (
                            <InputAdornment position="end">
                                {endIcon !== "" ? (
                                    <CustomIcon
                                        variant={endIcon}
                                        size="xsmall"
                                    />
                                ) : (
                                    typeToIcon(type)
                                )}
                            </InputAdornment>
                        ) : null,
                    }}
                />
            ) : type === "password" ? (
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
                    type={passwordInputType}
                    variant="outlined"
                    id={id}
                    InputProps={{
                        startAdornment: startAdornment ? (
                            <InputAdornment position="start">
                                {startIcon ? (
                                    <CustomIcon
                                        variant={startIcon}
                                        size="xsmall"
                                    />
                                ) : (
                                    typeToIcon(type)
                                )}
                            </InputAdornment>
                        ) : null,
                        endAdornment: (
                            <InputAdornment
                                onClick={toggleInputType}
                                position="end"
                                className={classes.endAdornment}
                            >
                                {passwordInputType === "password" ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
            ) : (
                <Field />
            )}
        </div>
    );
};

export default FormikField;
