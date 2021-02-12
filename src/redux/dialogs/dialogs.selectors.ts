import { ReduxStateType } from "redux/root.reducer";

export const selectIsFolderSettingsDialogOpen = (state: ReduxStateType) =>
    state.dialogs.isFolderSettingsDialogOpen;
export const selectIsAddProjectDialogOpen = (state: ReduxStateType) =>
    state.dialogs.isAddProjectDialogOpen;
export const selectIsTimerSettingsDialogOpen = (state: ReduxStateType) =>
    state.dialogs.isTimerSettingsDialogOpen;
