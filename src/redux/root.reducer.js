import { combineReducers } from "redux";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import navigationReducer from "./navigation/navigation.reducer";
import rankReducer from "./rank/rank.reducer";
import projectsReducer from "./projects/projects.reducer";

export default combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
    navigation: navigationReducer,
    rank: rankReducer,
    projects: projectsReducer,
});
