import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// Actions
import { setTab } from "../../redux/navigation/navigation.actions";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const Navigation = ({ tab, setTab, sessionInProgress, breakInProgress }) => {
    const isSignedIn = false;

    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            maxWidth: "100vw",
            backgroundColor: "transparent",
        },
        tabs: {
            backgroundColor: "rgba(196, 195, 81, 0.6)",
        },
    });
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={tab}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="Gamitude's Navigation"
                className={classes.tabs}
            >
                <Tab
                    icon={<CustomIcon size="large" variant="Logo" />}
                    aria-label="Home"
                    component={Link}
                    to="/"
                    label="Home"
                    disabled={sessionInProgress || breakInProgress}
                />
                <Tab
                    icon={<CustomIcon size="large" variant="Projects" />}
                    aria-label="Projects"
                    component={Link}
                    to="/projects"
                    label="Projects"
                />
                <Tab
                    icon={<CustomIcon size="large" variant="BulletJournal" />}
                    aria-label="Bullet Journal"
                    component={Link}
                    to="/bulletJournal"
                    label="Bullet Journal"
                    disabled={sessionInProgress || breakInProgress}
                />
                {isSignedIn ? (
                    <Tab
                        icon={<CustomIcon size="large" variant="Profile" />}
                        component={Link}
                        to="/profile"
                        label="Profile"
                        disabled={sessionInProgress || breakInProgress}
                    />
                ) : (
                    <Tab
                        icon={<CustomIcon size="large" variant="Guest" />}
                        component={Link}
                        to="/signInSignUp"
                        label="Sign In / Sign Up"
                        disabled={sessionInProgress || breakInProgress}
                    />
                )}
            </Tabs>
        </Paper>
    );
};

const mapStateToProps = state => ({
    tab: state.navigation.tab,
    sessionInProgress: state.projects.sessionInProgress,
    breakInProgress: state.projects.breakInProgress,
});

const mapDispatchToProps = dispatch => ({
    setTab: tab => dispatch(setTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
