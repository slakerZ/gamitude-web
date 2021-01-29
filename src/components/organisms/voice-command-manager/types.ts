import { SnackbarStateType } from "redux/snackbar/snackbar.types";

export interface VoiceCommandManagerPropTypes {
    setSnackbarState: (newState: SnackbarStateType) => null;
}
