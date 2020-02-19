import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import navigationReducer from "./navigation/navigation.reducer";
import rankReducer from "./rank/rank.reducer";
import projectsReducer from "./projects/projects.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["projects"],
};

const rootReducer = combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
    navigation: navigationReducer,
    rank: rankReducer,
    projects: projectsReducer,
});

export default persistReducer(persistConfig, rootReducer);
