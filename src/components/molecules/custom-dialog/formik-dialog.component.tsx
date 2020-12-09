import { Form, Formik } from "formik";

import React, { ReactElement } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormikField from "../../atoms/formik-field/formik-field.component";
import { FieldType } from "../../atoms/formik-form/types";
import useCustomDialogStyles from "./styles";
import { FormikDialogPropTypes } from "./types";

const FormikDialog = ({
    open,
    setOpen,
    title,
    onSubmit,
    initialValues,
    validationSchema,
    formFields,
    children,
}: FormikDialogPropTypes): ReactElement => {
    const classes = useCustomDialogStyles();

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog
            className={classes.root}
            open={open}
            PaperProps={{ className: classes.rootPaper }}
            onClose={handleCancel}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ dirty, isValid, submitForm }) => {
                    return (
                        <div>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogContent>
                                <Form autoComplete="off">
                                    {formFields.map(
                                        (
                                            { label, name, type }: FieldType,
                                            index: number,
                                        ) => {
                                            return (
                                                <FormikField
                                                    key={index}
                                                    label={label}
                                                    name={name}
                                                    type={type}
                                                />
                                            );
                                        },
                                    )}
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant={"contained"}
                                    onClick={submitForm}
                                    disabled={!dirty || !isValid}
                                >
                                    {"SUBMIT"}
                                </Button>
                                <Button
                                    variant={"contained"}
                                    onClick={handleCancel}
                                >
                                    {"CANCEL"}
                                </Button>
                            </DialogActions>
                        </div>
                    );
                }}
            </Formik>
        </Dialog>
    );
};

export default FormikDialog;
