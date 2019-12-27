import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import { setTab } from "../../redux/navigation/navigation.actions";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/navigation/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/navigation/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/navigation/sloth.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/navigation/profile.svg";
import { ReactComponent as GuestIcon } from "../../assets/icons/navigation/guest.svg";

const useStyles = makeStyles({
    root: {
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(196, 195, 81, 0.6)",
        zIndex: 10,
    },
    icons: {
        width: "4vh",
        height: "4vh",
    },
});
const NavigationMobile = ({ tab, setTab }) => {
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
                icon={<Logo className={classes.icons} />}
            />
            <BottomNavigationAction
                component={Link}
                to="/projects"
                label="Projects"
                icon={<ProjectsIcon className={classes.icons} />}
            />
            <BottomNavigationAction
                component={Link}
                to="/bulletJournal"
                label="Bullet Journal"
                icon={<BulletJournalIcon className={classes.icons} />}
            />
            {isSignedIn ? (
                <BottomNavigationAction
                    icon={<ProfileIcon className={classes.icons} />}
                    component={Link}
                    to="/profile"
                    label="Profile"
                />
            ) : (
                <BottomNavigationAction
                    icon={<GuestIcon className={classes.icons} />}
                    component={Link}
                    to="/signInSignUp"
                    label="Sign In / Sign Up"
                />
            )}
        </BottomNavigation>
    );
};

const mapStateToProps = state => ({
    tab: state.navigation.tab,
});

const mapDispatchToProps = dispatch => ({
    setTab: value => dispatch(setTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMobile);
