import { createStore, applyMiddleware, compose } from "redux";
import { firebase } from "../firebase/index";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./root.reducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase }), logger),
        reactReduxFirebase(firebase, { attachAuthIsReady: true })
    )
);

export default store;
