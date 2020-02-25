import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import rankReducer from "./rank/rank.reducer";
import projectsReducer from "./projects/projects.reducer";
import uifxReducer from "./uifx/uijx.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist:
        process.env.NODE_ENV === "development"
            ? []
            : ["projects", "stats", "energies"],
};

const rootReducer = combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
    rank: rankReducer,
    projects: projectsReducer,
    uifx: uifxReducer,
    user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
