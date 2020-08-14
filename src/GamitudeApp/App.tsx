import React, { lazy, Suspense, FC, ReactElement } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { selectToken } from "../redux/user/user.selectors";
import Grid from "@material-ui/core/Grid";
// Components
import Navigation from "../components/organisms/navigation/navigation.component";
import LoadingScreen from "../components/atoms/loading-screen/loading-screen.component";
import ControlPanel from "../components/organisms/control-panel/control-panel.component";
// Local
import useAppStyles from "./styles";
import { AppType } from "./types";
// Lazy Loading
const HomePage = lazy(() => import("../pages/home/home.page"));
const ProjectsPage = lazy(() => import("../pages/projects/projects.page"));
const BulletJournalPage = lazy(() =>
    import("../pages/bullet-journal/bullet-journal.page"),
);
const SignInSignUpPage = lazy(() =>
    import("../pages/sign-in-sign-up/sign-in-sign-up.page"),
);
const ProfilePage = lazy(() => import("../pages/profile/profile.page"));

const PageRoutes: FC = (): ReactElement => {
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
const App: FC<AppType> = ({ token }: AppType): ReactElement => {
    const classes = useAppStyles();

    return (
        <div className={classes.app}>
            <div className={classes.container}>
                <Navigation />
                <Grid container>
                    <Grid item xs={9}>
                        <PageRoutes />
                    </Grid>
                    <Grid item xs={3}>
                        {token ? <ControlPanel /> : null}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(App);
