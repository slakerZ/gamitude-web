import { FoldersActionTypes } from "./folders.types";
import { FoldersReducerType } from "./types";

const INITIAL_STATE: FoldersReducerType = {
    folders: [],
};

const foldersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FoldersActionTypes.SET_FOLDERS:
            return {
                ...state,
                folders: action.payload,
            };
        case FoldersActionTypes.ADD_FOLDER:
            return {
                ...state,
                folders: [...state.folders, action.payload],
            };
        default:
            return state;
    }
};

export default foldersReducer;
