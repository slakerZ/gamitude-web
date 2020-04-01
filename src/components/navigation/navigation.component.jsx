import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";
// Selectors
import {
    selectSessionInProgress,
    selectBreakInProgress,
} from "../../redux/session/session.selectors.js";
import { selectToken } from "../../redux/user/user.selectors.js";

const Navigation = ({ sessionInProgress, breakInProgress, token }) => {
    const useStyles = makeStyles(theme => ({
        tabs: {
            backgroundColor: theme.palette.tertriary.main,
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
            textColor="secondary"
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
            {token ? (
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
    sessionInProgress: selectSessionInProgress(state),
    breakInProgress: selectBreakInProgress(state),
    token: selectToken(state),
});

export default connect(mapStateToProps)(Navigation);
