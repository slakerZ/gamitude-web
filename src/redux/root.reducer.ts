import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import pagesReducer from "./bulletPages/pages.reducer";
import energiesReducer from "./energies/energies.reducer";
import foldersReducer from "./folders/folders.reducer";
import journalsReducer from "./journals/journals.reducer";
import projectTasksReducer from "./projectTasks/projectTasks.reducer";
import projectsReducer from "./projects/projects.reducer";
import sessionReducer from "./session/session.reducer";
import snackbarReducer from "./snackbar/snackbar.reducer";
import statsReducer from "./stats/stats.reducer";
import timersReducer from "./timers/timers.reducer";
import userReducer from "./user/user.reducer";

// Reducers

const persistConfig = {
    key: "root",
    storage,
    whitelist:
        process.env.NODE_ENV === "development"
            ? ["user"]
            : ["user", "projects", "stats", "energies"],
};

const rootReducer = combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
    projects: projectsReducer,
    user: userReducer,
    session: sessionReducer,
    folders: foldersReducer,
    journals: journalsReducer,
    pages: pagesReducer,
    projectTasks: projectTasksReducer,
    timers: timersReducer,
    snackbar: snackbarReducer,
});

export type ReduxStateType = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
