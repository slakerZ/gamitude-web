import { combineReducers } from "redux";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import navigationReducer from "./navigation/navigation.reducer";
import rankReducer from "./rank/rank.reducer";
import projectsReducer from "./projects/projects.reducer";
import authReducer from "../firebase/ducks/reducers";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
    navigation: navigationReducer,
    rank: rankReducer,
    projects: projectsReducer,
    auth: authReducer,
    firebase: firebaseReducer,
});
