import { FolderType } from "api/folders/types";

import { FoldersActionTypes } from "./folders.types";

export const addFolder = (value: FolderType) => ({
    type: FoldersActionTypes.ADD_FOLDER,
    payload: value,
});

export const setFolders = (value: any) => ({
    type: FoldersActionTypes.SET_FOLDERS,
    payload: value,
});
