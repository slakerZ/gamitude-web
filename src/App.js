import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Particles from "react-particles-js";
// Components
import Navigation from "./components/navigation/navigation.component.jsx";
// Pages
import HomePage from "./pages/home/home.page.jsx";
// Styles
import theme from "./customTheme.js";
// Config
import particleOptions from "./particlesjs-config.json";
// UI Core
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// UI Lab
import Skeleton from "@material-ui/lab/Skeleton";
// Lazy Loading
const ProjectsPage = lazy(() => import("./pages/projects/projects.page.jsx"));
const BulletJournalPage = lazy(() =>
    import("./pages/bullet-journal/bullet-journal.page.jsx")
);
const SignInSignUpPage = lazy(() =>
    import("./pages/signInSignUp/sign-in-sign-up.page.jsx")
);
const ProfilePage = lazy(() => import("./pages/profile/profile.page.jsx"));

const App = () => {
    const useStyles = makeStyles({
        app: {
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: 1,
        },
        skeleton: {
            width: "100vw",
            height: "80vh",
        },
        particles: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            backgroundImage:
                "radial-gradient(circle,rgba(128, 105, 133, 0.6),rgba(116, 55, 129, 0.6),rgba(49, 0, 59, 0.6))",
        },
    });
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.app}>
                <Particles
                    params={particleOptions}
                    className={classes.particles}
                />
                <Navigation />

                <Suspense
                    fallback={
                        <Skeleton variant="rect" className={classes.skeleton} />
                    }
                >
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/projects" component={ProjectsPage} />
                        <Route
                            path="/bulletJournal"
                            component={BulletJournalPage}
                        />
                        <Route path="/profile" component={ProfilePage} />
                        <Route
                            path="/signInSignUp"
                            component={SignInSignUpPage}
                        />
                    </Switch>
                </Suspense>
            </div>
        </ThemeProvider>
    );
};

export default App;
