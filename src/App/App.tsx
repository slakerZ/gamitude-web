import React, { lazy, Suspense, FC, ReactElement, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import clsx from "clsx";
// Redux
import { connect } from "react-redux";
import { selectToken, selectTooltipToggle } from "../redux/user/user.selectors";
import { setUser, setTooltipToggle } from "../redux/user/user.actions";
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
import Tooltip from "@material-ui/core/Tooltip";
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
import CustomTooltipText from "../components/atoms/custom-tooltip-text/custom-tooltip-text.component";
// Organisms
import Rank from "../components/organisms/rank/rank.component";
import StatsAndEnergies from "../components/organisms/stats-and-energies/stats-and-energies.component";
import SessionManager from "../components/organisms/session-manager/session-manager.component";
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
                            <Tooltip
                                title={
                                    <CustomTooltipText
                                        target="home"
                                        variant="simple"
                                    />
                                }
                                disableFocusListener={!tooltipToggle}
                                disableHoverListener={!tooltipToggle}
                                disableTouchListener={!tooltipToggle}
                            >
                                <Typography variant="h3" component="h3">
                                    {"Gamitude"}
                                </Typography>
                            </Tooltip>
                        </Link>
                    </div>

                    <div className={classes.right}>
                        <Tooltip
                            title={
                                <CustomTooltipText
                                    target={"tooltipToggle"}
                                    variant="simple"
                                />
                            }
                        >
                            <IconButton onClick={toggleTooltips}>
                                {tooltipToggle ? (
                                    <HelpIcon />
                                ) : (
                                    <HelpOutlineIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <CustomTooltipText
                                    target="profileSettings"
                                    variant="simple"
                                />
                            }
                            disableFocusListener={!tooltipToggle}
                            disableHoverListener={!tooltipToggle}
                            disableTouchListener={!tooltipToggle}
                        >
                            <IconButton component={Link} to={"/profile"}>
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <Typography variant="h5" component="h5">
                                    {"Logout"}
                                </Typography>
                            }
                            disableFocusListener={!tooltipToggle}
                            disableHoverListener={!tooltipToggle}
                            disableTouchListener={!tooltipToggle}
                        >
                            <IconButton
                                onClick={logout}
                                component={Link}
                                to={"/signInSignUp"}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </Tooltip>
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
                                <Tooltip
                                    title={
                                        <CustomTooltipText
                                            target={tooltip}
                                            variant={"simple"}
                                        />
                                    }
                                    disableFocusListener={!tooltipToggle}
                                    disableHoverListener={!tooltipToggle}
                                    disableTouchListener={!tooltipToggle}
                                >
                                    <ListItemIcon>
                                        <CustomIcon
                                            size="small"
                                            variant={icon}
                                        />
                                    </ListItemIcon>
                                </Tooltip>
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
                        <SessionManager />
                        <Timer />
                        <Methods />
                    </div>
                </Drawer>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    tooltipToggle: selectTooltipToggle(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (value: any) => dispatch(setUser(value)),
    setTooltipToggle: (value: any) => dispatch(setTooltipToggle(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
