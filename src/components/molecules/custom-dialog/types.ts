import { FolderType } from "api/folders/types";
import { TimerType } from "api/timers/types";

import { FieldType } from "components/atoms/formik-form/types";

export interface CustomDialogPropType {
    open: boolean;
    setOpen: any;
    title: string;
    onSubmit: any;
    children: any;
    handleCancel?: any;
}

export interface FolderSettingsPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getFoldersList: any;
    setSnackbarState: any;
    setFolders: any;
    folders: FolderType[];
}

export interface NewProjectDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getProjectsList: any;
    setSnackbarState: any;
}

export interface TimerSettingsDialogPropTypes {
    open: any;
    setOpen: any;
    token: any;
    getMethodsList: any;
    setSnackbarState: any;
    timers: TimerType[];
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
export interface FormikInfoType {
    name: any;
    initialValues: any;
    validationSchema: any;
    formFields: FieldType[];
}
