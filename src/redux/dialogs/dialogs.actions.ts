import { DialogActionTypes } from "./dialogs.types";

export const setFoldersSettingsDialogOpen = (value: boolean) => ({
    type: DialogActionTypes.SET_FOLDERS_SETTINGS_DIALOG_OPEN,
    payload: value,
});

export const setAddProjectDialogOpen = (value: boolean) => ({
    type: DialogActionTypes.SET_ADD_PROJECT_DIALOG_OPEN,
    payload: value,
});

export const setTimerSettingsDialogOpen = (value: boolean) => ({
    type: DialogActionTypes.SET_TIMER_SETTINGS_DIALOG_OPEN,
    payload: value,
});
