import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// Components
import Navigation from "./components/navigation/navigation.component.jsx";
import LoadingScreen from "./components/loading-screen/loading-screen.component.jsx";
import CustomParticles from "./components/custom-particles/custom-particles.component.jsx";
// Pages
import HomePage from "./pages/home/home.page.jsx";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
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
    });
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <CustomParticles />
            <Navigation />

            <Suspense fallback={<LoadingScreen />}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/projects" component={ProjectsPage} />
                    <Route
                        exact
                        path="/bulletJournal"
                        component={BulletJournalPage}
                    />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route
                        exact
                        path="/signInSignUp"
                        component={SignInSignUpPage}
                    />
                </Switch>
            </Suspense>
        </div>
    );
};

export default App;
