import { FieldType } from "components/atoms/formik-form/types";

export interface CustomDialogPropType {
    open: boolean;
    setOpen: any;
    title: string;
    onSubmit: any;
    children: any;
    handleCancel?: any;
}

export interface NewFolderDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getFoldersList: any;
    setSnackbarState: any;
}

export interface NewProjectDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getProjectsList: any;
    setSnackbarState: any;
}

export interface NewTimerDialogPropTypes {
    open: any;
    setOpen: any;
    token: any;
    getMethodsList: any;
    setSnackbarState: any;
}

export interface ConfirmationDialogType {
    open: any;
    setOpen: any;
    onSubmit: any;
    setSessionInProgress?: any;
}

export interface DialogActionType {
    onClick: () => null;
    buttonText: string;
}

export interface FormikDialogPropTypes {
    open: boolean;
    setOpen: any;
    title: string;
    initialValues: any;
    validationSchema: any;
    onSubmit: any;
    formFields: FieldType[];
    children: any;
}

export type NewTimerVariantTypes =
    | "STOPWATCH"
    | "COUNTDOWN_STATIC"
    | "COUNTDOWN_DYNAMIC";

export interface NewTimerVariantObject {
    STOPWATCH: NewTimerVariantTypes;
    COUNTDOWN_STATIC: NewTimerVariantTypes;
    COUNTDOWN_DYNAMIC: NewTimerVariantTypes;
}

export interface FormikInfoType {
    name: NewTimerVariantTypes;
    initialValues: any;
    validationSchema: any;
    formFields: FieldType[];
}

export interface FormikInfoActionType {
    type: NewTimerVariantTypes;
}
