import React, { lazy, Suspense, FC, ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
// Components
import Navigation from "../components/organisms/navigation/navigation.component";
import LoadingScreen from "../components/atoms/loading-screen/loading-screen.component";
import ControlPanel from "../components/organisms/control-panel/control-panel.component";
// Pages
import HomePage from "../pages/home/home.page";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Lazy Loading
const ProjectsPage = lazy(() => import("../pages/projects/projects.page"));
const BulletJournalPage = lazy(() =>
    import("../pages/bullet-journal/bullet-journal.page"),
);
const SignInSignUpPage = lazy(() =>
    import("../pages/sign-in-sign-up/sign-in-sign-up.page"),
);
const ProfilePage = lazy(() => import("../pages/profile/profile.page"));

const Content: FC = (): ReactElement => {
    return (
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
    );
};

const App: FC = (): ReactElement => {
    const useStyles = makeStyles((theme) => ({
        app: {
            backgroundColor: theme.palette.primary.light,
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: 1,
        },
        container: {
            display: "flex",
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.app}>
            <div className={classes.container}>
                <Navigation />
                <Content />
                <ControlPanel />
            </div>
        </div>
    );
};

export default App;
