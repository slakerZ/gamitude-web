import { FoldersActionTypes } from "./folders.types";

export const addFolder = (value: any) => ({
    type: FoldersActionTypes.ADD_FOLDER,
    payload: value,
});
