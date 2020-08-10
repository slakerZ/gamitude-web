import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// Components
import Navigation from "../components/organisms/navigation/navigation.component";
import LoadingScreen from "../components/atoms/loading-screen/loading-screen.component";
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

const Content: React.FC = () => {
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

const App: React.FC = () => {
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
            <Navigation>
                <Content />
            </Navigation>
        </div>
    );
};

export default App;
