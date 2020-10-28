import { ReduxStateType } from "../root.reducer";

export const selectFolders = (state: ReduxStateType) => state.folders.folders;
