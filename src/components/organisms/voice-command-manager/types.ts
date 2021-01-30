import { SnackbarStateType } from "redux/snackbar/snackbar.types";

export interface VoiceCommandManagerPropTypes {
    setSnackbarState: (newState: SnackbarStateType) => null;
    setAddProjectDialogOpen: (isOpen: boolean) => null;
    setFoldersSettingsDialogOpen: (isOpen: boolean) => null;
    setTimerSettingsDialogOpen: (isOpen: boolean) => null;
    snackBarOpen: any;
    setSelectedFolderById: any;
    setSelectedProjectById: any;
    setSelectedTimerById: (newTimerId: string) => null;
}
