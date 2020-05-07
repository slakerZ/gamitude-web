import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import projectsReducer from "./projects/projects.reducer";
import uifxReducer from "./uifx/uijx.reducer";
import userReducer from "./user/user.reducer";
import sessionReducer from "./session/session.reducer";

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
    uifx: uifxReducer,
    user: userReducer,
    session: sessionReducer,
});

export default persistReducer(persistConfig, rootReducer);
