import { SnackbarStateType } from "redux/snackbar/snackbar.types";

import { FolderType } from "api/folders/types";
import { ProjectType } from "api/projects/types";
import { TimerType } from "api/timers/types";

export interface VoiceCommandManagerPropTypes {
    setSnackbarState: (newState: SnackbarStateType) => null;
    setAddProjectDialogOpen: (isOpen: boolean) => null;
    setFoldersSettingsDialogOpen: (isOpen: boolean) => null;
    setTimerSettingsDialogOpen: (isOpen: boolean) => null;
    snackBarOpen: any;
    setSelectedFolderById: any;
    setSelectedProjectById: any;
    setSelectedTimerById: (newTimerId: string) => null;
    projects: ProjectType[];
    timers: TimerType[];
    folders: FolderType[];
}
