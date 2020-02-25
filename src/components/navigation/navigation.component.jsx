import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const Navigation = ({ sessionInProgress, breakInProgress, user }) => {
    const useStyles = makeStyles(theme => ({
        tabs: {
            backgroundColor: theme.palette.secondary.main,
        },
    }));
    const classes = useStyles();

    const [tab, setTab] = React.useState(0);

    return (
        <Tabs
            value={tab}
            onChange={(event, newTab) => setTab(newTab)}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
        >
            <Tab
                icon={<CustomIcon size="large" variant="logo" />}
                component={Link}
                to="/"
                label="Home"
                disabled={sessionInProgress || breakInProgress}
            />
            <Tab
                icon={<CustomIcon size="large" variant="projects" />}
                component={Link}
                to="/projects"
                label="Projects"
                disabled={sessionInProgress || breakInProgress}
            />
            <Tab
                icon={<CustomIcon size="large" variant="bulletJournal" />}
                component={Link}
                to="/bulletJournal"
                label="Bullet Journal"
                disabled={sessionInProgress || breakInProgress}
            />
            {user ? (
                <Tab
                    icon={<CustomIcon size="large" variant="profile" />}
                    component={Link}
                    to="/profile"
                    label="Profile"
                    disabled={sessionInProgress || breakInProgress}
                />
            ) : (
                <Tab
                    icon={<CustomIcon size="large" variant="guest" />}
                    component={Link}
                    to="/signInSignUp"
                    label="Sign In / Sign Up"
                    disabled={sessionInProgress || breakInProgress}
                />
            )}
        </Tabs>
    );
};

const mapStateToProps = state => ({
    sessionInProgress: state.projects.sessionInProgress,
    breakInProgress: state.projects.breakInProgress,
    user: state.user.user,
});

export default connect(mapStateToProps)(Navigation);
