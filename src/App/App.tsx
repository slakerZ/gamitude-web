import React, { lazy, Suspense, FC, ReactElement, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import clsx from "clsx";
// Redux
import { connect } from "react-redux";
import { selectToken, selectTooltipToggle } from "../redux/user/user.selectors";
import { setUser, setTooltipToggle } from "../redux/user/user.actions";
import { selectSessionType } from "../redux/session/session.selectors";
import { ReduxStateType } from "..//redux/root.reducer";
import { setSessionType } from "..//redux/session/session.actions";

// MUI Core
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
// MUI Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "@material-ui/icons/Help";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
// Atoms
import CustomIcon from "../components/atoms/custom-icon/custom-icon.component";
import LoadingScreen from "../components/atoms/loading-screen/loading-screen.component";
import ToggleAbleTooltip from "../components/atoms/toggleable-tooltip/toggleable-tooltip.component";
// Molecules
import CustomSnackbar from "components/molecules/custom-snackbar/custom-snackbar.component";
// Organisms
import Rank from "../components/organisms/rank/rank.component";
import StatsAndEnergies from "../components/organisms/stats-and-energies/stats-and-energies.component";
import SessionTypeSwitch from "../components/atoms/session-type-switch/session-type-switch.component";
import Timer from "../components/organisms/timer/timer.component";
import Methods from "../components/organisms/methods/methods.component";
// Local
import useAppStyles from "./styles";
import { AppType } from "./types";
import { NAV_LINKS } from "./constants";
import { Toolbar } from "@material-ui/core";
// Lazy Loading
const HomePage = lazy(() => import("../pages/home/home.page"));
const ProjectsPage = lazy(() => import("../pages/projects/projects.page"));
const BulletJournalPage = lazy(
    () => import("../pages/bullet-journal/bullet-journal.page"),
);
const SignInSignUpPage = lazy(
    () => import("../pages/authentication/authentication.page"),
);
const ProfilePage = lazy(() => import("../pages/profile/profile.page"));

const App: FC<AppType> = ({
    token,
    setUser,
    setTooltipToggle,
    tooltipToggle,
    setSessionType,
    sessionType,
}: AppType): ReactElement => {
    const classes = useAppStyles();

    const [navOpen, setNavOpen] = useState(false);

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

                    <div className={classes.right}>
                        <ToggleAbleTooltip target={"tooltipToggle"}>
                            <IconButton onClick={toggleTooltips}>
                                {tooltipToggle ? (
                                    <HelpIcon />
                                ) : (
                                    <HelpOutlineIcon />
                                )}
                            </IconButton>
                        </ToggleAbleTooltip>
                        <ToggleAbleTooltip target={"profileSettings"}>
                            <IconButton component={Link} to={"/profile"}>
                                <SettingsIcon />
                            </IconButton>
                        </ToggleAbleTooltip>

                        <ToggleAbleTooltip target={"logout"}>
                            <IconButton
                                onClick={logout}
                                component={Link}
                                to={"/signInSignUp"}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </ToggleAbleTooltip>
                    </div>
                </Toolbar>
            </AppBar>
            {token ? (
                <Drawer
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
                    <List>
                        {NAV_LINKS.map(({ to, label, icon, tooltip }) => (
                            <ListItem button key={to} component={Link} to={to}>
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
                </Drawer>
            ) : null}
            <Suspense fallback={<LoadingScreen />}>
                <div className={classes.content}>
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
                    </Switch>
                </div>
            </Suspense>
            {token ? (
                <Drawer
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
