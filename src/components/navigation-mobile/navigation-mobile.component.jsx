import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import { setTab } from "../../redux/navigation/navigation.actions";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.secondary.light,
        zIndex: 10,
    },
}));
const NavigationMobile = ({
    tab,
    setTab,
    sessionInProgress,
    breakInProgress,
}) => {
    const classes = useStyles();
    const isSignedIn = true;
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <BottomNavigation
            value={tab}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                component={Link}
                to="/"
                label="Home"
                icon={<CustomIcon size="small" variant="Logo" />}
                disabled={sessionInProgress || breakInProgress}
            />
            <BottomNavigationAction
                component={Link}
                to="/projects"
                label="Projects"
                icon={<CustomIcon size="small" variant="Projects" />}
            />
            <BottomNavigationAction
                component={Link}
                to="/bulletJournal"
                label="Bullet Journal"
                icon={<CustomIcon size="small" variant="BulletJournal" />}
                disabled={sessionInProgress || breakInProgress}
            />
            {isSignedIn ? (
                <BottomNavigationAction
                    icon={<CustomIcon size="small" variant="Profile" />}
                    component={Link}
                    to="/profile"
                    label="Profile"
                    disabled={sessionInProgress || breakInProgress}
                />
            ) : (
                <BottomNavigationAction
                    icon={<CustomIcon size="small" variant="Guest" />}
                    component={Link}
                    to="/signInSignUp"
                    label="Sign In / Sign Up"
                    disabled={sessionInProgress || breakInProgress}
                />
            )}
        </BottomNavigation>
    );
};

const mapStateToProps = state => ({
    tab: state.navigation.tab,
    sessionInProgress: state.projects.sessionInProgress,
    breakInProgress: state.projects.breakInProgress,
});

const mapDispatchToProps = dispatch => ({
    setTab: value => dispatch(setTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMobile);
