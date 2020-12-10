import clsx from "clsx";

import React, {
    lazy,
    Suspense,
    FC,
    ReactElement,
    useState,
    useEffect,
    useCallback,
} from "react";
import { connect } from "react-redux";
import {
    Route,
    Switch,
    Link,
    Redirect,
    useLocation,
    useHistory,
} from "react-router-dom";
import { useUpdateEffect } from "react-use";

import { Button } from "@material-ui/core";
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
import {
    selectIsBreak,
    selectSessionInProgress,
    selectSessionType,
} from "redux/session/session.selectors";
import { setUser, setTooltipToggle } from "redux/user/user.actions";
import {
    selectToken,
    selectTooltipToggle,
    selectDateExpires,
} from "redux/user/user.selectors";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import LoadingScreen from "components/atoms/loading-screen/loading-screen.component";
import SessionTypeSwitch from "components/atoms/session-type-switch/session-type-switch.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import CustomSnackbar from "components/molecules/custom-snackbar/custom-snackbar.component";

import Rank from "components/organisms/rank/rank.component";
import StatsAndEnergies from "components/organisms/stats-and-energies/stats-and-energies.component";
import Timer from "components/organisms/timer/timer.component";
import TimerList from "components/organisms/timers-list/timers-list.component";

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
    dateExpires,
    sessionInProgress,
    isBreak,
}: AppType): ReactElement => {
    const classes = useAppStyles();
    const location = useLocation();
    const router = useHistory();
    const isHomePage = location.pathname === "/";

    const [navOpen, setNavOpen] = useState(false);
    const [shouldRedirectToSignInUp, setShouldRedirectToSignInUp] = useState(
        false,
    );

    const handleToggleNavOpen = () => {
        setNavOpen(!navOpen);
    };

    const logout = useCallback(() => {
        setUser({
            token: null,
        });
    }, [setUser]);

    const toggleTooltips = () => {
        setTooltipToggle({ tooltipToggle: !tooltipToggle });
    };

    const handleGetStarted = () => {
        if (!token) {
            setShouldRedirectToSignInUp(true);
        } else {
            router.push("/projects");
        }
    };

    useEffect(() => {
        const expires = new Date(dateExpires).getTime();
        if (expires < Date.now()) {
            setShouldRedirectToSignInUp(true);
            logout();
        } else {
            setShouldRedirectToSignInUp(false);
        }
    }, [dateExpires, logout]);

    useUpdateEffect(() => {
        if (isBreak || sessionInProgress) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = null;
        }
    });

    return (
        <div className={clsx({ [classes.rootFlex]: !isHomePage })}>
            <AppBar
                position="fixed"
                className={clsx({
                    [classes.appBarShift]: navOpen && !isHomePage,
                    [classes.appBarTransparent]: isHomePage,
                    [classes.appBar]: !isHomePage,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                        {token ? (
                            <IconButton
                                onClick={handleToggleNavOpen}
                                aria-label="Toggle between full navigation an mini variant"
                            >
                                {navOpen ? (
                                    <ChevronLeftIcon />
                                ) : (
                                    <ChevronRightIcon />
                                )}
                            </IconButton>
                        ) : null}
                    </div>

                    <div className={classes.center}>
                        <ToggleAbleTooltip
                            target={"home"}
                            placement="bottom-end"
                        >
                            <Link to="/" className={classes.title}>
                                <Typography variant="h3" component="h3">
                                    {"Gamitude"}
                                </Typography>
                            </Link>
                        </ToggleAbleTooltip>
                    </div>

                    <div className={classes.right}>
                        {isHomePage && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleGetStarted}
                            >
                                {"Get Started!"}
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                aria-label="Gamitude left drawer navigation"
                variant="permanent"
                className={clsx(classes.navDrawer, {
                    [classes.navDrawerOpen]: navOpen,
                    [classes.navDrawerClose]: !navOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.navDrawerOpen]: navOpen,
                        [classes.navDrawerClose]: !navOpen,
                        [classes.navDrawerPaper]: !isHomePage,
                        [classes.floatingDrawerPaper]: isHomePage,
                    }),
                }}
            >
                <Toolbar />
                <div className={classes.navigationLeft}>
                    <List
                        component={"nav"}
                        aria-label="Gamitude main features navigation"
                        className={clsx({
                            [classes.transparentList]: isHomePage,
                        })}
                    >
                        {NAV_LINKS.map(({ to, label, icon, tooltip }) => (
                            <ListItem button key={to} component={Link} to={to}>
                                <ToggleAbleTooltip
                                    target={tooltip}
                                    placement="right"
                                >
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
                    <List
                        component={"nav"}
                        aria-label="Gamitude side features navigation"
                        className={clsx({
                            [classes.transparentList]: isHomePage,
                        })}
                    >
                        <ListItem button onClick={toggleTooltips}>
                            <ToggleAbleTooltip
                                target={"tooltipToggle"}
                                placement="right"
                            >
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
                            <ToggleAbleTooltip
                                target={"logout"}
                                placement="right"
                            >
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
            <Suspense fallback={<LoadingScreen />}>
                <div
                    className={clsx({
                        [classes.content]: !isHomePage,
                    })}
                    aria-label="Gamitude Content"
                >
                    {!isHomePage && <Toolbar />}
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
            {token && !isHomePage ? (
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
                                disabled={true}
                            />
                        </ToggleAbleTooltip>
                        <Timer />
                        <TimerList />
                    </div>
                </Drawer>
            ) : null}
            <CustomSnackbar />
            {shouldRedirectToSignInUp ? <Redirect to="/signInSignUp" /> : null}
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    tooltipToggle: selectTooltipToggle(state),
    sessionType: selectSessionType(state),
    dateExpires: selectDateExpires(state),
    isBreak: selectIsBreak(state),
    sessionInProgress: selectSessionInProgress(state),
});
const mapDispatchToProps = (dispatch: any) => ({
    setUser: (value: any) => dispatch(setUser(value)),
    setTooltipToggle: (value: any) => dispatch(setTooltipToggle(value)),
    setSessionType: (value: any) => dispatch(setSessionType(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
