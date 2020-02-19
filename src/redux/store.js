import { createStore } from "redux";
import logger from "redux-logger";

import rootReducer from "./root.reducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = createStore(rootReducer);

export default store;
