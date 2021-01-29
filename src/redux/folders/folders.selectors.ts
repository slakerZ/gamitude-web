import { ReduxStateType } from "redux/root.reducer";

export const selectFolders = (state: ReduxStateType) => state.folders.folders;
export const selectSelectedFolder = (state: ReduxStateType) =>
    state.folders.selectedFolder;
