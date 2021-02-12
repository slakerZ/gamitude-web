import { DialogActionTypes } from "./dialogs.types";

const INITIAL_STATE = {
    isFolderSettingsDialogOpen: false,
    isAddProjectDialogOpen: false,
    isTimerSettingsDialogOpen: false,
};

const dialogsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case DialogActionTypes.SET_ADD_PROJECT_DIALOG_OPEN:
            return {
                ...state,
                isAddProjectDialogOpen: action.payload,
            };
        case DialogActionTypes.SET_FOLDERS_SETTINGS_DIALOG_OPEN:
            return {
                ...state,
                isFolderSettingsDialogOpen: action.payload,
            };
        case DialogActionTypes.SET_TIMER_SETTINGS_DIALOG_OPEN:
            return {
                ...state,
                isTimerSettingsDialogOpen: action.payload,
            };
        default:
            return state;
    }
};

export default dialogsReducer;
