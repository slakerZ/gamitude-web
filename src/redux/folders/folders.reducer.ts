import { FoldersActionTypes } from "./folders.types";

const INITIAL_STATE = {
    folders: [{ id: "" }],
    selectedFolder: {
        id: "",
    },
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
        case FoldersActionTypes.SET_SELECTED_FOLDER:
            return {
                ...state,
                selectedFolder: action.payload,
            };
        case FoldersActionTypes.SET_SELECTED_FOLDER_BY_ID:
            return {
                ...state,
                selectedFolder:
                    state.folders.find(
                        (folder) => folder.id === action.payload,
                    ) || state.selectedFolder,
            };
        default:
            return state;
    }
};

export default foldersReducer;
