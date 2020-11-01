import { FoldersActionTypes } from "./folders.types";

const INITIAL_STATE = {
    folders: [
        {
            label: "ACTIVE",
            icon: "active",
            index: 0,
        },
        {
            label: "INACTIVE",
            icon: "paused",
            index: 1,
        },
        {
            label: "DONE",
            icon: "done",
            index: 2,
        },
    ],
};

const foldersReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
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
