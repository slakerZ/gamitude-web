import clsx from "clsx";

import React, {
    lazy,
    Suspense,
    FC,
    ReactElement,
    useState,
    useEffect,
} from "react";
import { connect } from "react-redux";
import { Route, Switch, Link, Redirect, useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { ReduxStateType } from "redux/root.reducer";
import { setSessionType } from "redux/session/session.actions";
import { selectSessionType } from "redux/session/session.selectors";
import { setUser, setTooltipToggle } from "redux/user/user.actions";
import { selectToken, selectTooltipToggle } from "redux/user/user.selectors";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import LoadingScreen from "components/atoms/loading-screen/loading-screen.component";
import SessionTypeSwitch from "components/atoms/session-type-switch/session-type-switch.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import CustomSnackbar from "components/molecules/custom-snackbar/custom-snackbar.component";

import Methods from "components/organisms/methods/methods.component";
import Rank from "components/organisms/rank/rank.component";
import StatsAndEnergies from "components/organisms/stats-and-energies/stats-and-energies.component";
import Timer from "components/organisms/timer/timer.component";

import { NAV_LINKS } from "./constants";
import useAppStyles from "./styles";
import { AppType } from "./types";

const HomePage = lazy(() => import("pages/home/home.page"));
const ProjectsPage = lazy(() => import("pages/projects/projects.page"));
const BulletJournalPage = lazy(
    () => import("pages/bullet-journal/bullet-journal.page"),
);
const SignInSignUpPage = lazy(
    () => import("pages/authentication/authentication.page"),
);
const ProfilePage = lazy(() => import("pages/profile/profile.page"));
const ThemesPage = lazy(() => import("pages/themes/themes.page"));

const App: FC<AppType> = ({
    token,
    setUser,
    setTooltipToggle,
    tooltipToggle,
    setSessionType,
    sessionType,
}: AppType): ReactElement => {
    const classes = useAppStyles();
    const location = useLocation();

    const [navOpen, setNavOpen] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(false);

    const handleToggleNavOpen = () => {
        setNavOpen(!navOpen);
    };

    const logout = () => {
        setUser({
            token: null,
        });
    };

    const toggleTooltips = () => {
        setTooltipToggle({ tooltipToggle: !tooltipToggle });
    };

    useEffect(() => {
        if (!token) {
            setTokenExpired(true);
        } else {
            setTokenExpired(false);
        }
    }, [token]);

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: navOpen,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                        {token ? (
                            <IconButton onClick={handleToggleNavOpen}>
                                {navOpen ? (
                                    <ChevronLeftIcon />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </IconButton>
                        ) : null}
                    </div>

                    <div className={classes.center}>
                        <Link to="/" className={classes.title}>
                            <ToggleAbleTooltip target={"home"}>
                                <Typography variant="h3" component="h3">
                                    {"Gamitude"}
                                </Typography>
                            </ToggleAbleTooltip>
                        </Link>
                    </div>

                    <div className={classes.right}></div>
                </Toolbar>
            </AppBar>
            {token ? (
                <Drawer
                    aria-label="Gamitude left drawer navigation"
                    variant="permanent"
                    className={clsx(classes.navDrawer, {
                        [classes.navDrawerOpen]: navOpen,
                        [classes.navDrawerClose]: !navOpen,
                    })}
                    classes={{
                        paper: clsx(classes.navDrawerPaper, {
                            [classes.navDrawerOpen]: navOpen,
                            [classes.navDrawerClose]: !navOpen,
                        }),
                    }}
                >
                    <Toolbar />
                    <div className={classes.navigationLeft}>
                        <List>
                            {NAV_LINKS.map(({ to, label, icon, tooltip }) => (
                                <ListItem
                                    button
                                    key={to}
                                    component={Link}
                                    to={to}
                                >
                                    <ToggleAbleTooltip target={tooltip}>
                                        <ListItemIcon>
                                            <CustomIcon
                                                size="small"
                                                variant={icon}
                                            />
                                        </ListItemIcon>
                                    </ToggleAbleTooltip>
                                    <ListItemText primary={label} />
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            <ListItem button onClick={toggleTooltips}>
                                <ToggleAbleTooltip target={"tooltipToggle"}>
                                    <ListItemIcon>
                                        {tooltipToggle ? (
                                            <CustomIcon
                                                size="small"
                                                variant={"tooltip_checked"}
                                            />
                                        ) : (
                                            <CustomIcon
                                                size="small"
                                                variant={"tooltip_unchecked"}
                                            />
                                        )}
                                    </ListItemIcon>
                                </ToggleAbleTooltip>
                                <ListItemText primary={"Toggle Tooltips"} />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to={"/signInSignUp"}
                                onClick={logout}
                            >
                                <ToggleAbleTooltip target={"logout"}>
                                    <ListItemIcon>
                                        <CustomIcon
                                            size="small"
                                            variant={"logout"}
                                        />
                                    </ListItemIcon>
                                </ToggleAbleTooltip>
                                <ListItemText primary={"Logout"} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            ) : null}
            <Suspense fallback={<LoadingScreen />}>
                <div className={classes.content} aria-label="Gamitude Content">
                    <Toolbar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route
                            exact
                            path="/projects"
                            component={ProjectsPage}
                        />
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
                        <Route exact path="/themes" component={ThemesPage} />
                    </Switch>
                </div>
            </Suspense>
            {token && location.pathname !== "/" ? (
                <Drawer
                    aria-label="Control Panel"
                    className={classes.controlPanelDrawer}
                    variant="permanent"
                    classes={{
                        paper: classes.controlPanelDrawerPaper,
                    }}
                    anchor="right"
                >
                    <div className={classes.controlPanelBody}>
                        <Toolbar />
                        <Rank />
                        <Divider />
                        <StatsAndEnergies />
                        <Divider />
                        <ToggleAbleTooltip target="sessionTypeSwitch">
                            <SessionTypeSwitch
                                sessionType={sessionType}
                                setSessionType={setSessionType}
                            />
                        </ToggleAbleTooltip>
                        <Timer />
                        <Methods />
                    </div>
                </Drawer>
            ) : null}
            <CustomSnackbar />
            {tokenExpired ? <Redirect to="/signInSignUp" /> : null}
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    tooltipToggle: selectTooltipToggle(state),
    sessionType: selectSessionType(state),
});
const mapDispatchToProps = (dispatch: any) => ({
    setUser: (value: any) => dispatch(setUser(value)),
    setTooltipToggle: (value: any) => dispatch(setTooltipToggle(value)),
    setSessionType: (value: any) => dispatch(setSessionType(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
