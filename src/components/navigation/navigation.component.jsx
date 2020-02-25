import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const Navigation = ({ sessionInProgress, breakInProgress }) => {
    const isSignedIn = false;

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            maxWidth: "100vw",
            backgroundColor: "transparent",
        },
        tabs: {
            backgroundColor: theme.palette.secondary.main,
        },
    }));
    const classes = useStyles();

    const [tab, setTab] = React.useState(0);

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={tab}
                onChange={(event, newTab) => setTab(newTab)}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                className={classes.tabs}
            >
                <Tab
                    icon={<CustomIcon size="large" variant="Logo" />}
                    component={Link}
                    to="/"
                    label="Home"
                    disabled={sessionInProgress || breakInProgress}
                />
                <Tab
                    icon={<CustomIcon size="large" variant="Projects" />}
                    component={Link}
                    to="/projects"
                    label="Projects"
                    disabled={sessionInProgress || breakInProgress}
                />
                <Tab
                    icon={<CustomIcon size="large" variant="BulletJournal" />}
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
    sessionInProgress: state.projects.sessionInProgress,
    breakInProgress: state.projects.breakInProgress,
});

export default connect(mapStateToProps)(Navigation);
