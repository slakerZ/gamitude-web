import { combineReducers } from "redux";
// Reducers
import energiesReducer from "./energies/energies.reducer";
import statsReducer from "./stats/stats.reducer";
import navigationReducer from "./navigation/navigation.reducer";

export default combineReducers({
    energies: energiesReducer,
    stats: statsReducer,
    navigation: navigationReducer,
});
