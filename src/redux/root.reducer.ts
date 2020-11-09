import { combineReducers } from "redux";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import { persistReducer } from "redux-persist";
import projectsReducer from "./projects/projects.reducer";
import sessionReducer from "./session/session.reducer";
import statsReducer from "./stats/stats.reducer";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import foldersReducer from "./folders/folders.reducer";
import timersReducer from "./timers/timers.reducer";

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
    timers: timersReducer,
});

export type ReduxStateType = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
