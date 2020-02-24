import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import navigationReducer from "./navigation/navigation.reducer";
import rankReducer from "./rank/rank.reducer";
import projectsReducer from "./projects/projects.reducer";
import uifxReducer from "./uifx/uijx.reducer";

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
    navigation: navigationReducer,
    rank: rankReducer,
    projects: projectsReducer,
    uifx: uifxReducer,
});

export default persistReducer(persistConfig, rootReducer);
