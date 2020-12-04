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

export interface NewJournalDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getJournalsList: any;
    setSnackbarState: any;
}

export interface NewPageDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getPagesList: any;
    setSnackbarState: any;
    journalId: string;
}
