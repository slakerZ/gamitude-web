import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./GamitudeApp/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import theme from "./customTheme";
import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
