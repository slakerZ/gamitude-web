import { FoldersActionTypes } from "./folders.types";

export const setFolders = (value: any) => ({
    type: FoldersActionTypes.SET_FOLDERS,
    payload: value,
});
