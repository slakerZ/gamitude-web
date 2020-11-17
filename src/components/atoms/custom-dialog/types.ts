export interface CustomDialogPropType {
    open: boolean;
    setOpen: any;
    title: string;
    onSubmit: any;
    children: any;
}

export interface NewFolderDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getFoldersList: any;
    setSnackbarMessage: any;
    setSnackbarOpen: any;
    setSnackbarSeverity: any;
}

export interface NewProjectDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getProjectsList: any;
    setSnackbarMessage: any;
    setSnackbarOpen: any;
    setSnackbarSeverity: any;
}
