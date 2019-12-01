import React from "react";
import { Link } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as GuestIcon } from "../../assets/icons/guest.svg";

const useStyles = makeStyles({
    root: {
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
    },
    icons: {
        width: "4vh",
        height: "4vh",
    },
});

export default function NavigationMobile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // Tests
    const isSignedIn = true;
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
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
}
