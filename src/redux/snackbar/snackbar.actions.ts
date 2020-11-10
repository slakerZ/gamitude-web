import { SnackbarActionTypes } from "./snackbar.types";

export const editMessage = (payload: any) => ({
    type: SnackbarActionTypes.EDIT_MESSAGE,
    payload: payload,
});

export const editSeverity = (payload: any) => ({
    type: SnackbarActionTypes.EDIT_SEVERITY,
    payload: payload,
});

export const setOpen = (payload: any) => ({
    type: SnackbarActionTypes.SET_OPEN,
    payload: payload,
});
